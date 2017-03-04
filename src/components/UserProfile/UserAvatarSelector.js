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
                    <div key="no_avatar_0" className="avatarselector-list__avatar" onClick={() => props.handleChosenAvatar(null)}>
                        <div className="avatarselector-list__noavatar">
                            <i className="material-icons color-gray no_avatar">person</i>
                        </div>
                    </div>
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
        <div key={avatar.key} className="avatarselector-list__avatar" onClick={() => handleChosenAvatar(avatar.payload)}>
            <img src={avatar.payload} role="presentation" />
        </div>
    );
}

export default (UserAvatarSelector);