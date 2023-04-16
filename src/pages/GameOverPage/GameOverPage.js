import React, { useEffect, useState } from 'react'
import "./GameOverPage.css"

// import { addDoc, collection, doc, Timestamp } from 'firebase/firestore'
//import { UserAuth } from '../../context/AuthContext'
// import { db } from '../../firebase-config'
import {motion} from 'framer-motion'

import * as FaIcons from 'react-icons/fa'
import * as  TbIcons  from "react-icons/tb";
// import { useLocation } from 'react-router-dom'



const GameOverPage = () => {


    const getDuration = (duration) => {
        const seconds = Math.floor(duration / 1000)
        const minutes = Math.floor(seconds/60) < 10 ? `0${Math.floor(seconds/60)}` : `${Math.floor(seconds/60)}`
        const secondsLeft = seconds % 60 < 10 ? `0${seconds % 60}` : `${seconds % 60}`
        return minutes + ":" + secondsLeft
    }

    const [isLoading, setIsLoading] = useState(true);
    const [gameData, setGameData] = useState(null)

    useEffect(() => {
        async function getData() {
            const data = await localStorage.getItem('data')
            const parsedData = JSON.parse(data)
            setGameData(parsedData)
            setIsLoading(false);
        }
        getData()
    },[])

    console.log(gameData)





    return (
        <div className='main-center-container'>
            {
                isLoading ? (

                <div className='game-over-main-container'>
                    <motion.div 
                        className='game-over-header-container'
                        initial={{y:-500}}
                        animate={{y:0}}
                    >
                        <div className='game-over-header-text'>Good Game!</div>
                    </motion.div>

                    <motion.div 
                        className='game-over-score-container'
                        initial={{scale:0}}
                        animate={{scale:1}}
                        transition={{delay:0.3}}
                    >
                        <div className='game-over-score-content'>
                            <div className='game-over-score-star-icon'>
                                <FaIcons.FaStar className='game-over-star-icon star-icon-left'/>
                            </div>

                            <div className='game-over-score-text-container'>
                                <div className='game-over-score-points'>{gameData.finalScore}</div>
                                <div className='game-over-score-text'>points</div>
                            </div>

                            <div className='game-over-score-star-icon'>
                                <FaIcons.FaStar className='game-over-star-icon star-icon-right'/>
                            </div>
                        </div>
                    </motion.div>

                    <div className='game-over-time-container'>
                        <motion.div 
                            className='game-over-time-turns'
                            initial={{x:-500}}
                            animate={{x:0}}
                            transition={{delay:0.6}}
                        >
                            <div>turns</div>
                            <div className='game-over-time-turns-data'>
                                <TbIcons.TbChessKnightFilled className='game-over-time-data-icon'/>
                                <div className='game-over-time-data-text'>{gameData.turns}</div>   
                            </div>
                        </motion.div>

                        <motion.div 
                            className='game-over-time-duration'
                            initial={{x:500}}
                            animate={{x:0}}
                            transition={{delay:0.9}}
                        >
                            <div>duration</div>
                            <div className='game-over-time-duration-data'>
                                <FaIcons.FaClock className='game-over-time-data-icon'/>
                                <div className='game-over-time-data-text'>{getDuration(gameData.gameDuration)}</div>                                    
                            </div>
                        </motion.div>
                    </div>

                    <motion.div 
                        className='game-over-words-container'
                        initial={{y:500}}
                        animate={{y:0}}
                        transition={{delay:1.2}}
                    >
                        <div className='game-over-words-card'>
                            <div className='game-over-words-data'>
                                <FaIcons.FaBook className='game-over-words-icon'/>
                                <div className='game-over-words-text'>
                                    <div className='game-over-words-text-text'>{gameData?.words.length} words</div>
                                    <FaIcons.FaArrowRight className='game-over-words-arrow-icon'/>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        className='game-over-controls-container'
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        transition={{delay:2}}
                    >

                        <div className='game-over-controls-btn'>
                            {/* {
                                // userVar ? "Back to Menu" : "Register to save score!" 
                            } */}
                        </div>
                    </motion.div>
                </div>
                ) : (
                    <div>loading ... </div>
                )
                
            }
        </div>
    )
    
}

export default GameOverPage
