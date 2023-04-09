import React from 'react'
import "./NewPointsEffect.css"
import {AnimatePresence, motion} from 'framer-motion'

const NewPointsEffect = ({clickedElem,log}) => {

    const variants = {
        enter: {
            left:'50%',
            top:'50%',
            x: (clickedElem?.target.getBoundingClientRect().x - (window.innerWidth/2)) + 55,
            y: (clickedElem?.target.getBoundingClientRect().y - (window.innerHeight/2)) - 35,
            width: clickedElem?.target.getBoundingClientRect().width,
            height: clickedElem?.target.getBoundingClientRect().height,
            fontSize:'2rem',
            color: "#000000",
            transition:{
                duration:1
            }
        },
        exit: {
            left:'50%',
            top:'50%',
            x: (clickedElem?.target.getBoundingClientRect().x - (window.innerWidth/2)) + 55,
            y: clickedElem?.target.getBoundingClientRect().y - (window.innerHeight/2) - 140,
            width: clickedElem?.target.getBoundingClientRect().width,
            height: clickedElem?.target.getBoundingClientRect().height,
            fontSize:'2rem',
            color: ["#E6512D","#E5B70D","#E6512D","#E5B70D","#E6512D"],
            opacity:[1,1,1,1,0],
            textShadow:'4px 4px 25px #ffffff',
            zIndex:2,
            transition:{
                duration:1
            }
        }

    }
    return (
        <AnimatePresence>
            <motion.div
                key={log[log.length-1].turn}
                className='new-points-container'
                variants={variants}
                initial={"enter"}
                animate={"exit"}
            >
                <div>+{log[log.length-1].points}</div>
            </motion.div>
        </AnimatePresence>
    )
}

export default NewPointsEffect
