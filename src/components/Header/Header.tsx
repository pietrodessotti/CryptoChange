import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './styles.module.scss';

type FiduciaryCoin = {
  name: string;
  price: number | string;
};

type Props = {
  typeCurrency: string;
  handleChangeValue: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  arrTypeCurrency: Array<FiduciaryCoin>;
  totalTransactions: number;
};

/**
 * @export
 * @component
 * @name Header
 *
 * @description
 * Componente responsável por montar o Header da aplicação.
 */
export const Header = ({
  typeCurrency,
  arrTypeCurrency,
  totalTransactions,
  handleChangeValue,
}: Props) => {
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
          <Link href="/Transactions">Exchenge</Link>
        </nav>
        <div>
          <div className={styles.headerCurrency}>
            <p>{`${new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: typeCurrency ? typeCurrency : 'BRL',
            }).format(totalTransactions)}`}</p>
          </div>

          <select value={typeCurrency} onChange={handleChangeValue}>
            {arrTypeCurrency?.map(comercialCoin => (
              <option key={comercialCoin.name}>{comercialCoin.name}</option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};
