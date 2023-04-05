// import { HYDRATE, createWrapper } from 'next-redux-wrapper';
// import userSlice from './User/userSlice';

// const { configureStore, combineReducers } = require('@reduxjs/toolkit');
// import storage from 'redux-persist/lib/storage';
// import persistReducer from 'redux-persist/es/persistReducer';

// import persistStore from 'redux-persist/es/persistStore';

// import { persistStore } from 'redux-persist';

// const combinedReducer = combineReducers({
//   user: userSlice.reducer,
// });

// const store = configureStore({
//   reducer: {
//     user: userSlice.reducer,
//   },
// });

// const persistConfig = {
//   key: 'nextjs',
//   storage,
// };

// const masterReducer = (state, action) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state,
//       ...action.payload,
//     };
//     return nextState;
//   } else {
//     return combinedReducer(state, action);
//   }
// };
// const persistedReducer = persistReducer(persistConfig, masterReducer);

// const store = () => {
//   return configureStore({
//     reducer: {
//       user: persistedReducer,
//     },
//   });
// };

// const store = configureStore({
//   reducer:{
//     user: persistedReducer,
//   }
// });
// const persistor = persistStore(initStore);
// export default store;
// store.__persistor = persistStore(store);

// export default store;
// export const wrapper = createWrapper(store);

import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import user from './User/userSlice';
import { message } from 'antd';

const { configureStore, combineReducers } = require('@reduxjs/toolkit');

const combinedReducer = combineReducers({
  user,
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
      // user: { 
      //   data: [ ...action.payload.reducer.user.data, ...state.user.data ],
      // },
      // ...action.payload
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const initStore = () => {
  return configureStore({
    reducer: {
      reducer: masterReducer,
    },
  });
};
// export default store;

export const wrapper = createWrapper(initStore);
