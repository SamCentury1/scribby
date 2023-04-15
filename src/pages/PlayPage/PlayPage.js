import React, { Component } from 'react'
import "./PlayPage.css"


import GameControls from '../../components/GameControls/GameControls'
import StartGameModal from './StartGameModal/StartGameModal'
import PauseGameModal from './PauseGameModal/PauseGameModal'
import InnerModalModal from './InnerModalModal/InnerModalModal'
import GameOverTransition from './GameOverTransition/GameOverTransition'
import GameContainer from '../../components/GameComponents/GameContainer/GameContainer'

// import the dictionary
import dictionary from "../../data/dictionary.json"
import letterValues from "../../data/letterValues.json"
import { AnimatePresence } from 'framer-motion'

/**
 * This takes all the letters in the tilebag and picks a random one
//  */
function generateRandomLetter2(letterState,randomLetters) {

    const tileBag = [
        {"letter":"A", "value": 1, "type":  "vowel",        "reserve":  11},
        {"letter":"B", "value": 3, "type":  "consonant",    "reserve":  2},
        {"letter":"C", "value": 3, "type":  "consonant",    "reserve":  2},
        {"letter":"D", "value": 4, "type":  "consonant",    "reserve":  4},
        {"letter":"E", "value": 1, "type":  "vowel",        "reserve":  14},
        {"letter":"F", "value": 4, "type":  "consonant",    "reserve":  2},
        {"letter":"G", "value": 2, "type":  "consonant",    "reserve":  3},
        {"letter":"H", "value": 4, "type":  "consonant",    "reserve":  2},
        {"letter":"I", "value": 1, "type":  "vowel",        "reserve":  7},
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

    // get all letters from the board into an array
    let lettersOnBoard = []
    letterState.forEach(element => {
        if (element.letter !== "") {
            lettersOnBoard.push(element.letter)
        }
    })


    // take the two last items in the randomLetters Array (the 2 upcoming random letters)
    let twoLastRandomLetters = randomLetters.slice(-2)

    
    // concat those two letters to the array of letters
    const allLettersAtPlay =  lettersOnBoard.concat(twoLastRandomLetters)

    // create an array of vowels and an array of consonants
    let vowelsOnBoard = []
    let consonantsOnBoard = []
    allLettersAtPlay.forEach((element) => {
        const elemLetterObject = tileBag.find((obj) => obj.letter === element)
        if (elemLetterObject.type === "vowel") {
            vowelsOnBoard.push(element)
        } else if (elemLetterObject.type === "consonant") {
            consonantsOnBoard.push(element)
        } else {
            console.log("something wrong")
        }
    })

    const vowelRate = vowelsOnBoard.length / allLettersAtPlay.length


    const getTileBagReserve = (elem,reserveLetters) => {
        let reserve = []
        for (let i=0; i< reserveLetters; i++) {
            reserve.push(elem.letter)                  
        }
        return {"letter":elem.letter, "value": elem.value, "type": elem.type,    "reserve": reserve}
    }
    
    const groupedLetters = allLettersAtPlay.reduce((acc, currentValue) => {
        acc[currentValue] = acc[currentValue] || 0;
        acc[currentValue]++;
        return acc;
    }, {});


    let updatedTileBag = []
    tileBag.forEach((elem) => {
        const letterObjectsOnBoard = groupedLetters[elem.letter]
        if (letterObjectsOnBoard) {
            updatedTileBag.push(getTileBagReserve(elem,(elem.reserve-letterObjectsOnBoard)))
        } else {
            updatedTileBag.push(getTileBagReserve(elem,elem.reserve))
        }
    })

    // find out what the last letter was, remove that one
    const lastLetter = twoLastRandomLetters[twoLastRandomLetters.length-1]

    // find out whether to return a consonant or a vowel
    const getLetterType = (vowelRate) => {
        if (vowelRate >= 0.45) {
            return 'consonant'
        } else {
            return 'vowel'
        }
    }

    let allLetters = []
    updatedTileBag.forEach((letter) => {
        if (letter.letter === lastLetter) {
            return false
        } else {
            if (letter.type === getLetterType(vowelRate)) {
                letter.reserve.forEach((item) => {
                    allLetters.push(item)
                })
            } else {
                return false
            }
        }
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
                        rowStringAddresses.push(stringIds(ids,letterState,dict,"row"))
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
                        colStringAddresses.push(stringIds(ids,letterState,dict,"col"))
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

const stringIds = (ids,letterState,dict,axis) => {
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
            return {"string":letterString,"keys":keys, "axis":axis}
        } else {return null}
    }  else {return null}      
}

const tabulateWordPoints = (words,streak) => {

    let totalPoints = 0
    words.forEach((word) => {
        for (let i=0; i < word.string.length; i++) {
            const letterObject = letterValues.find((obj) => obj.letter === word.string[i])
            totalPoints = totalPoints + letterObject.value
        }
    })
    const getUniqueAxes = (arr) => {
        return arr.reduce((uniqueAxes, obj) => {
            if (!uniqueAxes.includes(obj.axis)) {
                uniqueAxes.push(obj.axis);
            }
            return uniqueAxes;
        }, []);
    };
    const crosswordMultiplier = getUniqueAxes(words).length
    const multiWordMultiplier = words.length
    const streakMultiplier = streak

    
    return totalPoints * crosswordMultiplier * multiWordMultiplier * streakMultiplier

}



class PlayPage extends Component {
    

    constructor (props) {
        super(props)

        this.state = {
            
            prevLetterState:    [],
            letterState:    [
                {"key":"1_1",   "active":false, "selected":false, "row":1,  "col":1,  "letter":""},
                {"key":"1_2",   "active":false, "selected":false, "row":1,  "col":2,  "letter":""},
                {"key":"1_3",   "active":false, "selected":false, "row":1,  "col":3,  "letter":""},
                {"key":"1_4",   "active":false, "selected":false, "row":1,  "col":4,  "letter":""},
                {"key":"1_5",   "active":false, "selected":false, "row":1,  "col":5,  "letter":""},
                {"key":"1_6",   "active":false, "selected":false, "row":1,  "col":6,  "letter":""},
        
                {"key":"2_1",   "active":false, "selected":false, "row":2,  "col":1,  "letter":""},
                {"key":"2_2",   "active":false, "selected":false, "row":2,  "col":2,  "letter":""},
                {"key":"2_3",   "active":false, "selected":false, "row":2,  "col":3,  "letter":""},
                {"key":"2_4",   "active":false, "selected":false, "row":2,  "col":4,  "letter":""},
                {"key":"2_5",   "active":false, "selected":false, "row":2,  "col":5,  "letter":""},
                {"key":"2_6",   "active":false, "selected":false, "row":2,  "col":6,  "letter":""},
        
                {"key":"3_1",   "active":false, "selected":false, "row":3,  "col":1,  "letter":""},
                {"key":"3_2",   "active":false, "selected":false, "row":3,  "col":2,  "letter":""},
                {"key":"3_3",   "active":false, "selected":false, "row":3,  "col":3,  "letter":""},
                {"key":"3_4",   "active":false, "selected":false, "row":3,  "col":4,  "letter":""},
                {"key":"3_5",   "active":false, "selected":false, "row":3,  "col":5,  "letter":""},
                {"key":"3_6",   "active":false, "selected":false, "row":3,  "col":6,  "letter":""},
        
                {"key":"4_1",   "active":false, "selected":false, "row":4,  "col":1,  "letter":""},
                {"key":"4_2",   "active":false, "selected":false, "row":4,  "col":2,  "letter":""},
                {"key":"4_3",   "active":false, "selected":false, "row":4,  "col":3,  "letter":""},
                {"key":"4_4",   "active":false, "selected":false, "row":4,  "col":4,  "letter":""},
                {"key":"4_5",   "active":false, "selected":false, "row":4,  "col":5,  "letter":""},
                {"key":"4_6",   "active":false, "selected":false, "row":4,  "col":6,  "letter":""},
        
                {"key":"5_1",   "active":false, "selected":false, "row":5,  "col":1,  "letter":""},
                {"key":"5_2",   "active":false, "selected":false, "row":5,  "col":2,  "letter":""},
                {"key":"5_3",   "active":false, "selected":false, "row":5,  "col":3,  "letter":""},
                {"key":"5_4",   "active":false, "selected":false, "row":5,  "col":4,  "letter":""},
                {"key":"5_5",   "active":false, "selected":false, "row":5,  "col":5,  "letter":""},
                {"key":"5_6",   "active":false, "selected":false, "row":5,  "col":6,  "letter":""},    
                
                {"key":"6_1",   "active":false, "selected":false, "row":6,  "col":1,  "letter":""},
                {"key":"6_2",   "active":false, "selected":false, "row":6,  "col":2,  "letter":""},
                {"key":"6_3",   "active":false, "selected":false, "row":6,  "col":3,  "letter":""},
                {"key":"6_4",   "active":false, "selected":false, "row":6,  "col":4,  "letter":""},
                {"key":"6_5",   "active":false, "selected":false, "row":6,  "col":5,  "letter":""},
                {"key":"6_6",   "active":false, "selected":false, "row":6,  "col":6,  "letter":""},  
            ],
            streak:[],
            turn:   0,
            log:    [],
            prevPoints: 0,
            newPoints: 0,
            randomLetters: [],
            dictionary: dictionary,
            foundWords:[],
            extraLetters: [
                {"key":"EL-1",   "active":false,   "selected":false,    "letter":""},
                {"key":"EL-2",   "active":false,   "selected":false,    "letter":""},
                {"key":"EL-3",   "active":false,   "selected":false,    "letter":""},
                {"key":"EL-4",   "active":false,   "selected":false,    "letter":""},
                {"key":"EL-5",   "active":false,   "selected":false,    "letter":""},
            ],
            
            gameStarted:false,
            gameStartTime: null,

            gamePaused:false,

            gameOver:false,
            gameOverTime: null,

            modalVisible:false,
            gameRestarted: false,
            innerModalVisible: false,
            clickedElem:null,
        }
    }

    handleTilePress = (elem) => {
        this.setState((state) => {

            const clickedItemObject = this.state.letterState.find((obj) => obj.key === elem.key)

            if (clickedItemObject.letter === "") {

                let randomLetters, playedLetter, extraLetters

                // check if any of the extra letters are selected
                const selectedExtraLetter = this.state.extraLetters.find((obj) => obj.selected === true)

                if (selectedExtraLetter) {
                    randomLetters = state.randomLetters
                    playedLetter = selectedExtraLetter.letter
                    extraLetters = state.extraLetters.map((extraLetterObj) => {
                        if (extraLetterObj.key === selectedExtraLetter.key) {
                            return {"key": extraLetterObj.key,   "active":false,   "selected":false,    "letter": ""}
                        } else {
                            return {"key": extraLetterObj.key,   "active":extraLetterObj.active,   "selected":false,    "letter":extraLetterObj.letter}
                        }
                    })

                } else if (!selectedExtraLetter) {
                    extraLetters = state.extraLetters

                    const newLetter = generateRandomLetter2(this.state.letterState, state.randomLetters,this.state.turn)
    
                    randomLetters = [...state.randomLetters,newLetter]
                    playedLetter = state.randomLetters[state.randomLetters.length-2]


                }
                const newLetterState = state.letterState.map((tileObject) => {
                    if (tileObject.key === elem.key) {
                        return {"key":tileObject.key,"active":false, "selected":true,"row": tileObject.row,"col": tileObject.col,"letter": playedLetter} 
                    } else {
                        return {"key":tileObject.key,"active":false, "selected":false,"row": tileObject.row,"col": tileObject.col,"letter": tileObject.letter} 
                    }
                })    

             
                const turn = state.turn + 1

                const foundWords = stringsArray(newLetterState,this.state.dictionary)
                let foundWordIds = []
                foundWords.forEach((obj) => {
                    obj.keys.forEach((letterObj) => {
                        foundWordIds.push(letterObj)
                    })
                })



                const streak = foundWords.length > 0 ? state.streak + 1 : 0
                
                const uniqueObjects = [...new Set(foundWordIds)]
                let uniqueIds = []
                uniqueObjects.forEach((uniqueId) => {
                    uniqueIds.push(uniqueId.key)

                })

                const turnData = {
                    "turn":     turn,
                    "letter":   randomLetters[turn-1],
                    "words":    foundWords,
                    "points":   tabulateWordPoints(foundWords,streak)
                }
                const prevPoints = state.log.reduce(function (acc, obj) { return acc + obj.points; }, 0)
                const log = [...state.log, turnData]
                const newPoints = prevPoints + tabulateWordPoints(foundWords,streak)

                const prevLetterState = newLetterState.map((tileObject) => {
                    if (uniqueIds.length > 0) {
                        if (uniqueIds.includes(tileObject.key)) {
                            return {"key":tileObject.key, "active":true, "selected":tileObject.selected, "row": tileObject.row,  "col": tileObject.col,  "letter":tileObject.letter } 
                        } else {
                            return {"key":tileObject.key, "active":false, "selected":tileObject.selected, "row": tileObject.row,  "col": tileObject.col,  "letter": tileObject.letter} 
                        }
                    }else {
                        return {"key":tileObject.key, "active":false, "selected":tileObject.selected, "row": tileObject.row,  "col": tileObject.col,  "letter": tileObject.letter} 
                    }
                })

                const letterState = newLetterState.map((tileObject) => {
                    if (uniqueIds.length > 0) {
                        if (uniqueIds.includes(tileObject.key)) {
                            return {"key":tileObject.key, "active":false, "selected":tileObject.selected, "row": tileObject.row,  "col": tileObject.col,  "letter": ""} 
                        } else {
                            return {"key":tileObject.key, "active":false, "selected":tileObject.selected, "row": tileObject.row,  "col": tileObject.col,  "letter": tileObject.letter} 
                        }
                    }else {
                        return {"key":tileObject.key, "active":false, "selected":tileObject.selected, "row": tileObject.row,  "col": tileObject.col,  "letter": tileObject.letter} 
                    }
                })

                // check if game is over
                let gameOver = false
                let gameOverTime = null
                const emptySquares = letterState.filter((obj) => obj.letter === "")
                if (emptySquares.length === 0) {
                    gameOver = true
                    gameOverTime = Date.now()
                }

                return {randomLetters, letterState, prevLetterState, foundWords, turn, log, streak, prevPoints, newPoints, gameOver, gameOverTime, extraLetters }


            }

        })
    }

    handleExtraLetterSelect = (elem) => {
        this.setState((state) => {
            const clickedItemObject = this.state.extraLetters.find((obj) => obj.key === elem.key)

            if (clickedItemObject.letter === "") {

                const newLetter = generateRandomLetter2(this.state.letterState, state.randomLetters,this.state.turn)

                const randomLetters = [...state.randomLetters,newLetter]

                const extraLetters = state.extraLetters.map((selectedObj) => {
                    if (selectedObj.key === elem.key) {
                        return {"key":selectedObj.key,   "active":true,   "selected":false,    "letter":state.randomLetters[state.randomLetters.length-2]}
                    } else {
                        return {"key":selectedObj.key,   "active":selectedObj.active,   "selected":false,    "letter":selectedObj.letter}
                    }
                })

                return {randomLetters, extraLetters}

            } else if (clickedItemObject.letter !== "") {
                if (clickedItemObject.selected === true) {
                    const extraLetters = state.extraLetters.map((selectedObj) => {
                        if (selectedObj.key === elem.key) {
                            return {"key":selectedObj.key,   "active":selectedObj.active,   "selected":false,    "letter":selectedObj.letter}
                        } else {
                            return {"key":selectedObj.key,   "active":selectedObj.active,   "selected":selectedObj.selected,    "letter":selectedObj.letter}
                        }
                    })
                    return { extraLetters}
                } else if (clickedItemObject.selected === false) {
                    const extraLetters = state.extraLetters.map((selectedObj) => {
                        if (selectedObj.key === elem.key) {
                            return {"key":selectedObj.key,   "active":selectedObj.active,   "selected":true,    "letter":selectedObj.letter}
                        } else {
                            return {"key":selectedObj.key,   "active":selectedObj.active,   "selected":selectedObj.selected,    "letter":selectedObj.letter}
                        }
                    })
                    return { extraLetters}                    
                }
            }
            console.log(state)
        })
    }

    getClickedElem = (e) => {
        this.setState({
            clickedElem:e
        })
    }

    handleModalClose = async (elem) => {
        
        if (this.state.modalVisible) {
            this.setState({
                modalVisible:false,
                gamePaused:false
            })

        } else {
            this.setState({
                modalVisible:true,
                gamePaused:true
            })

        }
    }

    // generates the two first letters
    handleStartModal = async (elem) => {
        // this.startTimer()
        //this.startCountdown()
        this.setState((state) => {
            
            let gameStarted, gamePaused, gameStartTime
            if (!this.state.gameStarted) {
                
                // const firstLetter = generateRandomLetter(this.state.letterState,this.state.tileBag)
                const firstLetter = generateRandomLetter2(this.state.letterState, this.state.randomLetters)
                // remove the letter from the tilebag

                // const secondLetter = generateRandomLetter(this.state.letterState,this.state.tileBag)
                const secondLetter = generateRandomLetter2(this.state.letterState,this.state.randomLetters)

                // adding the newly generated letter to the array of random letters
                const randomLetters = [...state.randomLetters,firstLetter,secondLetter]

                gameStarted = true
                gamePaused = false
                gameStartTime = Date.now()


                return {gameStarted,gamePaused, randomLetters,gameStartTime}
            } 
        })
    }

    handleRestartClick = async () => {
        if (this.innerModalVisible === true) {
            this.setState({
                innerModalVisible: false,
                modalVisible: false,
            })
        } else {
            this.setState({
                modalVisible: false,
                innerModalVisible:  true
            })
        }
    }

    restartGame = () => {
        this.setState({
            gameRestarted:true,
            modalVisible:false,
            innerModalVisible:false,
            gameOver:false,
            gamePaused:false,
            gameStarted:false,
            gameStartTime:null,
            gameOverTime:null,
            extraLetters:[
                {"key":"EL-1",   "active":false,   "selected":false,    "letter":""},
                {"key":"EL-2",   "active":false,   "selected":false,    "letter":""},
                {"key":"EL-3",   "active":false,   "selected":false,    "letter":""},
                {"key":"EL-4",   "active":false,   "selected":false,    "letter":""},
                {"key":"EL-5",   "active":false,   "selected":false,    "letter":""},                
            ],
            prevLetterState:    [],
            letterState:    [
                {"key":"1_1",   "active":false, "selected":false, "row":1,  "col":1,  "letter":""},
                {"key":"1_2",   "active":false, "selected":false, "row":1,  "col":2,  "letter":""},
                {"key":"1_3",   "active":false, "selected":false, "row":1,  "col":3,  "letter":""},
                {"key":"1_4",   "active":false, "selected":false, "row":1,  "col":4,  "letter":""},
                {"key":"1_5",   "active":false, "selected":false, "row":1,  "col":5,  "letter":""},
                {"key":"1_6",   "active":false, "selected":false, "row":1,  "col":6,  "letter":""},
        
                {"key":"2_1",   "active":false, "selected":false, "row":2,  "col":1,  "letter":""},
                {"key":"2_2",   "active":false, "selected":false, "row":2,  "col":2,  "letter":""},
                {"key":"2_3",   "active":false, "selected":false, "row":2,  "col":3,  "letter":""},
                {"key":"2_4",   "active":false, "selected":false, "row":2,  "col":4,  "letter":""},
                {"key":"2_5",   "active":false, "selected":false, "row":2,  "col":5,  "letter":""},
                {"key":"2_6",   "active":false, "selected":false, "row":2,  "col":6,  "letter":""},
        
                {"key":"3_1",   "active":false, "selected":false, "row":3,  "col":1,  "letter":""},
                {"key":"3_2",   "active":false, "selected":false, "row":3,  "col":2,  "letter":""},
                {"key":"3_3",   "active":false, "selected":false, "row":3,  "col":3,  "letter":""},
                {"key":"3_4",   "active":false, "selected":false, "row":3,  "col":4,  "letter":""},
                {"key":"3_5",   "active":false, "selected":false, "row":3,  "col":5,  "letter":""},
                {"key":"3_6",   "active":false, "selected":false, "row":3,  "col":6,  "letter":""},
        
                {"key":"4_1",   "active":false, "selected":false, "row":4,  "col":1,  "letter":""},
                {"key":"4_2",   "active":false, "selected":false, "row":4,  "col":2,  "letter":""},
                {"key":"4_3",   "active":false, "selected":false, "row":4,  "col":3,  "letter":""},
                {"key":"4_4",   "active":false, "selected":false, "row":4,  "col":4,  "letter":""},
                {"key":"4_5",   "active":false, "selected":false, "row":4,  "col":5,  "letter":""},
                {"key":"4_6",   "active":false, "selected":false, "row":4,  "col":6,  "letter":""},
        
                {"key":"5_1",   "active":false, "selected":false, "row":5,  "col":1,  "letter":""},
                {"key":"5_2",   "active":false, "selected":false, "row":5,  "col":2,  "letter":""},
                {"key":"5_3",   "active":false, "selected":false, "row":5,  "col":3,  "letter":""},
                {"key":"5_4",   "active":false, "selected":false, "row":5,  "col":4,  "letter":""},
                {"key":"5_5",   "active":false, "selected":false, "row":5,  "col":5,  "letter":""},
                {"key":"5_6",   "active":false, "selected":false, "row":5,  "col":6,  "letter":""},    
                
                {"key":"6_1",   "active":false, "selected":false, "row":6,  "col":1,  "letter":""},
                {"key":"6_2",   "active":false, "selected":false, "row":6,  "col":2,  "letter":""},
                {"key":"6_3",   "active":false, "selected":false, "row":6,  "col":3,  "letter":""},
                {"key":"6_4",   "active":false, "selected":false, "row":6,  "col":4,  "letter":""},
                {"key":"6_5",   "active":false, "selected":false, "row":6,  "col":5,  "letter":""},
                {"key":"6_6",   "active":false, "selected":false, "row":6,  "col":6,  "letter":""},  
            ],
            streak:[],
            turn:   0,
            log:    [],
            prevPoints: 0,
            newPoints: 0,
            randomLetters: [],
            dictionary: dictionary,
            foundWords:[],

        })
    }

    cancelRestart = () => {
        this.setState({
            modalVisible:true,
            innerModalVisible:false
        })
    }

    render() {
        console.log(this.state)
        return (
            <>

            <div className='main-center-container'>
                <GameContainer state={this.state} tilePress={this.handleTilePress} getClickedElem={this.getClickedElem} extraLetterSelect={this.handleExtraLetterSelect}/>
                {/* <div className='play-page-container'>
                    <Scoreboard scoreLog={this.state.log} state={this.state} />
                    <EffectsLayer foundWords={this.state.foundWords}/>
                    <RandomLetters randomLetters={this.state.randomLetters} clickedElemX={this.state.clickedItemX} clickedElemY={this.state.clickedItemY} />
                    <GameBoard 
                        handleTilePress={this.handleTilePress}
                        // getTileLocation={this.getClickedTileLocation}
                        state={this.state}
                        />
                </div> */}
                <GameControls handlePauseClick={this.handleModalClose}  />
            </div>
                <AnimatePresence>
                    { this.state.modalVisible && <PauseGameModal 
                        showModal={this.state.modalVisible}
                        innerModal={this.handleRestartClick}
                        handleClose={this.handleModalClose}
                        /> }
                </AnimatePresence>
                    {this.state.innerModalVisible && <InnerModalModal 
                        showModal={this.state.innerModalVisible}
                        handleClose={this.handleModalClose}
                        handleRestart={this.restartGame}
                        handleCancel={this.cancelRestart}
                    />}
                <AnimatePresence>
                    { !this.state.gameStarted && <StartGameModal 
                        showModal={this.state.gameStarted} 
                        handleClose={this.handleStartModal}
                    /> } 
                </AnimatePresence>

                <AnimatePresence>
                    { this.state.gameOver && <GameOverTransition state={this.state} />} 
                </AnimatePresence>
            </>
        )
    }
}

export default PlayPage

