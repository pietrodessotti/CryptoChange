/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import styles from './styles.module.scss';
import { useTransactions } from '../../../Provider/useTransactions';

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


type Props = {
  onOpenNewTransactionModal: (coin: PropCoin) => void;
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
  const { handleSearch, dataItems, typeCurrency, values } = useTransactions();

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

        {/* <table>
          <thead>
            <tr className={styles.skeletonLine}>
              <Skeleton width={200} height={25} style={{margin: '0 60px 0 20px'}} />
              <Skeleton width={80} height={25} style={{margin: '0 100px 0 20px'}} />
              <Skeleton width={120} height={25} style={{margin: '0 55px 0 20px'}} />
              <Skeleton width={250} height={25} style={{margin: '0 60px 0 20px'}} />
              <Skeleton width={110} height={25} style={{margin: '0 0 0 20px'}} />
            </tr>
          </thead>
        </table> */}
        <table className={styles.tableContainer}>
          <thead className={styles.tableHeaderContainer}>
            <tr className={styles.lineHeaderTable}>
              <th>Nome</th>
              <th>Símbolo</th>
              <th>Preço</th>
              <th>Website Link</th>
              <th className={styles.buyCriypto}>Negociar Crypto</th>
            </tr>
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
      {/* <div>
        {values.map((item) => (
          <>
            <p>{item.name}</p>
            <p>{item.quantity}</p>
            <p>{item.id}</p>
            <p>{item.fiduciary === '' ? 'BRL' : item.fiduciary}</p>
            <p>{item.total}</p>
          </>
        ))}
      </div> */}
    </>
  );
};
