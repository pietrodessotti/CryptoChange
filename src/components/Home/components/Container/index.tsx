import React, { useState } from 'react';
import Modal from 'react-modal';
import { PropCoin } from '../../types';

import { Body } from '../Body';
import Footer from '../Footer';
import { Header } from '../Header';
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
        onOpenNewTransactionModal={handleOpenModal}
        coin={coin}
        // id={id}
        // name={name}
        // price={price}
        // symbol={symbol}
        // website={website}
      />

      <ModalExchange isOpen={modalIsOpen} onRequestClose={handleCloseModal} />

      <Footer />
    </>
  );
};

export default Container;
