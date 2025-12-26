import React, { useEffect, useState } from 'react'
import HospitalImage from '../../assets/Hospital.png'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import Next from '../../assets/next.svg'
import Back from '../../assets/back.svg'

const HospitalCard = ({ hospital }) => {

    const [isOpenBooking, setIsOpenBooking] = useState(false)
    const [selectedDay, setSelectedDay] = useState(0)
    const [selectedTime, setSelectedTime] = useState(null)


    const weekDates = Array.from({ length: 7 }).map((_, i) => {
        const date = new Date()
        date.setDate(date.getDate() + i)

        return {
            label:
                i === 0
                    ? "Today"
                    : i === 1
                        ? "Tomorrow"
                        : date.toLocaleDateString("en-US", { weekday: "short" }),
            date: date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
            }),
            slots: Math.floor(Math.random() * 10) + 10,
        }
    })
    const bookingTimes = {
        Morning: ["11:30 AM"],
        Afternoon: [
            "12:00 PM",
            "12:30 PM",
            "01:30 PM",
            "02:00 PM",
            "02:30 PM",
        ],
        Evening: [
            "06:00 PM",
            "06:30 PM",
            "07:00 PM",
            "07:30 PM",
        ],
    }


    const handleBooking = (period, time) => {
        const selectedDate = weekDates[selectedDay]

        const newBooking = {
            hospitalName: hospital["Hospital Name"],
            address: `${hospital.Address}, ${hospital.City}`,
            dateLabel: selectedDate.label,
            date: selectedDate.date,
            timeOfDay: period,
            time: time,
        }

        const existingBookings =
            JSON.parse(localStorage.getItem("bookings")) || []

        existingBookings.push(newBooking)

        localStorage.setItem("bookings", JSON.stringify(existingBookings))

        setSelectedTime(time)
    }

    return (
        <div className='hospital-card mt-3'>
            <div className='d-flex flex-column flex-md-row justify-content-between'>
                <img className='d-none d-md-block' width={150} height={150} src={HospitalImage} alt="hospital" />
                <div className='hospital-info mt-0 mt-md-5'>
                    <h3>{hospital['Hospital Name']}</h3>
                    <h4>{hospital.Address}, {hospital.City}</h4>
                    <p className='types'>Smilessence Center for Advanced Dentistry + 1</p>
                    <p className='fee'><span>FREE</span> Consultation fee at clinic</p>
                </div>
                <div className='d-flex flex-column justify-content-end'>
                    <h3 className='avalable-text'>Available Today</h3>
                    <button onClick={() => setIsOpenBooking(!isOpenBooking)} className='btn btn-primary text-nowrap'>Book FREE Center Visit</button>
                </div>
            </div>

            {isOpenBooking && (
                <>
                    <div className="week-nav">
                        <button className="swiper-btn-prev">
                            <img src={Back} alt="back" />
                        </button>

                        <Swiper
                            modules={[Navigation]}
                            slidesPerView={3}
                            spaceBetween={10}
                            centeredSlides
                            navigation={{
                                prevEl: ".swiper-btn-prev",
                                nextEl: ".swiper-btn-next",
                            }}
                            className="week-swiper mt-3"
                        >
                            {weekDates.map((day, index) => (
                                <SwiperSlide key={index}>
                                    <div
                                        className={`week-slide ${selectedDay === index ? "active" : ""}`}
                                        onClick={() => setSelectedDay(index)}
                                    >
                                        <p className="week-day">{day.label}</p>
                                        <p className="week-date">{day.date}</p>
                                        <p className="week-slots">{day.slots} Slots Available</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <button className="swiper-btn-next">
                            <img src={Next} alt="next" />
                        </button>
                    </div>

                    <div className="slots-wrapper">
                        {Object.entries(bookingTimes).map(([period, times]) => (
                            <div key={period} className="slot-row">
                                <p className="slot-label">{period}</p>

                                <div className="slot-times">
                                    {times.map((time) => (
                                        <button
                                            key={time}
                                            className={`time-btn ${selectedTime === time ? "active" : ""}`}
                                            onClick={() => handleBooking(period, time)}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default HospitalCard