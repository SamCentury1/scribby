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

    useEffect(() => {
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


        } 
        return () => {getData()}
    },[])


    return (
        <div>
            <div>Good game {userDoc ? userDoc.firstName : ''}!</div>

            <div>final score</div>
            <div>{gameData.finalScore}</div>

            <div>total words</div>
            <div>{gameData.words.length}</div>

            <div>turns</div>
            <div>{gameData.turns}</div>   

            <div>duration</div>
            <div>{gameData.gameDuration}</div>                                    
        </div>
    )
}

export default GameOverPage
