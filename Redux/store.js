import { createWrapper } from 'next-redux-wrapper';
import user from './User/userSlice';
import property from './PropertyList/propertySlice';
import company from './AdvanceFilter/Company/companySlice';
import storage from 'redux-persist/lib/storage';
const { configureStore, combineReducers } = require('@reduxjs/toolkit');

const combinedReducer = combineReducers({
  user,
  property,
  company,
});

const makeStore = ({ isServer }) => {
  if (isServer) {
    return configureStore(combinedReducer);
  } else {
    const { persistStore, persistReducer } = require('redux-persist');

    const persistConfig = {
      key: 'nextjs',
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, combinedReducer); // Create a new reducer with our existing reducer

    const store = configureStore({
      reducer: {
        reducer: persistedReducer,
      },
    });

    store.__persistor = persistStore(store);
    return store;
  }
};

export const wrapper = createWrapper(makeStore);
