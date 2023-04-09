import React from 'react'
import {motion} from 'framer-motion'
// import * as FaIcons  from 'react-icons/fa'
import Overlay from '../../../components/Overlay/Overlay'

const StartGameModal = ({handleClose}) => {

    const dropIn = {
        hidden: {
            y:'-100vh',
            opacity:'0',
        },
        visible: {
            y:'0',
            opacity:'1',
            transition: {
                duration:'0.1',
                type:"spring",
                damping:'25',
                stiffness:'500'
            }
        },
        exit: {
            y:'100vh',
            opacity:'0',
        },
    }

    return (
        <Overlay >
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="modal-container"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <div className='modal-header-container'>
                    <div className='modal-header-elem'>New Game</div>
                </div>
                <div className='modal-body-container'>
                    <div className='modal-option-element-1'>
                        <div className='modal-option-element-text'>How to play</div>
                    </div>
                    <div className='modal-option-element-1' onClick={handleClose}>
                        <div className='modal-option-element-text'>Start</div>
                    </div>
                </div>
            </motion.div>            
        </Overlay>
    )
}

export default StartGameModal
