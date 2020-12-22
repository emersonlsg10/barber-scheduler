import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './ducks';
import rootSaga from './sagas';

function configureStore(preloadedState, { isServer, req = null }) {
  /**
   * Recreate the stdChannel (saga middleware) with every context.
   */

  const sagaMiddleware = createSagaMiddleware();

  /**
   * Since Next.js does server-side rendering, you are REQUIRED to pass
   * `preloadedState` when creating the store.
   */

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(sagaMiddleware)
  );

  /**
   * next-redux-saga depends on `sagaTask` being attached to the store during `getInitialProps`.
   * It is used to await the rootSaga task before sending results to the client.
   * However, next-redux-wrapper creates two server-side stores per request:
   * One before `getInitialProps` and one before SSR (see issue #62 for details).
   * On the server side, we run rootSaga during `getInitialProps` only:
   */

  if (req || !isServer) {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  }

  return store;
}

export default configureStore;
