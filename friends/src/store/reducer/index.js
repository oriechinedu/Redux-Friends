import * as types from '../actions/types'

const initialState = {
  deletingFriend: false,
  fetchingFriends: false,
  friends: [],
  loggingIn: false,
  savingFriends: false,
  updatingFriend: false,
  isLoading: false,
  error: null
}
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.REQUESTING:
      return {
        ...state,
        isLoading: true,
      }
    case types.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case types.FETCHING_FRIENDS_SUCCESS:
      return {
        ...state,
        friends: action.payload,
        isLoading: false,
      }
    case types.SAVING_FRIENDS_SUCCESS:
      return {
        ...state,
        friends: action.payload,
        isLoading: false,
      }
    default:
      return state
  }
}

export default reducer;