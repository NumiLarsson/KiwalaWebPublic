import React from 'react';
import './styles/iconbutton.css';

const IconButton = (props) => {
    
    return (
        <button className={props.className + ' iconbutton'} type={props.type} onClick={props.onClickHandler}>
            { (props.mIcon) ?
                <i className="material-icons">{props.mIcon}</i> 
                :
                null
             }
            <span>{props.label}</span>
        </button>
    )
}

export default (IconButton);