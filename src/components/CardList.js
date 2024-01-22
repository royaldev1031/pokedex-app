import Card from './Card'

function CardList({ pokemons }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-5">
      {pokemons.map((pokemon, i) => {
        return <Card key={pokemon.name} name={pokemon.name} url={pokemon.url} />
      })}
    </div>
  )
}

export default CardList
