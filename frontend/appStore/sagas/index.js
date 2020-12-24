import { all, fork } from 'redux-saga/effects';
import auth from './auth';
import userDetails from './user/details';
import schedulesList from './schedules/list';
import login from './login';
import register from './register';

function* rootSaga() {
  yield all([
    fork(auth),
    fork(userDetails),
    fork(login),
    fork(register),
    fork(schedulesList),
  ]);
}

export default rootSaga;
