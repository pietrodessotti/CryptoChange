import React, { FormEvent, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';

import { api } from '@services/api';

import { PropCoin, TransactionsContextData, FiduciaryCoin, ConvertReturnAPI } from './types';

export const Transactions = createContext(
  {} as TransactionsContextData
);

type Data = {
  id: string,
  name: string,
  date: string,
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
  
  const newValues: Array<ConvertReturnAPI> = []

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
   * Responsible for indicate the value of selected coin.
   */
  const handleChangeValue = (event: { target: { value: React.SetStateAction<string>; } }) => {
    setTypeCurrency(event.target.value)
  };


  /**
   * @function
   * @name handleSearch
   * 
   * @description
   * Responsible for do search in the list of coins.
   */
  const handleSearch = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSearch(event.target.value.toString().toLowerCase());
  }

  /**
   * @function
   * @name dataItems
   * 
   * @description
   * Responsible for filter the list of coins.
   */
  const dataItems = data === undefined ?
    firstCoins.filter((item: any) => item.name.toLowerCase().includes(search)):
    data.filter((item: any) => item.name.toLowerCase().includes(search))

  /**
   * @function
   * @name convertAll
   * 
   * @description
   * Responsible for convert all the list of coins.
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
   * Responsible for indicate the coin selected and
   * open the modal.
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
   * This function is responsible for close
   * and clear modal.
   */
  const handleCloseModal = () => {
    setModalIsOpen(false);
    setLoading(false);
  };

  /**
   * @function
   * @name handleSubmit
   * 
   * @description
   * This function is responsible for submit data,
   * call message of success and call function
   * of close modal.
   */
  const handleCreateNewTransaction = (event: FormEvent) => {
    const { nameCrypto, quantity, referencePrice } = event.currentTarget as HTMLFormElement;
    event.preventDefault();

    setValues([...values, {
      id: nameCrypto.value,
      name: nameCrypto.value,
      date: `${new Date().toLocaleDateString()} ás ${new Date().toLocaleTimeString()}`,
      quantity: parseFloat(quantity.value),
      total: parseFloat(referencePrice.value),
      fiduciary: typeCurrency,
    }])

    setMessageSuccess(`${nameCrypto.value}  adicionado com sucesso!`);
    setLoading(true);
    setValueInputQuantity(0);

    setTimeout(() => {
      setModalIsOpen(false);
      setLoading(false);
    }, 1500);
  };

  /**
   * @function
   * @name TotalTransactions 
   * 
   * @description
   * Responsible for do a object keys of transactions suming
   * the quantity of each coin buy
   */
  const totalTransactions = values.reduce((totalArr: any, itemArr) => {
    totalArr[itemArr.name] = (totalArr[itemArr.name] || 0) + itemArr.quantity;
    return totalArr;
  }, []);

  /** 
   * @function
   * @name handleConvertTransactions
   * 
   * @description
   * Responsible for convert transactions in a new array
   */
  const handleConvertTransactions = Object.keys(totalTransactions).map((item: any) => {
    return {
      name: item,
      quantity: totalTransactions[item],
    }
  });

  dataItems.map((unityCoin) => (
    handleConvertTransactions.map((transactionItem) => transactionItem.name === unityCoin.name && (
      newValues.push({
        name: transactionItem.name,
        quantity: transactionItem.quantity,
        price: unityCoin.price,
      })
    ))
  ))

  /**
   * @function
   * @name calculateAllTransactions
   * 
   * @description
   * Responsible for multiply the quantity of each coin buy
   * for your price.
   */
  const calculateAllTransactions = newValues.sort((a, b) => a.name.localeCompare(b.name)).map((item) => {
    const calculate = item.quantity * item.price 
    return calculate;    
  })

  /**
   * @function
   * @name updatedFinalValue
   * 
   * @description
   * This function is responsible for sum all transactions.
   */
  const updatedValue = calculateAllTransactions.reduce((total, item) => total + item, 0)


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
        updatedValue,
        handleConvertTransactions,
      }}>
        {children}
      </Transactions.Provider>
    </>
  )
}

