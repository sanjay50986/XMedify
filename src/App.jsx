import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home'
import Search from './pages/Search'
import MyBookings from './MyBookings'


const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/search",
        element: <Search />
      }, 
      {
        path: "/my-bookings",
        element: <MyBookings />
      }
    ]
  },
])

const App = () => {
  return (
      <RouterProvider router={router} />
  )
}

export default App