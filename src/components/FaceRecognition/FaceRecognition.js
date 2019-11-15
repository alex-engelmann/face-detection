import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className='center ma' >
            <div className='absolute mt2'>
                <img id='inputImage' width='500px' height='auto' alt='user submission' src={imageUrl} />

                {console.log(box)}

                {/* box.map is not a function */}

                {/* box.map((ele) => (
                    <div className='bounding-box'
                    style={{
                        top: ele.topRow,
                        right: ele.rightCol,
                        bottom: ele.bottomRow,
                        left: ele.leftCol
                    }}
                ></div>
                  ))}
               

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