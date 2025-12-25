import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import NavBar from "../components/NavBar/NavBar"
import HospitalCard from '../components/Hostpital/HospitalCard'

const Search = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  const [hospital, setHospital] = useState([])
  const [loading, setLoading] = useState(false)
  const state = searchParams.get("state")
  const cityUrl = searchParams.get("city")
  const [status, setStatus] = useState([])
  const [city, setCity] = useState([])
  const [selectedStatus, setSelectedStatus] = useState("")
  const [selectedCity, setSelectedCity] = useState("")

  const finalState = selectedStatus || state
  const finalCity = selectedCity || cityUrl

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

  const fetchHospital = async () => {
    try {
      setLoading(true)
      const response = await fetch(`https://meddata-backend.onrender.com/data?state=${finalState}&city=${finalCity}`)
      const data = await response.json()
      setHospital(data)
      setLoading(false)
    } catch (error) {
      console.error("SOmething went worng", error)
    }
  }

  const handleSearch = () => {
    if (!finalState || !finalCity) return

    setSearchParams({
      state: finalState,
      city: finalCity,
    })

    fetchHospital()
  }

  useEffect(() => {
    fetchStatus()
  }, [])

  useEffect(() => {
    if (selectedStatus) {
      fetchCity()
    }
  }, [selectedStatus])

  useEffect(() => {
    fetchHospital()
  }, [])

  return (
    <main className='search-page'>
      <NavBar />
      <div className='overlay'>
        <div className='search-bar shadow-sm container'>
          <div className='search-container flex-column flex-md-row d-flex align-items-center justify-content-between p-4'>
            <div className='search-select w-100' id="state">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className='w-100'>
                <option disabled selected>State</option>
                {status.map((city, index) => (
                  <option key={index} value={city} >{city}</option>
                ))}
              </select>
            </div>

            <div className='search-select w-100  pt-md-0 pt-3' id="city">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className='w-100'>
                <option disabled selected>City</option>
                {city.map((city, index) => (
                  <option key={index} value={city} >{city}</option>
                ))}
              </select>
            </div>

            <button onClick={handleSearch} className='btn btn-primary px-5 py-2 mt-md-0 mt-3'>Search</button>
          </div>
        </div>
      </div>

      <div className='hospital-container'>
        <div className='container'>
          <h2>{hospital.length} medical centers available in {finalCity.toLowerCase()}</h2>
          <p>Book appointments with minimum wait-time & verified doctor details</p>
        </div>
      </div>

      <div className='container'>
        {loading ? <h2>Loading...</h2> : hospital.map((hos, index) => <HospitalCard key={index} hospital={hos} />)}
      </div>
    </main>
  )
}

export default Search