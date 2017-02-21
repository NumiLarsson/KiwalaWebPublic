import { createAction } from 'redux-actions';

export const USER_ACTIONS = {
    CREATE_USER: "CREATE_USER",
    ATTEND_EVENT: "ATTEND_EVENT"
};

export const createUser = createAction(USER_ACTIONS.CREATE_USER);
