import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className='center ma' >
            <div className='absolute mt2'>
                <img id='inputImage' width='500px' height='auto' alt='user submission' src={imageUrl} />
                {/*console.log(box)}
                {console.log(box.finalfaces["0"].bottomRow)}

                {/*This goes through all the array elements and creates boxes */}

                {box.finalfaces.map((ele, index) => (

                    <div key={index} className='bounding-box'
                        style={{
                            top: ele.topRow,
                            right: ele.rightCol,
                            bottom: ele.bottomRow,
                            left: ele.leftCol
                        }}
                    ></div>
                ))}

            </div>
        </div>
    );
}

export default FaceRecognition;