import React, {useState, useEffect } from 'react';
import {
    Dialog,
    Slide,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    InputAdornment,
    List,
    ListItem,
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    Paper
} from '@mui/material';
import { useParams } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
const axios = require('axios');

const useStyles = makeStyles((theme) => ({
  table: {
    display: 'grid',
    justifyContent: 'left'
  },
  appBar: {
    backgroundColor: '#519259 !important'
  },
  headerCell: {
    backgroundColor: '#519259'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const RulesDialog = ({ history }) => {
  const [rows, setRows] = useState([]);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(true);
  const { id } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  
  const handleClose = () => {
    setOpen(false);
    onBackClick();
  };

  const onBackClick = () => {
    navigate('/rules');
  };

  const fetchData = async () => {
    try {
        const response = await axios.get(`http://localhost:8000/api/rules/${id}`); 
        setData(response.data)
        setRows(response.data.alerts)
      } catch (error) {
        console.error(error);
      }
  }

  useEffect(() => {
      fetchData();
    // eslint-disable-next-line
  }, []);

  return rows.length > 0 && (
    <Dialog
        TransitionComponent={Transition}
        open={open}
    >
        <AppBar sx={{ position: 'relative' }} className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {id}
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <InputBase
                id="type"
                size="small"
                variant="outlined"
                label="Tipo"
                value={data.rule.id}
                inputProps={{
                    'aria-label': 'naked',
                    'readOnly': true,
                }}
                startAdornment={
                    <InputAdornment position="start">
                        <Typography
                            variant="body2"
                            align="right"
                            color="black"
                          >
                            <strong> ID: </strong>
                          </Typography>
                        </InputAdornment>
                    }
                />
          </ListItem>
          <ListItem>
             <InputBase
                id="type"
                size="small"
                variant="outlined"
                label="Tipo"
                value={data.rule.description}
                style={{width: '100%'}}
                inputProps={{
                    'aria-label': 'naked',
                    'readOnly': true,
                }}
                startAdornment={
                    <InputAdornment position="start">
                        <Typography
                            variant="body2"
                            align="right"
                            color="black"
                          >
                            <strong> Description: </strong>
                          </Typography>
                        </InputAdornment>
                    }
                />
          </ListItem>
          <ListItem>
             <InputBase
                id="type"
                size="small"
                variant="outlined"
                label="Tipo"
                value={data.rule.firedtimes}
                inputProps={{
                    'aria-label': 'naked',
                    'readOnly': true,
                }}
                startAdornment={
                    <InputAdornment position="start">
                        <Typography
                            variant="body2"
                            align="right"
                            color="black"
                          >
                            <strong> Fired times: </strong>
                          </Typography>
                        </InputAdornment>
                    }
                />
          </ListItem>
          <ListItem>
             <InputBase
                id="type"
                size="small"
                variant="outlined"
                label="Tipo"
                value={data.rule.level}
                inputProps={{
                    'aria-label': 'naked',
                    'readOnly': true,
                }}
                startAdornment={
                    <InputAdornment position="start">
                        <Typography
                            variant="body2"
                            align="right"
                            color="black"
                          >
                            <strong> Level: </strong>
                          </Typography>
                        </InputAdornment>
                    }
                />
          </ListItem>
          <ListItem>
          <TableContainer component={Paper} className={classes.table}>
            <Table sx={{ minWidth: 550 }}>
                <TableHead>
                  <TableRow>
                      <TableCell className={classes.headerCell} align="center">
                        <Typography style={{ fontWeight: 600, color: 'white'}}> Alerts </Typography>
                      </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    style ={ rows.indexOf(row) % 2? { background : "#efefef" }:{ background : "white" }}
                    >
                    <TableCell align="center">{row._id}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
          </ListItem>
        </List>
  </Dialog>
  )
};

export default RulesDialog;