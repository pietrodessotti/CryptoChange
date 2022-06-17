import React from 'react';
import Image from 'next/image';

import { useTransactions } from '@Modules/Provider/useTransactions';
import { PropCoin } from '@Modules/Provider/types';

import styles from './styles.module.scss';
import TableItems from '../TableItems';

/**
 * @export
 * @component
 * @name TableBody
 *
 * @description
 * Component responsible for rendering the table body.
 */
export const TableBody = (): JSX.Element => {
  return <TableItems />;
};
