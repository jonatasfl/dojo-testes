import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stack,
  InputGroup,
  InputLeftAddon,
  Input,
  RadioGroup,
  Radio,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function ModalTransaction({
  isOpen = false,
  onClose,
  createTransaction,
  data = {},
}) {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [method] = useState('');
  const [value, setValue] = useState(null);
  const [hasError, setHasError] = useState(false);

  const isEdit = !!Object.keys(data).length;

  useEffect(() => {
    if (!isOpen) {
      setDate('');
      setDescription('');
      setType('');
      setValue(null);
      setHasError(false);
    }
  }, [isOpen]);

  function handleCreateTransaction() {
    if (!!date && !!description && !!type && !!value) {
      createTransaction(new Date(date), description, type, method, value);
      onClose();
    } else {
      setHasError(true);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isEdit ? 'Editar transação' : 'Cadastrar transação'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {hasError && (
            <Alert status="error" mb={3}>
              <AlertIcon />
              <AlertTitle mr={2}>Atenção!</AlertTitle>
              <AlertDescription>Preencha todos os campos</AlertDescription>
            </Alert>
          )}
          <Stack spacing={3}>
            <Input
              type="date"
              placeholder="Data"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
            <Input
              placeholder="Descrição"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <RadioGroup value={type} onChange={setType}>
              <Stack spacing={5} direction="row">
                <Radio colorScheme="red" value="expense">
                  Despesa
                </Radio>
                <Radio colorScheme="green" value="recipe">
                  Receita
                </Radio>
              </Stack>
            </RadioGroup>
            <InputGroup>
              <InputLeftAddon>R$</InputLeftAddon>
              <Input
                placeholder="Valor"
                value={value}
                onChange={e => setValue(e.target.value)}
              />
            </InputGroup>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" colorScheme="red" onClick={onClose} mr={3}>
            Cancelar
          </Button>
          <Button colorScheme="teal" onClick={handleCreateTransaction}>
            {isEdit ? 'Atualizar' : 'Cadastrar'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
