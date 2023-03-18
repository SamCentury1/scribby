import React from 'react'
import { NavLink } from 'react-router-dom'

const HomePage = () => {
    return (
            <div>
                <div>Home</div>
                <div><NavLink className='nav-item' to="/logout">Logout</NavLink></div>
            </div>
    )
}

export default HomePage
