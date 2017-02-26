import React from 'react';
import './styles/eventheader.css';

const EventHeader = (props) => {

    return (
        <div className="event-header" style={ getHeaderImgStyle(props.headerImage) }>
            <div className="event-header__gradient">
                <div className="event-header__content">
                    <div className="event-header__title">
                        <h1>{ props.name }</h1>
                    </div>
                </div>
            </div>
        </div> 
    )
    
}

function getHeaderImgStyle(headerImage) {
    return {
      backgroundImage: 'url(' + headerImage + ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      overflow: 'hidden',
    };
}

export default (EventHeader);