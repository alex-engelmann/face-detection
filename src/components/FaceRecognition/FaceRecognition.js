import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className='center ma' >
            <div className='absolute mt2'>
                <img id='inputImage' width='500px' height='auto' alt='user submission' src={imageUrl} />
                {console.log(box)}
                {console.log(box.finalfaces["0"].bottomRow)}

                {/*This goes through all the array elements and creates boxes */}

                { box.finalfaces.map((ele) => (
                    <div className='bounding-box'
                    style={{
                        top: ele.topRow,
                        right: ele.rightCol,
                        bottom: ele.bottomRow,
                        left: ele.leftCol
                    }}
                ></div>
                ))}
               
                {/*This was the old way*/}
                    
                {/*<div className='bounding-box'
                    style={{
                        top: box.finalfaces[0].topRow,
                        right: box.finalfaces[0].rightCol,
                        bottom: box.finalfaces[0].bottomRow,
                        left: box.finalfaces[0].leftCol
                    }}
                ></div>*/}

            </div>
        </div>
    );
}

export default FaceRecognition;