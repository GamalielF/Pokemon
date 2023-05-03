import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
//agregar estilos a los demas tipos
const bordersByType = {
 grass: "border-green-400/50",
    fire: "border-orange-500/50",
    normal: "border-amber-800/50",
    fighting: "border-yellow-900/50",
    flying: "border-red-500/50",
    poison: "border-violet-500/50",
    ground: "border-orange-800/50",
    rock: "border-stone-600/50",
    bug: "border-green-500/50",
    ghost: "border-indigo-700/50",
    steel: "border-teal-800/50",
    water: "border-sky-400/50",
    electric: "border-yellow-400/50",
    psychic: "border-cyan-700/50",
    ice: "border-cyan-300/50",
    dragon: "border-sky-600/50",
    dark: "border-zinc-900/50",
    fairy: "border-pink-500/50",
    unknown: "border-slate-600/50",
    shadow: "border-stone-800/50",
}

const colorTextByType = {
    grass: "text-green-600",
    fire: "text-orange-500",
    normal: "text-amber-600",
    fighting: "text-yellow-600",
    flying: "text-red-700",
    poison: "text-violet-600",
    ground: "text-orange-600",
    rock: "text-stone-700",
    bug: "text-green-700",
    ghost: "text-indigo-700",
    steel: "text-teal-600",
    water: "text-sky-600",
    electric: "text-yellow-600",
    psychic: "text-cyan-700",
    ice: "text-cyan-600",
    dragon: "text-sky-600",
    dark: "text-zinc-600",
    fairy: "text-pink-700",
    unknown: "text-slate-600",
    shadow: "text-stone-600",
}


const backgroudByType = {
  grass: "from-green-400 to-white",
    fire: "from-orange-500 to-white",
    normal: "from-amber-800 to-white",
    fighting: "from-yellow-900 to-white",
    flying: "from-red-500 to-white",
    poison: "from-violet-500 to-white",
    ground: "from-orange-800 to-white",
    rock: "from-stone-600 to-white",
    bug: "from-green-500 to-white",
    ghost: "from-indigo-700 to-white",
    steel: "from-teal-800 to-white",
    water: "from-sky-400 to-white",
    electric: "from-yellow-400 to-white",
    psychic: "from-cyan-700 to-white",
    ice: "from-cyan-300 to-white",
    dragon: "from-sky-600 to-white",
    dark: "from-zinc-900 to-white",
    fairy: "from-pink-500 to-white",
    unknown: "from-slate-600 to-white",
    shadow: "from-stone-800 to-white",
}

const PokemonCard = ({pokemonUrl}) => {
    console.log(pokemonUrl)
    
    const [pokemon, setPokemon] = useState()

    const types = pokemon?.types.slice(0, 2).map(type => type.type.name).join(" / ")
    
    
    useEffect(()=>{

      axios.get(pokemonUrl)
        .then((res)=>setPokemon(res.data))
        .catch((err)=>console.log(err))
    },[])


    return (
    <Link to={`/pokedex/${pokemon?.id}`} className={`text-center border-8 rounded-md  ${bordersByType[pokemon?.types[0].type.name]}`}>

      {/* seleccion superior */}
      <section className={`bg-gradient-to-b ${backgroudByType[pokemon?.types[0].type.name]}  relative h-[150px]`}>

        <div className='absolute -bottom-13 w-[200px] left-1/2 -translate-x-1/2'>
          <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
        </div>

      </section>

      {/* seleccion inferior */}
      <section>
            <h3 className={`capitalize pt-14 text-3xl mb-2 font-semibold ${colorTextByType[pokemon?.types[0].type.name]}`}>{pokemon?.name}</h3>
            <h4>{types}</h4>
            <span>Type</span>
            <hr />
            <section className='grid grid-cols-3 gap-2 p-2'>
              {
                pokemon?.stats.map(stat =>(
                  <div key = {stat.stat.name}>
                    <h5>
                      {stat.stat.name}
    
                    </h5>
                    <span>{stat.base_stat}</span>
                  </div>
                ))
              }
            </section>
      </section>
    </Link>
  )
}

export default PokemonCard