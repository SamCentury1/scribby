import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import "./EffectsLayer.css"



const EffectsLayer = ({foundWords}) => {

    const [words,setWords] = useState([])
    
    useEffect(() => {
        const getWords = () => {
            if (foundWords.length > 0) {
                setWords(foundWords)
            } else {
                setWords([])
            }
        }
        return () => {getWords()}
    },[foundWords])

    return (
        <div className='effects-layer'>
            
                <motion.div
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ 
                        // opacity: [0,1,1,1,0], 
                        y: [100,0,0,0,-100] }}
                    transition={{
                        staggerChildren: 1,
                        delayChildren: 3,
                        duration:3
                    }}                
                >
                    {
                        words.map((obj,key) => {
                            return (
                                <AnimatePresence key={`${Date.now()}_${key}`}>
                                    <motion.div
                                        key={`${Date.now()}_${key}`}
                                        initial={{ opacity: 0, y: -100 }}
                                        animate={{ 
                                            opacity: [0,1,1,1,0], 
                                            // y: [100,0,0,0,-100] 
                                        }}
                                        // transition={{
                                        //     staggerChildren: 1,
                                        //     delayChildren: 3,
                                        //     duration:1
                                        // }}
                                        
                                    >
                                        {obj.string} 
                                    </motion.div>
                                </AnimatePresence>
                            )
                        })
                    }
                </motion.div>
        </div>
    )
}

export default EffectsLayer
