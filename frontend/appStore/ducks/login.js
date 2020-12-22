export const Types = {
  GET_REQUEST: 'login/GET_REQUEST',
  GET_SUCCESS: 'login/GET_SUCCESS',
  GET_FAILURE: 'login/GET_FAILURE',

  GET_LOGOUT_REQUEST: 'login/GET_LOGOUT_REQUEST',
};

const initialState = {
  loading: false,
  error: null,
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
  getLogoutRequest: () => ({
    type: Types.GET_LOGOUT_REQUEST,
  }),
};
