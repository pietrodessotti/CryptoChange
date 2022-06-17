import React from 'react';
import Skeleton from 'react-loading-skeleton';

import styles from './styles.module.scss';

/**
 * @export
 * @component
 * @name TableLoading
 *
 * @description
 * Component responsible for rendering the table loading.
 */
export const TableLoading = (): JSX.Element => {
  return (
    <table>
      <thead>
        <tr className={styles.skeletonLine}>
          <Skeleton
            width={200}
            height={25}
            style={{ margin: '0 60px 0 20px' }}
          />
          <Skeleton
            width={80}
            height={25}
            style={{ margin: '0 100px 0 20px' }}
          />
          <Skeleton
            width={120}
            height={25}
            style={{ margin: '0 55px 0 20px' }}
          />
          <Skeleton
            width={250}
            height={25}
            style={{ margin: '0 60px 0 20px' }}
          />
          <Skeleton width={110} height={25} style={{ margin: '0 0 0 20px' }} />
        </tr>
      </thead>
    </table>
  );
};
