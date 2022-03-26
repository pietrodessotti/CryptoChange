import React, { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Modal from 'react-modal';

import styles from './styles.module.scss';
// import { api } from '../../../../services/api';
import { PropCoin } from '../../types';
import { Chart } from 'chart.js';

type PropsModal = {
  isOpen: boolean;
  onRequestClose: () => void;
};

interface PropsForm {
  nameCrypto?: string;
}

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
  const { register, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<PropsForm> = (data) => console.log(data);

  const [cryptoCoins, setCryptoCoins] = useState<PropCoin[]>([]);
  // const [typeComercialCoin, setTypeComercialCoin] = useState('USD');

  // const [selectCoin, setSelectCoin] = useState('');
  // const [quantityCoin, setQuantityCoin] = useState();
  // const [buyValue, setBuyValue] = useState();
  // const [idCoin, setIdCoin] = useState('');

  // const myChart = new Chart(ctx, {
  //   type: 'bar',
  //   data: {
  //       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //       datasets: [{
  //           label: '# of Votes',
  //           data: [12, 19, 3, 5, 2, 3],
  //           backgroundColor: [
  //               'rgba(255, 99, 132, 0.2)',
  //               'rgba(54, 162, 235, 0.2)',
  //               'rgba(255, 206, 86, 0.2)',
  //               'rgba(75, 192, 192, 0.2)',
  //               'rgba(153, 102, 255, 0.2)',
  //               'rgba(255, 159, 64, 0.2)'
  //           ],
  //           borderColor: [
  //               'rgba(255, 99, 132, 1)',
  //               'rgba(54, 162, 235, 1)',
  //               'rgba(255, 206, 86, 1)',
  //               'rgba(75, 192, 192, 1)',
  //               'rgba(153, 102, 255, 1)',
  //               'rgba(255, 159, 64, 1)'
  //           ],
  //           borderWidth: 1
  //       }]
  //   },
  //   options: {
  //       scales: {
  //           y: {
  //               beginAtZero: true
  //           }
  //       }
  //   }}

  return (
    <div className={styles.modal}>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <select className={styles.selectCoin} {...register('nameCrypto')}>
              {cryptoCoins.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <input
              placeholder="Quantidade de moedas"
              min={0}
              className={styles.inputValue}
              type="number"
              {...register('quantity')}
              required
            />

            {/* {cryptoCoins.map(
            (getValue) =>
              getValue.name !== selectCoin && (
                <p>O valor dessa transação é:{getValue.price}</p>
              )
          )} */}

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
