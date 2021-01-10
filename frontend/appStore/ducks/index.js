import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import userDetails from './user/details';
import schedulesList from './schedules/list';
import schedulesDetails from './schedules/details';
import schedulesCreate from './schedules/create';
import schedulesDelete from './schedules/delete';
import servicesList from './services/list';
import servicesDelete from './services/delete';
import servicesCreate from './services/create';
import companyDetails from './company/details';
import login from './login';
import register from './register';
import { reducer as notifications } from 'react-notification-system-redux';

export default combineReducers({
  app,
  auth,
  user: combineReducers({
    details: userDetails,
  }),
  company: combineReducers({
    details: companyDetails,
  }),
  schedules: combineReducers({
    list: schedulesList,
    details: schedulesDetails,
    create: schedulesCreate,
    delete: schedulesDelete,
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
