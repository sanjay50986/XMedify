import React, { useEffect, useState } from 'react'
import HospitalImage from '../../assets/hospital.png'

const HospitalCard = ({ hospital }) => {

    console.log(hospital)
    return (
        <div className='hospital-card d-flex flex-column flex-md-row justify-content-between'>
            <img className='d-none d-md-block' width={150} height={150} src={HospitalImage} alt="hospital" />
            <div className='hospital-info mt-0 mt-md-5'>
                <h2>{hospital['Hospital Name']}</h2>
                <h4>{hospital.Address}, {hospital.City}</h4>
                <p className='types'>Smilessence Center for Advanced Dentistry + 1</p>
                <p className='fee'><span>FREE</span> Consultation fee at clinic</p>
            </div>
            <div className='d-flex flex-column justify-content-end'>
                <h3 className='avalable-text'>Available Today</h3>
                <button className='btn btn-primary text-nowrap'>Book FREE Center Visit</button>
            </div>
        </div>
    )
}

export default HospitalCard