import React, { ReactNode } from 'react';

type Props = {
  childrenSecondField: ReactNode;
};

/**
 * @export
 * @component
 * @name SecondField
 *
 * @description
 * Responsible for created a new field
 * for exchange.
 */
export const SecondField = ({ childrenSecondField }: Props) => {
  return <>{childrenSecondField ? childrenSecondField : ' Second Field '}</>;
};
