import React from 'react';
import "./Rank.css";


const Rank = ({ name, entries }) => {
    return (
        <div className="rank">
            {`${name}, your current entry count is...`}
            <div className='white f1 '>
                {entries}
            </div>
        </div>
    );
}

export default Rank;