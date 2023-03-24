import React from 'react'
import {NavLink} from 'react-router-dom'

import { UserAuth } from '../../context/AuthContext'


const SignedInLinks = ({closeSideNav}) => {

    const {user} = UserAuth()
 
    return (
            <ul className='nav-item-container' >
                <li className='nav-item'><NavLink className='nav-item' onClick={() => {closeSideNav()}} to={`/home/${user.uid}`}>Home</NavLink></li>
                <li className='nav-item'><NavLink className='nav-item' onClick={() => {closeSideNav()}} to={`/games/${user.uid}`}>My Games</NavLink></li>
                <li className='nav-item'><NavLink className='nav-item' onClick={() => {closeSideNav()}} to={`/${user.uid}/party/`}>My Parties</NavLink></li>
                <li className='nav-item'><NavLink className='nav-item' onClick={() => {closeSideNav()}} to="/profile/" >Profile</NavLink></li>
                <li className='nav-item'><NavLink className='nav-item' onClick={() => {closeSideNav()}} to="/logout">Logout</NavLink></li>
            </ul>
    )
}

export default SignedInLinks