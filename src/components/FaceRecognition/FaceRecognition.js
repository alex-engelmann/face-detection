import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className='center ma' >
            <div className='absolute mt2'>
                <img id='inputImage' width='500px' height='auto' alt='user submission' src={imageUrl} />
                
                {/*This goes through all the array elements and creates boxes */}

                {box.faces.map((ele, index) => (

                    <div key={index} className='bounding-box'
                        style={{
                            top: ele.topRow,
                            right: ele.rightCol,
                            bottom: ele.bottomRow,
                            left: ele.leftCol
                        }}
                    ></div>
                ))}

                <p>{box.faces.length} faces detected</p>

            </div>
        </div>
    );
}

export default FaceRecognition;