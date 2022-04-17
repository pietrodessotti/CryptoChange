/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';

import styles from './styles.module.scss';
import { useTransactions } from '../../../Provider/useTransactions';
import { Accordion } from '@chakra-ui/react';

type Props = {
  onOpenNewTransactionModal: (coin: any) => void;
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
  onOpenNewTransactionModal,
}: Props) => {
  const { handleSearch, dataItems, typeCurrency, messageSuccess, values } = useTransactions();

  return (
    <>
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

          <h1 className={styles.titleTable}>Sua casa de compra e venda de CryptoMoedas</h1>
          <input id="inputSearch" placeholder='Procurar uma Crypto...' className={styles.inputSearch}
            type='search' onChange={handleSearch} />
        </div>

        <table className={styles.tableContainer}>
          <thead className={styles.tableHeaderContainer}>
            <th>Nome</th>
            <th>Símbolo</th>
            <th>Preço</th>
            <th>Website Link</th>
            <th className={styles.buyCriypto}>Negociar Crypto</th>
          </thead>
          <tbody>

            {dataItems.map((unityCoin) => (
              <tr className={styles.tableBodyContainer} key={unityCoin.id}>
                <td className={styles.nameRow}>{unityCoin.name}</td>
                <td className={styles.columnSymbol}>
                  {<img src={unityCoin.icon} width="15" />} {unityCoin.symbol}
                </td>
                <td className={styles.nameRow}>{new Intl.NumberFormat('pt-BR', {
                  style: 'currency', currency: typeCurrency ? typeCurrency : 'BRL'
                }).format(unityCoin.price)
                }</td>
                <td className={styles.nameRow}>
                  <a
                    href={unityCoin.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {unityCoin.websiteUrl}
                  </a>
                </td>

                <td>
                  <button key={unityCoin.id} className={styles.buttonBuyCrypto}
                    onClick={() => onOpenNewTransactionModal(unityCoin)}>
                    Negociar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {dataItems.length === 0 && (
          <p className={styles.MessageNoneCrypto}>
            Ops, não há nada aqui.{' '}
            <a href="#inputSearch" className={styles.referenceInputSearch}>
              Tente outro termo de pesquisa.
            </a>
          </p>
        )}

      </div>
      <div>
        {values.map((item) => (
          <>
            <p>{item.name}</p>
            <p>{item.quantity}</p>
            <p>{item.id}</p>
            <p>{item.fiduciary === '' ? 'BRL' : item.fiduciary}</p>
            <p>{item.total}</p>
          </>
        ))}
      </div>
    </>
  );
};
