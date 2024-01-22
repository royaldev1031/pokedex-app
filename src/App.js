import { useEffect, useState } from 'react'
import CardList from './components/CardList'
import Header from './components/Header'
import Button from './components/Button'

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=10'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchData(url) {
    try {
      setLoading(true)
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(API_URL)
  }, [])

  const handleClick = (url) => {
    fetchData(url)
  }

  if (error) {
    return <p className="text-center">Error: {error}</p>
  }

  return (
    <div className="w-full items-center p-10 bg-slate-100 min-h-screen">
      <Header />
      {loading ? (
        <p className="text-center text-lg p-5">Loading...</p>
      ) : (
        <>
          {data.results.length && <CardList pokemons={data.results} />}
          <div className="flex justify-center space-x-2">
            {data.previous && (
              <Button onClick={() => handleClick(data.previous)} type="primary">
                Prev
              </Button>
            )}

            {data.next && (
              <Button onClick={() => handleClick(data.next)} type="success">
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
