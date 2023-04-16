import React from 'react'
import {NavLink} from 'react-router-dom'

const SignedOutLinks = ({closeSideNav}) => {

    return (
        <ul className='nav-item-container'>
            <li className='nav-item'>
                <NavLink className='nav-item' onClick={() => {closeSideNav()}} to="/play">
                <span>Play</span>
                </NavLink>
            </li>

            <li className='nav-item'>
                <NavLink className='nav-item' onClick={() => {closeSideNav()}} to="/signup">
                    <span>Sign Up</span>
                </NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className='nav-item' onClick={() => {closeSideNav()}} to="/signin">
                <span>Sign In</span>
                </NavLink>
            </li>

        </ul>
    )
}

export default SignedOutLinks