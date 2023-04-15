import React, { useEffect, useState } from 'react'
import "./GameBoard.css"
import {motion} from 'framer-motion'


const GameBoard = ({handleTilePress,getTileLocation,state}) => {

    const getVariant = (status) => {
        if (status === true) {
            return "active"
        } else {
            return "inactive"
        }
    }

    const variants = {
        active: {
            color:['#F6EB3D','#F65E3D','#F6EB3D','#F65E3D','#000000'],
            // backgroundColor:['#F65E3D','#F6EB3D','#F65E3D','#F6EB3D','#000000'],
            borderWidth:[1,2,1,2,0],
            boxShadow:["2px 2px 0 rgba(255, 255, 255, 0.4)"],
            borderColor:['#F65E3D','#F6EB3D','#F65E3D','#F6EB3D','#000000'],
            //rotateY:["0deg","0deg","0deg","360deg","0deg"],
            backgroundColor:"rgba(0,0,0,0)",
            scale:[0,1,1,1,0],
            //y:[0,-10,-10,-10,-300],
            zIndex:[2,2,2,2,2]
        },
        inactive: {
            backgroundColor:['##0DBEE5','#0DBEE5','#0DBEE5','#0DBEE5','#000000'],
        }
    }



    const getTileStyle = (item,words) => {

        if (item.active === true) {
            if (item.letter === "") {
                return {color:'#000000', backgroundColor:'#FFE6B1', opacity:0.7, zIndex:3}
            } else {
                return {color:'#000000', backgroundColor:'rgba(0,0,0,0)', opacity:1, zindex:3, position:"relative" }
            }
        } else if (item.active === false) {
            if (item.letter === "") {
                return {color:'#000000', backgroundColor:'#FFE6B1', opacity:0.4 }
            } else {
                return {color:'#000000', backgroundColor:'#FFE6B1', opacity:0.9 }
            }
        }
    }


    const [letterState, setLetterState] = useState(state.prevLetterState)

    useEffect(() => {
        if (state.foundWords.length > 0) {
            setLetterState(state.prevLetterState)

            const timer = setTimeout(() => {
                setLetterState(state.letterState)

            }, 1500);
            return () => clearTimeout(timer);
        } else {
            setLetterState(state.letterState)
        }
    },[state.letterState, state.foundWords.length, state.prevLetterState ])





    return (

        <div className='game-board-layer'>

            <div className='board-container'>
                {
                    letterState.map((element) => {
                        return (
                            <div key={element.key}>
                                {
                                    element.active === true ? 
                                    <motion.div 
                                        key={element.key}
                                        id={element.key}
                                        className='tile tile-consumed'
                                        variants={variants}
                                        animate={getVariant(element.active)}
                                        transition={{duration:1.5}}
                                        inital={{scale:0}}
                                        onClick={(e) => {handleTilePress(element); getTileLocation(e) }}
                                        whileTap={{ scale: 0.9 }}
                                        style={getTileStyle(element,state.foundWords)}

                                    >
                                            {element.letter}
                                    </motion.div>                                    

                                     : 

                                    <motion.div 
                                        key={`${Date.now()}_${element.key}`}
                                        id={element.key}
                                        className={element.letter === "" ? "tile tile-inactive" : "tile tile-active"}
                                        onClick={(e) => {handleTilePress(element);  getTileLocation(e)}}
                                        variants={variants}
                                        whileTap={{ scale: 0.9, opacity:1 }}
                                        style={getTileStyle(element,state.foundWords)}

                                    >
                                            {element.letter}
                                    </motion.div>
                                    
                                }
                            </div>
                        )    
                    })
                }
            </div>
        </div>
    )
}

export default GameBoard
