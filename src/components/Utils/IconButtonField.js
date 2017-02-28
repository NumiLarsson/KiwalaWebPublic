import React from 'react';
import IconButton from '../Utils/IconButton';

export default ({input, label, className, mIcon, type, fieldId, placeholder}) => {
    return (
        <IconButton
            {...input}
            id={fieldId} 
            className={className} 
            label={label} 
            mIcon={mIcon} 
            type={type} />
    );
}