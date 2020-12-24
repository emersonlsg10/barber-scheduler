export const Types = {
  GET_REQUEST: 'user-register/GET_REQUEST',
  GET_SUCCESS: 'user-register/GET_SUCCESS',
  GET_FAILURE: 'user-register/GET_FAILURE',
};

const initialState = {
  data: null,
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
        data: action.payload.data,
      };
    case Types.GET_FAILURE:
      return { ...state, loading: false, data: null, error: action.payload };
    default:
      return state;
  }
}

export const Creators = {
  getRequest: formData => ({
    type: Types.GET_REQUEST,
    payload: formData,
  }),
  getSuccess: data => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
  getFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
};
