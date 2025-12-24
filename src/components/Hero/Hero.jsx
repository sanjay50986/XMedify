import React from 'react'
import HeroImage from '../../assets/hero-doctor.svg'
import SearchSection from '../SearchSection/SearchSection'

const Hero = ({status, fetchStatus, selectedStatus, setSelectedStatus, fetchCity, city, selectedCity, setSelectedCity}) => {
  return (
    <section className='hero-section'>
        <div className="container">
            <div className='d-flex pt-3 align-items-center justify-content-between'>
                <div className='d-flex flex-column gap-2'>
                    <h2 className='find-online-text'>Skip the travel! Find Online</h2>
                    <h1 className='medical-text'>Medical<span style={{color: "#2AA7FF"}}> Centers</span></h1>
                    <p className='p-text'>Connect instantly with a 24x7 specialist or choose to video visit a particular doctor.</p>
                    <button className='btn btn-primary w-25'>Find Centers</button>
                </div>

                <div className='hero-doctor d-none d-lg-block'>
                  <img src={HeroImage} alt="hero-image" />
                </div>
            </div>

            <SearchSection
             status={status} 
             fetchStatus={fetchStatus} 
             selectedStatus={selectedStatus} 
             setSelectedStatus={setSelectedStatus}
             fetchCity={fetchCity}
             city={city}
             selectedCity={selectedCity}
             setSelectedCity={setSelectedCity}/>
        </div>
    </section>
  )
}

export default Hero