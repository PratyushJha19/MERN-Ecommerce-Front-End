import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
      <h4 className='text-center'>
        All Rights Reserved &copy; Nainika Couture
      </h4>

      <p className="text-center mt-3">
        <Link to="/about">About</Link>
        |
        <Link to="/policy">Privacy Policy</Link>
        |
        <Link to="/contact">Contact</Link>
      </p>
    </div>
  )
}

export default Footer