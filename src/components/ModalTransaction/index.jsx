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
  InputLeftElement,
  Input,
  RadioGroup,
  Radio,
  Button,
  Select,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  date: Yup.string().required('Informe a data'),
  description: Yup.string().required('Informe a descrição'),
  type: Yup.string().required('Informe o tipo'),
  method: Yup.string(),
  value: Yup.number().required('Informe o valor'),
});

export default function ModalTransaction({
  isOpen = false,
  onClose,
  saveTransaction,
  editData = {},
}) {
  const isEdit = !!Object.keys(editData).length;

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({ resolver: yupResolver(schema) });

  const watchType = watch('type');

  useEffect(() => {
    register('type');
    setValue('type', editData.type);

    if (!isOpen) {
      reset();
    }
  }, [isOpen]);
  useEffect(() => {
    if (watchType === 'recipe') {
      setValue('method', '');
    }
  }, [watchType]);

  function onSubmit(data) {
    const id = isEdit ? editData.id : null;
    saveTransaction(data, id);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>
          {isEdit ? 'Editar transação' : 'Cadastrar transação'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!!Object.keys(errors).length && (
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
              {...register('date')}
              defaultValue={editData.date}
              isInvalid={errors.date}
            />
            <Input
              placeholder="Descrição"
              {...register('description')}
              defaultValue={editData.description}
              isInvalid={errors.description}
            />
            <RadioGroup
              onChange={value => setValue('type', value)}
              defaultValue={editData.type}
            >
              <Stack spacing={5} direction="row">
                <Radio
                  colorScheme="red"
                  value="expense"
                  isInvalid={errors.type}
                >
                  Despesa
                </Radio>
                <Radio
                  colorScheme="green"
                  value="recipe"
                  isInvalid={errors.type}
                >
                  Receita
                </Radio>
              </Stack>
            </RadioGroup>
            {watchType === 'expense' && (
              <Select
                placeholder="Selecione o método de pagamento"
                {...register('method')}
                defaultValue={editData.method}
              >
                <option value="credit">Crédito</option>
                <option value="debit">Débito</option>
                <option value="boleto">Boleto</option>
                <option value="pix">PIX</option>
              </Select>
            )}
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300">
                R$
              </InputLeftElement>
              <Input
                placeholder="Valor"
                {...register('value')}
                defaultValue={editData.value}
                isInvalid={errors.value}
              />
            </InputGroup>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" colorScheme="red" onClick={onClose} mr={3}>
            Cancelar
          </Button>
          <Button colorScheme="teal" type="submit">
            {isEdit ? 'Atualizar' : 'Cadastrar'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
