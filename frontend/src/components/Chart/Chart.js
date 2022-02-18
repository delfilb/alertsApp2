import React, {useEffect} from 'react';
import {
    Paper
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import barChart from './../Chart/BarChart';
import pieChart from './../Chart/PieChart';
import * as d3 from 'd3';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'grid !important',
    justifyContent: 'center !important',
  },
  svg: {
    marginBottom: '30px'
  }
}));

const Chart = ({agents, rules}) => {
  const classes = useStyles();

  useEffect(() => {
    barChart(agents, {
      x: d => d.id,
      y: d => d.total_alerts,
      xDomain: d3.groupSort(agents, ([d]) => -d.total_alerts, d => d.id), // sort by descending frequency
      XLabel: "ID",
      yLabel: "Total alerts",
      width: 700,
      height: 350,
      title: 'Number of alerts per agent',
      color: "steelblue"
    })

    pieChart(rules, {
      name: d => d.id,
      value: d => d.total_alerts,
      width: 700,
      height: 350,
    })
  }, [agents, rules])

  return (
    <Paper elevation={0}  className={classes.paper}>
        <svg id="d3_barChart" className={classes.svg}/>
        <svg id="d3_pieChart" className={classes.svg}/>
    </Paper>
  );
};
export default Chart;