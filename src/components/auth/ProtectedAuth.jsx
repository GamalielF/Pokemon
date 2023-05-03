import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';



const ProtectedAuth = () => {

    const nameTrainer = useSelector((store)=> store.nameTrainer);

    console.log(nameTrainer)

    if(nameTrainer){
        return <Outlet/>
    }else{
        return <Navigate to="/"></Navigate>
    }


    return (
    <div>ProtectedAuth</div>
  )
}

export default ProtectedAuth