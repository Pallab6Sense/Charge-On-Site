import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import userSlice from './User/userSlice';

const { configureStore, combineReducers } = require('@reduxjs/toolkit');

const combinedReducer = combineReducers({
  user: userSlice.reducer,
});

// const store = configureStore({
//   reducer: {
//     user: userSlice.reducer,
//   },
// });

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const initStore = () => {
  return configureStore({
    reducer: {
      user: masterReducer,
    },
  });
};
// export default store;

export const wrapper = createWrapper(initStore);
