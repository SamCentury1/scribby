
import React, {useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { UserAuth } from '../../../context/AuthContext'

import "./SignInPage.css"

const SignInPage = () => {

    const {signIn} = UserAuth()

    const [signInEmail,setSignInEmail] = useState("")
    const [signInPassword,setSignInPassword] = useState("")
    //const [error,setError] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {

        console.log(signIn)
        e.preventDefault()

        try {
            
            await signIn(signInEmail,signInPassword).then(async (auth) => {
                console.log(auth.user.uid)
                await navigate('/home/'+auth.user.uid)
            })
        } catch (e) {
            //console.log(error)
            console.log(e.message)
        }
    }

    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <form className="sign-in-form-container glass" onSubmit={handleSubmit} >
                <div className='sign-in-form-header'>Sign In</div>
                <div className='sign-in-form-body'>
                    <div className='form-body-item'>
                        <label htmlFor="email" className='form-body-label'>Email</label>
                        <input className='form-body-input' type="email" id="email" onChange={(event) => {setSignInEmail(event.target.value)}} />
                    </div>
                    <div className='form-body-item'>
                        <label htmlFor="password" className='form-body-label'>Password</label>
                        <input className='form-body-input' type="password" id="password" onChange={(event) => {setSignInPassword(event.target.value)}} />
                    </div>
                    <div className='form-body-item'>
                        <button className='form-body-button' >Login</button>    
                    </div> 
                    <div className='form-redirect'>
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



