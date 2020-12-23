import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { MenuItem } from '@material-ui/core';
import Link from 'next/link';
import Router from 'next/router';
import { appPages } from 'components/SideDrawer';
// import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  list: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    width: 250,
  },
  listMenus: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    marginLeft: 0,
  },
  itemMenu: {
    padding: '5px 5px 0px 0px',
    color: '#aaa',
    '&:hover': {
      color: '#fff',
    },
  },
  fullList: {
    width: 'auto',
  },
  menu: {
    display: 'flex',
    padding: 0,
    flexDirection: 'column',
    margin: 0,
  },
  itemSelected: {
    padding: '5px 5px 0px 0px',
    color: '#fff',
  },
  menuIcon: {
    paddingRight: 0,
    paddingLeft: 0,
    marginRight: 0,
    marginLeft: 0,
    marginTop: 3,
    color: 'inherit',
    fontSize: 'large',
  },
});

export default function HorizontalMenu() {
  const classes = useStyles();

  const onLinkPress = path => () => {
    setTimeout(function () {
      Router.push(path);
    }, 250);
  };

  return (
    <List className={classes.listMenus}>
      {appPages.map(menu => (
        <MenuItem
          className={classes.menu}
          button
          key={menu.id}
          onClick={onLinkPress(menu.path)}>
          <React.Fragment>
            <Link href={menu.path}>
              <ul className={classes.itemMenu}>
                {menu.icon ? (
                  <>
                    <div
                      style={{
                        display: 'flex',
                      }}>
                      <div
                        style={{
                          width: 25,
                          paddingLeft: 0,
                        }}>
                        <ListItemIcon className={classes.menuIcon}>
                          {menu.icon}
                        </ListItemIcon>
                      </div>
                      <div>
                        <ListItemText primary={menu.name} />
                      </div>
                    </div>
                  </>
                ) : (
                  <ListItemText
                    primary={menu.name}
                    style={{ marginRight: 5 }}
                  />
                )}
              </ul>
            </Link>
          </React.Fragment>
        </MenuItem>
      ))}
    </List>
  );
}
