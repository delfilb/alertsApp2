import './Alerts.css';
import React, { useState } from 'react';
import CustomTable from './../Table/Table';

const Alerts = ({rows, data, page, fetchData}) => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [nPage, setnPage] = useState(0);

    const onChangePage = async (event, newPage) => {
      setnPage(newPage)
      await fetchData(newPage, rowsPerPage)
    };

    const onChangeRowsPerPage = async (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      await fetchData(1, parseInt(event.target.value, 10))
    };

    const onSearchData = async (searchVal) => {
      await fetchData(nPage, rowsPerPage, searchVal)
    };

    console.log('data: ', data)
  
  return !!data && (
      <CustomTable 
        page={parseInt(page)}
        title={'Alerts'} 
        rows={rows} 
        totalPages={parseInt(data.data.total)}
        handleSearch={onSearchData}
        handleChangePage={onChangePage}
        handleChangeRowsPerPage={onChangeRowsPerPage}
      />
  );
};

export default Alerts;
