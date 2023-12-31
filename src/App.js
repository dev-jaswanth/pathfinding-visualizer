import React, {useState} from 'react'
import Visualiser from './Visualiser'
import SocialIcons from './socialIcons'
import Instructions from './instructions'

export default function App() {
    const [sliderValue, setSliderValue] = useState(50)
    const [theme, setTheme] = useState('dark')
    const [instructions, setInstructions] = useState(false)

    function toggleInstructions() {
        setInstructions(prevState => !prevState)
    }

    function adjustSlider(event) {
        setSliderValue(event.target.valueAsNumber);
    }

    function getBackgroundSize() {
        return {backgroundSize: `${(sliderValue * 100) / 10} % 100`}
    }

    return (
        <div>
            <Instructions
                    instructions={instructions}
                    toggleInstructions={toggleInstructions}
                />
            <div className='top-bar'>
                <SocialIcons />
                <button
                    className='button instructions'
                    onClick={toggleInstructions}
                    >Instructions
                </button>
                
                <div className='title'>
                    <div className="pathfinding-vis"> <bold>PATHFINDING VISUALIZER</bold> </div>
                </div>
               
                <div className="slidecontainer">                 
                    <div className='slider-text'>{`${sliderValue} ms`}</div>
                    <input className="slider speed-slider"   
                        type='range'
                        min={1}
                        max={500}
                        onChange={(event) => adjustSlider(event)}
                        sliderValue={sliderValue}
                        style={getBackgroundSize()}
                        aria-label="Small"
                        ></input>
                </div> 
            </div>
            <Visualiser
                sliderValue={sliderValue}
                theme={theme}
            />
        </div>
    )
}
