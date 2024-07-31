import {
  HANDLE_LOADING,
  SETUP_USER,
  REMOVE_USER,
  ALERT,
  SET_NOTIFICATION,
  SET_IS_NEW_NOTIFICATION,
} from "./UserAction";

export default function reducer(state, action) {
  if (action.type === ALERT) {
    window.alert(action.payload);
    return {
      ...state,
      alert: action.payload,
    };
  } else if (action.type === HANDLE_LOADING) {
    return {
      ...state,
      loading: action.payload,
    };
  } else if (action.type === SETUP_USER) {
    return {
      ...state,
      user: action.payload.user,
      accessedCourses: action.payload.accessedCourses,
    };
  } else if (action.type === REMOVE_USER) {
    return {
      ...state,
      user: undefined,
    };
  } else if (action.type === SET_NOTIFICATION) {
    return {
      ...state,
      notifications: action.payload,
    };
  } else if (action.type === SET_IS_NEW_NOTIFICATION) {
    return {
      ...state,
      isUnseenNotification: action.payload,
    };
  }
  throw new Error("No such action in User Reducer");
}
