function Card({ name, url }) {
  const pokemonIndex = url.split('/')[url.split('/').length - 2]
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`

  return (
    <div className="bg-white border-1 w-[250px] h-[250px] drop-shadow-md cursor-pointer hover:scale-105 ease-in duration-300 text-center p-10">
      <img className="m-auto w-[100px] h-[100px]" src={imgUrl} alt={name} />
      <span className="font-bold mt-3">{name}</span>
    </div>
  )
}

export default Card
