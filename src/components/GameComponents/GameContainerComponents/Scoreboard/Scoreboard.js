import React, { useEffect,useRef,useState } from 'react'
import "./Scoreboard.css"
import * as  TbIcons  from "react-icons/tb";
import {motion, animate, AnimatePresence } from 'framer-motion';

const Scoreboard = ({scoreLog,state,timer}) => {

    // const [activeCount, setActiveCount] = useState(state.prevPoints)

    // useEffect(() => {
    //     if (activeCount < state.newPoints) {
    //         setActiveCount(activeCount + 1)
    //     } else {
    //         setActiveCount(state.newPoints)
    //     }
    // },[])

    // console.log(activeCount)



    
        const [count, setCount] = useState(null)
        const [active, setActive] = useState(false)
        
        function Counter({from, to, activelyCounting}) {

            

            useEffect(() => {

                const getValue = () => {
                    if (Number(count) < state.newPoints) {
                        const timeToDisplay = state.foundWords.length * 700
                        const points = state.newPoints - state.prevPoints
                        const interval = timeToDisplay / points

                        setTimeout(() => {
                            setCount(Number(count)+1)
                        },interval)

                        setActive(true)
                        setTimeout(() => {
                            setActive(false)
                        },timeToDisplay)

                    } else if (Number(count) === state.newPoints){
                        setCount(state.newPoints)
                    } else if (Number(count) > state.newPoints) {
                        // the game has restarted
                        setCount(0)
                    }
                }
                return () => {getValue()}
            },[from,to])

            // const ref = useRef()
            // useEffect(() => {
            //     const node = ref.current
                
            //     const controls = animate(from, to, {
            //         duration: state.foundWords.length * 1.3,
            //         onUpdate(value) {
            //             setCount(Number(count)+1)
            //             node.textContent = value.toFixed(0)
            //             // console.log(value)
            //         }
            //     })
            //     return () => controls.stop()
            // },[from, to])
            // return <motion.div key={state.turn} className='points-display-text' ref={ref} />

            const variants = {
                active: {
                    backgroundColor:["#d5ff00","#00FFFFFF",]
                },
                inactive: {
                    backgroundColor:"rgba(0,0,0,0)"
                }
            }



            // while (count < state.newPoints) {
            //     return (
            //         <AnimatePresence>
            //             {active && <motion.div 
            //                 className='points-display'
            //                 animate={{backgroundColor:['#F6EB3D','#F65E3D','#F6EB3D','#F65E3D','rgba(0,0,0,0)']}}
            //                 style={{position:"absolute", backgroundColor:"rbga(141,33,63)"}}
            //             />}
            //             <motion.div
            //                 key={count} 
            //                 className='points-display'
            //                 initial={{scale:1}}
            //                 animate={{scale:1.1,zIndex:2, }}
            //                 exit={{scale:1,backgroundColor:"rgba(0,0,0,0)"}}
            //                 style={{scale:1,backgroundColor:"rgba(0,0,0,0)",zIndex:2, }}
            //             >
            //                 <div className='points-display-text'>{count}</div>
            //             </motion.div>
            //         </AnimatePresence>
            //     )
            // } 

           

                
                  
            
            return (
                <>
                {
                    active ? 
                    <motion.div 
                        className='points-display' 
                        style={{scale:1,backgroundColor:"rgba(0,0,0,0)",zIndex:2 }}
                        animate={{
                            backgroundColor: "rgba(0,0,0,0)", 
                            borderColor:['#F6EB3D','#F65E3D','#F6EB3D','#F65E3D','rgba(0,0,0,0)'], 
                            boxShadow: ["2px 2px 10px rgba(255,255,255,0.534)","2px 2px 10px rgba(255,255,255,0.1)"],
                            
                        }}

                    >
                                        
                        {
                            active &&  <AnimatePresence>
                                {/* {active && <motion.div 
                                    className='points-display'
                                    animate={{backgroundColor:['#F6EB3D','#F65E3D','#F6EB3D','#F65E3D','rgba(0,0,0,0)']}}
                                    style={{position:"absolute", backgroundColor:"rbga(141,33,63)"}}
                                />} */}
                                <motion.div
                                    key={count} 
                                    // className=''
                                    initial={{scale:1}}
                                    animate={{scale:1.1,zIndex:2,}}
                                    // exit={{scale:1,backgroundColor:"rgba(0,0,0,0)"}}
                                    style={{width:"100%", height:"100%", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", zIndex:2 }}
                                >
                                    <motion.div 
                                    className='points-display-text'
                                    animate={{ zIndex:2, color: ['#F6EB3D','#F65E3D'], textShadow:"2px 2px 10px rgba(255,255,255,0.433)"}}
                                    >{count}</motion.div>
                                </motion.div>
                            </AnimatePresence>
                        }
                        {
                            active ? false:
                            <div className='points-display-text'>{count}</div>
                        }
                    </motion.div>
                    :
                    <div className='points-display' style={{scale:1,backgroundColor:"rgba(0,0,0,0)"}}>

                            <div className='points-display-text'>{count}</div>
                    </div>
                }
                </>
            )
            

        
        }


    // const variants = {
    //     active: {
    //         backgroundColor:["#d5ff00","#00FFFFFF",]
    //     },
    //     inactive: {
    //         backgroundColor:"rgba(0,0,0,0)"
    //     }
    // }



    return (
        <div className='scoreboard-layer'>
            <div className='clock-container'>
                <div className='clock-icon-container'>
                    <TbIcons.TbChessKnightFilled/>
                </div>
                <div className='clock-display'>{state.turn}</div>
            </div>

            <div className='points-container'>
                {/* <div className='points-display'>
                    <div className='points-display-text'>{activeCount}</div>
                </div> */}
                {/* <AnimatePresence> */}

                    {/* <motion.div 
                        className='points-display'
                        key={state.turn}
                        initial={{backgroundColor:"rgbab(0,0,0,0)"}}
                        variants={variants}
                        animate={"active"}
                        transition={
                            {duration: (state.newPoints - state.prevPoints) * 0.01}
                        }
                        style={{backgroundColor:"rgba(0,0,0,0)"}}
                    >

                        <Counter from={state.prevPoints} to={state.newPoints}/>
                    </motion.div> */}
                {/* </AnimatePresence> */}
                <Counter from={state.prevPoints} to={state.newPoints}/>
            </div>
        </div>
    )
}

export default Scoreboard
