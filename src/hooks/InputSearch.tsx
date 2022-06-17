import React, { Children, useCallback, useState } from 'react';

type Props = {
  placeholderText: string;
  style?: string;
  data: any;
  children: any;
};

/**
 * @export
 * @component
 * @name InputSearch
 *
 * @description
 * Componente responsável por montar o InputSearch
 * da home page.
 */
export const InputSearch = ({
  placeholderText,
  style,
  data,
  children,
}: Props) => {
  const [search, setSearch] = useState('');

  const handleSearch = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearch(event.target.value);
  };

  const dataItems = data.filter((item: any) => item.name.includes(search));

  return (
    <>
      <input
        placeholder={placeholderText}
        className={style}
        type="text"
        onChange={handleSearch}
      />

      {children}
    </>
  );
};
