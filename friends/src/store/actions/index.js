import * as types from './types'
import axios from 'axios'
import customAxios from '../../axios'

const baseUrl = 'http://localhost:5000/api';

const requesting = () => {
  return {
    type: types.REQUESTING
  }
}
const requestFailed = (payload) => {
  return {
    type: types.FAILURE,
    payload,
  }
}

const loginSuccess = () => {
  return {
    type: types.LOGIN_SUCCESS
  }
}


export const login = (username, password) => dispatch => {
  dispatch(requesting())
  axios.post(`${baseUrl}/login`, {username, password})
  .then(res => {
    localStorage.setItem('token', res.data.payload)
    dispatch(loginSuccess())
  })
  .catch(err => {
    dispatch(requestFailed(err.message))
  })
}


const fetchingFriendSuccess = (payload) => {
  return {
    type: types.FETCHING_FRIENDS_SUCCESS,
    payload,
  }
}
export const fetchFriends = () => dispatch => {
  dispatch(requesting())
  customAxios().get(`${baseUrl}/friends`)
  .then(res => {
    console.log(res.data)
    dispatch(fetchingFriendSuccess(res.data))
  })
  .catch(err => {
    dispatch(requestFailed(err.message))
  })
}