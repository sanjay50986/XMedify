import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar/NavBar'
import HospitalImage from '../assets/Hospital.png'
import Like from '../assets/Like.svg'

const MyBooking = () => {

    const [bookingData, setBookingData] = useState([])

    useEffect(() => {
        const bookingData = localStorage.getItem("bookings")
        setBookingData(JSON.parse(bookingData))
    }, [])

    console.log(bookingData)

    return (
        <>
            <NavBar />
            <div className='overlay'>
                <div className='container'>
                    <h1 className='pt-5 text-white'>My Bookings</h1>
                </div>

                <div className='my-bookings'>
                    <div className='container py-5'>
                       {!bookingData ? (
                        <h2>No Bookings Found</h2>
                       ) : (bookingData.map((booking, index) => (
                        <div className='hospital-card mt-3' key={index}>
                            <div className='d-flex flex-column flex-md-row justify-content-between'>
                                 <img className='d-none d-md-block' width={150} height={150} src={HospitalImage} alt="hospital" />
                                 <div className='hospital-info mt-0 mt-md-5'>
                                    <h3 style={{textAlign: "left", color: "#14BEF0"}}>{booking?.hospitalName}</h3>
                                    <h4>{booking?.address}</h4>
                                    <p className='types'>Smilessence Center for Advanced Dentistry + 1</p>
                                    <p className='fee'><span>FREE</span> Consultation fee at clinic</p>
                
                                    <span className='rating-box'>
                                        <img width={16} height={16} src={Like} alt="rating" />
                                        <span className='rating-count'>5</span>
                                    </span>
                                </div>

                                <div className='mt-5'>
                                    <span className='time-box'>
                                        {booking?.time}
                                    </span>

                                    <span className='date-box'>
                                        {booking?.date} 2026
                                    </span>
                                </div>
                            </div>

                        </div>
                       )))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyBooking