import { makeStyles, TableBody } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { DefaultModal } from '../../../components/Generic/Modal';
import { DefaultScreen } from '../../../components/Screen/DefaultScreen';
import { setLoading, toggleModal } from '../../../store/actions/ui.actions';
import { deleteUser, getUsers } from '../../../store/actions/user.action';
import { AppState } from '../../../store/reducers/index.reducers';
import { IUser } from '../../../typescript/User.types';
import { EditUserForm } from './EditUser.form';

export const UsersScreen = () => {
  const classes = useStyles();

  const [selectedUserId, setSelectedUserId] = useState("");

  const dispatch = useDispatch();
  const users = useSelector<AppState, IUser>(
    (state) => state.userReducer.users
  );

  useEffect(() => {
    const fetchUsers = async () => {
      await dispatch(setLoading(true));

      await dispatch(getUsers());

      await dispatch(setLoading(false));
    };
    fetchUsers();
  }, [dispatch]);

  const renderRows = () => {
    return users?.map((user: any) => {
      return (
        <TableRow key={user.name}>
          <TableCell component="th" scope="row">
            {user.name}
          </TableCell>
          <TableCell align="right">{user.email}</TableCell>
          <TableCell align="right">{user.type}</TableCell>
          <TableCell align="right">
            <div className={classes.actionContainer}>
              <EditIcon
                color={"primary"}
                onClick={async () => {
                  setSelectedUserId(user._id);
                  await dispatch(toggleModal("editUser", true)); //open edit modal
                }}
              />

              <DeleteIcon
                color={"primary"}
                onClick={async () => {
                  await dispatch(deleteUser(user._id));
                }}
              />
            </div>
          </TableCell>
        </TableRow>
      );
    });
  };

  const renderModals = () => {
    const selectedUser = users.find((user) => user._id === selectedUserId);

    return (
      <>
        <DefaultModal
          modalKey={"editUser"}
          title={"Edit User"}
          content={<EditUserForm user={selectedUser} userId={selectedUserId} />}
        />
      </>
    );
  };

  return (
    <DefaultScreen title="Users">
      <Container>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableRow}>User</TableCell>
                <TableCell className={classes.tableRow} align="right">
                  Email
                </TableCell>
                <TableCell className={classes.tableRow} align="right">
                  Type
                </TableCell>
                <TableCell className={classes.tableRow} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderRows()}</TableBody>
          </Table>
        </TableContainer>

        {renderModals()}
      </Container>
    </DefaultScreen>
  );
};

const Container = styled.div`
  .MuiSvgIcon-root {
    cursor: pointer;
  }
`;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableRow: {
    fontWeight: "bold",
  },
  tableContainer: {
    // maxWidth: 650
  },
  actionContainer: {
    display: "flex",
    flex: 1,
    maxWidth: 80,
    justifyContent: "space-around",
    marginLeft: "auto",
  },
});
