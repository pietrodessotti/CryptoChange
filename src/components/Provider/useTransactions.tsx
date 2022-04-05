import { useContextSelector } from 'use-context-selector';

import { Transactions } from '.';
import { TransactionsContextData } from './types';

/**
 * @export
 * @hook
 * @name useTransactions
 * 
 * @description
 * Hook responsável por conter os eventos e estados
 * do context
 */
export const useTransactions = (): TransactionsContextData => {

    const handleSearch = useContextSelector(
        Transactions,
        (transaction) => transaction.handleSearch
    );

    const fiduciary = useContextSelector(
        Transactions,
        (transaction) => transaction.fiduciary
    );

    const typeCurrency = useContextSelector(
        Transactions,
        (transaction) => transaction.typeCurrency
    );

    const handleChangeValue = useContextSelector(
        Transactions,
        (transaction) => transaction.handleChangeValue
    );

    const newConvert = useContextSelector(
        Transactions,
        (transaction) => transaction.newConvert
    );

    const dataItems = useContextSelector(
        Transactions,
        (transaction) => transaction.dataItems
    );

    const handleSetCoinForSelect = useContextSelector(
        Transactions,
        (transaction) => transaction.handleSetCoinForSelect
    );

    const handleCloseModal = useContextSelector(
        Transactions,
        (transaction) => transaction.handleCloseModal
    );

    const modalIsOpen = useContextSelector(
        Transactions,
        (transaction) => transaction.modalIsOpen
    );

    const coinSelected = useContextSelector(
        Transactions,
        (transaction) => transaction.coinSelected
    );

    const values = useContextSelector(
        Transactions,
        (transaction) => transaction.values
    );

    const handleCreateNewTransaction = useContextSelector(
        Transactions,
        (transaction) => transaction.handleCreateNewTransaction
    );

    return {
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
    };
};