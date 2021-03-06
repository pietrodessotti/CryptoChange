// import { GetServerSideProps } from 'next';
// import Head from 'next/head';
// import Container from '../components/Home/components/Container';
// import { PropCoin } from '../components/Home/types';
// import { api, comercialCoin } from '../services/api';

// // type allProps = {
// //   id: string;
// //   name: string;
// //   price: number;
// //   priceChange1d: number;
// //   priceChange1h: number;
// //   priceChange1w: number;
// //   symbol: string;
// //   websiteUrl: string;
// // };

// type HomeProps = {
//   coins: Array<PropCoin>;

//   onOpenNewTransactionModal: () => void;
//   coin: Array<PropCoin>;
//   cryptoCoins: [];
//   dataCurrency: any;
//   typeCurrency: any;

//   //   id: string;
//   //   name: string;
//   //   symbol: string;
//   //   price: number;
//   //   website: string;
//   // id: string;
//   // name: string;
//   // price: number;
//   // priceChange1d: number;
//   // priceChange1h: number;
//   // priceChange1w: number;
//   // symbol: string;
//   // website: string;
// };

// export default function Home({
//   coins,
//   coin,
//   dataCurrency,
//   typeCurrency,
//   onOpenNewTransactionModal,
//   cryptoCoins,
// }: HomeProps) {
//   return (
//     <>
//       <Head>
//         <title>Home - CryptoChange</title>
//       </Head>

//       <Container
//         coin={coin}
//         typeCurrency={typeCurrency}
//         dataCurrency={dataCurrency}
//       />

//       {/* <header className={styles.headerContainer}>
//         <div className={styles.headerContent}>
//           <Image
//             src="/images/logotipo-ethereum.png"
//             alt="Logotipo do CryptoChange"
//             width={40}
//             height={40}
//           />
//           <a href="">CryptoChange</a>
//           <nav>
//             <a href="">Home</a>
//             <a href="">Exchenge</a>
//           </nav>

//           <select
//             value={typeCurrency}
//             onChange={handleChangeValue}
//             name="select"
//           >
//             {convertAll.map((comercialCoin) => (
//               <>
//                 <option value="BRL" hidden>
//                   BRL
//                 </option>
//                 <option>{comercialCoin[0]}</option>
//               </>
//             ))}
//           </select>
//         </div>
//       </header> */}

//       {/* <Body
//         coin={coin}
//         cryptoCoins={cryptoCoins}
//         onOpenNewTransactionModal={onOpenNewTransactionModal}
//         typeCurrency={typeCurrency}
//         dataCurrency={dataCurrency}
//       /> */}
//       {/* <body>
//         {coins.map((item) => (
//           <>
//             <p>{item.id}</p>
//             <p>{item.name}</p>
//             <p>{item.price}</p>
//           </>
//         ))}
//       </body> */}

//       {/* <main>
//         <Container
//           coin={coins}
//           // id={coins.id}
//           // name={coins.name}
//           // price={coins.price}
//           // priceChange1d={coins.priceChange1d}
//           // priceChange1h={coins.priceChange1h}
//           // priceChange1w={coins.priceChange1w}
//           // symbol={coins.symbol}
//           // website={coins.website}
//         />
//       </main> */}
//     </>
//   );
// }

import { GetServerSideProps } from 'next';
// import { createServer, Model } from 'miragejs';

import { api, comercialCoin } from '../services/api';
import Home from '../Modules/Home/index';
import { TransactionsProvider } from '../Modules/Provider';
import TransactionsPage from '../Modules/Transactions';

// createServer({
//   models: {
//     transaction: Model,
//   },

//   seeds(server) {
//     server.db.loadData({
//       transactions: [
//         {
//           id: 1,
//           name: 'Bitcoin',
//           quantity: 1,
//           total: 1000,
//         },
//         {
//           id: 2,
//           name: 'Ethereum',
//           quantity: 1,
//           total: 1000,
//         },
//       ],
//     })
//   },

//   routes() {
//     this.namespace = 'api';

//     this.get('transactions', () => {
//       return this.schema.all('transaction')
//     });
//     this.post('/transactions', (schema, request) => {
//       const data = JSON.parse(request.requestBody);

//       return schema.create('transaction', data);
//     });
//   },
// });

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
}

export type FiduciaryConvert = {
  name: string | any;
  price: number | any;
}

type Props = {
  coin: Array<Coin>;
  fiduciary: Array<FiduciaryConvert>;
}

/**
 * @component
 * @component
 * @name InitialPage
 * 
 * @description
 * Respons??vel pela p??gina que renderiza
 * a Home e cuida do do SSR
 */
export default function InitialPage({ coin, fiduciary }: Props): JSX.Element {

  return (
    <TransactionsProvider firstCoins={coin} fiduciary={fiduciary} >
      <Home />
    </TransactionsProvider>
  )
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
    }
  };
};