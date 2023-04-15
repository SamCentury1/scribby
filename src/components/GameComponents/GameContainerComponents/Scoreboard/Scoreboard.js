import React from 'react'
import "./Scoreboard.css"
import * as  TbIcons  from "react-icons/tb";
import {motion } from 'framer-motion';

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

    return (
        <div className='scoreboard-layer'>
            <div className='clock-container'>
                <div className='clock-icon-container'>
                    <TbIcons.TbChessKnightFilled/>
                </div>
                <div className='clock-display'>{state.turn}</div>
            </div>

            <div className='points-container'>

                <div className='points-display'>
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
            </div>
        </div>
    )
}

export default Scoreboard
