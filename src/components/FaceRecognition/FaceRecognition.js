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
                            left: ele.leftCol,
                            top: ele.topRow,
                            right: ele.rightCol,
                            bottom: ele.bottomRow
                            
                        }}
                    ></div>
                ))}
                {/* This p element is exactly 50px tall */}
                <p>{box.faces.length} face(s) detected</p>

            </div>
            
        </div>
    );
}

export default FaceRecognition;