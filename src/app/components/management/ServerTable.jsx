import React, {
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  FormControlLabel,
  Switch,
  TextField,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import BanDialog from './BanDialog';
import LeaveServer from '../dialogs/LeaveServer';
import { editServerAction } from '../../actions/editServer';

const headCells = [
  {
    id: 'dbId', numeric: false, disablePadding: true, label: 'id',
  },
  {
    id: 'groupId', numeric: true, disablePadding: false, label: 'group id',
  },
  {
    id: 'serverName', numeric: true, disablePadding: false, label: 'server name',
  },
  {
    id: 'lastActive', numeric: true, disablePadding: false, label: 'last active',
  },
  {
    id: 'memberCount', numeric: true, disablePadding: false, label: 'member count',
  },
  {
    id: 'discordTipMessageChannel', numeric: true, disablePadding: false, label: 'discordTipMessageChannel',
  },
  {
    id: 'edit', numeric: true, disablePadding: false, label: 'edit',
  },
  {
    id: 'isInServer', numeric: true, disablePadding: false, label: 'Is in Server',
  },
  {
    id: 'ban', numeric: true, disablePadding: false, label: 'ban',
  },
];

function createData(
  id,
  groupId,
  groupName,
  lastActive,
  isInServer,
  banned,
  discordTipMessageChannelId,
  memberCount,
) {
  return {
    id,
    groupId,
    groupName,
    lastActive,
    isInServer,
    banned,
    discordTipMessageChannelId,
    memberCount,
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

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
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
                <span>
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
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function ServerTable(props) {
  const {
    servers,
    banServer,
    defaultPageSize,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    totalCount,
  } = props;
  const rows = [];
  const dispatch = useDispatch();

  servers.forEach((item) => {
    rows.push(
      createData(
        item.id,
        item.groupId,
        item.groupName,
        item.lastActive,
        item.isInServer,
        item.banned,
        item.discordTipMessageChannelId,
        item.memberCount,
      ),
    );
  });

  const [order, setOrder] = useState('asc');
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

  const [inEditMode, setinEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [unitDiscordTipMessageChannel, setUnitDiscordTipMessageChannel] = useState(null);

  const onSaveEdit = async ({ id }) => {
    await dispatch(editServerAction(
      id,
      unitDiscordTipMessageChannel,
    ));

    setinEditMode({
      status: false,
      rowKey: null,
    })
    setUnitDiscordTipMessageChannel(null);
  }

  const onEdit = ({
    id,
    currentUnitDiscordTipMessageChannel,
  }) => {
    console.log(currentUnitDiscordTipMessageChannel);
    setinEditMode({
      status: true,
      rowKey: id,
    })
    setUnitDiscordTipMessageChannel(currentUnitDiscordTipMessageChannel);
  }

  const onCancelEdit = () => {
    setinEditMode({
      status: false,
      rowKey: null,
    })
    setUnitDiscordTipMessageChannel(null);
  }

  return (
    <div>
      <TableContainer>
        <Table
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
          aria-label="enhanced table"
        >
          <EnhancedTableHead
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
                      {row.groupId}
                    </TableCell>
                    <TableCell align="right">
                      {row.groupName}
                    </TableCell>
                    <TableCell align="right">
                      {row.lastActive}
                    </TableCell>
                    <TableCell align="right">
                      {row.memberCount || 'n/a'}
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === row.id ? (
                          <TextField
                            value={unitDiscordTipMessageChannel}
                            onChange={(event) => setUnitDiscordTipMessageChannel(event.target.value)}
                          />

                        ) : (
                          row.discordTipMessageChannelId
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === row.id ? (
                          <>
                            <Button
                              variant="contained"
                              color="primary"
                              size="large"
                              onClick={() => onSaveEdit({
                                id: row.id,
                                discordTipMessageChannel: unitDiscordTipMessageChannel,
                              })}
                            >
                              Save
                            </Button>

                            <Button
                              variant="contained"
                              color="primary"
                              size="large"
                              style={{ marginLeft: 8 }}
                              onClick={() => onCancelEdit()}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => onEdit({
                              id: row.id,
                              currentUnitDiscordTipMessageChannel: row.discordTipMessageChannelId,
                            })}
                          >
                            Edit
                          </Button>
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        row.isInServer
                          ? (
                            <LeaveServer
                              id={row.id}
                              groupId={row.groupId}
                              groupName={row.groupName}
                            />
                          )
                          : 'no'
                      }
                    </TableCell>
                    <TableCell align="right">
                      {!row.banned ? (
                        <BanDialog
                          name={row.groupName}
                          confirmBan={banServer}
                          otherId={row.groupId}
                          id={row.id}
                        />
                      ) : (
                        <Button
                          variant="outlined"
                          onClick={() => banServer(row.id, '')}
                        >
                          UNBAN
                        </Button>
                      )}
                    </TableCell>
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

export default ServerTable;
