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
    backgroundColor: '#519259 !important',
    minWidth: '500px !important'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const AlertsDialog = () => {
  const [data, setData] = useState();
  const [open, setOpen] = useState(true);
  const { id } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    onBackClick();
  };

  const onBackClick = () => {
    navigate('/alerts');
  };

  const fetchData = async () => {
    try {
        const response = await axios.get(`http://localhost:8000/api/alerts/${id}`);
        setData(response.data.data[0])
      } catch (error) {
        console.error(error);
      }
  }

  useEffect(() => {
      fetchData();
    // eslint-disable-next-line
  }, []);

  return !!data && (
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
                value={data._id}
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
                value={data._source.agent.id}
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
                            <strong> Agent: </strong>
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
                value={data._source.cluster.name}
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
                            <strong> Cluster: </strong>
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
                value={data._source.rule.id}
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
                            <strong> Rule: </strong>
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
                value={data._source.id}
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
                            <strong> Source id: </strong>
                          </Typography>
                        </InputAdornment>
                    }
                />
          </ListItem>
        </List>
  </Dialog>
  )
};

export default AlertsDialog;