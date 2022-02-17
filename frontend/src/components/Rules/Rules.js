import './Rules.css';
import React, { useState, useEffect } from 'react';
import CustomTable from './../Table/Table';
const axios = require('axios');

const Rules = () => {
  const [data, setData] = useState([]);

  const fetchRules = async () => {
    try {
        const response = await axios.get(`http://localhost:8000/api/rules`); 
        setData(response.data)
      } catch (error) {
        console.error(error);
      }
  }
  
  useEffect(() => {
      fetchRules(); 
    // eslint-disable-next-line
  }, []);

  return !!data.data && data.data.length > 0 && (
    <CustomTable title={'Rules'} rows={data.data} totalPages={data.total_items}/>
  );
};

export default Rules;
