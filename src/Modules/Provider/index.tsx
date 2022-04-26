import React, { FormEvent, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';
import { api, apiLocal } from '../../services/api';

import { PropCoin, TransactionsContextData, FiduciaryCoin } from './types';

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
  fiduciary: Array<FiduciaryCoin>;
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
  const [values, setValues] = useState<Data[]>([]);
  const [data, setData] = useState(firstCoins);
  const [messageSuccess, setMessageSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [valueInputQuantity, setValueInputQuantity] = useState(0);
  
  const [active, setActive] = useState(false);

  console.log(valueInputQuantity);
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
  const handleChangeValue = (event: { target: { value: React.SetStateAction<string>; } }) => {
    setTypeCurrency(event.target.value)
  };

  /**
   * @function
   * @name handleSearch
   * 
   * @description
   * Responsável por pegar o valor digitado
   */
  const handleSearch = (event: { target: { value: React.SetStateAction<string> } }) => {
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
    setModalIsOpen(false);
    setLoading(false);
    setActive(false);
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
    setActive(false);
    setValueInputQuantity(0);

    setTimeout(() => {
      setModalIsOpen(false);
      setLoading(false);
    }, 1500);
  };
  console.log(values);

  /**
   * @function
   * @name newMapTransactions
   * 
   * @description
   * Responsável por mapear os dados da lista
   * de transações.
   */
  const newMapTransactions = values.map((item) => item.total);

  /**
   * @function
   * @name TotalTransactions 
   * 
   * @description
   * Responsável por calcular o valor total das transações.
   */
  const totalTransactions = newMapTransactions.reduce((totalArr: number, itemArr: number) => {
    const newTotal = totalArr + itemArr;
    return newTotal;
  }, 0);

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
        valueInputQuantity,
        setValueInputQuantity,
        totalTransactions,
        active,
        setActive,
      }}>
        {children}
      </Transactions.Provider>
    </>
  )
}

