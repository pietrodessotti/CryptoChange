import React from 'react';
import { useTransactions } from '../../../Provider/useTransactions';

import Body from '../Body';
import Footer from '../Footer';
import Header from '../Header';
import ModalExchange from '../ModalExchange';

/**
 * @export
 * @component
 * @name Container
 *
 * @description
 * Esse componente irá carregar os dados de Header e Body
 */
export const Container = (): JSX.Element => {
  const { handleSetCoinForSelect, handleCloseModal, modalIsOpen } = useTransactions();

  return (
    <>
      <Header />
      <Body
        onOpenNewTransactionModal={handleSetCoinForSelect}
      />
      <ModalExchange isOpen={modalIsOpen} onRequestClose={handleCloseModal} />

      <Footer />
    </>
  );
};
