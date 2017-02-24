import React from 'react';
import './styles/checkbox.css';

const CheckBox = (props) => {

    return (
        <div className={(!props.disabled) ? "checkbox-wrapper" : "checkbox-wrapper disabled"}>
            <input type="checkbox" name={props.name} id={props.name} checked={props.checked} onChange={props.onChange}/>
            { renderLabel(props.label, props.name) }
        </div>
    )
}

function renderLabel(label, name) {
    if(label) {
        return (
            <label htmlFor={name}>{label}</label>
        );
    }
    else {
        return (
            null
        );
    }
}

export default (CheckBox);