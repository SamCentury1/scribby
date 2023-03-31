import React from 'react'
import "./EffectsLayer.css"

const EffectsLayer = ({foundWords}) => {
    return (
        <div className='effects-layer'>
            <div>
                {
                    foundWords.map((obj,key) => {
                        return (
                            <div key={key}>
                               {obj.string} 
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default EffectsLayer
