import { AppProps } from 'next/app'
import { CartContext } from '../components/context/TransactionsContext';
import { Header } from '../components/Header';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartContext.Provider value={[]}>
        <Header />
        <Component {...pageProps} />
    </CartContext.Provider>
  )
}

export default MyApp
