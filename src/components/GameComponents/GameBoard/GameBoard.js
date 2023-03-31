import React from 'react'
import "./GameBoard.css"


const GameBoard = ({handleTilePress,state}) => {


    return (

        <div className='game-board-layer'>
            <div className='board-container'>
                {
                    state.letterState.map((element) => {
                        return (
                            <div 
                                key={element.key} 
                                className='tile'
                                onClick={() => {handleTilePress(element.key)}}
                            >
                                    {element.letter}
                            </div>
                        )    
                    })
                }
            </div>
        </div>
    )
}

export default GameBoard
