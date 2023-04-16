import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Overlay from '../../../components/Overlay/Overlay'
import "../PlayPage.css"
import { UserAuth } from '../../../context/AuthContext'
import { addDoc, collection, doc, Timestamp } from 'firebase/firestore'
import { db } from '../../../firebase-config'

const GameOverTransition = ({state}) => {

    const {user} = UserAuth()
    const navigate = useNavigate()
    
    const [gameData,setGameData] = useState([])

    localStorage.clear()
    useEffect(() => {

        const finalScore = state.log.reduce(function (acc, obj) { return acc + obj.points; }, 0)

        const words = (arr) => {
            let allWords = []
            arr.forEach(element => {
                if (element.words.length > 0) {
                    element.words.forEach(word => {
                        if (!allWords.includes(word.string)) {
                            allWords.push(word.string)
                        }
                    })
                }    
            }); 
            return allWords
        };

        const gameDuration = state.gameOverTime - state.gameStartTime
        const saveScore = async () => {

                const data = {
                    user:           user ? doc(db,"users",user.uid) : null,
                    createdAt:      Timestamp.now(),
                    words:          words(state.log),
                    turns:          state.turn,
                    finalScore:     finalScore,
                    gameDuration:   gameDuration
                }
                // localStorage.setItem('data',JSON.stringify(data))
                setGameData(data)

                if (user?.uid) {
                    await addDoc(collection(db,"games"),data)
                }   

        }

        // const redirect = setTimeout(() => {
        //     navigate('/game-over')
        // },1500)    
        // clearTimeout(redirect);

        return () => {saveScore()}

        // return () => {saveScore(); navigate('/game-over')}


    },[user,navigate, state.gameOverTime, state.gameStartTime, state.log, state.turn])
    // },[user,navigate, state.gameOverTime, state.gameStartTime, state.log, state.turn])


    useEffect(() => {
        const redirect = setTimeout(() => {
                navigate(
                    '/game-over', 
                    {
                        state:gameData
                    }
                )
            },1500)            
        return () => clearTimeout(redirect);
    },[navigate,gameData])

    return (

        <Overlay>
            <div className='game-over-text'>Game Over</div>
        </Overlay>
    )
}

export default GameOverTransition
