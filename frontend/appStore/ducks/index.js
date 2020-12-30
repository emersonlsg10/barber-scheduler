import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import userDetails from './user/details';
import schedulesList from './schedules/list';
import schedulesDetails from './schedules/details';
import schedulesCreate from './schedules/create';
import servicesList from './services/list';
import servicesDelete from './services/delete';
import servicesCreate from './services/create';
import login from './login';
import register from './register';
import { reducer as notifications } from 'react-notification-system-redux';

export default combineReducers({
  app,
  auth,
  user: combineReducers({
    details: userDetails,
  }),
  schedules: combineReducers({
    list: schedulesList,
    details: schedulesDetails,
    create: schedulesCreate,
  }),
  services: combineReducers({
    list: servicesList,
    delete: servicesDelete,
    create: servicesCreate,
  }),
  login,
  notifications,
  register,
});
