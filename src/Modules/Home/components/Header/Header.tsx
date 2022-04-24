import React from 'react';
import Image from 'next/image';

import styles from './styles.module.scss';
import { useTransactions } from '../../../Provider/useTransactions';
import Link from 'next/link';
import TransactionsPage from '../../../Transactions';


/**
 * @export
 * @component
 * @name Header
 *
 * @description
 * Componente responsável por montar o Header da aplicação.
 */
export const Header = () => {
  const { typeCurrency, newConvert, handleChangeValue, values } = useTransactions();

  const newMapTransactions = values.map((item) => item.total);

  const totalTransactions = newMapTransactions.reduce((totalArr: number, itemArr: number) => {
    const newTotal = totalArr + itemArr;
    return newTotal;
  }, 0);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image
          src="/images/logotipo-ethereum.png"
          alt="Logotipo do CryptoChange"
          width={40}
          height={40}
        />
        <Link href="/">CryptoChange</Link>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/">Exchenge</Link>
        </nav>
        <>
          <div className={styles.headerCurrency}>
            <p>{`${new Intl.NumberFormat('pt-BR', {
              style: 'currency', currency: typeCurrency ? typeCurrency : 'BRL'
            }).format(totalTransactions)
              }`}</p>
          </div>

          <select value={typeCurrency} onChange={handleChangeValue}>
            {newConvert?.map((comercialCoin) => (
                <option key={comercialCoin.name}>{comercialCoin.name}</option>
            ))}
          </select>
        </>
      </div>
    </header>
  );
};
