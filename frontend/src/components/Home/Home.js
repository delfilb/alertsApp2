import './Home.css'
import React, {useState, useEffect} from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Button,
    MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, Routes, Route, Link, NavLink } from 'react-router-dom';
import HOME_ROUTES from './Home.routes';
import Alerts from './../Alerts/Alerts.container';
import Agents from './../Agents/Agents';
import Rules from './../Rules/Rules';
import { makeStyles } from '@mui/styles';
import AgentsDialog from './../Agents/AgentsDialog';
import RulesDialog from './../Rules/RulesDialog';
import AlertsDialog from './../Alerts/AlertsDialog';
import Chart from './../Chart/Chart.container.js';

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: '20px',
    backgroundColor: '#99A799 !important'
  },
  appBarContainer: {
    display: 'grid !important',
    justifyContent: 'center',
    backgroundColor: '#99A799'
  }
}));

const Home = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const classes = useStyles();
  let navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    navigate('/alerts')
    // eslint-disable-next-line
  }, []);

  return (
  <div className="Home__Content">
    <AppBar position="static" className={classes.appBar}>
      <Container maxWidth="xl" className={classes.appBarContainer}>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {HOME_ROUTES.map(({href, label }) => (
                <MenuItem 
                    button
                    key={href}
                    component={NavLink}
                    to={href}
                >
                  <Typography style={{ fontWeight: 600, color: '#519259'}} textAlign="center">{label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {HOME_ROUTES.map(({ href, label }) => (
              <Button
                key={href}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white',  fontWeight: 600, display: 'block' }}
                component={Link} 
                to={href}
              >
                {label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <div >
        <Routes>
            <Route key={'/alerts'} path={'/alerts'} element={<Alerts/>} />
            <Route key={'/api/alerts/:id'} path={'/api/alerts/:id'} element={<AlertsDialog/>} />
            <Route key={'/agents'} path={'/agents'} element={<Agents/>} />
            <Route key={'/api/agents/:id'} path={'/api/agents/:id'} element={<AgentsDialog/>} />
            <Route key={'/rules'} path={'/rules'} element={<Rules/>} />
            <Route key={'/api/rules/:id'} path={'/api/rules/:id'} element={<RulesDialog/>} /> 
            <Route key={'/dashboard'} path={'/dashboard'} element={<Chart/>} /> 
        </Routes>
        
    </div>
  </div>
  );
};
export default Home;