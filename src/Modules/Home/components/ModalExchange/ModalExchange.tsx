import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';

import { Chart } from "react-google-charts";

import styles from './styles.module.scss';
import { useTransactions } from '../../../Provider/useTransactions';
import { options } from './configuration/configuration';

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
  const { coinSelected, typeCurrency, dataItems, handleCreateNewTransaction, loading, handleCloseModal, messageSuccess,
    valueInputQuantity, setValueInputQuantity, active, setActive } = useTransactions();
  const { register } = useForm();
  const [activeTab, setActiveTab] = useState('buy');

  const dataItemsValue = dataItems.map((item) => {
    return [item.priceChange1d, item.id];
  });

  const newSort = dataItems.sort((menor, maior) => maior.priceChange1d - menor.priceChange1d);

  const newDataCoin = newSort.map((item) => item.id === coinSelected.id ? item : '');

  const newArr = newDataCoin.map((item) => item);

  const nameCoin = coinSelected.name;
  const valueCoin = coinSelected.priceChange1d;
  const indexCoin = newArr.indexOf(coinSelected) + 1;

  const newTextData = `A moeda ${nameCoin} ocupou a ${indexCoin}º posição do ranking diário com`;

  // /**
  //  * @function
  //  * @name handleSubmit
  //  * 
  //  * @description
  //  * Responsável por enviar os dados do formulário
  //  * para o componente de compra.
  //  */
  // const handleCreateNewTransaction = (event: FormEvent) => {
  //   event.preventDefault();

  //   const data = {
  //     id: uuidv1(),
  //     name: coinSelected.name,
  //     quantity: valueInputQuantity,
  //     total: coinSelected.price * valueInputQuantity,
  //   }

  //   apiLocal.post('/transactions', data);
  //   handleCloseModal;
  // };

  const data = [
    [
      "Variação",
      "Variação",
    ],
    ['1 Hora', coinSelected.priceChange1h],
    ['1 Dia', coinSelected.priceChange1d],
    ['1 Semana', coinSelected.priceChange1w],
  ];

  const handleChangeTabBuy = () => {
    setActiveTab('buy');
  }

  const handleChangeTabSell = () => {
    setActiveTab('sell');
  }

  return (
    <div className={styles.modal}>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        ariaHideApp={false}
      >
        {/* <div className={styles.controllerTabModal}>
          <p onClick={handleChangeTabBuy}>
            Comprar
          </p>
          <p onClick={handleChangeTabSell}>
            Vender
          </p>
        </div> */}

        {activeTab === 'buy' ? (
          <div>
            <form onSubmit={handleCreateNewTransaction}>
              <div>
                <label htmlFor='quantityOfCoins' className={styles.label}>
                  Criptomoeda:
                  <select
                    className={styles.selectCoin}
                    {...register('nameCrypto')}
                    disabled>
                    <option value={coinSelected.name}>
                      {coinSelected.name}
                    </option>
                  </select>
                </label>

                <label htmlFor='quantityOfCoins' className={styles.label}>
                  Quantidade de moedas:
                  <input
                    placeholder="Quantidade de moedas"
                    min={0.00001}
                    step={0.00001}
                    className={styles.inputValue}
                    type="number"
                    {...register('quantity')}
                    onChange={(e) => setValueInputQuantity(Number(e.target.value))}
                    value={valueInputQuantity}
                    required
                  />
                </label>

                <label htmlFor='quantityOfCoins' className={styles.label}>
                  Valor total da transação:
                  <select
                    className={styles.totalWithSelect}
                    {...register('referencePrice')}
                    disabled>
                    <option value={coinSelected.price * valueInputQuantity || 0}>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency', currency: typeCurrency ? typeCurrency : 'BRL'
                      }).format(coinSelected.price * valueInputQuantity || 0)}
                    </option>
                  </select>
                </label>

                {valueCoin > 0 ? (
                  <p style={{ marginBottom: 10 }}>
                    {newTextData} alta de {valueCoin}%
                  </p>
                ) : (
                  <div style={{ marginBottom: 10, color: 'red' }}>
                    {newTextData} baixa de {valueCoin}%
                  </div>
                )}

                {!active ? (
                  <p onClick={() => setActive(!active)} className={styles.seeGraph}>
                    Ver gráfico
                  </p>
                ) : (
                  <>
                    <p onClick={() => setActive(!active)} className={styles.seeGraph}>
                      Esconder gráfico
                    </p>
                    <Chart
                      chartType="AreaChart"
                      width="100%"
                      height="400px"
                      data={data}
                      options={options}
                    />
                  </>
                )}

                {loading ? (
                  <div className={styles.formButtons}>
                    <p className={styles.messageSuccess}>{messageSuccess}</p>
                  </div>
                ) : (
                  <div className={styles.formButtons}>
                    <button onClick={handleCloseModal} className={styles.cancelButton}>
                      Cancelar
                    </button>
                    <button type="submit" className={styles.submitButton}>
                      Comprar
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        ) : (
          <div>
            <form onSubmit={handleCreateNewTransaction}>
              <div>
                <label htmlFor='quantityOfCoins' className={styles.label}>
                  Criptomoeda:
                  <select
                    className={styles.selectCoin}
                    {...register('nameCrypto')}
                    disabled>
                    <option value={coinSelected.name}>
                      {coinSelected.name}
                    </option>
                  </select>
                </label>

                <label htmlFor='quantityOfCoins' className={styles.label}>
                  Quantidade de moedas:
                  <input
                    placeholder="Quantidade de moedas"
                    className={styles.totalWithSelect}
                    type="number"
                    {...register('quantity')}
                    onChange={(e) => setValueInputQuantity(Number(e.target.value))}
                    value={-valueInputQuantity / coinSelected.price}
                    disabled
                  />
                </label>

                <label htmlFor='quantityOfCoins' className={styles.label}>
                  Valor total da transação:
                  <input
                    placeholder="Quantidade de moedas"
                    className={styles.inputValue}
                    type="number"
                    {...register('referencePrice')}
                    onChange={(e) => setValueInputQuantity(Number(e.target.value))}
                    value={valueInputQuantity}
                    required
                  />
                </label>

                {valueCoin > 0 ? (
                  <p style={{ marginBottom: 10 }}>
                    {newTextData} alta de {valueCoin}%
                  </p>
                ) : (
                  <div style={{ marginBottom: 10, color: 'red' }}>
                    {newTextData} baixa de {valueCoin}%
                  </div>
                )}

                {!active ? (
                  <p onClick={() => setActive(!active)} className={styles.seeGraph}>
                    Ver gráfico
                  </p>
                ) : (
                  <>
                    <p onClick={() => setActive(!active)} className={styles.seeGraph}>
                      Esconder gráfico
                    </p>
                    <Chart
                      chartType="AreaChart"
                      width="100%"
                      height="400px"
                      data={data}
                      options={options}
                    />
                  </>
                )}

                {loading ? (
                  <div className={styles.formButtons}>
                    <p className={styles.messageSuccess}>{messageSuccess}</p>
                  </div>
                ) : (
                  <div className={styles.formButtons}>
                    <button onClick={handleCloseModal} className={styles.cancelButton}>
                      Cancelar
                    </button>
                    <button type="submit" className={styles.submitButton}>
                      Vender
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        )}


      </Modal>
    </div>
  );
};
