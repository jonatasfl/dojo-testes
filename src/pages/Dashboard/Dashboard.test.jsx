import React from 'react';

import {
  within,
  waitFor,
  render,
  screen,
  getByText,
} from '@testing-library/react';
import UserEvent from '@testing-library/user-event';

import DashboardPage from './index';

describe('Test the Dashboard Page', () => {
  beforeEach(() => {
    render(<DashboardPage />);
  });

  const getTotalIncome = () =>
    Number(
      screen
        .getByLabelText('Total Recebido')
        .textContent.split(/[\s]+/)[1]
        .replace(',', '.'),
    );

  const getTotalExpense = () =>
    Number(
      screen
        .getByLabelText('Total Gasto')
        .textContent.split(/[\s]+/)[1]
        .replace(',', '.'),
    );

  const createNewTransaction = ({ date, description, type, value, method }) => {
    const buttonNewTransaction = screen.getByRole('button', {
      name: /nova transação/i,
    });
    UserEvent.click(buttonNewTransaction);

    const inputDate = screen.getByPlaceholderText(/data/i);
    UserEvent.type(inputDate, date);

    const inputDescription = screen.getByPlaceholderText(/descrição/i);

    UserEvent.type(inputDescription, description);

    const typeRadioButton =
      type === 'receita'
        ? screen.getByText(/receita/i)
        : screen.getByText(/despesa/i);
    UserEvent.click(typeRadioButton);

    if (type !== 'receita') {
      const selectMethod = screen.getByRole('combobox');
      UserEvent.selectOptions(selectMethod, [method]);
    }

    const inputValue = screen.getByPlaceholderText(/valor/i);

    UserEvent.type(inputValue, `${value}`);

    const buttonCreate = screen.getByRole('button', { name: /cadastrar/i });
    UserEvent.click(buttonCreate);
  };

  it('should add a income', async () => {
    const totalIncome = getTotalIncome();

    const data = {
      date: '2020-06-01',
      description: 'Venda de água',
      type: 'receita',
      value: 2.0,
    };

    createNewTransaction(data);

    await waitFor(() => {
      expect(screen.getByText(/Venda de água/i)).toBeInTheDocument();
    });

    expect(totalIncome + data.value).toEqual(getTotalIncome());
    expect(
      getByText(document.body, /Transação cadastrada com sucesso/i),
    ).toBeInTheDocument();
  });

  it('should add expense', async () => {
    const totalExpense = getTotalExpense();

    const data = {
      date: '2020-06-01',
      description: 'Abastecer carro',
      type: 'despesa',
      method: 'pix',
      value: 20.4,
    };

    createNewTransaction(data);

    await waitFor(() => {
      expect(screen.getByText(/Abastecer carro/i)).toBeInTheDocument();
    });

    expect(totalExpense + data.value).toEqual(getTotalExpense());
  });

  it('should remove transaction', async () => {
    const totalExpense = getTotalExpense();

    const firstTransaction = within(screen.getAllByRole('row')[1]);
    const valueTransaction = firstTransaction
      .getByText(/-R/)
      .textContent.split(/[\s]+/)[1]
      .replace(',', '.');

    const deleteButton = firstTransaction.getByRole('button', {
      name: /excluir/i,
    });
    UserEvent.click(deleteButton);

    expect(screen.queryByText(/Netflix/i)).not.toBeInTheDocument();
    expect(
      getByText(document.body, /Transação excluída com sucesso/i),
    ).toBeInTheDocument();
    expect(totalExpense - Number(valueTransaction)).toEqual(getTotalExpense());
  });

  it('should edit the transaction', async () => {
    const totalExpense = getTotalExpense();

    const firstTransaction = within(screen.getAllByRole('row')[1]);

    const valueTransaction = firstTransaction
      .getByText(/-R/)
      .textContent.split(/[\s]+/)[1]
      .replace(',', '.');

    const editButton = firstTransaction.getByRole('button', {
      name: /editar/i,
    });

    const data = {
      description: 'Disney Plus',
      value: 50,
    };

    UserEvent.click(editButton);

    const inputDescription = screen.getByPlaceholderText(/descrição/i);
    UserEvent.type(inputDescription, data.description);

    const inputValue = screen.getByPlaceholderText(/valor/i);
    inputValue.setSelectionRange(0, 2);
    UserEvent.type(inputValue, `${data.value}`);

    const buttonUpdate = screen.getByRole('button', { name: /atualizar/i });
    UserEvent.click(buttonUpdate);

    await waitFor(() => {
      expect(screen.queryByText(/Disney Plus/i)).toBeInTheDocument();
    });

    expect(
      screen.getByText(/Transação atualizada com sucesso/i),
    ).toBeInTheDocument();

    const currentExpense = totalExpense - Number(valueTransaction) + data.value;
    expect(currentExpense).toEqual(getTotalExpense());
  });
});
