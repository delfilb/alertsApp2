import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import * as mocks from '../mocks'
import Alerts from './Alerts';

const renderComponent = (rowsMock, dataMock, pageMock, fetchDataMock) => {
  render(
    <Router>
      <Alerts rows={rowsMock} data={dataMock} page={pageMock} fetchData={fetchDataMock}/>
    </Router>
  );
};

it('should loads table with no rows', async () => {
  renderComponent([], {}, 1);

  expect(screen.getByTestId('progress')).toBeInTheDocument();
  expect(screen.queryAllByRole('row')).toHaveLength(0);
}); 

it('should search correctly', async() => {
  let fetchDataMock = jest.fn();
    renderComponent(mocks.alertsMock.data.data, mocks.alertsMock, 1, fetchDataMock);

    expect(screen.queryAllByRole('row')).toHaveLength(3);

    fireEvent.change(screen.getByRole('textbox', {name: /code/i}), {
      target: { value: '500' },  
    });
    
    await waitFor(() => {
      expect(fetchDataMock).toHaveBeenCalledTimes(1);
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(fetchDataMock).toHaveBeenCalledWith(0, 10, '500');
    });
  
});

it('should call alerts/:id api when clicking button', async () => {
  renderComponent(mocks.alertsMock.data.data, mocks.alertsMock, 1);

  expect(screen.getAllByTestId('seeDetails')[0].href).toBe(
    'http://localhost/api/alerts/500'
  );
});
