import './Alerts.css';
import React, { useState } from 'react';
import CustomTable from './../Table/Table';
import { CircularProgress, Box } from '@mui/material';

const Alerts = ({rows, data, page, fetchData}) => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [nPage, setnPage] = useState(0);

    const onChangePage = async (event, newPage) => {
      setnPage(newPage)
      await fetchData(newPage, rowsPerPage)
    };

    const onChangeRowsPerPage = async (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      await fetchData(0, parseInt(event.target.value, 10))
    };

    const onSearchData = async (searchVal) => {
      await fetchData(nPage, rowsPerPage, searchVal)
    };
  
  return !!data && !!data.data ? (
      <CustomTable 
        page={parseInt(page)}
        rowsPerPage={parseInt(rowsPerPage)}
        title={'Alerts'} 
        rows={rows} 
        totalPages={parseInt(data.data.total)}
        handleSearch={onSearchData}
        handleChangePage={onChangePage}
        handleChangeRowsPerPage={onChangeRowsPerPage}
      />
  ) : (
    <Box sx={{ display: 'grid', justifyContent: 'center'}} data-testid='progress'>
      <CircularProgress color="success"/>
    </Box>
  );
};

export default Alerts;
