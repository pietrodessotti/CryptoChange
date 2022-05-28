import React from 'react';

import { useTransactions } from '../../../Provider/useTransactions';
import Body from '../Body';
import Footer from '../../../../components/Footer';
import Header from '../../../../components/Header';
import ModalExchange from '../ModalExchange';
import { ConvertReturnAPI } from '../../../Provider/types';

/**
 * @export
 * @component
 * @name Container
 *
 * @description
 * Esse componente irá carregar os dados de Header e Body
 */
export const Container = (): JSX.Element => {
  const { handleSetCoinForSelect, handleCloseModal, modalIsOpen, typeCurrency, newConvert, handleChangeValue, updatedValue } = useTransactions();

  return (
    <>
      <Header typeCurrency={typeCurrency} arrTypeCurrency={newConvert}
        handleChangeValue={handleChangeValue} totalTransactions={updatedValue}
      />
      <Body
        onOpenNewTransactionModal={handleSetCoinForSelect}
      />
      <ModalExchange isOpen={modalIsOpen} onRequestClose={handleCloseModal} />

      <Footer />
    </>
  );
};
