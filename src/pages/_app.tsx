import { AppProps } from 'next/app'
import { Home } from '../components/Home';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <CartContext.Provider value={[]}>
    <>
      <Home />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
