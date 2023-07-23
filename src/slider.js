import React, { useState } from 'react';

export function Slider(props) {
    const [value, setValue] = useState(100);

    function adjustSlider(event) {
        const newValue = event.target.valueAsNumber;
        setValue(newValue);
        // If you need to use the value elsewhere, handle it here
        // For now, I'm commenting out the sliderValue call
        // sliderValue(newValue);
    }

    function getBackgroundSize() {
        return { backgroundSize: `${(value * 100) / 10} % 100` };
    }

    return (
        <div className="slidecontainer">
            <div className='slider-text'>Speed: {value}</div>
            <input 
                className="slider speed-slider"
                type='range'
                min={1}
                max={50}
                onChange={adjustSlider}
                value={value}
                style={getBackgroundSize()}
                aria-label="Small"
            />
        </div>
    );
}

// I'm commenting this function out because it doesn't seem to be used meaningfully.
// If you need it for other purposes, please explain its intended use.
// export function sliderValue(value) {
//     return value;
// }
