import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    TableFooter,
    Paper,
    IconButton,
    Tooltip,
    Typography,
    FormControl,
    OutlinedInput,
    InputLabel,
    InputAdornment
} from '@mui/material';
import './Table.css';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  tableDiv: {
    display: 'grid !important',
    justifyContent: 'center',
    marginBottom: '20px'
  },
  headerCell: {
    backgroundColor: '#519259'
  },
  searchBox: {
    marginBottom: '10px'
  },
  chartButton: {
    display: 'flex',
    justifyContent: 'end',
    marginBottom: '10px'
  },
  pagination: {
    display: 'grid !important',
    justifyContent: 'center',
    margin: '10px'
  },
  search: {
    margin: '0 0 10px 0 !important',
    width: '290px !important'
  },
  image: {
    width: '500px'
  }
}));

const CustomTable = ({title, rows, page, rowsPerPage = 10, handleSearch, handleChangePage, handleChangeRowsPerPage, totalPages}) => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');

  const onSearchChange = ({ target: { value } }) => {
    setSearchValue(value || '');
    handleSearch(value || '')
  };
  
  return (
    <div className={classes.tableDiv}>
      {title === 'Alerts' && (
        <div>
          <FormControl sx={{ m: 1, width: '25ch' }} color="success" variant="outlined" className={classes.search}> 
          <InputLabel >Search</InputLabel>
          <OutlinedInput            
            type={'text'}
            value={searchValue}
            onChange={onSearchChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={onSearchChange}
                >
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        </div>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 550 }}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.headerCell} align='center'> 
                <Typography style={{ fontWeight: 600, color: 'white'}} variant="button"> {title} </Typography>
              </TableCell>
              <TableCell className={classes.headerCell} align="center"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                style ={ rows.indexOf(row) % 2? { background : "#efefef" }:{ background : "white" }}
              >
                <TableCell align="center"> {row.id || row._id} </TableCell>
                <TableCell align="center"> 
                  <Tooltip title='See details'>
                    <IconButton
                      component={Link}
                      to={`/api/${title.toLowerCase()}/${row.id || row._id}`}
                    >
                      <RemoveRedEyeIcon/> 
                    </IconButton>                    
                  </Tooltip> 
                </TableCell>
              </TableRow>
            ))
          ) : (
            <img
              src={require('../../assets/noResults.png')}
              alt={'title'}
              className={classes.image}
          />
          )}
          </TableBody>
          <TableFooter>
            <TablePagination
              component="div"
              count={totalPages}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[10, 25, 100]}
            />
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}


CustomTable.defaultProps = {
  tableColumns: [],
  rows: [],
};

CustomTable.propTypes = {
  tableColumns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export default CustomTable;
