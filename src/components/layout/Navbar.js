import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import {UserAuth} from '../../context/AuthContext'
import * as FaIcons  from 'react-icons/fa'
import './Navbar.css'


const Navbar = () => {

    const {user} = UserAuth()

    const [sidebar,setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)

    function renderLinks() {
        if (user) {
            return (<SignedInLinks  closeSideNav={showSidebar}/>)
        } else {
            return (<SignedOutLinks closeSideNav={showSidebar} />)
        }
    }

    return (
        <div className='nav-container'>
            <div className='navbar'>
                <Link to="#" className='menu-controls-bars'>
                    <FaIcons.FaBars className='menu-controls' onClick={showSidebar}/>
                </Link>
            </div>
            <nav className = {sidebar ?  "nav-wrapper darken-3 nav-menu z-depth-2 nav-active" : "nav-wrapper darken-3 nav-menu"}>
                <ul className="nav-menu-close" onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-controls-close">
                            <FaIcons.FaTimes />
                        </Link>
                    </li>
                </ul>
                <>{renderLinks()}</>

            </nav>
        </div>
    )
}

export default Navbar