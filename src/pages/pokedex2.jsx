import React, { useEffect, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useSelector } from 'react-redux'
import axios from 'axios'
import PokemonCard from '../components/pokedex/PokemonCard'

const Pokedex = () => {
    const [pokemons, setPokemons] = useState([])
    const [pokemonName, setPokemonName] = useState("")
    const [types, setTypes] = useState([])
    const [currentType, setCurrentType] = useState()

    const nameTrainer = useSelector(store => store.nameTrainer)

    const handleSubmit = (e) => {
        e.preventDefault()
        setPokemonName(e.target.pokemonName.value)
    }

    const pokemonsByName = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(pokemonName.toLowerCase()))
    

    useEffect(() => {
        if(!currentType) {
            const URL = "https://pokeapi.co/api/v2/pokemon"
    
            axios.get(URL)
            .then((res) => setPokemons(res.data.results))
            .catch((err) => console.log(err))
        }
    }, [currentType])

    useEffect(() => {
        const URL = "https://pokeapi.co/api/v2/type"

        axios.get(URL)
        .then((res) => {
            const newTypes = res.data.results.map(type => type.name)
            setTypes(newTypes)
        }) 
        .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        if(currentType){
            const URL = `https://pokeapi.co/api/v2/type/${currentType}/`

            axios.get(URL)
            .then((res) => {
                const pokemonsByType = res.data.pokemon.map(pokemon => pokemon.pokemon)
                setPokemons(pokemonsByType)
            } )
            .catch((err) => console.log(err))
        }
        
    }, [currentType])

    return (
        <section className='min-h-screen'>
            <Header />

            <section className='py-6 px-2 flex flex-col justify-center items-center mx-auto'>
                <h3 className='mb-6'>
                    <span className='font-semibold text-red-500'>Welcome {nameTrainer},</span>  you can find your favorite Pokemon here!</h3>

                <form onSubmit={handleSubmit} className='flex gap-12 h-10 '>
                    <div className='mr-4 h-full'>
                        <input className='shadow-md shadow-black/30 h-full w-80 outline-0 px-4 rounded-tl-md rounded-bl-md' id='pokemonName' type="text" placeholder='Search your Pokemon' />
                        <button className='bg-red-500 shadow-md shadow-black/30 hover:bg-red-600 h-full text-white max-w-max px-10 py-2 rounded-tr-md rounded-br-md '>Search</button>
                    </div>

                    <select className='shadow-md shadow-black/30 rounded-md outline-0 w-80' onChange={(e) => setCurrentType(e.target.value)}>
                        <option value="">All Pokemon</option>
                        {
                            types.map(type => 
                            <option className='capitalize' value={type} key={type}>{type}</option>)
                        }
                    </select>
                </form>
            </section>


            {/* Lista de pokemones */}
            <section className='px-6 md:px-12 py-12 grid gap-6 auto-rows-auto grid-cols-[repeat(auto-fill,_minmax(220px,_360px))] justify-center'>
            {
                pokemonsByName.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />)
            }
        </section>
        </section>

        
        
    )
}

export default Pokedex