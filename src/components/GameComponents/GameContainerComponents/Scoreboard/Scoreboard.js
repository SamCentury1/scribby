import React from 'react'
import "./Scoreboard.css"
import * as  TbIcons  from "react-icons/tb";
import { motion } from 'framer-motion';

const Scoreboard = ({scoreLog,state,timer}) => {



    const textVariants = {
        active : {
            y:0,
            opacity:1,
            transition: {
                delay: state.foundWords.length * 0.7
            }
        },
        inactive: {

        }        
    }

    const plusVariant = {
        active: {
            opacity:[0,1,1,1,0],
            color:["rgba(0,0,0,1)","rgba(255,255,255,1)","rgba(255,255,255,1)","rgba(255,255,255,1)","rgba(255,255,255,1)"],
            transition:{
                duration:(state.foundWords.length*0.7)-0.1
            }
        },
        inactive: {

        }
    }

    return (
        <div className='scoreboard-layer'>
            <div className='clock-container'>
                <div className='clock-icon-container'>
                    <TbIcons.TbChessKnightFilled/>
                </div>
                <div className='clock-display'>{state.turn}</div>
            </div>

            <div className='points-container'>
                {
                    state.foundWords.length > 0 ? (
                        <div className='points-display'>
                                <motion.div 
                                    key={`plus-${state.turn}`}
                                    className='points-display-text'
                                    style={{position:"absolute"}}
                                    variants={plusVariant}
                                    initial={{opacity:0}}
                                    animate={"active"}
                                >
                                    +{state.newPoints-state.prevPoints}
                                </motion.div>
                
                            <motion.div 
                                key={`text-${state.turn}`}
                                className='points-display-text'
                                variants={textVariants}
                                initial={state.foundWords.length > 0 ? {y:100, opacity:0} : {y:0,opacity:1}}
                                animate={state.foundWords.length > 0 ? "active" : "inactive"}                        
                            >
                                {state.newPoints}
                            </motion.div>
                        </div>
                    ) : (
                        <div className='points-display'>
                            <div className='points-display-text'>{state.newPoints}</div>
                        </div>
                    )
                }


            </div>
        </div>
    )
}

export default Scoreboard
