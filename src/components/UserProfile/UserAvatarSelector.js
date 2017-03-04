import React from 'react';
import Spinner from '../Utils/Spinner';
import IconButton from '../Utils/IconButton';
import './styles/useravatarselector.css';

const UserAvatarSelector = (props) => {

    if(props.avatarList) {
        return (
            <div className="avatarselector">
                <h1>Choose your new avatar</h1>
                <div className="avatarselector-list">
                    {Object.values(props.avatarList).map( function(avatar, index) {
                        return renderAvatar({key: index, payload: avatar}, props.handleChosenAvatar)
                    })}
                </div>
                <IconButton mIcon="close" label="Close" onClickHandler={props.handleClose} type="button" />
            </div> 
        )
    }
    else {
        return (
            <div className="avatarselector">
                <Spinner />
                <IconButton mIcon="close" label="Close" onClickHandler={props.handleClose} type="button" />
            </div>
        )
    }
}

function renderAvatar(avatar, handleChosenAvatar){
    return (
        <div key={avatar.key} className="avatarselector-list__avatar" onClick={handleChosenAvatar}>
            <img src={avatar.payload} />
        </div>
    );
}

export default (UserAvatarSelector);