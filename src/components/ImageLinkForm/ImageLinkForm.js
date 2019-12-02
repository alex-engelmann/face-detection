import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ clearURL, onInputChange, onPictureSubmit, oneFace, manyFaces }) => {
    return (
        <div>
            <p className='f3'>
                {'This site will find the faces in your pictures.  Enter the URL of an image or try these examples and click detect to see it in action!'}
            </p>
            <button type="submit" onClick={oneFace}>One Face</button>
            <button type="submit" onClick={manyFaces}>Many Faces</button>
           
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>

                    <input id='urlfield' className='f3 pa2 w-70 center' type='text' onFocus={clearURL} onChange={onInputChange} />
                    <button
                        type="submit"
                        className='w-30 grow f4 link ph1 pv2 dib white bg-orange'
                        onClick={onPictureSubmit}

                    >Detect</button>


                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;