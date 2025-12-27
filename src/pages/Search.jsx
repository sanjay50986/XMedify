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
  const [citi, setCity] = useState([])
  const [statusOpen, setStatusOpen] = useState(false)
  const [cityOpen, setCityOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState("")
  const [selectedCity, setSelectedCity] = useState("")

  const finalState = selectedStatus || state
  const city = selectedCity || cityUrl

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
      const response = await fetch(`https://meddata-backend.onrender.com/data?state=${finalState}&city=${city}`)
      const data = await response.json()
      setHospital(data)
      setLoading(false)
    } catch (error) {
      console.error("SOmething went worng", error)
    }
  }

  const handleSearch = () => {
    if (!finalState || !city) return

    setSearchParams({
      state: finalState,
      city: city,
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

  let number = hospital.length

  return (
    <main className='search-page'>
      <NavBar />
      <div className='overlay'>
        <div className='search-bar shadow-sm container'>
          <div className='search-container flex-column flex-md-row d-flex align-items-center justify-content-between p-4 gap-4'>
            <div className='search-select w-100' id="state">
              <div
                className='dropdown-wrapper'
                onClick={() => setStatusOpen(!statusOpen)}
              >
                <div className='selected-value'>{selectedStatus || "State"}</div>
                <i className="bi bi-chevron-down"></i>
                {statusOpen && (
                  <ul className='dropdown-list'>
                    {status.map((item, index) => (
                      <li key={index} onClick={() => { setSelectedStatus(item); setStatusOpen(false) }}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className='search-select w-100  pt-md-0 pt-3' id="city">
              <div
                className='dropdown-wrapper'
                onClick={() => setCityOpen(!cityOpen)}
              >
                <div className='selected-value'>{selectedCity || "City"}</div>
                <i className="bi bi-chevron-down"></i>
                {cityOpen && (
                  <ul className='dropdown-list'>
                    {citi.map((item, index) => (
                      <li key={index} onClick={() => { setSelectedCity(item); setCityOpen(false) }}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <button type="submit" id="searchBtn" onClick={handleSearch} className='btn btn-primary search-btn px-5 py-2 mt-md-0 mt-3'>Search</button>
          </div>
        </div>
      </div>

      <div className='hospital-container'>
        <div className='container'>
          <h1>{number} medical centers available in {city}</h1>
          <p>Book appointments with minimum wait-time & verified doctor details</p>
        </div>
      </div>

      <div className='container pb-5'>
        {loading ? <h2>Loading...</h2> : hospital.map((hos, index) => <HospitalCard key={index} hospital={hos} />)}
      </div>
    </main>
  )
}

export default Search