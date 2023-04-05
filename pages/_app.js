// import { wrapper } from '@/Redux/store';
// import '@/styles/globals.scss';
// import { Provider, useStore } from 'react-redux';
// // import persistStore from 'redux-persist/es/persistStore';
// import { persistStore } from 'redux-persist';

// import { PersistGate } from 'redux-persist/integration/react';
// // let persistor=persistStore(store)
// function App({ Component, pageProps }) {
//   const store = useStore((state) => state);
//   // return (
//   //   <Provider store={store}>
//   //     <Component {...pageProps} />
//   //   </Provider>
//   // );
//   return (
//     <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
//       <Component {...pageProps} />
//     </PersistGate>
//   );
// }

// export default wrapper.withRedux(App);

import  { wrapper } from '@/Redux/store';
import '@/styles/globals.scss';
import { Provider } from 'react-redux';

 function App({ Component, pageProps }) {
  // return (
  //   <Provider store={store}>
  //     <Component {...pageProps} />
  //   </Provider>
  // );

  return <Component {...pageProps} />
}

export default wrapper.withRedux(App);
