import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home/Home.js'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Arial',
      'Source Sans Pro',
    ].join(','),
  },});


const App = () => {
	return (
    <Router>
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <Routes>
            <Route path="*" element={<Home/>} />
          </Routes>
      </React.Fragment>
    </ThemeProvider>
  </Router>
		);
}

export default App;
