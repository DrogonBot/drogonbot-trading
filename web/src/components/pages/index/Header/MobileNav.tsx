import Drawer from '@material-ui/core/Drawer';
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
  const toggleDrawer = (side: DrawerSide, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const onRenderSideListItems = () => {
    return navOptions.map((navOption, index) => {
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
      <List>{onRenderSideListItems()}</List>
      {/* <Divider /> */}
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
    <>
      <HamburgerIcon>
        <MenuIcon onClick={toggleDrawer("left", true)} />
      </HamburgerIcon>

      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>
    </>
  );
}

const HamburgerIcon = styled.div`
  padding: 1rem;
  color: ${colors.textGray};

  svg {
    font-size: 2rem;
  }
`;
