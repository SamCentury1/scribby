import React from 'react'
import "./Scoreboard.css"
import * as  FaIcons  from "react-icons/fa";

const Scoreboard = ({scoreLog,timer}) => {

    const points = scoreLog.reduce(function (acc, obj) { return acc + obj.points; }, 0);

    const timeDisplay = (time) => {
        let seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
        return `${minutes} : ${seconds}`
    }

    return (
        <div className='scoreboard-layer'>
            <div className='clock-container'>
                <div className='clock-icon-container'>
                    <FaIcons.FaClock/>
                </div>
                <div className='clock-display'>{timeDisplay(timer)}</div>
            </div>
            <div className='points-container'>
                <div className='points-display'>
                    <div className='points-display-text'>{points}</div>
                </div>
            </div>
        </div>
    )
}

export default Scoreboard
