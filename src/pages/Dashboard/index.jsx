import { useState } from 'react';
import { nanoid } from 'nanoid';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Flex,
  Heading,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import ModalTransaction from '../../components/ModalTransaction';

const initialData = [
  {
    id: nanoid(),
    date: new Date(),
    description: 'Netflix',
    type: 'expense',
    method: 'Cartão de Crédito',
    value: 45,
  },
  {
    id: nanoid(),
    date: new Date(),
    description: 'Pix do ciclano',
    type: 'recipe',
    method: null,
    value: 130,
  },
];

export default function DashboardPage() {
  const [transactions, setTransactions] = useState(initialData);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function createTransaction(date, description, type, method, value) {
    setTransactions(currentState => [
      ...currentState,
      {
        id: nanoid(),
        date,
        description,
        type,
        method,
        value,
      },
    ]);
  }

  return (
    <>
      <ModalTransaction
        isOpen={isOpen}
        onClose={onClose}
        createTransaction={createTransaction}
      />
      <Flex justifyContent="space-between" py={4}>
        <Heading size="md">Transações</Heading>
        <Button colorScheme="teal" leftIcon={<AddIcon />} onClick={onOpen}>
          Nova transação
        </Button>
      </Flex>
      <Table variant="simple">
        <TableCaption color="gray.500">
          Exibindo {transactions.length} registros
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Data</Th>
            <Th>Descrição</Th>
            <Th>Meio de pagamento</Th>
            <Th isNumeric>Valor</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map(item => (
            <Tr key={item.id}>
              <Td>{item.date.toLocaleDateString()}</Td>
              <Td>{item.description}</Td>
              <Td>{item.method}</Td>
              <Td
                isNumeric
                color={item.type === 'expense' ? 'red.400' : 'green.500'}
              >
                {item.type === 'expense' ? '-' : ''}
                {(+item.value).toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
