import * as types from './types'
import axios from 'axios'
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