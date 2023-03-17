import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import {setDoc,doc} from 'firebase/firestore'
import { auth,db } from '../../../firebase-config'
// import addImage from "../../images/addImage.png"

import "./SignUpPage.css"

const SignUpPage = () => {

    // const [registerEmail,setRegisterEmail] = useState("")
    // const [registerPassword,setRegisterPassword] = useState("")
    // const [firstName,setFirstName] = useState("")
    // const [lastName,setLastName] = useState("")

    const navigate = useNavigate()




    const register = async (e) => {
        e.preventDefault()
        const firstName = e.target[0].value;
        const lastName = e.target[1].value;
        const email = e.target[2].value;
        const password = e.target[3].value;


        const res = await createUserWithEmailAndPassword(auth,email,password)

        try {
            await updateProfile(res.user, {
                displayName: firstName+" "+lastName,
                photoURL: null,
            }) 
            await setDoc(doc(db, "users",res.user.uid), {
                uid:res.user.uid,
                firstName,
                lastName,
                email,
                photoURL: null
            })
            .then(navigate('/home/'+res.user.uid))
        } catch (error) {
            console.log(error.message)
        }
    


    }

    return (
        <div className='sign-up-container'>
            <form className="sign-up-form-container glass" onSubmit={register}>
                <div className='sign-up-form-header'>Sign Up</div>

                <div className='sign-up-form-body'>
                    <div className='form-body-item'>
                        <label className='form-body-label' htmlFor="firstName">First Name</label>
                        <input className='form-body-input' type="text" id="firstName"  />
                    </div>

                    <div className='form-body-item'>
                        <label className='form-body-label' htmlFor="lastName">Last Name</label>
                        <input className='form-body-input' type="text" id="lastName" />
                    </div>      

                    <div className='form-body-item'>
                        <label className='form-body-label' htmlFor="email">Email</label>
                        <input className='form-body-input' type="email" id="email"  />
                    </div>

                    <div className='form-body-item'>
                        <label className='form-body-label' htmlFor="password">Password</label>
                        <input className='form-body-input' type="password" id="password"  />
                    </div>


                    <div className='form-body-item'>
                        <button  className='form-body-button' type="submit">Sign Up</button>    
                    </div> 
                    <div className='form-redirect'>
                        <Link to={'/signin'} className='form-redirect-text' >have an account?  
                            <span className='underline'> login</span>
                        </Link>    
                    </div>         
                </div>
            </form>
        </div>
    )
}


export default SignUpPage
