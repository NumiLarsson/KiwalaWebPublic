import { createAction } from 'redux-actions';

export const USER_ACTIONS = {
    CREATE_USER: "CREATE_USER"
};

export const createUser = createAction(USER_ACTIONS.CREATE_USER);
