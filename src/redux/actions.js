/* eslint-disable no-unreachable */
/* eslint-disable prettier/prettier */
import axios from 'axios';
import API_URL from '../env';
export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const SET_USER_SEX = 'SET_USER_SEX';

export const GET_RECIPES = 'GET_RECIPES';

const API_ALL_RECIPES = API_URL + '/recipes/ALL';

export const setName = name => dispatch => {
  dispatch({
    type: SET_USER_NAME,
    payload: name,
  });
};
export const setEmail = email => dispatch => {
  dispatch({
    type: SET_USER_EMAIL,
    payload: email,
  });
};
export const setSex = sex => dispatch => {
  dispatch({
    type: SET_USER_SEX,
    payload: sex,
  });
};

export const getRecipes = () => {
  try {
    return async dispatch => {
      axios.get(API_ALL_RECIPES).then(recipes => {
        dispatch({
          type: GET_RECIPES,
          payload: recipes.data,
        });
      });
    };
  } catch (error) {
    console.warn('unable to fetch all_recipes' + error);
  }
};
