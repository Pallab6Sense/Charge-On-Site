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
import storage from 'redux-persist/lib/storage';
const { configureStore, combineReducers } = require('@reduxjs/toolkit');

const combinedReducer = combineReducers({
  user,
});

// const store = configureStore({
//   reducer: {
//     user: userSlice.reducer,
//   },
// });

// const masterReducer = (state, action) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state,
//       // user: { 
//       //   data: [ ...action.payload.reducer.user.data, ...state.user.data ],
//       // },
//       ...action.payload
//     };
//     return nextState;
//   } else {
//     return combinedReducer(state, action);
//   }
// };

// const initStore = () => {
//   return configureStore({
//     reducer: {
//       reducer: masterReducer,
//     },
//   });
// };
// // export default store;

// export const wrapper = createWrapper(initStore);

const makeStore = ({ isServer }) => {
  if (isServer) {
    //If it's on server side, create a store
    return configureStore(combinedReducer);
  } else {
    //If it's on client side, create a store which will persist
    const { persistStore, persistReducer } = require('redux-persist');

    const persistConfig = {
      key: 'nextjs',
      // whitelist: ['counter'], // only counter will be persisted, add other reducers if needed
      storage, // if needed, use a safer storage
    };

    const persistedReducer = persistReducer(persistConfig, combinedReducer); // Create a new reducer with our existing reducer

    const store = configureStore({
            reducer: {
              reducer: persistedReducer,
            },
          
          }); // Creating the store again

    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    return store;
  }
};

// Export the wrapper & wrap the pages/_app.js with this wrapper only
export const wrapper = createWrapper(makeStore);
