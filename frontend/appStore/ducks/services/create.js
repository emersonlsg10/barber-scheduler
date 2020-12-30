export const Types = {
  GET_REQUEST: 'services-create/GET_REQUEST',
  GET_SUCCESS: 'services-create/GET_SUCCESS',
  GET_FAILURE: 'services-create/GET_FAILURE',
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
        total: action.payload.total,
      };
    case Types.GET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export const Creators = {
  getRequest: FormData => ({
    type: Types.GET_REQUEST,
    payload: FormData,
  }),
  getSuccess: ({ data, total }) => ({
    type: Types.GET_SUCCESS,
    payload: { data, total },
  }),
  getFailure: error => ({
    type: Types.GET_FAILURE,
    payload: error,
  }),
};
