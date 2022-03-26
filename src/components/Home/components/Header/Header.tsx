import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';

import { CartContext } from '../../../context/TransactionsContext';
import styles from './styles.module.scss';
import { comercialCoin } from '../../../../services/api';

type ComercialCoins = {
  base_code: string;
  conversion_rates: {
    key: string;
    value: string;
  };
  typeCurrency: string;
};

/**
 * @export
 * @component
 * @name Header
 *
 * @description
 * Componente responsável por montar o Header da aplicação.
 */
export const Header = () => {
  const [typeCurrency, setTypeCurrency] = useState('');

  const [convertComercialCoin, setConvertComercialCoin] = useState<
    ComercialCoins[]
  >([]);

  useEffect(() => {
    comercialCoin
      .get(
        `https://v6.exchangerate-api.com/v6/c87de6b059e6791749e979f7/latest/BRL`
      )
      .then((response) =>
        setConvertComercialCoin(response.data.conversion_rates)
      );
  }, []);

  const convertAll = Object.entries(convertComercialCoin);

  const handleChangeValue = (e: any) => {
    setTypeCurrency(e.target.value);
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image
          src="/images/logotipo-ethereum.png"
          alt="Logotipo do CryptoChange"
          width={40}
          height={40}
        />
        <a href="">CryptoChange</a>
        <nav>
          <a href="">Home</a>
          <a href="">Exchenge</a>
        </nav>

        <select value={typeCurrency} onChange={handleChangeValue} name="select">
          {convertAll.map((comercialCoin) => (
            <>
              <option value="BRL" hidden>
                BRL
              </option>
              <option>{comercialCoin[0]}</option>
            </>
          ))}
        </select>
      </div>
    </header>
  );
};
