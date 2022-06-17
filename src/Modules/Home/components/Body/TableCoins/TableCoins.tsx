import React from 'react';
import Image from 'next/image';

import { useTransactions } from '@Modules/Provider/useTransactions';

import TableBody from './TableBody';
import TableHeader from './TableHeader';
import styles from './styles.module.scss';

/**
 * @export
 * @component
 * @name TableCoins
 *
 * @description
 * Component responsible for rendering the table of coins.
 */
export const TableCoins = (): JSX.Element => {
  const { handleSearch } = useTransactions();

  return (
    <div className={styles.container}>
      <div className={styles.containerTitleTable}>
        <div className={styles.imageLogo}>
          <Image
            src="/favicon.ico"
            alt="Logotipo do CryptoChange"
            width={30}
            height={30}
          />
        </div>

        <h1 className={styles.titleTable}>
          Sua casa de compra e venda de CryptoMoedas
        </h1>
        <input
          id="inputSearch"
          placeholder="Procurar uma Crypto..."
          className={styles.inputSearch}
          type="search"
          onChange={handleSearch}
        />
      </div>
      <table className={styles.tableContainer}>
        <TableHeader />
        <TableBody />
      </table>
    </div>
  );
};
