import React from 'react'
import "./GameControls.css"
import * as GiIcons from 'react-icons/gi'

const GameControls = ({handlePauseClick, stopTimer, stopCountdown}) => {
    return (
        <div className='game-controls-layer'>
            <div onClick={() => {handlePauseClick() ; stopTimer(); stopCountdown()}}>
                <GiIcons.GiPauseButton/>
            </div>
        </div>
    )
}

export default GameControls
