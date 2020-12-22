export const Types = {
  GET_REQUEST: 'users/GET_REQUEST',
  GET_SUCCESS: 'users/GET_SUCCESS',
  GET_FAILURE: 'users/GET_FAILURE',
};

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return { ...state, loading: true, error: null };
    case Types.GET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        users: action.payload.users,
      };
    case Types.GET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export const Creators = {
  getRequest: page => ({
    type: Types.GET_REQUEST,
    payload: { page },
  }),
  getSuccess: users => ({
    type: Types.GET_SUCCESS,
    payload: { users },
  }),
  getFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
};
