import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss';
import { api } from '../../../../services/api';
import { PropCoin } from '../../types';

// type Coins = {
//   id?: string;
//   name?: string;
//   symbol?: string;
//   price?: number;
//   websiteUrl?: string;
// };

type Props = {
  onOpenNewTransactionModal: () => void;
  coin: Array<PropCoin>;

  //   id: string;
  //   name: string;
  //   symbol: string;
  //   price: number;
  //   website: string;
};

/**
 * @export
 * @component
 * @name Body
 *
 * @description
 * Componente responsável por montar o body
 * da home page.
 */
export const Body = ({
  coin,
  //   id,
  //   name,
  //   price,
  //   symbol,
  //   website,
  onOpenNewTransactionModal,
}: Props) => {
  const [cryptoCoins, setCryptoCoins] = useState<PropCoin[]>([]);
  const [typeComercialCoin, setTypeComercialCoin] = useState('USD');

  useEffect(() => {
    api
      .get(`coins?currency=${typeComercialCoin}`)
      .then((response) => setCryptoCoins(response.data.coins));
  }, []);

  return (
    <>
      <div className={styles.test}>
        <button
          onClick={onOpenNewTransactionModal}
          className={styles.buttonBuyCrypto}
        >
          Comprar Crypto
        </button>

        <table className={styles.tableContainer}>
          <thead className={styles.tableHeaderContainer}>
            <th>Nome</th>
            <th>Símbolo</th>
            <th>Preço</th>
            <th>Website Link</th>
          </thead>
          <tbody>
            {cryptoCoins.map((unityCoin) => (
              <tr className={styles.tableBodyContainer} key={unityCoin.id}>
                <td className={styles.nameRow}>{unityCoin.name}</td>
                <td className={styles.nameRow}>
                  {<img src={unityCoin.icon} width="15" />} {unityCoin.symbol}
                </td>
                {/* <td className={styles.nameRow}>{unityCoin.symbol}</td> */}
                <td className={styles.nameRow}>{`R$ ${unityCoin.price?.toFixed(
                  5
                )}`}</td>
                <td className={styles.nameRow}>
                  <a
                    href={unityCoin.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {unityCoin.websiteUrl}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Body;
