import React from 'react';
import { useForm } from 'react-hook-form';

import { useTransactions } from '@Provider/useTransactions';

import styles from './styles.module.scss';
import Graph from '../Graph';

/**
 * @export
 * @component
 * @name SellCryptocurrenciesTab
 *
 * @description
 * Component responsible for rendering the tab of Sell cryptocurrencies.
 */
export const SellCryptocurrenciesTab = (): JSX.Element => {
  const { register } = useForm();
  const {
    handleCreateNewTransaction,
    valueInputQuantity,
    coinSelected,
    setValueInputQuantity,
    loading,
    typeCurrency,
    messageSuccess,
    handleCloseModal,
  } = useTransactions();

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
              Quantidade de moedas:
              <input
                placeholder="Quantidade de moedas"
                className={styles.inputValue}
                {...register('quantity', {
                  required: true,
                  min: 0.00001,
                  max: valueInputQuantity,
                })}
                onChange={(e) => setValueInputQuantity(Number(e.target.value))}
                value={valueInputQuantity}
                required
              />
            </label>

            <label htmlFor="quantityOfCoins" className={styles.label}>
              Valor total da transação:
              <select
                className={styles.totalWithSelect}
                {...register('referencePrice')}
                disabled
              >
                <option value={coinSelected.price * valueInputQuantity || 0}>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: typeCurrency ? typeCurrency : 'BRL',
                  }).format(coinSelected.price * valueInputQuantity || 0)}
                </option>
              </select>
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
                  Vender
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
