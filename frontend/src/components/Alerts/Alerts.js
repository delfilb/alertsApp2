import './Alerts.css';
import React, { useState, useEffect } from 'react';
import CustomTable from './../Table/Table';
import { useDebounce } from './../hooks/debounce';

const Alerts = ({rows, data, page, fetchData}) => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState('');
    const debouncedSearchTerm = useDebounce(
      searchValue === null ? '' : searchValue,
      1000
    );

    const onHandleChangePage = async (event, newPage) => {
      await fetchData(newPage, rowsPerPage)
    };

    const onHandleChangeRowsPerPage = async (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      await fetchData(1, parseInt(event.target.value, 10))
    };

    const onSetSearchedValue = (searchVal) => {
      if (!!searchVal) {
        setSearchValue(searchVal);
      } else {
        setSearchValue('');
      }
    };
  
    useEffect(async() => {
      if (!!debouncedSearchTerm) {
        await fetchData(page, rowsPerPage, searchValue);
      } else {
        await fetchData(0, 10, '');
      }
      // eslint-disable-next-line
    }, [debouncedSearchTerm]);
  

  return !!rows && rows.length > 0 && (
      <CustomTable 
        page={parseInt(page)}
        title={'Alerts'} 
        rows={rows} 
        totalPages={parseInt(data.data.total)}
        searchTerm={debouncedSearchTerm}
        onSearch={(ev) => onSetSearchedValue(ev)}
        onCancelSearch={() => onSetSearchedValue('')}
        handleChangePage={onHandleChangePage}
        handleChangeRowsPerPage={onHandleChangeRowsPerPage}
      />
  );
};

export default Alerts;
