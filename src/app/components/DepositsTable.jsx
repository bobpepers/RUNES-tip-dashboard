/* eslint-disable camelcase */
import React, {
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  FormControlLabel,
  Switch,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const headCells = [
  {
    id: 'dbId', numeric: false, disablePadding: true, label: 'id',
  },
  {
    id: 'userId', numeric: true, disablePadding: false, label: 'userId',
  },
  {
    id: 'username', numeric: true, disablePadding: false, label: 'username',
  },
  {
    id: 'from', numeric: true, disablePadding: false, label: 'from',
  },
  {
    id: 'txId', numeric: true, disablePadding: false, label: 'tx id',
  },
  {
    id: 'amount', numeric: true, disablePadding: false, label: 'amount',
  },
  {
    id: 'confirmations', numeric: true, disablePadding: false, label: 'confirmations',
  },
  {
    id: 'phase', numeric: true, disablePadding: false, label: 'phase',
  },

];

function createData(
  id,
  txId,
  username,
  userId,
  phase,
  to_from,
  amount,
  confirmations,
  userRowId,
) {
  return {
    id,
    txId,
    username,
    userId,
    phase,
    to_from,
    amount,
    confirmations,
    userRowId,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const EnhancedTableHead = function (props) {
  const {
    classes,
    onSelectAllClick,
    order, orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells && headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const DepositsTable = function (props) {
  const {
    deposits,
    defaultPageSize,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    totalCount,
  } = props;

  const navigate = useNavigate();

  useEffect(
    () => { },
    [
      deposits,
    ],
  );

  const rows = [];

  deposits.forEach((item) => {
    // console.log('item');
    // console.log(item);
    rows.push(
      createData(
        item.id,
        item.txid,
        item.user ? item.user.username : '',
        item.user ? item.user.user_id : '',
        item.phase,
        item.to_from,
        item.amount,
        item.confirmations,
        item.user ? item.user.id : '',
      ),
    );
  });

  const classes = useStyles();
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('id');
  const [selected, setSelected] = useState([]);
  const [dense, setDense] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                  >
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      <p>
                        {row.id}
                      </p>

                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => navigate(`/user/${row.userRowId}`)}
                      >
                        {row.userId}
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => navigate(`/user/${row.userRowId}`)}
                      >
                        {row.username}
                      </Button>
                    </TableCell>
                    <TableCell align="right">{row.from}</TableCell>

                    <TableCell align="right">
                      {row.txId}
                    </TableCell>
                    <TableCell align="right">{row.amount / 1e8}</TableCell>
                    <TableCell align="right">{row.confirmations}</TableCell>
                    <TableCell align="right">{row.phase}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}

export default DepositsTable;
