/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';

import { useTransactions } from '@Provider/useTransactions';

import styles from './styles.module.scss';
import TableCoins from './TableCoins';

/**
 * @export
 * @component
 * @name Body
 *
 * @description
 * Componente responsável por montar o body
 * da home page.
 */
export const Body = () => {
  const { dataItems } = useTransactions();

  return (
    <>
      <TableCoins />
      {dataItems.length === 0 && (
        <p className={styles.MessageNoneCrypto}>
          Ops, não há nada aqui.{' '}
          <a href="#inputSearch" className={styles.referenceInputSearch}>
            Tente outro termo de pesquisa.
          </a>
        </p>
      )}
    </>
  );
};
