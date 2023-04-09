import React from 'react'
import { motion, AnimatePresence } from "framer-motion"
import "./EffectsLayer.css"




const EffectsLayer = ({foundWords,turn}) => {



    return (
        <div className='effects-layer'>
                <motion.div
                    key={turn}
                    style={{position:"relative"}}
                >      
                    {
                        foundWords.map((obj,key) => {
                            return (
                                <AnimatePresence key={key}>
                                    <motion.div
                                        className='found-word'
                                        key={key}
                                        initial={{ opacity: 0, y:-200}}
                                        animate={{ 
                                            opacity: [0,0.5,1,0.5,0], 
                                            y:[200,0,0,0,-200],
                                            scale:[1,   1.1,    1.2,    1.1,    1],
                                            color:['#F6EB3D','#F65E3D','#F6EB3D','#F65E3D','#000000'],
                                            textShadow:["2px 2px 10px rgba(255,255,255,0.534)"]
                                            
                                        }}
                                        transition={{duration:1.3, delay: key * 1.3}}

                                        style={{position:"absolute", top:"50%", y:"-50%", left:"50%", x:"-50%", zIndex:"2"}}
                                        
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
