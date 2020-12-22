import { all, fork } from 'redux-saga/effects';
import auth from './auth';
import users from './users';
import login from './login';

function* rootSaga() {
  yield all([fork(auth), fork(users), fork(login)]);
}

export default rootSaga;
