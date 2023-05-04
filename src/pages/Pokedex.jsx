import React, { useEffect, useMemo, useRef, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useSelector } from 'react-redux'
import axios from 'axios'
import PokemonCard from '../components/pokedex/PokemonCard'
import { paginationLogic } from '../utils/pagination'

const Pokedex = () => {
    const [pokemons, setPokemons] = useState([]);

    const [pokemonName, setPokemonName] = useState("");

    const [types, setTypes] = useState([]);

    const [currentType, setCurrentType] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [pokesPerPage, setPokesPerPage] = useState(12);

    const input = useRef(null)

    const nameTrainer = useSelector((store) => store.nameTrainer);

    const handleSubmit = (e) => {
        e.preventDefault();
        setPokemonName(e.target.pokemonName.value);
    };

    const pokemonsByName = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())
    );

    

    const { pokemonInPage, lastPage, pagesInBlock, PAGES_PER_BLOCK } = useMemo(() => paginationLogic(currentPage, pokemonsByName, pokesPerPage), [currentPage, pokemons, pokemonName, currentType, pokesPerPage]) 

    const handleClickPreviousPage = () => {
        const newCurrentPage = currentPage - 1;
        if (newCurrentPage >= 1) {
        setCurrentPage(newCurrentPage);
        }
    };

    const handleClickNextPage = () => {
        const newCurrentPage = currentPage + 1;
        if (newCurrentPage <= lastPage) {
        setCurrentPage(newCurrentPage);
        }
    };

    useEffect(() => {
        if (!currentType) {
        const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281";

        axios
            .get(URL)
            .then((res) => setPokemons(res.data.results))
            .catch((err) => console.log(err));
        }
    }, [currentType]);

    useEffect(() => {
        const URL = "https://pokeapi.co/api/v2/type";

        axios
        .get(URL)
        .then((res) => {
            const newTypes = res.data.results.map((type) => type.name);
            setTypes(newTypes);
        })
        .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (currentType) {
        const URL = `https://pokeapi.co/api/v2/type/${currentType}/`;

        axios
            .get(URL)
            .then((res) => {
            const pokemonsByType = res.data.pokemon.map(
                (pokemon) => pokemon.pokemon
            );
            setPokemons(pokemonsByType);
            })
            .catch((err) => console.log(err));
        }
    }, [currentType]);

    useEffect(() => {
        setCurrentPage(1);
    }, [pokemonName, currentType]);

    useEffect(() => {
        setPokemonName("")
        input.current.value = ""
    }, [currentType])



    return (
            <section className='min-h-screen bg-gray-100'>
  <Header />
<section className='py-6 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16'>
<h3 className='text-center text-3xl font-bold text-yellow-500 font-sans'>
    Welcome Trainer <span className='text-red-500'>{nameTrainer}</span>, find your favorite Pokémon
</h3>
  <form className='flex flex-col items-center justify-center mt-6 space-y-2 md:flex-row md:space-y-0 md:space-x-2' onSubmit={handleSubmit}>
    <div className='relative flex items-center w-full'>
      <input ref={input} type="text" id="pokemonName" placeholder='Search your Pokémon' className='px-4 py-2 w-full text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent' />
      <button className='px-4 py-2 font-bold text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50'>
        Search
      </button>
    </div>
    <select className='px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent capitalize' onChange={(e)=> setCurrentType(e.target.value)} name="type" id="type">
      <option value="">All Types</option>
      {types.map((type)=>(
        <option value={type} key={type}>
          {type}
        </option>
      ))}
    </select>
  </form>
</section>
  {/* Paginación */}
  <ul className='flex gap-3 justify-center py-4 px-2 flex-wrap'>
    <li onClick={() => setCurrentPage(1)} className='p-3 bg-red-400 hover:bg-red-500 font-bold text-white rounded-md cursor-pointer transition duration-300'>{"<<"}</li>
    <li onClick={handleClickPreviousPage} className='p-3 bg-red-400 hover:bg-red-500 font-bold text-white rounded-md cursor-pointer transition duration-300'>{"<"}</li>
    {
      pagesInBlock.map(numberPage =>
        <li
          onClick={() => setCurrentPage(numberPage)}
          key={numberPage}
          className={`p-3 bg-red-400 hover:bg-red-500 font-bold text-white rounded-md cursor-pointer transition duration-300 ${numberPage === currentPage && "bg-yellow-400"}`}
        >
          {numberPage}
        </li>
      )
    }
    <li onClick={handleClickNextPage} className='p-3 bg-red-400 hover:bg-red-500 font-bold text-white rounded-md cursor-pointer transition duration-300'>{">"}</li>
    <li onClick={() => setCurrentPage(lastPage)} className='p-3 bg-red-400 hover:bg-red-500 font-bold text-white rounded-md cursor-pointer transition duration-300'>{">>"}</li>
  </ul>


            {/* Lista de pokemones */}
            <section className='px-6 md:px-12 py-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 grid-cols-[repeat(auto-fill,_minmax(220px,_320px))]'>
            {
                pokemonInPage.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />)
            }
        </section>
        </section>

        
        
    )
}

export default Pokedex