import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import userDetails from './schedules/list';
import login from './login';
import register from './register';
import { reducer as notifications } from 'react-notification-system-redux';

export default combineReducers({
  app,
  auth,
  user: combineReducers({
    details: userDetails,
  }),
  login,
  notifications,
  register,
});
