import React from 'react';
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
    Typography
} from '@mui/material';
import './Table.css'
import SearchBar from 'material-ui-search-bar';
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
  }
}));

const CustomTable = ({title, rows, page, rowsPerPage = 10, searchTerm, onSearch, onCancelSearch, handleChangePage, handleChangeRowsPerPage, totalPages}) => {
  const classes = useStyles();

  return (
    <div className={classes.tableDiv}>
      {title === 'Alerts' && (
        <SearchBar
          className={classes.searchBox}
          placeholder="Buscar"
          value={searchTerm}
          onChange={(val) => onSearch(val)}
          onCancelSearch={() => onCancelSearch()}
        />
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
            {rows.map((row) => (
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
            ))}
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
