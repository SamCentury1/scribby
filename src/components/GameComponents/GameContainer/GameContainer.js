import React, { Component } from 'react'
import "./GameContainer.css"

import Scoreboard from '../GameContainerComponents/Scoreboard/Scoreboard'
import EffectsLayer from '../GameContainerComponents/EffectsLayer/EffectsLayer'
import RandomLetters from '../GameContainerComponents/RandomLetters/RandomLetters'
import GameBoard from '../GameContainerComponents/GameBoard/GameBoard'
import NewPointsEffect from '../GameContainerComponents/EffectsLayer/NewPointsEffect/NewPointsEffect'



export class GameContainer extends Component {

    constructor (props) {
        super(props)
        this.state = {}
    }




    render() {
        return (

            
            <div className='main-game-container'>
                {
                    this.props.state.foundWords.length > 0 ? 
                        <NewPointsEffect clickedElem={this.props.state.clickedElem} log={this.props.state.log}/>
                        :
                        false
                }


                <Scoreboard scoreLog={this.props.state.log} state={this.props.state} />
                <EffectsLayer foundWords={this.props.state.foundWords} turn={this.props.state.turn}/>
                <RandomLetters randomLetters={this.props.state.randomLetters} clickedElem={this.props.state.clickedElem} />
                <GameBoard 
                    handleTilePress={this.props.tilePress}
                    getTileLocation={this.props.getClickedElem}
                    state={this.props.state}
                    />
        </div>
        )
    }
}

export default GameContainer
