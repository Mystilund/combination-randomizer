import { Flex, Heading, Input, useUpdateEffect } from '@chakra-ui/react';
import { useState } from 'react';
import { getNbOnColumnInStorage, setValueInLocalStorage } from './utils';

type ColumnInputProps = {
  onChange: (nb: number) => void;
};

export const ColumnInput = ({ onChange }: ColumnInputProps) => {
  const [columnInputValue, setColumnInputValue] = useState<number>(
    getNbOnColumnInStorage
  );

  const setColumnNumber: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const val = parseInt(event.target.value, 10);

    if (Number.isNaN(val) || val < 1) {
      return;
    }
    if (val > 20) {
      setColumnInputValue(20);
      onChange(val);
    }
    setColumnInputValue(val);
    onChange(val);
  };

  useUpdateEffect(() => {
    setValueInLocalStorage('columns', columnInputValue, { serializer: String });
  }, [columnInputValue]);

  return (
    <Flex alignItems='center' gap={2}>
      <Heading as='h4' fontSize='16px' whiteSpace='nowrap'>
        Nombre de paramètres :
      </Heading>
      <Input
        bg='gray.100'
        maxW='200px'
        type='number'
        onChange={setColumnNumber}
        value={columnInputValue}
      />
    </Flex>
  );
};
