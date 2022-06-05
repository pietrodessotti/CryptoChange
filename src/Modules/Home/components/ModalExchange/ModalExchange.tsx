import React, { useState } from 'react';
import Modal from 'react-modal';

import styles from './styles.module.scss';
import BuyCryptocurrenciesTab from './components/BuyCryptocurrenciesTab';
import SellCryptocurrenciesTab from './components/SellCryptocurrenciesTab';

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
  const [activeTab, setActiveTab] = useState('buy');

  const handleChangeTabBuy = () => {
    setActiveTab('buy');
  };

  const handleChangeTabSell = () => {
    setActiveTab('sell');
  };

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
          <p id="TabContentBuy" onClick={handleChangeTabBuy}>
            Comprar
          </p>
          <p id="TabContentSell" onClick={handleChangeTabSell}>
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
