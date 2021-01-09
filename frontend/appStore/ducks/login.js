export const Types = {
  GET_REQUEST: 'login/GET_REQUEST',
  GET_SUCCESS: 'login/GET_SUCCESS',
  GET_FAILURE: 'login/GET_FAILURE',

  GET_REDIRECT: 'login/GET_REDIRECT',
};

const initialState = {
  loading: false,
  error: null,
  redirect: '/',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return { ...state, loading: true, error: null };
    case Types.GET_SUCCESS:
      return {
        loading: false,
        error: null,
      };
    case Types.GET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case Types.GET_REDIRECT:
      return { ...state, redirect: action.payload };
    default:
      return state;
  }
}

export const Creators = {
  getLoginRequest: ({ email, password }) => ({
    type: Types.GET_REQUEST,
    payload: { email, password },
  }),
  getLoginSuccess: () => ({
    type: Types.GET_SUCCESS,
  }),
  getLoginFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
  getLoginRedirect: slug => ({
    type: Types.GET_REDIRECT,
    payload: slug,
  }),
};
