import React from 'react';
import './styles/iconbutton.css';

const IconButton = (props) => {
    
    return (
        <button className={props.className + ' iconbutton'} type={props.type} onClick={props.onClickHandler}><i className="material-icons">{props.mIcon}</i> <span>{props.label}</span></button>
    )
}

export default (IconButton);