import React from 'react';
import IconButton from '../Utils/IconButton';

export default ({input, label, mIcon, type, fieldId, placeholder}) => {
    return (
        <IconButton
            {...input}
            id={fieldId} 
            className=' error' 
            label={label} 
            mIcon={mIcon} 
            type={type} />
    );
}