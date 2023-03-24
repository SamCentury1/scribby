import React from 'react'
import { NavLink } from 'react-router-dom'

import "./HomePage.css"

const HomePage = () => {
    return (
            <div className='main-center-container homepage-container' >
                <div className='page-header-container'>
                    <div className='page-header-text'>Home</div>
                </div>
                <div className='page-body-container'>
                    <div className='homepage-body-element'><NavLink className='homepage-body-item' to="/play">Play</NavLink></div>
                    <div className='homepage-body-element'><NavLink className='homepage-body-item' to="/logout">My Stats</NavLink></div>
                    <div className='homepage-body-element'><NavLink className='homepage-body-item' to="/logout">Leaders</NavLink></div>
                    <div className='homepage-body-element'><NavLink className='homepage-body-item' to="/logout">Settings</NavLink></div>
                </div>
            </div>
    )
}

export default HomePage
