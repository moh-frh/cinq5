/* eslint-disable prettier/prettier */
import {SET_USER_NAME, SET_USER_EMAIL, SET_USER_SEX, GET_RECIPES} from './actions';

const initialState = {
  name: '',
  email: '',
  all_recipes: []
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_NAME:
      return {...state, name: action.payload};
    case SET_USER_EMAIL:
      return {...state, email: action.payload};
    case SET_USER_SEX:
      return {...state, sex: action.payload};
    case GET_RECIPES:
      return {...state, all_recipes: action.payload};
    default:
      return state;
  }
}

export default userReducer;
