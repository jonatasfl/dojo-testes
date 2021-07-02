import { useState, useEffect } from 'react';
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
  useToast,
  Divider,
  Box,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

import ModalTransaction from '../../components/ModalTransaction';
import Total from '../../components/Total';

const methods = {
  credit: 'Cartão de Crédito',
  debit: 'Cartão de Débito',
  boleto: 'Boleto',
  pix: 'PIX',
};

const initialData = [
  {
    id: nanoid(),
    date: '2021-07-01',
    description: 'Netflix',
    type: 'expense',
    method: 'credit',
    value: 45,
  },
  {
    id: nanoid(),
    date: '2021-07-01',
    description: 'Pix do ciclano',
    type: 'recipe',
    method: 'pix',
    value: 130,
  },
];

export default function DashboardPage() {
  const [transactions, setTransactions] = useState(initialData);
  const [edition, setEdition] = useState({});

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    if (!isOpen) {
      setEdition({});
    }
  }, [isOpen]);

  function createTransaction({ date, description, type, method, value }) {
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

  function updateTransaction(id, data) {
    const index = transactions.findIndex(item => item.id === id);
    const newTransactions = [...transactions];
    newTransactions[index] = {
      id,
      ...data,
    };
    setTransactions(newTransactions);
  }

  function saveTransaction(data, id = null) {
    if (id) {
      updateTransaction(id, data);
    } else {
      createTransaction(data);
    }

    toast({
      description: `Transação ${id ? 'atualizada' : 'cadastrada'} com sucesso`,
      status: 'success',
    });
  }

  function editTransaction(item) {
    setEdition(item);
    onOpen();
  }

  function removeTransaction(id) {
    setTransactions(transactions.filter(item => item.id !== id));
    toast({
      description: 'Transação excluída com sucesso',
      status: 'success',
    });
  }

  const totalRecipes = transactions
    .filter(item => item.type === 'recipe')
    .reduce((acc, current) => acc + current.value, 0);

  const totalExpenses = transactions
    .filter(item => item.type === 'expense')
    .reduce((acc, current) => acc + current.value, 0);

  return (
    <>
      <ModalTransaction
        isOpen={isOpen}
        onClose={onClose}
        saveTransaction={saveTransaction}
        editData={edition}
      />
      <Flex justifyContent="flex-end" mb={3}>
        <Box mr={10}>
          <Total type="inbound" value={totalRecipes} />
        </Box>
        <Box>
          <Total type="outbound" value={totalExpenses} />
        </Box>
      </Flex>
      <Divider />
      <Flex justifyContent="space-between" py={4}>
        <Heading size="md">Transações</Heading>
        <Button colorScheme="teal" leftIcon={<AddIcon />} onClick={onOpen}>
          Nova transação
        </Button>
      </Flex>
      <Table variant="simple" size="sm">
        <TableCaption color="gray.500">
          Exibindo {transactions.length} registros
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Data</Th>
            <Th>Descrição</Th>
            <Th>Meio de pagamento</Th>
            <Th isNumeric>Valor</Th>
            <Th width="20%" textAlign="center">
              Ações
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map(item => (
            <Tr key={item.id}>
              <Td>
                {new Date(item.date).toLocaleDateString('pt-BR', {
                  timeZone: 'UTC',
                })}
              </Td>
              <Td>{item.description}</Td>
              <Td>{methods[item.method]}</Td>
              <Td
                isNumeric
                color={item.type === 'expense' ? 'red.400' : 'green.500'}
                fontWeight="bold"
              >
                {item.type === 'expense' ? '-' : ''}
                {(+item.value).toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </Td>
              <Td textAlign="center">
                <Button
                  leftIcon={<EditIcon />}
                  variant="ghost"
                  colorScheme="blue"
                  size="sm"
                  mr={1}
                  onClick={() => editTransaction(item)}
                >
                  Editar
                </Button>
                <Button
                  leftIcon={<DeleteIcon />}
                  variant="ghost"
                  colorScheme="red"
                  size="sm"
                  onClick={() => removeTransaction(item.id)}
                >
                  Excluir
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
