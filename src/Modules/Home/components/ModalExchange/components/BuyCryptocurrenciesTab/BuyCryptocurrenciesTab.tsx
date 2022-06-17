import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useTransactions } from '@Provider/useTransactions';

import styles from './styles.module.scss';
import Graph from '../Graph';
import ReverseFields from '@components/ReverseFields';

/**
 * @export
 * @component
 * @name BuyCryptocurrenciesTab
 *
 * @description
 * Component responsible for rendering the tab of Buy cryptocurrencies.
 */
export const BuyCryptocurrenciesTab = (): JSX.Element => {
  const [reverseFields, setReverseFields] = useState(false);
  const {
    handleCreateNewTransaction,
    coinSelected,
    valueInputQuantity,
    setValueInputQuantity,
    handleCloseModal,
    loading,
    messageSuccess,
    typeCurrency,
  } = useTransactions();

  const { register } = useForm();

  const handleChangeReverseFields = () => {
    setReverseFields(!reverseFields);
  };

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

            <ReverseFields
              childrenFirstField={
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
                    onChange={e =>
                      setValueInputQuantity(Number(e.target.value))
                    }
                    value={valueInputQuantity}
                    required
                  />
                </label>
              }
              childrenSecondField={
                <label htmlFor="quantityOfCoins" className={styles.label}>
                  Valor total da transação:
                  <select
                    className={styles.totalWithSelect}
                    {...register('referencePrice')}
                    disabled
                  >
                    <option
                      value={coinSelected.price * valueInputQuantity || 0}
                    >
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: typeCurrency ? typeCurrency : 'BRL',
                      }).format(coinSelected.price * valueInputQuantity || 0)}
                    </option>
                  </select>
                </label>
              }

              genericButtonReverse={'🠕🠗'}
            />

            {/* {reverseFields ? (
              <>
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
                    onChange={e =>
                      setValueInputQuantity(Number(e.target.value))
                    }
                    value={valueInputQuantity}
                    required
                  />
                </label>

                <button
                  type="button"
                  onClick={handleChangeReverseFields}
                  className={styles.reverseFields}
                >
                  🠕🠗
                </button>

                <label htmlFor="quantityOfCoins" className={styles.label}>
                  Valor total da transação:
                  <select
                    className={styles.totalWithSelect}
                    {...register('referencePrice')}
                    disabled
                  >
                    <option
                      value={coinSelected.price * valueInputQuantity || 0}
                    >
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: typeCurrency ? typeCurrency : 'BRL',
                      }).format(coinSelected.price * valueInputQuantity || 0)}
                    </option>
                  </select>
                </label>
              </>
            ) : (
              <>
                <label htmlFor="quantityOfCoins" className={styles.label}>
                  Valor total da transação:
                  <input
                    className={styles.inputValue}
                    {...register('referencePrice', {
                      required: true,
                      min: 1,
                      max: valueInputQuantity,
                    })}
                    onChange={e =>
                      setValueInputQuantity(Number(e.target.value))
                    }
                    value={valueInputQuantity}
                    required
                  />
                </label>

                <button
                  type="button"
                  onClick={handleChangeReverseFields}
                  className={styles.reverseFields}
                >
                  🠕🠗
                </button>

                <label htmlFor="quantityOfCoins" className={styles.label}>
                  Quantidade de moedas:
                  <input
                    placeholder="Quantidade de moedas"
                    className={styles.totalWithSelect}
                    type="number"
                    {...register('quantity')}
                    onChange={e =>
                      setValueInputQuantity(Number(e.target.value))
                    }
                    value={(valueInputQuantity / coinSelected.price).toFixed(4)}
                    disabled
                  />
                </label>
              </>
            )} */}

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
