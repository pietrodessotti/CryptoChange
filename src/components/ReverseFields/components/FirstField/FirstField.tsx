import React, { ReactNode } from 'react';

type Props = {
  childrenFirstField: ReactNode;
};

/**
 * @export
 * @component
 * @name FirstField
 *
 * @description
 * Responsible for created a new field
 * for exchange.
 */
export const FirstField = ({ childrenFirstField }: Props) => {
  return <>{childrenFirstField ? childrenFirstField : ' First Field '}</>;
};
