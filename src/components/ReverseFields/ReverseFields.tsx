import React, { ButtonHTMLAttributes, ReactNode, useState } from 'react';

import FirstField from './components/FirstField';
import SecondField from './components/SecondField';
import styles from './styles.module.scss';

type Props = {
  optionalButton?: boolean;
  styledOptionalButtonReverse?: {
    backgroundColor: string;
    color: string;

  }
  genericButtonReverse?: string;
  childrenFirstField?: ReactNode;
  childrenSecondField?: ReactNode;
};

/**
 * @export
 * @component
 * @name ReverseFields
 *
 * @description
 * Component responsible for to do
 * exchange of fields
 */
export const ReverseFields = ({
  optionalButton,
  genericButtonReverse,
  styledOptionalButtonReverse,
  childrenFirstField,
  childrenSecondField,
}: Props) => {
  const [reverseFields, setReverseFields] = useState(false);

  const handleChangeReverseFields = () => {
    setReverseFields(!reverseFields);
  };

  return (
    <>
      {!reverseFields ? (
        <>
          <FirstField childrenFirstField={childrenFirstField} />
          {optionalButton ? (
            styledOptionalButtonReverse
          ) : (
            <button className={styles.buttonReverse} type="button" onClick={handleChangeReverseFields}>
              {genericButtonReverse}
            </button>
          )}
          <SecondField childrenSecondField={childrenSecondField} />
        </>
      ) : (
        <>
          <SecondField childrenSecondField={childrenSecondField} />
          {optionalButton ? (
            styledOptionalButtonReverse
          ) : (
            <button className={styles.buttonReverse} type="button" onClick={handleChangeReverseFields}>
              {genericButtonReverse}
            </button>
          )}
          <FirstField childrenFirstField={childrenFirstField} />
        </>
      )}
    </>
  );
};
