import React, { useEffect, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useParams } from 'react-router-dom'
import axios from 'axios'

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

const PokemonId = () => {

    const {id} = useParams()
    console.log(id)

    const [pokemon, setPokemon] = useState()
    useEffect(() => {
      const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`

      axios.get(URL)
        .then((res)=> setPokemon(res.data))
        .catch((err)=> console.log(err))


    }, [])

    const getPercentStatBar = (stat_base) => {
        const percentBarProgres = (stat_base * 100) / 255;
        return `${percentBarProgres}%`;
    }
    
  return (
    <section>
        <Header/>

        <section className='px-2 py-16'>
            <article className='max-w-[770px] mx-auto shadow-lg p-2' >

                {/* //seccion Superior */}
                <section className={`bg-gradient-to-b ${backgroudByType[pokemon?.types[0].type.name]} rounded-tl-lg rounded-tr-lg relative h-[140px]`}>
                    <div className='w-[200px] mx-auto absolute left-1/2 -translate-x-1/2 -top-14'>
                    <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
                </div>
                </section>
                

                {/* informacigón general */}
                
                <section className='bg-white p-6 rounded-bl-lg rounded-br-lg'>
                    <div className='mx-auto border-2 max-w-max px-6 mb-4 rounded-md'>
                        <h3 className='font-semibold'>#{pokemon?.id}</h3>
                    </div>

                    <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-2'>
                        <hr />
                        <h2 className='text-2xl md:text-3xl capitalize font-bold'>{pokemon?.name}</h2>
                    <hr />
                    </div>

                            <div className='flex justify-center gap-6 text-center text-xs p-6 '>
                                <div className='grid gap-2'>
                                    <h5 className='text-2xl md:text-3xl capitalize font-light '>Weight</h5>
                                    <span className='font-bold text-sm'>{pokemon?.weight}</span>
                                </div>

                                <div className='grid gap-2'>
                                    <h5 className='text-2xl md:text-3xl capitalize font-light'>Height</h5>
                                    <span className='font-bold text-sm'>{pokemon?.height}</span>
                                </div>
                            </div>

                    <section className='grid sm:grid-cols-2 gap-4'>
                        {/* tipos  */}
                        <section className='text-center'>
                            <h3>Types</h3>

                            <section className='grid grid-cols-2 gap-4 mt-4' >
                                {
                                    pokemon?.types.map(type => <article className='p-2 px-8 border-[1px] border-gray-300 text-center' key={type.type.name}>{type.type.name}</article>)
                                }
                            </section>
                        </section>


                         {/* habilidades    */}
                        <section>

                            <section className='text-center'>
                            <h3>Abilities</h3>

                            <section className='grid grid-cols-2 gap-4 mt-4' >
                                {
                                    pokemon?.abilities.map(ability => <article className='p-2 px-8 border-[1px] border-gray-300 text-center capitalize truncate' key={ability.ability.name}>{ability.ability.name}</article>)
                                }
                            </section>
                        </section>

                        </section>
                    </section>
                    
                </section>

                <article>
                    {/* seccion de stats */}

                    <section>
                        <h3>Stats</h3>
                        <section>
                            {
                                pokemon?.stats.map(stat =>(
                                        <article key={stat.stat.name}>
                                            <section className='flex justify-between'>
                                                <h5 className='capitalize'>{stat.stat.name}</h5>
                                                <span>{stat.base_stat}/250</span>
                                            </section>
                                            <div className='bg-gray-100 h-6 rounded-sm'>
                                                <div style={{"width":getPercentStatBar(stat.base_stat)}} className={`h-full  bg-gradient-to-r from-yellow-300 to-yellow-600`}></div>
                                            </div>
                                        </article>
                                ))
                            }
                        </section>
                    </section>
                </article>

            </article>
        </section>
    </section>
  )
}

export default PokemonId