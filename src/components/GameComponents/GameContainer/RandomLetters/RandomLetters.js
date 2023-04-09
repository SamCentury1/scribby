import React, { useEffect, useState } from 'react'
import "./RandomLetters.css"
import {motion} from 'framer-motion'

const RandomLetters = ({randomLetters,clickedElem,clickedElemX, clickedElemY}) => {

    // console.log(clickedElemX, clickedElemY)

    const [letters,setLetters] = useState([])
    useEffect(() => {
        setLetters(randomLetters)
    },[randomLetters])

    const primary_variants = {
        initial: {
            left: '50%',
            x:  '150%',
            y:  0,
            rotateY:'360deg', 
            height:'35%',
            fontSize: '2rem',
            transition: {
                duration:0.5
            }
        },
        positioned: {
            left: '50%',
            x:  '-50%',
            y:  '-50%',
            height:'60%',
            rotateY:'0deg',
            fontSize: '4rem',
            transition: {
                duration:0.5
            }
        },
    }

    const secondary_variants = {
        initial: {
            left: '50%',
            x:  '150%',
            y:  -150,
            opacity:0,
            transition: {
                duration:0.5
            }
        },
        positioned: {
            left: '50%',
            x:  '150%',
            y:  0,
            opacity:1,
            transition: {
                duration:0.5
            }
        } 
    }

    const tertiary_variants = {
        initial: {
            left: '50%',
            x:  '-50%',
            y:  '-50%',
            height:'60%',
            rotateY:'0deg',
            fontSize: '4rem',
            transition: {
                duration:0.5
            }
        },
        positioned: {
            left:'50%',
            top:'100%',
            x: clickedElem?.target.getBoundingClientRect().x - (window.innerWidth/2) + 4,
            y: clickedElem?.target.getBoundingClientRect().y - (window.innerHeight/2) +22.5,
            width: clickedElem?.target.getBoundingClientRect().width,
            height: clickedElem?.target.getBoundingClientRect().height,
            backgroundColor:"#FFE6B1",
            fontSize: '2rem',
            opacity:[1,0]

        },
    }

    return (
        <div className='random-letters-layer'>
            {/* <div className='countdown-item-container'></div> */}
            {/* <AnimatePresence> */}

                <motion.div 
                    key={`${Date.now()}_${letters.length-2}`}
                    className='first-letter-container'
                    initial={"initial"}
                    variants={primary_variants}
                    animate={"positioned"}                
                >
                    {letters[letters.length-2]}
                </motion.div>
            {/* </AnimatePresence> */}

            {/* <AnimatePresence> */}

                    <motion.div 
                        mode="wait" 
                        // initial={false}
                        key={`${Date.now()}_${letters.length-3}`}
                        className='first-letter-container illusion' 
                        initial={"initial"}
                        variants={tertiary_variants}
                        animate={"positioned"}
                        // style={{position:'absolute'}}            
                    >
                        {letters[letters.length-3]}
                    </motion.div>

            {/* </AnimatePresence> */}

            {/* <AnimatePresence> */}

                <motion.div 
                    key={`${Date.now()}_${letters.length-1}`}
                    initial={"initial"}
                    variants={secondary_variants}
                    animate={"positioned"}
                    className='second-letter-container'>
                    {letters[letters.length-1]}
                </motion.div>
            {/* </AnimatePresence> */}
        </div>
    )
}

export default RandomLetters
