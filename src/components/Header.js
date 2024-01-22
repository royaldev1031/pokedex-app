import { memo } from 'react'

function Header() {
  return (
    <h1 className="text-center text-4xl font-bold mb-5">The Kanto PokeDex!</h1>
  )
}

export default memo(Header)
