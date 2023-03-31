import React, { Component } from 'react'
import "./PlayPage.css"

import Scoreboard from '../../components/GameComponents/Scoreboard/Scoreboard'
import EffectsLayer from '../../components/GameComponents/EffectsLayer/EffectsLayer'
import RandomLetters from '../../components/GameComponents/RandomLetters/RandomLetters'
import GameBoard from '../../components/GameComponents/GameBoard/GameBoard'
import GameControls from '../../components/GameComponents/GameControls/GameControls'
import StartGameModal from './StartGameModal/StartGameModal'
import PauseGameModal from './PauseGameModal/PauseGameModal'

// import the dictionary
import dictionary from "../../data/dictionary.json"
import letterValues from "../../data/letterValues.json"

/**
 * This takes all the letters in the tilebag and picks a random one
//  */
function generateRandomLetter2(letterState) {

    const tileBag = [
        {"letter":"A", "value": 1, "type":  "vowel",        "reserve":  11},
        {"letter":"B", "value": 3, "type":  "consonant",    "reserve":  2},
        {"letter":"C", "value": 3, "type":  "consonant",    "reserve":  2},
        {"letter":"D", "value": 4, "type":  "consonant",    "reserve":  4},
        {"letter":"E", "value": 1, "type":  "vowel",        "reserve":  14},
        {"letter":"F", "value": 4, "type":  "consonant",    "reserve":  2},
        {"letter":"G", "value": 2, "type":  "consonant",    "reserve":  3},
        {"letter":"H", "value": 4, "type":  "consonant",    "reserve":  2},
        {"letter":"I", "value": 1, "type":  "vowel",        "reserve":  11},
        {"letter":"J", "value": 8, "type":  "consonant",    "reserve":  1},
        {"letter":"K", "value": 1, "type":  "consonant",    "reserve":  1},
        {"letter":"L", "value": 4, "type":  "consonant",    "reserve":  4},
        {"letter":"M", "value": 3, "type":  "consonant",    "reserve":  3},
        {"letter":"N", "value": 1, "type":  "consonant",    "reserve":  7},
        {"letter":"O", "value": 1, "type":  "vowel",        "reserve":  9},
        {"letter":"P", "value": 3, "type":  "consonant",    "reserve":  2},
        {"letter":"Q", "value": 10, "type": "consonant",    "reserve":  1},
        {"letter":"R", "value": 1, "type":  "consonant",    "reserve":  7},
        {"letter":"S", "value": 1, "type":  "consonant",    "reserve":  4},
        {"letter":"T", "value": 1, "type":  "consonant",    "reserve":  7},
        {"letter":"U", "value": 1, "type":  "vowel",        "reserve":  4},
        {"letter":"V", "value": 2, "type":  "consonant",    "reserve":  2},
        {"letter":"W", "value": 2, "type":  "consonant",    "reserve":  2},
        {"letter":"X", "value": 8, "type":  "consonant",    "reserve":  1},
        {"letter":"Y", "value": 4, "type":  "vowel",        "reserve":  2},
        {"letter":"Z", "value": 10, "type": "consonant",    "reserve": 1},
    ]

    let lettersOnBoard = []
    letterState.forEach(element => {
        if (element.letter !== "") {
            lettersOnBoard.push(element.letter)
        }
    })

    const getTileBagReserve = (elem,reserveLetters) => {
        let reserve = []
        for (let i=0; i< reserveLetters; i++) {
            reserve.push(elem.letter)                  
        }
        return {"letter":elem.letter, "value": elem.value, "type": elem.type,    "reserve": reserve}
    }

    const groupedLetters = lettersOnBoard.reduce((acc, currentValue) => {
        acc[currentValue] = acc[currentValue] || 0;
        acc[currentValue]++;
        return acc;
    }, {});


    let updatedTileBag = []
    tileBag.forEach((elem) => {
        const lettersOnBoard = groupedLetters[elem.letter]
        if (lettersOnBoard) {
        updatedTileBag.push(getTileBagReserve(elem,(elem.reserve-lettersOnBoard)))

        } else {
        updatedTileBag.push(getTileBagReserve(elem,elem.reserve))
        }
    })

    let allLetters = []
    updatedTileBag.forEach((letter) => {
        letter.reserve.forEach((item) => {
            allLetters.push(item)
        })
    })

    
    const randomIndex = Math.floor(Math.random() * (allLetters.length))
    const randomLetter = allLetters[randomIndex] 
    
    return randomLetter

}




/**
 * This function creates an array that has a string for every possible 
 * 3, 4, 5, and 6 letter strings in rows and columns
 */

const stringsArray = (letterState,dict) => {
    //let letterState = state.letterState
    const maxCols = Math.max(...letterState.map(o => o.col))
    const maxRows = Math.max(...letterState.map(o => o.row))

    let rowStringAddresses = []
    const getRowArray = (row,col,num) => {
        let arr = []
        if (col + num -1  <= maxCols) {
            for (let i=1; i<num+1; i++) {
                arr.push(`${row}_${col+i-1}`)
            }
        }
        if (arr.length > 0) {
            return arr
        } else {
            return null
        }
    }

    for (let i=1; i<maxRows+1; i++) {
        for (let j=1; j<maxCols; j++) {
            for (let k=3; k<maxCols+1; k++) {
                if (getRowArray(i,j,k)) {
                    const ids = getRowArray(i,j,k)
                    if (stringIds(ids,letterState,dict)) {
                        rowStringAddresses.push(stringIds(ids,letterState,dict))
                    }
                }
            }
        }
    }

    let colStringAddresses = [] 
    const getColArray = (row,col,num) => {
        let arr = []
        if (row + num -1  <= maxRows) {
            for (let i=1; i<num+1; i++) {
                arr.push(`${row+i-1}_${col}`)
            }
        }
        if (arr.length > 0) {
            return arr
        } else {
            return null
        }
    }

    for (let i=1; i<maxCols+1; i++) {
        for (let j=1; j<maxRows+1; j++) {
            for (let k=3; k<maxRows+1; k++) {
                if (getColArray(j,i,k)) {
                    const ids = getColArray(j,i,k)
                    if (stringIds(ids,letterState,dict)) {
                        colStringAddresses.push(stringIds(ids,letterState,dict))
                    }                                                     
                }
            }
        }
    }
    return rowStringAddresses.concat(colStringAddresses)
}

/**
 * This helper function is used in "stringsArray()" and it
 * makes a string out of Ids and returns objects 
 * ex: {"string": "CACA", "keys":["1_1","1_2","1_3","1_4"]}
 */

const stringIds = (ids,letterState,dict) => {
    let string = []
    let keys = [] 
    ids.forEach(id => {
        const letterObject = letterState.find((obj) => obj.key === id)
        if (letterObject.letter === "") {
            string.push("-")
        } else if (letterObject.letter !== "") {
            string.push(letterObject.letter)
            keys.push(letterObject)
        }
    })
    if (!string.includes("-")) {
        let letterString = string.join("")
        const validWord = dict.find(item => item === letterString)
        if (validWord) {
            return {"string":letterString,"keys":keys}
        } else {return null}
    }  else {return null}      
}

const tabulateWordPoints = (words) => {
    let totalPoints = 0
    words.forEach((word) => {
        // let wordValue = 0
        for (let i=0; i < word.string.length; i++) {
            const letterObject = letterValues.find((obj) => obj.letter === word.string[i])
            totalPoints = totalPoints + letterObject.value
        }
        
    })
    return totalPoints

}



class PlayPage extends Component {
    

    constructor (props) {
        super(props)

        this.state = {
            letterState: [
                {"key":"1_1",   "row":1,  "col":1,  "letter":""},
                {"key":"1_2",   "row":1,  "col":2,  "letter":""},
                {"key":"1_3",   "row":1,  "col":2,  "letter":""},
                {"key":"1_4",   "row":1,  "col":2,  "letter":""},
                {"key":"1_5",   "row":1,  "col":2,  "letter":""},
                {"key":"1_6",   "row":1,  "col":2,  "letter":""},
        
                {"key":"2_1",   "row":2,  "col":1,  "letter":""},
                {"key":"2_2",   "row":2,  "col":2,  "letter":""},
                {"key":"2_3",   "row":2,  "col":3,  "letter":""},
                {"key":"2_4",   "row":2,  "col":4,  "letter":""},
                {"key":"2_5",   "row":2,  "col":5,  "letter":""},
                {"key":"2_6",   "row":2,  "col":6,  "letter":""},
        
                {"key":"3_1",   "row":3,  "col":1,  "letter":""},
                {"key":"3_2",   "row":3,  "col":2,  "letter":""},
                {"key":"3_3",   "row":3,  "col":3,  "letter":""},
                {"key":"3_4",   "row":3,  "col":4,  "letter":""},
                {"key":"3_5",   "row":3,  "col":5,  "letter":""},
                {"key":"3_6",   "row":3,  "col":6,  "letter":""},
        
                {"key":"4_1",   "row":4,  "col":1,  "letter":""},
                {"key":"4_2",   "row":4,  "col":2,  "letter":""},
                {"key":"4_3",   "row":4,  "col":3,  "letter":""},
                {"key":"4_4",   "row":4,  "col":4,  "letter":""},
                {"key":"4_5",   "row":4,  "col":5,  "letter":""},
                {"key":"4_6",   "row":4,  "col":6,  "letter":""},
        
                {"key":"5_1",   "row":5,  "col":1,  "letter":""},
                {"key":"5_2",   "row":5,  "col":2,  "letter":""},
                {"key":"5_3",   "row":5,  "col":3,  "letter":""},
                {"key":"5_4",   "row":5,  "col":4,  "letter":""},
                {"key":"5_5",   "row":5,  "col":5,  "letter":""},
                {"key":"5_6",   "row":5,  "col":6,  "letter":""},    
                
                {"key":"6_1",   "row":6,  "col":1,  "letter":""},
                {"key":"6_2",   "row":6,  "col":2,  "letter":""},
                {"key":"6_3",   "row":6,  "col":3,  "letter":""},
                {"key":"6_4",   "row":6,  "col":4,  "letter":""},
                {"key":"6_5",   "row":6,  "col":5,  "letter":""},
                {"key":"6_6",   "row":6,  "col":6,  "letter":""},  
            ],

            turn:   0,
            log:    [],

            //clock
            timerOn: false,
            timerStart: 0,
            timerTime: 0, 

            //countdown
            countdownTimerOn: false,
            countdownStart: 60000,
            countdownTime:60000,

            randomLetters: [],
            dictionary: dictionary,
            foundWords:[],
            gameStarted:false,
            gamePaused:false,
            modalVisible:false
        }
    }



    // clock
    startTimer = () => {
        this.setState({
          timerOn: true,
          timerTime: this.state.timerTime,
          timerStart: Date.now() - this.state.timerTime
        });
        this.timer = setInterval(() => {
          this.setState({
            timerTime: Date.now() - this.state.timerStart
          });
        }, 10);
    };

    stopTimer = () => {
        this.setState({ timerOn: false });
        clearInterval(this.timer);
    };

    resetTimer = () => {
        this.setState({
        timerStart: 0,
        timerTime: 0
        });
    };

    //countdown
    startCountdown = () => {
        this.setState({
            countdownTimerOn: true,
            countdownTime: this.state.countdownTime,
            countdownStart: this.state.countdownTime,
        });
        this.countdown = setInterval(() => {
            const newTime = this.state.countdownTime - 5;
            if (newTime >= 0) {
                this.setState({
                    countdownTime:newTime
                });
            } else {
                clearInterval(this.countdown)
                this.setState({countdownTimerOn:false});
            }
        })
    }

    stopCountdown = () => {
        clearInterval(this.countdown);
        this.setState({
            countdownTimerOn:false
        })
    }

    resetCountdown = () => {
        if (this.state.countdownTimerOn === false) {
            this.setState({
                countdownTime:this.state.countdownStart
            })
        }
    }

    handleTilePress = (elem) => {
        this.setState((state) => {

            const clickedItemObject = this.state.letterState.find((obj) => obj.key === elem)

            if (clickedItemObject.letter === "") {

                const turn = state.turn + 1

                const newLetter = generateRandomLetter2(this.state.letterState)

                const randomLetters = [...state.randomLetters,newLetter]
             
                // update the board state to reflect the new letter on the board
                const newLetterState = state.letterState.map((tileObject) => {
                    if (tileObject.key === elem) {
                        return {"key":tileObject.key,   "row": tileObject.row,  "col": tileObject.col,  "letter": state.randomLetters[state.randomLetters.length-2]} 
                    } else {
                        return tileObject
                    }
                })

                const foundWords = stringsArray(newLetterState,this.state.dictionary)
                let foundWordIds = []
                foundWords.forEach((obj) => {
                    obj.keys.forEach((letterObj) => {
                        foundWordIds.push(letterObj)
                    })
                })
                
                const uniqueObjects = [...new Set(foundWordIds)]
                let uniqueIds = []
                uniqueObjects.forEach((uniqueId) => {
                    uniqueIds.push(uniqueId.key)

                })

                const turnData = {
                    "turn":     turn,
                    "letter":   randomLetters[turn-1],
                    "words":    foundWords,
                    "points":   tabulateWordPoints(foundWords)
                }


                const log = [...state.log, turnData]

                const letterState = newLetterState.map((tileObject) => {
                    if (uniqueIds.length > 0) {
                        if (uniqueIds.includes(tileObject.key)) {
                            return {"key":tileObject.key,   "row": tileObject.row,  "col": tileObject.col,  "letter": ""} 
                        } else {
                            return tileObject
                        }
                    }else {
                        return tileObject
                    }
                })

                const countdownTime = 60000
                return {randomLetters, letterState, foundWords, turn, log, countdownTime }
            }

        })
    }


    handleModalClose = async (elem) => {
        if (this.state.modalVisible) {
            this.startTimer()
            this.startCountdown()
            this.setState((state) => {
                let modalVisible
                    modalVisible = false
                    return {modalVisible}
            })
        } else {
            this.stopTimer()
            this.stopCountdown()
            this.setState((state) => {
                let modalVisible
                modalVisible = true
                return {modalVisible}
            })
        }
    }

    // generates the two first letters
    handleStartModal = async (elem) => {
        this.startTimer()
        this.startCountdown()
        this.setState((state) => {
            
            let gameStarted, gamePaused
            if (!this.state.gameStarted) {
                
                

                // const firstLetter = generateRandomLetter(this.state.letterState,this.state.tileBag)
                const firstLetter = generateRandomLetter2(this.state.letterState)
                // remove the letter from the tilebag

                // const secondLetter = generateRandomLetter(this.state.letterState,this.state.tileBag)
                const secondLetter = generateRandomLetter2(this.state.letterState)

                // adding the newly generated letter to the array of random letters
                const randomLetters = [...state.randomLetters,firstLetter,secondLetter]

                gameStarted = true
                gamePaused = false

                return {gameStarted, randomLetters,gamePaused}
            } 
        })
    }

    render() {

        return (
            <div className='main-center-container'>
                <div className='play-page-container'>
                    <Scoreboard scoreLog={this.state.log} timer={this.state.timerTime}/>
                    <EffectsLayer foundWords={this.state.foundWords}/>
                    <RandomLetters randomLetters={this.state.randomLetters} countdown={this.state.countdownTime}/>
                    <GameBoard 
                        handleTilePress={this.handleTilePress}
                        state={this.state}
                        />
                    <GameControls handlePauseClick={this.handleModalClose} stopTimer={this.stopTimer} stopCountdown={this.stopCountdown}/>
                </div>
                { this.state.modalVisible && <PauseGameModal 
                    showModal={this.state.modalVisible} 
                    handleClose={this.handleModalClose}
                /> }
                { !this.state.gameStarted && <StartGameModal 
                    showModal={this.state.gameStarted} 
                    handleClose={this.handleStartModal}
                    
                /> } 
              
            </div>
        )
    }
}

export default PlayPage

