/**
 * Actions can be dispatched and caught by reduders. 
 * A standard action is defined as an object with a type property and a payload as well as an optional error property.
 * {type: 'example', payload:{counterValue: 10}}
 * Action creators are functions that return actions. It is customary to pass the result of an action creator to
 * the dispatch function like this: dispatch(actionCreator())
 */
//createAction is an action creator used to create standard actions.
import { createAction } from 'redux-actions';
//push can be used to navigate. dispatch(push('path'))
import {  } from 'react-router-redux';
//get the API
//import Api from '../../api/Api';

//get action types
import { EVENT_EDITOR_ACTIONS } from '../actionTypes';

//Standard actions.
export const eventDetailsToggled = createAction(EVENT_EDITOR_ACTIONS.EDIT_DETAILS_TOGGLED);
export const eventDetailsTimeToggled = createAction(EVENT_EDITOR_ACTIONS.EDIT_DETAILS_TIME_TOGGLED);
export const eventDetailsLocToggled = createAction(EVENT_EDITOR_ACTIONS.EDIT_DETAILS_LOC_TOGGLED);
export const eventDetailsMapToggled = createAction(EVENT_EDITOR_ACTIONS.EDIT_DETAILS_MAP_TOGGLED);