import './Alerts.css';
import React, { useState, useEffect } from 'react';
import Alerts from './Alerts'
const axios = require('axios');

const AlertsContainer = () => {
    const [data, setData] = useState();
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0)

    const fetchData = async (offset = 0, limit = 10, search = '') => {
      try {
        const response = await axios.get(`http://localhost:8000/api/alerts?offset=${offset}&limit=${limit}&id=${search}`);
        setData(response.data)
        setPage(response.data.data.page);
        setRows(response.data.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

  return (
      <Alerts rows={rows} data={data} page={page} fetchData={fetchData}/>
  );
};

export default AlertsContainer;
