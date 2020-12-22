export const Types = {
  GET_INITIAL_DATA: 'app/GET_INITIAL_DATA',
};

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    // case Types.GET_UPDATE_PAGE:
    //   return { ...state, page: action.payload };
    default:
      return state;
  }
}

export const Creators = {
  getInitialData: () => ({
    type: Types.GET_INITIAL_DATA,
  }),
};
