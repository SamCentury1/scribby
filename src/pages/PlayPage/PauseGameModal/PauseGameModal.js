import React from 'react'
import {motion} from 'framer-motion'
// import * as FaIcons  from 'react-icons/fa'
import Overlay from '../../../components/Overlay/Overlay'

const PauseGameModal = ({handleClose,innerModal}) => {

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
        <Overlay onClick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="modal-container"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <div className='modal-header-container'>
                    <div className='modal-header-elem'>Paused</div>
                </div>
                <div className='modal-body-container'>

                    <div className='modal-option-element-1' onClick={innerModal}>
                        <div className='modal-option-element-text'>Restart</div>
                    </div>
                    
                    <div className='modal-option-element-1' onClick={handleClose}>
                        <div className='modal-option-element-text'>Resume</div>
                    </div>

                </div>
            </motion.div>            
        </Overlay>
    )
}

export default PauseGameModal
