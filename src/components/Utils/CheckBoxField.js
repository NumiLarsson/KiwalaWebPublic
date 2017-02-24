import React from 'react';
import CheckBox from '../Utils/CheckBox';

export default ({input, label, type, fieldId, placeholder}) => {
	
    return (
        <CheckBox
            {...input}
            id={fieldId} 
            className=' error' 
            checked={input.value} 
            label={label} 
            type={type} />
    );
}