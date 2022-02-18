import React, { useState, useEffect } from 'react';
import Chart from './Chart';
const axios = require('axios');

const ChartContainer = () => {
    const [agents, setAgents] = useState([]);
    const [rules, setRules] = useState([]);

    const fetchAgents = async () => {
        try { 
            const response = await axios.get(`http://localhost:8000/api/agents`); 
            setAgents(response.data.data)
          } catch (error) {
            console.error(error);
          }
    }

    const fetchRules = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/rules`); 
            setRules(response.data.data)
          } catch (error) {
            console.error(error);
          }
      }

    useEffect(() => {
        fetchAgents()
        fetchRules()
        // eslint-disable-next-line
    }, []);

  return agents.length > 0 && rules.length > 0 && (
      <Chart agents={agents} rules={rules}/>
  );
};

export default ChartContainer;
