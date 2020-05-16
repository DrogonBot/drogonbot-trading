import { Divider, SwipeableDrawer } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../../constants/UI/Colors.constant';
import { INavOption } from '../../../../types/UI.types';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

interface IProps {
  navOptions: INavOption[];
}

export default function MobileNav({ navOptions }: IProps) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  type DrawerSide = "top" | "left" | "bottom" | "right";
  type Anchor = "top" | "left" | "bottom" | "right";

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const onRenderSideListItems = (primary?: boolean) => {
    const filteredOptions = navOptions.filter(
      (option) =>
        (!option.desktopOnly || option.mobileOnly) && option.primary === primary
    );

    return filteredOptions.map((navOption, index) => {
      return (
        <Link href={navOption.href} key={navOption.text}>
          <ListItem button>
            <ListItemIcon>{navOption.icon}</ListItemIcon>
            <ListItemText primary={navOption.text} />
          </ListItem>
        </Link>
      );
    });
  };

  const sideList = (side: DrawerSide) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>{onRenderSideListItems(true)}</List>
      <Divider />
      <List>{onRenderSideListItems(false)}</List>

      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  return (
    <React.Fragment key={"left"}>
      <HamburgerIcon>
        <MenuIcon onClick={toggleDrawer("left", true)} />
      </HamburgerIcon>

      <SwipeableDrawer
        anchor={"left"}
        open={state.left}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        {sideList("left")}
      </SwipeableDrawer>
    </React.Fragment>
  );
}

const HamburgerIcon = styled.div`
  padding: 1rem;
  color: ${colors.textGray};

  svg {
    font-size: 2rem;
  }
`;
