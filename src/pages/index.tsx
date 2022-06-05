import { GetServerSideProps } from 'next';

import { api, comercialCoin } from '@services/api';
import Home from '@Home/index';
import { TransactionsProvider } from '@Provider/index';

type Coin = {
  id: string;
  name: string;
  price: number;
  priceChange1d: number;
  priceChange1h: number;
  priceChange1w: number;
  symbol: string;
  icon: string;
  websiteUrl: string;
};

export type FiduciaryConvert = {
  name: string | any;
  price: number | any;
};

type Props = {
  coin: Array<Coin>;
  fiduciary: Array<FiduciaryConvert>;
};

/**
 * @component
 * @component
 * @name InitialPage
 *
 * @description
 * Responsible for the page what will be loaded
 * on the server side.
 */
export default function InitialPage({ coin, fiduciary }: Props): JSX.Element {
  return (
    <TransactionsProvider firstCoins={coin} fiduciary={fiduciary}>
      <Home />
    </TransactionsProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const dataCurrency = api
    .get(`coins?currency=BRL`)
    .then((response) => response.data.coins);

  // Fetch data from external API
  const typeCurrency = comercialCoin
    .get(
      `https://v6.exchangerate-api.com/v6/c87de6b059e6791749e979f7/latest/BRL`
    )
    .then((response) => response.data.conversion_rates);

  // Pass data to the page via props
  return {
    props: {
      coin: await dataCurrency,
      fiduciary: await typeCurrency,
    },
  };
};
