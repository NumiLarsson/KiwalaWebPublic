import React from 'react';
import './styles/checkbox.css';

const CheckBox = (props) => {

    return (
        <div className={(!props.disabled) ? "checkbox-wrapper" : "checkbox-wrapper disabled"}>
            <input type="checkbox" checked={props.checked} onChange={props.handleChange}/>
            { renderLabel(props.label, props.handleChange) }
        </div>
    )
}

function renderLabel(label, handleChange) {
    if(label) {
        return (
            <span onClick={handleChange}>{label}</span>
        );
    }
    else {
        return (
            null
        );
    }
}

export default (CheckBox);