import React from 'react'
import "./RandomLetters.css"

const RandomLetters = ({randomLetters, countdown}) => {

    const displayCountdown = (countdown) => {
        let seconds = ("0" + (Math.floor((countdown / 1000) % 60) % 60)).slice(-2);
        return seconds
    }

    return (
        <div className='random-letters-layer'>
            <div className='countdown-item-container'>{displayCountdown(countdown)}</div>
            <div className='first-letter-container'>{randomLetters[randomLetters.length-2]}</div>
            <div className='second-letter-container'>{randomLetters[randomLetters.length-1]}</div>
        </div>
    )
}

export default RandomLetters
