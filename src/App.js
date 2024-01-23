import { useCallback, useEffect, useState } from 'react'
import CardList from './components/CardList'
import Header from './components/Header'
import Button from './components/Button'
import Loading from './components/Loading'
import Error from './components/Error'

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=10'

function App() {
  const [pokemons, setPokemons] = useState(null)
  const [status, setStatus] = useState({ loading: true, error: null })

  const fetchData = async (url) => {
    try {
      setStatus({ loading: true, error: null })
      const cachedData = localStorage.getItem(url)

      if (cachedData) {
        setPokemons(JSON.parse(cachedData))
      } else {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`)
        }

        const result = await response.json()
        setPokemons(result)
        localStorage.setItem(url, JSON.stringify(result))
      }
    } catch (error) {
      setStatus({ loading: false, error: error.message })
    } finally {
      setStatus({ loading: false, error: null })
    }
  }

  useEffect(() => {
    fetchData(API_URL)
  }, [])

  const handleClick = useCallback((url) => {
    fetchData(url)
  }, [])

  return (
    <div className="w-full items-center p-10 bg-slate-100 min-h-screen">
      <Header />
      {status.loading ? (
        <Loading />
      ) : status.error ? (
        <Error message={status.error} />
      ) : (
        <>
          {pokemons?.results.length && <CardList pokemons={pokemons.results} />}
          <div className="flex justify-center space-x-2">
            {pokemons?.previous && (
              <Button
                onClick={() => handleClick(pokemons.previous)}
                type="primary"
              >
                Prev
              </Button>
            )}

            {pokemons?.next && (
              <Button onClick={() => handleClick(pokemons.next)} type="success">
                Next
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default App
