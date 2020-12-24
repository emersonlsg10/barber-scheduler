export const Types = {
  GET_REQUEST: 'schedule-list/GET_REQUEST',
  GET_SUCCESS: 'schedule-list/GET_SUCCESS',
  GET_FAILURE: 'schedule-list/GET_FAILURE',
};

const initialState = {
  data: null,
  total: null,
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
  getRequest: formData => ({
    type: Types.GET_REQUEST,
    payload: formData,
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
