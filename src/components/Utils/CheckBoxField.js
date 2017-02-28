import React from 'react';
import CheckBox from '../Utils/CheckBox';

export default ({input, label, className, type, fieldId, placeholder}) => {
	
    return (
        <CheckBox
            {...input}
            id={fieldId} 
            className={className}  
            checked={input.value} 
            label={label} 
            type={type} />
    );
}