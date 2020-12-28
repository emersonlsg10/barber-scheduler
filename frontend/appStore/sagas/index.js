import { all, fork } from 'redux-saga/effects';
import auth from './auth';
import userDetails from './user/details';
import schedulesList from './schedules/list';
import schedulesDetails from './schedules/details';
import schedulesCreate from './schedules/create';
import servicesList from './services/list';
import login from './login';
import register from './register';

function* rootSaga() {
  yield all([
    fork(auth),
    fork(userDetails),
    fork(login),
    fork(register),
    fork(schedulesList),
    fork(schedulesDetails),
    fork(schedulesCreate),
    fork(servicesList),
  ]);
}

export default rootSaga;
