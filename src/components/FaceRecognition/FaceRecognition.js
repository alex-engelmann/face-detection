import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className='center ma' >
            <div className='absolute mt2'>
                <img id='inputImage' width='500px' height='auto' alt='user submission' src={imageUrl} />

                {console.log(box)}

                {/*<div className='bounding-box'
                    style={{
                        top: box.topRow[0],
                        right: box.rightCol[0],
                        bottom: box.bottomRow[0],
                        left: box.leftCol[0]
                    }}
                ></div>*/}

                {/*<div className='bounding-box'
                    style={{
                        top: box.topRow[1],
                        right: box.rightCol[1],
                        bottom: box.bottomRow[1],
                        left: box.leftCol[1]
                    }}
                ></div>*/}

            </div>
        </div>
    );
}

export default FaceRecognition;