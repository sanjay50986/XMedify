import React, { useEffect } from 'react'
import Doctor from '../../assets/Doctor.svg'
import Hospital from '../../assets/Hospital.svg'
import Labs from '../../assets/Labs.svg'
import Medicine from '../../assets/Medicine.svg'
import Ambulance from '../../assets/Ambulance.svg'

const SearchSection = ({status, fetchStatus, selectedStatus, setSelectedStatus, fetchCity, city, selectedCity, setSelectedCity}) => {

  const cards = [
    {
      id: 1,
      title: "Doctors",
      icon: Doctor
    },
    {
      id: 2,
      title: "Labs",
      icon: Labs
    },
    {
      id: 3,
      title: "Hospitals",
      icon: Hospital
    },
    {
      id: 4,
      title: "Medical Store",
      icon: Medicine
    },
    {
      id: 5,
      title: "Ambulance",
      icon: Ambulance
    }
  ]

  useEffect(() => {
    fetchStatus()
  }, [])

  useEffect(() => {
    if(selectedStatus) {
      fetchCity()
    }
  }, [selectedStatus])
  

  return (
    <section className='search-section container shadow-sm'>
         <div className='search-container flex-column flex-md-row d-flex align-items-center justify-content-between p-5'>
          <div className='search-select w-100 '>
            <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className='w-100' name="" id="">
              <option disabled value="">State</option>
              {status.map((state, index) => (
                <option key={index} value={state} >{state}</option>
              ))}
            </select>
          </div>                                  

          <div  className='search-select w-100  pt-md-0 pt-3'>
            <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
             className='w-100' name="" id="">
              <option disabled value="">City</option>
              {city.map((city, index) => (
                <option key={index} value={city} >{city}</option>
              ))}
            </select>
          </div>

          <button className='btn btn-primary px-5 py-2 mt-md-0 mt-3'>Search</button>
         </div>

          <h3>You may be looking for</h3>
         <div className='cards d-flex  justify-content-between p-2 mb-5 flex-column flex-md-row'>
          {
            cards.map((card) => (
              <div key={card.id} className='card w-100'>
                <img src={card.icon} height={50} width={50} alt={card.title} />
                <h2>{card.title}</h2>
              </div>
            ))
          }
         </div>
    </section>
  )
}

export default SearchSection