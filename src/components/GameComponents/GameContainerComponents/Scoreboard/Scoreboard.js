import React, { useEffect,useRef } from 'react'
import "./Scoreboard.css"
import * as  TbIcons  from "react-icons/tb";
import {animate, AnimatePresence, motion } from 'framer-motion';

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


    // function Counter({from, to, foundWords}) {

    //     const [count, setCount] = useState(from)
    //     useEffect(() => {
    
    //         const getValue = () => {
    //             if (Number(count) < to) {
    //                 const timeToDisplay = foundWords * 700
    //                 const points = to - from
    //                 const interval = timeToDisplay / points
    
    //                 setTimeout(() => {
    //                     setCount(Number(count)+1)
    //                 },interval)
    
    
    //             } else if (Number(count) === to){
    //                 setCount(to)
    //             } else if (Number(count) > to) {
    //                 // the game has restarted
    //                 setCount(0)
    //             }
    //         }
    //         return () => {getValue()}
    //     },[count, from, to ,foundWords])

    //     return (
    //         foundWords > 0 ? 
            
    //         <motion.div 
    //             className='points-display' 
    //             style={{scale:1,backgroundColor:"rgba(0,0,0,0)"}}
    //             animate={{scale:1.1}}    
    //         >
    //             <div className='points-display-text'>{count}</div>
    //         </motion.div>
    //         :
    //         <div className='points-display' style={{scale:1,backgroundColor:"rgba(0,0,0,0)"}}>
    //                 <div className='points-display-text'>{count}</div>
    //         </div>
    //     )
    // }

    
        
        //const [active, setActive] = useState(false)
        
        // function Counter({from, to, activelyCounting}) {

            

        //     useEffect(() => {

        //         const getValue = () => {
        //             if (Number(count) < state.newPoints) {
        //                 const timeToDisplay = state.foundWords.length * 700
        //                 const points = state.newPoints - state.prevPoints
        //                 const interval = timeToDisplay / points

        //                 setTimeout(() => {
        //                     setCount(Number(count)+1)
        //                 },interval)

        //                 setActive(true)
        //                 setTimeout(() => {
        //                     setActive(false)
        //                 },timeToDisplay)

        //             } else if (Number(count) === state.newPoints){
        //                 setCount(state.newPoints)
        //             } else if (Number(count) > state.newPoints) {
        //                 // the game has restarted
        //                 setCount(0)
        //             }
        //         }
        //         return () => {getValue()}
        //     },[])
 
        //     return (
        //         <>
        //         {
        //             active ? 
        //             <motion.div 
        //                 className='points-display' 
        //                 style={{scale:1,backgroundColor:"rgba(0,0,0,0)",zIndex:2 }}
        //                 animate={{
        //                     backgroundColor: "rgba(0,0,0,0)", 
        //                     borderColor:['#F6EB3D','#F65E3D','#F6EB3D','#F65E3D','rgba(0,0,0,0)'], 
        //                     boxShadow: ["2px 2px 10px rgba(255,255,255,0.534)","2px 2px 10px rgba(255,255,255,0.1)"],
                            
        //                 }}

        //             >
                                        
        //                 {
        //                     active &&  <AnimatePresence>
        //                         {/* {active && <motion.div 
        //                             className='points-display'
        //                             animate={{backgroundColor:['#F6EB3D','#F65E3D','#F6EB3D','#F65E3D','rgba(0,0,0,0)']}}
        //                             style={{position:"absolute", backgroundColor:"rbga(141,33,63)"}}
        //                         />} */}
        //                         <motion.div
        //                             key={count} 
        //                             // className=''
        //                             initial={{scale:1}}
        //                             animate={{scale:1.1,zIndex:2,}}
        //                             // exit={{scale:1,backgroundColor:"rgba(0,0,0,0)"}}
        //                             style={{width:"100%", height:"100%", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", zIndex:2 }}
        //                         >
        //                             <motion.div 
        //                             className='points-display-text'
        //                             animate={{ zIndex:2, color: ['#F6EB3D','#F65E3D'], textShadow:"2px 2px 10px rgba(255,255,255,0.433)"}}
        //                             >{count}</motion.div>
        //                         </motion.div>
        //                     </AnimatePresence>
        //                 }
        //                 {
        //                     active ? false:
        //                     <div className='points-display-text'>{count}</div>
        //                 }
        //             </motion.div>
        //             :
        //             <div className='points-display' style={{scale:1,backgroundColor:"rgba(0,0,0,0)"}}>

        //                     <div className='points-display-text'>{count}</div>
        //             </div>
        //         }
        //         </>
        //     )
            

        
        // }

        function Counter({ from, to, foundWords, turn }) {
            const nodeRef = useRef();
          
            useEffect(() => {
              const node = nodeRef.current;
          
              const controls = animate(from, to, {
                // key:state.turn,
                ease: "linear",
                duration: foundWords*0.7,
                onUpdate(value) {
                  node.textContent = value.toFixed(0);
                }
              });
          
              return () => controls.stop();
            }, [from, to,foundWords, turn]);
          
            return (
                <AnimatePresence>
                    <motion.div 
                        className='points-display' 
                        key={turn} 
                        style={{scale:1,backgroundColor:"rgba(0,0,0,0)", zIndex:3}} 
                        initial={{scale:1}} 
                        animate={{borderColor:['#F6EB3D','#F65E3D','rgba(0,0,0,1)']}}
                        transition={{ repeat: (to-from), duration: (foundWords*0.7)/(to-from) }}
                    >
                        <motion.div
                            key={turn} 
                            className='points-display-text' 
                            ref={nodeRef}
                            initial={{scale:1}} 
                            animate={{color:['#F6EB3D','#F65E3D','rgba(0,0,0,1)']}}
                            transition={{ repeat: (to-from), duration: (foundWords*0.7)/(to-from) }}
                        />
                    </motion.div>
                </AnimatePresence>
            );
          }

    return (
        <div className='scoreboard-layer'>
            <div className='clock-container'>
                <div className='clock-icon-container'>
                    <TbIcons.TbChessKnightFilled/>
                </div>
                <div className='clock-display'>{state.turn}</div>
            </div>

            <div className='points-container'>
                {
                    state.foundWords.length > 0 ?
                    <Counter from={state.prevPoints} to={state.newPoints} foundWords={state.foundWords.length} turn={state.turn}/>
                    :
                    <div className='points-display' style={{scale:1,backgroundColor:"rgba(0,0,0,0)"}}>
                        <div className='points-display-text'>{state.newPoints}</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Scoreboard
