import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Modal from 'react-modal';

import './styles.module.scss';
import { api } from '../../../../services/api';
import { PropCoin } from '../../types';

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
  const [typeComercialCoin, setTypeComercialCoin] = useState('USD');

  const [selectCoin, setSelectCoin] = useState('');
  const [quantityCoin, setQuantityCoin] = useState();
  const [buyValue, setBuyValue] = useState();

  useEffect(() => {
    api
      .get(`coins?currency=${typeComercialCoin}`)
      .then((response) => setCryptoCoins(response.data.coins));
  }, []);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        contentLabel="Example Modal"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <select {...register('nameCrypto')}>
            {cryptoCoins.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <input type="number" {...register('quantity')} />

          {cryptoCoins.map(
            (getValue) =>
              getValue.name !== selectCoin && (
                <p>O valor dessa transação é:{getValue.price}</p>
              )
          )}

          <input type="submit" />
        </form>
      </Modal>
    </div>
  );
};

export default ModalExchange;
