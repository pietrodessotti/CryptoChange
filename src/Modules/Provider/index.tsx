import React, { FormEvent, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';
import { api, apiLocal } from '../../services/api';

import { PropCoin, TransactionsContextData, FiduciaryConvert } from './types';

export const Transactions = createContext(
  {} as TransactionsContextData
);

type Data = {
  id: string,
  name: string,
  quantity: number,
  total: number,
  fiduciary: string,
};


type TransactionsProviderProps = {
  children: ReactNode;
  fiduciary: Array<FiduciaryConvert>;
  firstCoins: Array<PropCoin>;
}

/**
 * 
 * @export 
 * @component
 * @name TransactionsProvider
 * 
 * @description
 * Context da aplicação
 */
export const TransactionsProvider = ({ children, firstCoins, fiduciary }: TransactionsProviderProps): JSX.Element => {
  const [typeCurrency, setTypeCurrency] = useState('');
  const [coinSelected, setCoinSelected] = useState<SetStateAction<PropCoin[]>>([]);
  const [search, setSearch] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [ values, setValues ] = useState<Data[]>([]);
  const [data, setData] = useState(firstCoins);
  const [messageSuccess, setMessageSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeCurrency) {
      const fetchData = async () => {
        const response = await api
          .get(`coins?currency=${typeCurrency}`)
          .then((response) => response.data.coins);
        setData(response)
      };
      fetchData();
    }
  }, [typeCurrency]);

  /**
   * @function
   * @name handleChangeValue
   * 
   * @description
   * Responsável por setar o valor a moeda selecionada
   */
  const handleChangeValue = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setTypeCurrency(event.target.value)
  };

  /**
   * @function
   * @name handleSearch
   * 
   * @description
   * Responsável por pegar o valor digitado
   */
  const handleSearch = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearch(event.target.value)
  }

  /**
   * @function
   * @name dataItems
   * 
   * @description
   * Responsável por filtrar o valor digitado
   */
  const dataItems = data === undefined ?
    firstCoins.filter((item: any) => item.name.includes(search)) :
    data.filter((item: any) => item.name.includes(search))

  /**
   * @function
   * @name convertAll
   * 
   * @description
   * Responsável por converter a API de moedas
   * fiduciarias.
   */
  const newConvert = Object.keys(fiduciary).map((item: any) => {
    return {
      name: item,
      price: fiduciary[item]
    }
  });

  /**
   * @function
   * @name handleSetCoinForSelect
   * 
   * @description
   * Responsável por setar o valor selecionado 
   * na lista de moedas e abrir o modal. 
   */
  const handleSetCoinForSelect = (coin: Array<PropCoin>) => {
    setCoinSelected(coin);
    setModalIsOpen(true);
  }

  /**
   * @function
   * @name handleCloseModal
   *
   * @description
   * Função responsável por fechar o modal de
   * compra ao clicar em comprar.
   */
  const handleCloseModal = () => {
    setTimeout(() => {
      setModalIsOpen(false);
      setLoading(false);
    }, 1500);
  };

  /**
   * @function
   * @name handleCancelExchange
   *
   * @description
   * Função responsável por fechar o modal de
   * compra ao clicar em cancelar.
   */
   const handleCancelExchange = () => {
      setModalIsOpen(false);
      setLoading(false);
  };

  /**
   * @function
   * @name handleSubmit
   * 
   * @description
   * Responsável por enviar os dados do formulário
   * para o componente de compra.
   */
   const handleCreateNewTransaction = (event: FormEvent) => {
    const { nameCrypto, quantity, referencePrice } = event.currentTarget as HTMLFormElement;
    event.preventDefault();

      setValues([...values, {
        id: nameCrypto.value,
        name: nameCrypto.value,
        quantity: parseFloat(quantity.value),
        total: parseFloat(referencePrice.value),
        fiduciary: typeCurrency,
      }])

      setMessageSuccess(`${nameCrypto.value} adicionado com sucesso!`);
      setLoading(true);

      handleCloseModal();
  };

  console.log(values)
  return (
    <>
      <Transactions.Provider value={{
        typeCurrency,
        handleChangeValue,
        handleSearch,
        fiduciary,
        newConvert,
        dataItems,
        handleSetCoinForSelect,
        handleCloseModal,
        modalIsOpen,
        coinSelected,
        values,
        handleCreateNewTransaction,
        messageSuccess,
        loading,
        handleCancelExchange,
      }}>
        {children}
      </Transactions.Provider>
    </>
  )
}

