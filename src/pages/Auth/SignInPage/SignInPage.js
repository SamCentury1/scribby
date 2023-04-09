
import React, {useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { UserAuth } from '../../../context/AuthContext'

import "./SignInPage.css"
import "../Auth.css"

const SignInPage = () => {

    const {signIn} = UserAuth()

    const [signInEmail,setSignInEmail] = useState("")
    const [signInPassword,setSignInPassword] = useState("")
    const [errors,setErrors] = useState([])

    const navigate = useNavigate()

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {
            
            await signIn(signInEmail,signInPassword).then(async (auth) => {
                // console.log(auth.user.uid)
                await navigate('/home/'+auth.user.uid)
            })
        } catch (e) {

            if (e.code === "auth/user-not-found") {
                setErrors(["user not found"])
            } 
            
            if (e.code === "auth/wrong-password") {
                setErrors(["wrong email or password"])
            }

            if (e.code === "auth/invalid-email") {
                setErrors(["please enter a valid email"])
            }

        }
    }

    const handleInputChange = (event) => {
        if (event.target.id === "email") {
            setSignInEmail(event.target.value)
        } else if (event.target.id === "password") {
            setSignInPassword(event.target.value)
        } else {
            return
        }
        setErrors([])
    }
    return (
        <div className="main-center-container">
            <div className='form-error-container'>
                {
                    errors.map((err,idx) => {
                        return (
                            <div key={idx} className="form-error-message">{err}</div>
                        )
                    })
                }
            </div>
            <form className="form-container glass" onSubmit={handleSubmit} >
                <div className='form-header'>
                    <div className='form-header-text'>Sign In</div>
                </div>
                <div className='form-body'>
                    <div className='form-body-input-container'>
                        <div className='form-body-item'>
                            <label htmlFor="email" className='form-body-label'>Email</label>
                            <input className='form-body-input' type="email" id="email" onChange={(event) => {handleInputChange(event)}} />
                        </div>
                        <div className='form-body-item'>
                            <label htmlFor="password" className='form-body-label'>Password</label>
                            <input className='form-body-input' type="password" id="password" onChange={(event) => {handleInputChange(event)}} />
                        </div>
                    </div>
                    <div className='form-body-controls'>
                        <button className='form-controls-button' >Login</button>    
                    </div> 
                    <div className='form-body-redirect'>
                        <Link to={'/signup'} className='form-redirect-text' >not a member?  
                            <span className='underline'> register</span>
                        </Link>    
                    </div>       
                </div>
            </form>
        </div>
    )
}

export default SignInPage



