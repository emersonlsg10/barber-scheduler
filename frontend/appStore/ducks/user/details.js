export const Types = {
  GET_REQUEST: 'user-details/GET_REQUEST',
  GET_SUCCESS: 'user-details/GET_SUCCESS',
  GET_FAILURE: 'user-details/GET_FAILURE',
  GET_RESET: 'user-details/GET_RESET',
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
      return { ...state, loading: false, error: action.payload };
    case Types.GET_RESET:
      return initialState;
    default:
      return state;
  }
}

export const Creators = {
  getRequest: page => ({
    type: Types.GET_REQUEST,
    payload: { page },
  }),
  getSuccess: ({ data }) => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
  getFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
  getReset: () => ({
    type: Types.GET_RESET,
  }),
};
