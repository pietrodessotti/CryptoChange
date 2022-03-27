/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss';
import { api } from '../../../../services/api';
import { PropCoin } from '../../types';
import Image from 'next/image';

type Props = {
  onOpenNewTransactionModal: () => void;
  coin: Array<PropCoin>;
  cryptoCoins: [];
  typeCurrency: string;
  dataCurrency: any;
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
  typeCurrency,
  dataCurrency,
}: Props) => {
  const [cryptoCoins, setCryptoCoins] = useState<PropCoin[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api
      .get(`coins?currency=${typeCurrency}`)
      .then((response) => setCryptoCoins(response.data.coins));
  }, [typeCurrency]);

  console.log(typeCurrency);

  const typeCurrencys = 'BRL';


    const handleSearch = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearch(event.target.value)
    }

    const dataItems = cryptoCoins.filter((item: any) =>
        item.name.includes(search)
    );

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
          <input placeholder='Procurar uma Crypto...' className={styles.inputSearch}
            type='text' onChange={handleSearch} />
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
              <tr  className={styles.tableBodyContainer} key={unityCoin.id}>
                <td className={styles.nameRow}>{unityCoin.name}</td>
                <td className={styles.columnSymbol}>
                  {<img src={unityCoin.icon} width="15" />} {unityCoin.symbol}
                </td>
                <td className={styles.nameRow}>{new Intl.NumberFormat('pt-BR', {
                  style: 'currency', currency: typeCurrencys
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

                <td><button className={styles.buttonBuyCrypto} onClick={onOpenNewTransactionModal} >Negociar</button></td>

                {/* {unityCoin.priceChange1d > 0 ?(

                    <td className={styles.priceChangePositive}>{unityCoin.priceChange1d}</td>
                    ):(
                    <td className={styles.priceChangeNegative}>{unityCoin.priceChange1d}</td>
                    
                  )} */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
