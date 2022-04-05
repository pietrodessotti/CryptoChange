import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';

import styles from './styles.module.scss';
import { useTransactions } from '../../../Provider/useTransactions';

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
  const { coinSelected, typeCurrency, handleCreateNewTransaction, dataItems } = useTransactions();
  const { register } = useForm();
  const [valueInputQuantity, setValueInputQuantity] = useState(0);

  const dataItemsValue = dataItems.map((item) => item.priceChange1d);

  const sortFunction = (a: number, b: number) => {
    return b - a;
  };


  // console.log(dataItemsValue.sort(sortFunction));

  return (
    <div className={styles.modal}>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <form onSubmit={handleCreateNewTransaction}>
          <div>
            <select className={styles.selectCoin} {...register('nameCrypto')} disabled>
              <option value={coinSelected.name}>
                {coinSelected.name}
              </option>
            </select>

            <label htmlFor='quantityOfCoins' className={styles.label}>
              Quantidade de moedas
              <input
                placeholder="Quantidade de moedas"
                min={0.00001}
                step={0.00001}
                className={styles.inputValue}
                type="number"
                {...register('quantity')}
                onChange={(e => setValueInputQuantity(Number(e.target.value)))}
                value={valueInputQuantity}
                required
              />
            </label>

            <p>O preço dessa moeda variou em {coinSelected.priceChange1d} no último dia</p>

            <select className={styles.totalWithSelect} {...register('referencePrice')} disabled>
              <option value={coinSelected.price * valueInputQuantity || 0}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency', currency: typeCurrency ? typeCurrency : 'BRL'
                }).format(coinSelected.price * valueInputQuantity || 0)}
              </option>
            </select>

            <div className={styles.formButtons}>
              <button onClick={onRequestClose} className={styles.cancelButton}>
                Cancelar
              </button>
              <button type="submit" className={styles.submitButton}>
                Comprar
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
