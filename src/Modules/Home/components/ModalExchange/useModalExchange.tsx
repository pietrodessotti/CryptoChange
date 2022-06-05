import { Dispatch, SetStateAction, useState } from 'react';

import { useTransactions } from '@Modules/Provider/useTransactions';

type ContextUseModalData = {
  data: any;
  valueCoin: number;
  newTextData: string;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
};

/**
 * @export
 * @hook
 * @name useModalExchange
 *
 * @description
 * Hook responsible for handling the modal of exchange.
 */
export const useModalExchange = (): ContextUseModalData => {
  const [active, setActive] = useState(false);
  const { dataItems, coinSelected } = useTransactions();

  /**
   * @function
   * @name newSort
   *
   * @description
   * Function responsible for sorting the data of the chart.
   */
  const newSort = dataItems.sort(
    (menor, maior) => maior.priceChange1d - menor.priceChange1d,
  );

  /**
   * @function
   * @name newDataCoin
   *
   * @description
   * Function responsible for filtering the data of the chart.
   */
  const newDataCoin = newSort.map(item =>
    item.id === coinSelected.id ? item : '',
  );

  /**
   * @function
   * @name newArr
   *
   * @description
   * Function responsible for mapping results of newDataCoin.
   */
  const newArr = newDataCoin.map(item => item);

  const nameCoin = coinSelected.name;
  const valueCoin = coinSelected.priceChange1d;
  const indexCoin = newArr.indexOf(coinSelected) + 1;

  const newTextData = `A moeda ${nameCoin} ocupou a ${indexCoin}º posição do ranking diário com`;

  const data = [
    ['Variação', 'Variação'],
    ['1 Hora', coinSelected.priceChange1h],
    ['1 Dia', coinSelected.priceChange1d],
    ['1 Semana', coinSelected.priceChange1w],
  ];

  return {
    data,
    newTextData,
    valueCoin,
    active,
    setActive,
  };
};
