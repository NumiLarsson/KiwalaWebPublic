import React from 'react';
import './styles/spinner.css';

const Spinner = (props) => {
    
    return (
        <div>
            <div className="spinner">
                <div className="spinner-dot1"></div>
                <div className="spinner-dot2"></div>
            </div>
            {(props.label) ? (
                <span className="spinner-text">{ props.label }</span>
            ) : (
                null
            )
            }
        </div>

    )
}

export default (Spinner);