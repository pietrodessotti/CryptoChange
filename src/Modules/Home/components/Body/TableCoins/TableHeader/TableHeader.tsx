import React from 'react';

import styles from './styles.module.scss';

/**
 * @export
 * @component
 * @name TableHeader
 *
 * @description
 * Component responsible for rendering the table header.
 */
export const TableHeader = (): JSX.Element => {
  return (
    <thead className={styles.tableHeaderContainer}>
      <tr className={styles.lineHeaderTable}>
        <th>Nome</th>
        <th>Símbolo</th>
        <th>Preço</th>
        <th>Website Link</th>
        <th className={styles.buyCriypto}>Negociar Crypto</th>
      </tr>
    </thead>
  );
};
