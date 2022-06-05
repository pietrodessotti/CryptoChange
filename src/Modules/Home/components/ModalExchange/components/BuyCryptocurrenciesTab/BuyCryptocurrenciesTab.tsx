import React from 'react';
import { useForm } from 'react-hook-form';

import { useTransactions } from '@Provider/useTransactions';

import styles from './styles.module.scss';
import Graph from '../Graph';

/**
 * @export
 * @component
 * @name BuyCryptocurrenciesTab
 *
 * @description
 * Component responsible for rendering the tab of Buy cryptocurrencies.
 */
export const BuyCryptocurrenciesTab = (): JSX.Element => {
  const {
    handleCreateNewTransaction,
    coinSelected,
    valueInputQuantity,
    setValueInputQuantity,
    handleCloseModal,
    loading,
    messageSuccess,
  } = useTransactions();

  const { register } = useForm();
  return (
    <>
      <div>
        <form onSubmit={handleCreateNewTransaction}>
          <div>
            <label htmlFor="quantityOfCoins" className={styles.label}>
              Criptomoeda:
              <select
                className={styles.selectCoin}
                {...register('nameCrypto')}
                disabled
              >
                <option value={coinSelected.name}>{coinSelected.name}</option>
              </select>
            </label>

            <label htmlFor="quantityOfCoins" className={styles.label}>
              Valor total da transação:
              <input
                className={styles.inputValue}
                {...register('referencePrice', {
                  required: true,
                  min: 1,
                  max: valueInputQuantity,
                })}
                onChange={e => setValueInputQuantity(Number(e.target.value))}
                value={valueInputQuantity}
                required
              />
            </label>

            <label htmlFor="quantityOfCoins" className={styles.label}>
              Quantidade de moedas:
              <input
                placeholder="Quantidade de moedas"
                className={styles.totalWithSelect}
                type="number"
                {...register('quantity')}
                onChange={e => setValueInputQuantity(Number(e.target.value))}
                value={(valueInputQuantity / coinSelected.price).toFixed(4)}
                disabled
              />
            </label>

            <Graph />

            {loading ? (
              <div className={styles.formButtons}>
                <p className={styles.messageSuccess}>{messageSuccess}</p>
              </div>
            ) : (
              <div className={styles.formButtons}>
                <button
                  onClick={handleCloseModal}
                  className={styles.cancelButton}
                >
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
    </>
  );
};
