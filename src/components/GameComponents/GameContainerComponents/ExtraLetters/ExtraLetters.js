import React from 'react'
import "./ExtraLetters.css"
import { motion } from 'framer-motion'

const ExtraLetters = ({handleExtraLetterSelect,getTileLocation, state}) => {



    return (
        <div className='extra-letters-layer'>
            <div className='extra-letters-container'>

                {
                    state.extraLetters.map((obj,key) => {
                        return (
                            <motion.div
                            key={key}
                            className='extra-tile-container extra-tile-inactive' 
                            onClick={(e) => {handleExtraLetterSelect(obj);  getTileLocation(e)}}
                            whileTap={{scale:0.9}}
                            style={obj.active === true ? (obj.selected === true ? {opacity:1} : {opacity:0.7})   : {opacity:0.7,backgroundColor:'rgba(255,255,255,0.4)'}}
                        >
                            <div 
                                className='extra-tile-text' >{obj.letter}</div>
                        </motion.div>
                        )
                    })
                }

                

            </div>
        </div>
    )
}

export default ExtraLetters