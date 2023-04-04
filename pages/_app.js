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