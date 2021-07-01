import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  InputGroup,
  InputLeftAddon,
  Input,
  RadioGroup,
  Radio,
  Button,
} from '@chakra-ui/react';

export default function ModalTransaction({
  isOpen = false,
  onClose,
  isEditing = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isEditing ? 'Editar transação' : 'Cadastrar transação'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={3}>
            <Input type="date" placeholder="Data" />
            <Input placeholder="Descrição" />
            <RadioGroup defaultValue="2">
              <Stack spacing={5} direction="row">
                <Radio colorScheme="red" value="1">
                  Despesa
                </Radio>
                <Radio colorScheme="green" value="2">
                  Receita
                </Radio>
              </Stack>
            </RadioGroup>
            <InputGroup>
              <InputLeftAddon>R$</InputLeftAddon>
              <Input placeholder="Valor" />
            </InputGroup>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" colorScheme="red" onClick={onClose} mr={3}>
            Cancelar
          </Button>
          <Button colorScheme="teal" onClick={onClose}>
            {isEditing ? 'Atualizar' : 'Cadastrar'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
