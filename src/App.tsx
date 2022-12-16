import { clone, random } from 'lodash';
import React, { useState } from 'react';
import {
  Box,
  Button,
  ChakraProvider,
  Divider,
  Flex,
  Heading,
  Text,
  Textarea,
  useUpdateEffect,
} from '@chakra-ui/react';

import { Layout } from './Layout';
import { ColumnInput } from './ColumnInput';
import {
  clearValueFromLocalStorage,
  getNbOnColumnInStorage,
  getValueFromLocalStorage,
  setValueInLocalStorage,
} from './utils';
import { ExplanationModal } from './ExplanationModal';

function App() {
  const [isExplanationModalOpen, setIsExplanationModalOpen] = useState(
    getValueFromLocalStorage('columns', {
      defaultValue: true,
      deserializer: () => false,
    })
  );
  const [randomResults, setRandomResults] = useState<string[]>([]);
  const [columnValues, setColumnValues] = useState<string[][]>(() => {
    const columns = getNbOnColumnInStorage();
    const initialValues = [];

    for (let i = 0; i < columns; ++i) {
      initialValues.push(
        getValueFromLocalStorage(`column${i}`, {
          defaultValue: [''],
          deserializer: (val: string) => val.split('\n'),
        })
      );
    }

    return initialValues;
  });

  useUpdateEffect(() => {
    columnValues.forEach((columnValue, index) => {
      setValueInLocalStorage(`column${index}`, columnValue, {
        serializer: (val: string[]) => val.join('\n').trim(),
      });
    });
  }, [columnValues]);

  const handleColumnChanges =
    (index: number): React.ChangeEventHandler<HTMLTextAreaElement> =>
    (event) => {
      const newArray = clone(columnValues);

      newArray[index] = event.target.value.split('\n');
      setColumnValues(newArray);
    };

  const onNumberOfColumnChange = (numberOfColumn: number) => {
    const newArr = clone(columnValues);

    if (columnValues.length < numberOfColumn) {
      for (let i = 0; i < numberOfColumn - columnValues.length; ++i) {
        newArr.push(['']);
        setValueInLocalStorage(`column${i}`, '', { serializer: () => '' });
      }
      setColumnValues(newArr);
    } else if (columnValues.length > numberOfColumn) {
      for (let i = numberOfColumn; i < columnValues.length; ++i) {
        clearValueFromLocalStorage(`column${i}`);
      }
      setColumnValues(newArr.slice(0, numberOfColumn));
    }
  };

  const randomize = () => {
    const results = columnValues.map((columnValue) => {
      const randomValue = random(0, columnValue.length - 1);

      return columnValue.length ? columnValue[randomValue] : '';
    });

    setRandomResults(results);
  };

  return (
    <ChakraProvider>
      <Layout>
        <ColumnInput onChange={onNumberOfColumnChange} />
        <Divider borderColor='gray.600' my={5} />
        <Heading fontSize='20px'>Paramètres à randomiser :</Heading>
        <Flex flexWrap='wrap' py='20px' gap={4}>
          {columnValues.map((columnValue, index) => (
            <Flex
              flexDir='column'
              w='250px'
              h='400px'
              bg='gray.100'
              key={index}
            >
              <Box py='4px' px='10px'>
                <Text fontWeight='semibold'>Generateur {index + 1} :</Text>
              </Box>
              <Textarea
                flex={1}
                borderRadius={0}
                border={0}
                w='100%'
                resize='none'
                onChange={(event) => handleColumnChanges(index)(event)}
                value={columnValue.join('\n')}
                sx={{
                  '&::-webkit-scrollbar': {
                    width: '4px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'gray.500',
                    borderRadius: '2px',
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    background: 'gray.700',
                  },
                }}
              />
            </Flex>
          ))}
        </Flex>
        <Divider borderColor='gray.600' my={5} />
        <Button
          onClick={randomize}
          bg='cyan.500'
          mb={5}
          _hover={{ bg: 'cyan.700', color: 'gray.100' }}
          _active={{ bg: 'cyan.800', color: 'gray.100' }}
        >
          Randomise !
        </Button>
        <Heading fontSize='20px'>Résultat :</Heading>
        <Flex flexWrap='wrap' alignItems='center' py='20px' gap={4}>
          {randomResults.map((randomResult, index) => (
            <Box
              key={index}
              border='1px solid'
              borderColor='gray.500'
              px='20px'
              py='5px'
            >
              <Text>{randomResult}</Text>
            </Box>
          ))}
        </Flex>
      </Layout>
      <ExplanationModal
        isOpen={isExplanationModalOpen}
        onClose={() => setIsExplanationModalOpen(false)}
      />
    </ChakraProvider>
  );
}

export default App;
