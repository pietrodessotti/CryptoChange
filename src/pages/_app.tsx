import { AppProps } from 'next/app'
import { CartContext } from '../components/context/TransactionsContext';
import { Home } from '../components/Home';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartContext.Provider value={[]}>
      <Home />
      <Component {...pageProps} />
    </CartContext.Provider>
  )
}

export default MyApp
