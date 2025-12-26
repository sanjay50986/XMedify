import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar/NavBar'
import HospitalImage from '../assets/Hospital.png'

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
                        {bookingData.map((booking, index) => <div className='hospital-card mt-3'>
                            <div className='d-flex flex-column flex-md-row gap-5' >
                                <img className='d-none d-md-block' width={150} height={150} src={HospitalImage} alt="hospital" />
                                <div className='hospital-info mt-0 mt-md-5'>
                                    <div className='d-flex align-content-center gap-4 justify-content-between'>
                                        <h3>{booking.hospitalName || booking["Hospital Name"]}</h3>
                                        <div className='time-box'>
                                            {booking.time || booking.bookingTime}
                                        </div>

                                        <div className='day-box'>
                                            {booking.date || booking.bookingDate}
                                        </div>
                                    </div>
                                    <h4>{booking.address}, {booking.city || booking["City"]}</h4>
                                    <p className='types'>Smilessence Center for Advanced Dentistry + 1</p>
                                </div>

                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyBooking