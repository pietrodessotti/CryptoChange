import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Container from '../components/Home/components/Container';
import { PropCoin } from '../components/Home/types';

import { api } from '../services/api';

// type allProps = {
//   id: string;
//   name: string;
//   price: number;
//   priceChange1d: number;
//   priceChange1h: number;
//   priceChange1w: number;
//   symbol: string;
//   websiteUrl: string;
// };

type HomeProps = {
  coins: Array<PropCoin>;
  // id: string;
  // name: string;
  // price: number;
  // priceChange1d: number;
  // priceChange1h: number;
  // priceChange1w: number;
  // symbol: string;
  // website: string;
};

export const Home = ({ coins }: HomeProps) => {
  return (
    <>
      <Head>
        <title>Home - CryptoChange</title>
      </Head>

      {/* <body>
        {coins.map((item) => (
          <>
            <p>{item.id}</p>
            <p>{item.name}</p>
            <p>{item.price}</p>
          </>
        ))}
      </body> */}

      {/* <main>
        <Container
          coin={coins}
          // id={coins.id}
          // name={coins.name}
          // price={coins.price}
          // priceChange1d={coins.priceChange1d}
          // priceChange1h={coins.priceChange1h}
          // priceChange1w={coins.priceChange1w}
          // symbol={coins.symbol}
          // website={coins.website}
        />
      </main> */}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const crypto = await api.get('coins?currency=BRL');

  const coins = {
    data: crypto.data.coins,
    // name: crypto.data.name,
    // price: crypto.data.price,
    // priceChangeHour: crypto.data.priceChange1h,
    // priceChangeDay: crypto.data.priceChange1d,
    // priceChangeWeek: crypto.data.priceChange1w,
    // symbol: crypto.data.symbol,
    // website: crypto.data.websiteUrl,
  };

  return {
    props: {
      coins,
    },
  };
};

export default Home;
