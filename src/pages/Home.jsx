import React from 'react'
import Footer from '../components/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setNameTrainer } from '../store/slices/nameTrainer.slice'

const Home = () => {
 const dispatch = useDispatch()
 const navigate = useNavigate()

 const handleSubmit = (e) =>{
   e.preventDefault()
    // console.log(e.target.nameTrainer.value)} 
    dispatch(setNameTrainer(e.target.nameTrainer.value))
    navigate("/pokedex")
 }
  return (
    // Parte Superior
<section className='min-h-screen flex flex-col justify-between bg-gradient-to-r from-red-700 via-red-500 to-yellow-500 bg-no-repeat bg-left bg-cover' >
  <section className='flex-grow grid place-items-center'>
    <article className='text-center space-y-4'>
      <div>
        <img src='/images/pokedex.png' alt='Pokedex' className='w-64 mx-auto' />
      </div>
      <h2 className='text-3xl font-bold text-gray-900'>Hello Trainer!</h2>
      <p className='text-lg text-gray-900'>Please give me your name to start:</p>
      <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
        <input id='nameTrainer' type='text' placeholder='Your Name...' className='w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent sm:text-base' />
        <button className='w-full px-4 py-2 bg-red-600 text-white font-bold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 sm:text-base'>
          Start
        </button>
      </form>
    </article>
  </section>
  <Footer />
</section>





    
  )
}

export default Home