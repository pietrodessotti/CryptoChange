import React, { useState } from 'react';
import Modal from 'react-modal';

import styles from './styles.module.scss';
import BuyCryptocurrenciesTab from './components/BuyCryptocurrenciesTab';
import SellCryptocurrenciesTab from './components/SellCryptocurrenciesTab';
import { useTransactions } from '@Modules/Provider/useTransactions';

type PropsModal = {
  isOpen: boolean;
  onRequestClose: () => void;
};

/**
 * @export
 * @component
 * @name ModalExchange
 *
 * @description
 * Componente responsável pelo modal de compra.
 */
export const ModalExchange = ({
  isOpen,
  onRequestClose,
}: PropsModal): JSX.Element => {
  const { handleChangeTabSell, handleChangeTabBuy, activeTab } =
  useTransactions();

  return (
    <div className={styles.modal}>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        ariaHideApp={false}
      >
        <div className={styles.controllerTabModal}>
          <p className={activeTab === 'buy' ? styles.active : ''} id="TabContentBuy" onClick={handleChangeTabBuy}>
            Comprar
          </p>
          <p className={activeTab === 'sell' ? styles.active : ''} id="TabContentSell" onClick={handleChangeTabSell}>
            Vender
          </p>
          </div>

        {activeTab === 'buy' ? (
          <BuyCryptocurrenciesTab />
        ) : (
          <SellCryptocurrenciesTab />
        )}
      </Modal>
    </div>
  );
};
