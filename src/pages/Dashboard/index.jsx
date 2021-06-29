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
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const transactions = [
  {
    id: 1,
    date: new Date(),
    description: 'Netflix',
    method: 'Cartão de Crédito',
    value: 45,
  },
  {
    id: 2,
    date: new Date(),
    description: 'Lanche',
    method: 'Cartão de Crédito',
    value: 8.6,
  },
  {
    id: 3,
    date: new Date(),
    description: 'Red Dead Redemption 2',
    method: 'Cartão de Crédito',
    value: 220,
  },
];

export default function DashboardPage() {
  return (
    <>
      <Flex justifyContent="space-between" py={4}>
        <Heading size="md">Transações</Heading>
        <Button colorScheme="teal" leftIcon={<AddIcon />}>
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
              <Td isNumeric>
                {item.value.toLocaleString('pt-br', {
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
