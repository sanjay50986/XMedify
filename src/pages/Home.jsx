import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar/NavBar'
import Hero from '../components/Hero/Hero'
import SearchSection from '../components/SearchSection/SearchSection'

const Home = () => {

  const [status, setStatus] = useState([])
  const [city, setCity] = useState([])
  const [selectedStatus, setSelectedStatus] = useState("")
  const [selectedCity, setSelectedCity] = useState("")

  const fetchStatus = async () => {
   try {
     const response = await fetch('https://meddata-backend.onrender.com/states')
     const data = await response.json()
     setStatus(data)
   } catch (error) {
    console.error("SOmething went worng", error)
   }
  }


   const fetchCity = async () => {
   try {
     const response = await fetch(`https://meddata-backend.onrender.com/cities/${selectedStatus}`)
     const data = await response.json()
     setCity(data)
   } catch (error) {
    console.error("SOmething went worng", error)
   }
  }


  return (
    <>
    <NavBar/>
    <Hero
      fetchStatus={fetchStatus}
      status={status}
      selectedStatus={selectedStatus}
      setSelectedStatus={setSelectedStatus}
      fetchCity={fetchCity}
      city={city}
      selectedCity={selectedCity}
      setSelectedCity={setSelectedCity}/>
    </>
  )
}

export default Home