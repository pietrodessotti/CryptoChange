import React from 'react';

import { useTransactions } from '@Provider/useTransactions';
import Footer from '@components/Footer';
import Header from '@components/Header';

import Body from '../Body';
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
  const {
    handleCloseModal,
    modalIsOpen,
    typeCurrency,
    newConvert,
    handleChangeValue,
    updatedValue,
  } = useTransactions();

  return (
    <>
      <Header
        typeCurrency={typeCurrency}
        arrTypeCurrency={newConvert}
        handleChangeValue={handleChangeValue}
        totalTransactions={updatedValue}
      />
      <Body />
      <ModalExchange isOpen={modalIsOpen} onRequestClose={handleCloseModal} />

      <Footer />
    </>
  );
};
