import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import rootReducer from './ducks';
import rootSaga from './sagas';
import { authMiddleware } from './middlewares';

function configureStore(preloadedState, { isServer, req = null }) {
  let store;
  /**
   * Recreate the stdChannel (saga middleware) with every context.
   */

  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  /**
   * Since Next.js does server-side rendering, you are REQUIRED to pass
   * `preloadedState` when creating the store.
   */

  const composeEnhancers = isServer
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  if (!isServer) {
    const { persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig = {
      key: 'root',
      storage,
      whitelist: ['auth', 'user'],
    };

    store = createStore(
      persistReducer(persistConfig, rootReducer),
      preloadedState,
      composeEnhancers(applyMiddleware(...middlewares))
    );

    store.__PERSISTOR = persistStore(store);
  } else {
    store = createStore(
      rootReducer,
      preloadedState,
      composeEnhancers(applyMiddleware(sagaMiddleware))
    );
  }

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
