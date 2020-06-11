import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { colors } from '../../../../constants/UI/Colors.constant';
import { ContainerDesktop } from '../../../../constants/UI/Common.constant';
import { TS } from '../../../../helpers/LanguageHelper';
import { userLogout } from '../../../../store/actions/user.actions';

export const AccountDropdown = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onHandleLogout = async () => {
    console.log("logout");

    await dispatch(userLogout());

    router.push({
      pathname: "/login",
    });
  };

  const onHandlePromoterArea = () => {
    router.push({
      pathname: "/posts/advertise",
    });
  };

  const renderMenuItem = (
    icon: JSX.Element,
    text: JSX.Element,
    handleItemAction: () => any
  ) => (
    <StyledMenuItem onClick={handleItemAction}>
      <ListItemIcon>{icon}</ListItemIcon>
      {text}
    </StyledMenuItem>
  );

  return (
    <>
      <AccountButton onClick={handleClick}>
        <AccountCircleIcon />
        <ContainerDesktop>
          <AccountButtonText>
            {TS.string("account", "accountMyAccount").toUpperCase()}
          </AccountButtonText>
        </ContainerDesktop>
      </AccountButton>
      {/* <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Open Menu
      </Button> */}
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {renderMenuItem(
          <DynamicFeedIcon fontSize="small" />,
          <ListItemText
            primary={TS.string("account", "PromoteJobsButtonText")}
          />,
          onHandlePromoterArea
        )}
        {renderMenuItem(
          <MeetingRoomIcon fontSize="small" />,
          <ListItemText primary={TS.string("account", "logoutButtonText")} />,
          onHandleLogout
        )}
        {/* {renderMenuItem(
          <DraftsIcon fontSize="small" />,
          <ListItemText primary="Drafts" />
        )} */}
      </StyledMenu>
    </>
  );
};

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {},
}))(MenuItem);

const AccountButton = styled.div`
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  svg {
    color: ${colors.menuGray};
    font-size: 2rem;
    margin-right: 0.4rem;
  }
`;

const AccountButtonText = styled.div`
  color: ${colors.menuGray};
  text-align: center;
  font-weight: 500;
  font-size: 1rem;
`;
