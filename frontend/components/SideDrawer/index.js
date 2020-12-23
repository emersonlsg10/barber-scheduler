import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Creators as AuthCreators } from 'appStore/ducks/auth';
import Link from 'next/link';
// import BookmarkIcon from '@material-ui/icons/Bookmark';
// import TimelineIcon from '@material-ui/icons/Timeline';

export const appPages = [
  {
    id: 'home',
    name: 'Início',
    path: '/',
  },
  {
    id: 'configs',
    name: 'Configurações',
    path: '/configs',
  },
];

const useStyles = makeStyles({
  list: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    width: 250,
  },
  listMenus: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SideDrawer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  /* const onLinkPress = path => () => {
    Router.push({
      pathname: path,
    });
  }; */

  const onLogout = () => {
    dispatch(AuthCreators.getLogoutRequest());
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}>
      <List className={classes.listMenus}>
        {appPages.map(menu => (
          <React.Fragment key={menu.id}>
            <Link href={menu.path}>
              <ListItem button>
                <ListItemIcon style={{ color: '#aaa' }}>
                  {menu.icon}
                </ListItemIcon>
                <ListItemText primary={menu.name} />
              </ListItem>
            </Link>
            {menu.id === 'home' && <Divider />}
          </React.Fragment>
        ))}
      </List>
      <Divider />
      <ListItem button onClick={onLogout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Sair" />
      </ListItem>
      <style jsx>{`
        .MuiListItemIcon-root {
          min-width: 35px;
        }
      `}</style>
    </div>
  );

  return (
    <div>
      <IconButton style={{ padding: 0 }} onClick={toggleDrawer('left', true)}>
        <MenuIcon color="secondary" />
      </IconButton>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
  );
}