import React from 'react'
import Logo from '../../assets/Logo.svg'
import { Link } from 'react-router'

const NavBar = () => {
  return (
    <header>
        <div className='banner'>
            <p> The health and well-being of our patients and their health care team will always be our priority, so we follow the best practices for cleanliness.</p>
        </div>

        <div  style={{backgroundColor: "#E7F0FF", padding: "0.5rem"}}>
           <nav class=" container navbar navbar-expand-lg">
            <div class="container-fluid ">
              <a class="navbar-brand d-flex align-items-center" href="#"><img src={Logo} alt="Logo" /></a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav ms-auto align-content-center d-flex align-items-center ">
                  <Link className="nav-link">Find Doctors</Link>
                  <Link className="nav-link">Hospitals</Link>
                  <Link className="nav-link">Medicines</Link>
                  <Link className="nav-link">Surgeries</Link>
                  <Link className="nav-link">Software for Provider</Link>
                  <Link className="nav-link">Facilities</Link>
                  <Link to="/my-bookings" className="nav-link">
                    <button className='btn btn-primary'>My Bookings</button>
                  </Link>
                </div>
              </div>
            </div>
        </nav>
        </div>
        
    </header>
  )
}

export default NavBar