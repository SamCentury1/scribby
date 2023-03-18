import React from 'react'
// import {NavLink} from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import SignInPage from '../pages/Auth/SignInPage/SignInPage';

const Logout = () => {
    const navigate = useNavigate()
    const {logout} = UserAuth()
    const handleLogout = async () => {
        try {
            await logout()
            navigate('/signin')
            console.log('you are logged out')
        } catch (e) {
            console.log(e.message)
        }
    }
    handleLogout()
    return (
        <SignInPage/>
    )
}

export default Logout