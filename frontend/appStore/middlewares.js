import api from 'services/api';

/**
 * Busca dados do usuario na store e adiciona na instancia da API
 * @param {function} store
 */
const authMiddleware = store => next => action => {
  const { auth } = store.getState();
  if (auth.token) {
    api.setHeader('Authorization', auth.token);
  }
  next(action);
};

export { authMiddleware };
