import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { act } from '@testing-library/react';
import * as mocks from '../mocks'
import Alerts from './Alerts';

const renderComponent = (rowsMock, dataMock, pageMock) => {
  render(
        <Alerts rows={rowsMock} data={dataMock} page={pageMock} fetchData={jest.fn()}/>
  );
};

it('should loads table with no rows', async () => {
  renderComponent([], {}, 1);

  expect(screen.getByText('Alerts')).toBeInTheDocument();
  expect(screen.queryAllByRole('row')).toHaveLength(0);
});

it('should search correctly', async () => {
  renderComponent(mocks.alertsMock.data.data, mocks.alertsMock, 1);

  expect(screen.queryAllByRole('row')).toHaveLength(3);

  fireEvent.change(screen.getByPlaceholderText('Buscar'), {
    target: { value: '530' },
  });

  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.debug(screen.getByPlaceholderText('Buscar'));

  await waitFor(() => {
    expect(screen.queryAllByRole('row')).toHaveLength(2);
  });
});

it('should call alerts/:id api after clicking button', async () => {
  renderComponent(mocks.alertsMock.data.data, mocks.alertsMock, 1);

  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.debug(screen.getAllByTitle('See details')[0]);

  expect(screen.getAllByTitle('See details')[0].href).toBe(
    'http://localhost:3000/api/alerts/500'
  );
});
