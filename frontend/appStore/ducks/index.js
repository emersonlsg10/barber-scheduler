import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import users from './users';
import login from './login';
import register from './register';
import { reducer as notifications } from 'react-notification-system-redux';

export default combineReducers({
  app,
  auth,
  users,
  login,
  notifications,
  register,
});
