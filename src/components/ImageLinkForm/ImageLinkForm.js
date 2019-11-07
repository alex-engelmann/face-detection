import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
    return (
        <div>
            <p className='f3'>
                {'This site will find the faces in your pictures.  Give it a try'}
            </p>
            <p>
                <a href='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' rel="noopener noreferrer" target="_blank" className='f4'>
                    {'Try this sample image with one face'}
                </a>
            </p>
            <p>
                <a href='https://images.unsplash.com/photo-1504022462188-88f023db97bf' rel="noopener noreferrer" target="_blank" className='f4'>
                    {'Try this sample image with multiple faces'}
                </a>
            </p>

            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f3 pa2 w-70 center' type='text' onChange={onInputChange} />
                    <button
                        className='w-30 grow f4 link ph1 pv2 dib white bg-light-purple'
                        onClick={onPictureSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;