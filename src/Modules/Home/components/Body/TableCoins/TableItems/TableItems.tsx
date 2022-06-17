import React from 'react';

import { useTransactions } from '@Modules/Provider/useTransactions';

import styles from './styles.module.scss';

export type PropCoin = {
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

/**
 * @export
 * @component
 * @name TableItems
 *
 * @description
 * Component responsible for rendering items the table of coins.
 */
export const TableItems = (): JSX.Element => {
  const { handleSetCoinForSelect, dataItems, typeCurrency } = useTransactions();

  return (
    <>
      {dataItems.map(unityCoin => (
        <tr className={styles.tableBodyContainer} key={unityCoin.id}>
          <td className={styles.nameRow}>{unityCoin.name}</td>
          <td className={styles.columnSymbol}>
            {<img src={unityCoin.icon} width="15" />} {unityCoin.symbol}
          </td>
          <td className={styles.nameRow}>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: typeCurrency ? typeCurrency : 'BRL',
            }).format(unityCoin.price)}
          </td>
          <td className={styles.nameRow}>
            <a href={unityCoin.websiteUrl} target="_blank" rel="noreferrer">
              {unityCoin.websiteUrl}
            </a>
          </td>

          <td>
            <button
              key={unityCoin.id}
              className={styles.buttonBuyCrypto}
              onClick={() => handleSetCoinForSelect(unityCoin)}
            >
              Negociar
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};
