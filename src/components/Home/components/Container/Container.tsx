import React, { useState } from 'react';
import { PropCoin } from '../../types';

import Body from '../Body';
import Footer from '../Footer';
import Header from '../Header';
import ModalExchange from '../ModalExchange';

// interface PropCoin {
//   id: string;
//   name: string;
//   price: number;
//   priceChange1d: number;
//   priceChange1h: number;
//   priceChange1w: number;
//   symbol: string;
//   websiteUrl: string;
// }

type PropCoins = {
  coin: Array<PropCoin>;
  typeCurrency: string;
  dataCurrency: any;
};

/**
 * @export
 * @component
 * @name Container
 *
 * @description
 * Esse componente irá carregar os dados de Header e Body
 *
 */
export const Container = ({
  coin,
  typeCurrency,
  dataCurrency,
}: //   id,
//   name,
//   price,
//   priceChange1d,
//   priceChange1h,
//   priceChange1w,
//   symbol,
//   website,
PropCoins): JSX.Element => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  /**
   * @function
   * @name handleOpenModal
   *
   * @description
   * Função responsável por abrir o modal de
   * compra.
   */
  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  /**
   * @function
   * @name handleOpenModal
   *
   * @description
   * Função responsável por fechar o modal de
   * compra.
   */
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Header />
      <Body
        dataCurrency={dataCurrency}
        typeCurrency={typeCurrency}
        cryptoCoins={[]}
        onOpenNewTransactionModal={handleOpenModal}
        coin={coin}
      />

      <ModalExchange isOpen={modalIsOpen} onRequestClose={handleCloseModal} />

      <Footer />
    </>
  );
};
