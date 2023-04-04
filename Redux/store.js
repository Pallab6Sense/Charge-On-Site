import userSlice from './User/userSlice';

const { configureStore } = require('@reduxjs/toolkit');

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
