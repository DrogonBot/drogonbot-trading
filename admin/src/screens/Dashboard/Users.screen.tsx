import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { DefaultTable } from '../../components/Form/DefaultTable';
import { DefaultScreen } from '../../components/Screen/DefaultScreen';
import { APIHelper } from '../../helpers/APIHelper';
import { setLoading } from '../../store/actions/ui.actions';
import { RequestTypes } from '../../typescript/Request.types';

export const UsersScreen = () => {
  const classes = useStyles();

  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      await dispatch(setLoading(true));
      const response = await APIHelper.request(
        RequestTypes.GET,
        "/users",
        {},
        true
      );

      if (response) {
        console.log(response.data);
        setUsers(response.data);
      }

      await dispatch(setLoading(false));
    };
    fetchUsers();
  }, [dispatch]);

  const renderRows = () => {
    if (users) {
      return users.map((user: any) => {
        return (
          <TableRow key={user.name}>
            <TableCell component="th" scope="row">
              {user.name}
            </TableCell>
            <TableCell align="right">{user.email}</TableCell>
            <TableCell align="right">
              <div className={classes.actionContainer}>
                <EditIcon color={"primary"} />
                <AddCircleIcon color={"primary"} />
                <DeleteIcon color={"primary"} />
              </div>
            </TableCell>
          </TableRow>
        );
      });
    }
    return null;
  };

  return (
    <DefaultScreen title="Users">
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableRow}>User</TableCell>
              <TableCell className={classes.tableRow} align="right">
                Email
              </TableCell>
              <TableCell className={classes.tableRow} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderRows()}</TableBody>
        </Table>
      </TableContainer>

      <DefaultTable
        resource={"user"}
   
        data={users}
        editCallback={() => null}
        addCallback={() => null}
        deleteCallback={() => null}
      />
    </DefaultScreen>
  );
};

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  tableRow: {
    fontWeight: "bold"
  },
  tableContainer: {
    maxWidth: 650
  },
  actionContainer: {
    display: "flex",
    flex: 1,
    maxWidth: 80,
    justifyContent: "space-around",
    marginLeft: "auto"
  }
});
