import './Agents.css';
import React, {useState, useEffect } from 'react';
import CustomTable from './../Table/Table';

const axios = require('axios');

const Agents = () => {
  const [data, setData] = useState([]);

  const fetchAgents = async () => {
    try { 
        const response = await axios.get(`http://localhost:8000/api/agents`); 
        setData(response.data)
      } catch (error) {
        console.error(error);
      }
  }
  
  useEffect(() => {
      fetchAgents();  
    // eslint-disable-next-line
  }, []);

  return !!data.data && data.data.length > 0 && (
    <div>
      <CustomTable title={'Agents'} rows={data.data} totalPages={parseInt(data.total_items)}/>
    </div>
  )
};

export default Agents;
