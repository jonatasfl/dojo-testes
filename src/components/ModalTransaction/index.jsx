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
  Button,
} from '@chakra-ui/react';

export default function ModalTransaction({
  isEditing = false,
  isOpen = false,
  onClose,
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
            <Input placeholder="Data" />
            <Input placeholder="Descrição" />
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
