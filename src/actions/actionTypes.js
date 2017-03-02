//Constants identifying actions.
export const EVENT_ACTIONS = {
    GET_EVENT : 'GET_EVENT',
    SET_CURRENT_EVENT : 'SET_CURRENT_EVENT',
    SET_CURRENT_EVENT_DATA : 'SET_CURRENT_EVENT_DATA',
    SET_CURRENT_EVENT_PARTICIPANTS : 'SET_CURRENT_EVENT_PARTICIPANTS',
    UPDATE_CURRENT_EVENT_PARTICIPANTS_USERS: 'UPDATE_CURRENT_EVENT_PARTICIPANTS_USERS',
    SET_CURRENT_EVENT_MODULES : 'SET_CURRENT_EVENT_MODULES',
    ATTEND_EVENT_SUCCESS: 'ATTEND_EVENT_SUCCESS',
    UNATTEND_EVENT_SUCCESS: 'UNATTEND_EVENT_SUCCESS'
};

export const EVENT_EDITOR_ACTIONS = {
    EVENT_DATA_UPDATED : 'EVENT_DATA_UPDATED',
    EVENT_MODULE_DATA_UPDATED : 'EVENT_MODULE_DATA_UPDATED'
};

export const USER_PROFILE_ACTIONS = {
    GET_ACCEPTED_EVENTS_DATA : 'GET_ACCEPTED_EVENTS_DATA',
    GET_ACCEPTED_EVENTS_MODULES : 'GET_ACCEPTED_EVENTS_MODULES',
    USER_PROFILE_UPDATED : 'USER_PROFILE_UPDATED'
};
