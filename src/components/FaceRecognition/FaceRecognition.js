import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className='center ma' >
            <div className='absolute mt2'>
                <img id='inputImage' width='500px' height='auto' alt='user submission' src={imageUrl} />
                <div className='bounding-box'
                style={{
                    top: box.topRow0,
                    right: box.rightCol0,
                    bottom: box.bottomRow0,
                    left: box.leftCol0
                }}
                ></div>
                <div className='bounding-box'
                style={{
                    top: box.topRow1,
                    right: box.rightCol1,
                    bottom: box.bottomRow1,
                    left: box.leftCol1
                }}
                ></div>
            
            </div>
        </div>
    );
}

export default FaceRecognition;