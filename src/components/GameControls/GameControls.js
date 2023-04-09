import React from 'react'
import "./GameControls.css"
import * as GiIcons from 'react-icons/gi'


const GameControls = ({handlePauseClick}) => {
    return (
        <div className='game-controls-layer'>
            <div onClick={(e) => {handlePauseClick(e)}}>
                <GiIcons.GiPauseButton/>
            </div>
        </div>
    )
}

export default GameControls
