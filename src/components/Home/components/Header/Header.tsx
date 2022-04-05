import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import styles from './styles.module.scss';
import { useTransactions } from '../../../Provider/useTransactions';
import { api, apiLocal } from '../../../../services/api';

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

  // const [ dataValues, setDataValues ] = useState({});

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await apiLocal.get(`transactions`);
  //     setDataValues(response.data);
  //   };
  //   fetchData();
  // }, []);

  // console.log(dataValues)

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
        <>
          <div className={styles.headerCurrency}>
            <p>{`${new Intl.NumberFormat('pt-BR', {
              style: 'currency', currency: typeCurrency ? typeCurrency : 'BRL'
            }).format(values[0].total || 0)
              }`}</p>

          </div>

          <select value={typeCurrency} onChange={handleChangeValue}>
            {newConvert.map((comercialCoin) => (
              <>
                <option>{comercialCoin.name}</option>
              </>
            ))}
          </select>
        </>
      </div>
    </header>
  );
};
