export const Types = {
  GET_REQUEST: 'user-register/GET_REQUEST',
  GET_SUCCESS: 'user-register/GET_SUCCESS',
  GET_FAILURE: 'user-register/GET_FAILURE',
};

const initialState = {
  users: null,
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
  getRequest: formData => ({
    type: Types.GET_REQUEST,
    payload: formData,
  }),
  getSuccess: (data, total) => ({
    type: Types.GET_SUCCESS,
    payload: { data, total },
  }),
  getFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
};
