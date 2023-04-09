import React, { useEffect, useState } from 'react'
import "./GameOverPage.css"

// import { addDoc, collection, doc, Timestamp } from 'firebase/firestore'
import { UserAuth } from '../../context/AuthContext'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase-config'
// import { db } from '../../firebase-config'




const GameOverPage = () => {

    const {user} = UserAuth()

    const [gameData, setGameData] = useState([])
    const [userDoc,setUserDoc] = useState(null)
    const [isLoading, setIsLoading] = useState(true)



    useEffect(() => {
        setIsLoading(true)
        const getData = async () => {
            const data = localStorage.getItem('data')
            const parsedData = JSON.parse(data)
            await setGameData(parsedData)

            if (user) {
                const userDocRef = await getDoc(doc(db, "users", user.uid))
                if (userDocRef.exists()) {
                    await setUserDoc(userDocRef.data())
                }
            }


            await setIsLoading(false)
        } 
        return () => {getData()}
    },[user])

    const getDuration = (duration) => {
        const seconds = Math.floor(duration / 1000)
        const minutes = Math.floor(seconds/60) < 60 ? `0${Math.floor(seconds/60)}` : `${Math.floor(seconds/60)}`
        const secondsLeft = seconds % 60 < 10 ? `0${seconds % 60}` : `${seconds % 60}`
        return minutes + ":" + secondsLeft
    }


    console.log(user)

    if (isLoading) {
        return <div>loading...</div>
    }  
        return (
            <div>
                <div>Good game {userDoc ? userDoc.firstName : ''}!</div>
    
                <div>final score</div>
                <div>{gameData.finalScore}</div>
    
                <div>total words</div>
                <div>{gameData.words?.length}</div>
    
                <div>turns</div>
                <div>{gameData.turns}</div>   
    
                <div>duration</div>
                <div>{getDuration(gameData.gameDuration)}</div>                                    
            </div>
        )
    
}

export default GameOverPage
