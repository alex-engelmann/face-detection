import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit, oneFace, manyFaces, isUrlBlank }) => {
    return (
        <div>
            <div className='f3 sentence'>
                {'This site will find up to 300 faces in your pictures.'}
            </div>
            <div className='f3 sentence'>
                {'Enter the URL of an image or try these examples and click detect to see it in action!'}
            </div>
            <p>
                <button className='f5 link dim br3 ph3 pv2 mb2 dib white bg-dark-green'
                 type="submit" onClick={oneFace}>One Face</button>
                <button className='f5 link dim br3 ph3 pv2 mb2 dib white bg-dark-green'
                 type="submit" onClick={manyFaces}>Many Faces</button>
            </p>

            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>

                    <input id='urlfield' className='f3 pa2 w-70 center' type='text' onChange={onInputChange} />
                    <button
                        disabled = {isUrlBlank()}
                        type="submit"
                        className='w-30 f4 link ph1 pv2 dib white bg-orange'
                        onClick={onPictureSubmit}

                    >Detect</button>


                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;