import React from 'react';

import styles from './styles.module.scss';

/**
 * @export
 * @component
 * @name Footer
 *
 * @description
 * Esse componente será responsável pelo footer
 */
export const Footer = (): JSX.Element => {
  return (
    <div>
      <footer className={styles.footer}>
        Página desenvolvida por Pietro Dessotti ❤️
      </footer>
    </div>
  );
};
