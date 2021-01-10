/* eslint-disable prettier/prettier */
import React from 'react';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Grid,
  makeStyles,
} from '@material-ui/core';
import Link from 'next/link';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import SideDrawer from './SideDrawer';
import UserAvatar from './pages/dashboard/UserAvatar';
import HorizontalMenu from './HorizontalMenu';
import FormControl from '@material-ui/core/FormControl';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  topBar: {
    backgroundColor: 'black',
  },
  menuItem: {
    color: '#aaa',
    fontSize: 15,
    paddingLeft: 7,
    width: 200,
    '&:hover': {
      color: '#fff',
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'solid',
  },
  logo: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginLeft: 5,
    marginRight: 7,
  },
  logoDiv: {
    display: 'block',
    position: 'absolute',
    '@media (max-width: 600px)': {
      left: '50%',
      transform: 'translateX(-50%)',
    },
    left: '50%',
    transform: 'translateX(-50%)',
  },
  expandIcon: {
    color: '#aaa',
    marginLeft: 5,
  },
  popover: {
    width: 343,
    zIndex: 100,
    // top: '120px !important',
    // pointerEvents: 'none',
  },
  paper: {
    padding: '10px 10px 5px 10px',
    backgroundColor: '#2D2D2D',
    color: '#fff',
    //backgroundColor: theme.palette.background.paper,
    fontSize: 13,
    minHeight: 50,
    maxHeight: 500,
    overflow: 'auto',
  },
  paper2: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  paper3: {
    padding: '20px 10px 5px 10px',
    color: '#fff',
    fontSize: 13,
    minHeight: 50,
    backgroundColor: '#2D2D2D',
    display: 'flex',
    justifyContent: 'center',
  },
  textPopover: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 0,
    marginTop: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
  },
  expandIconPopover: {
    color: '#fff',
    fontSize: 20,
    marginTop: -5,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
  },
  avatarButton: {
    marginRight: -14,
  },
  botaoLogin: {
    '@media (min-width: 1280px)': {
      paddingTop: 10,
    },
  },
  titleSolicitation: {
    fontStyle: 'bold',
    fontSize: 15,
    margin: '10px 0px',
  },
}));

const Nav = ({ exibirBotoes = true, slug }) => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <AppBar position="sticky" className={classes.topBar}>
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center">
            <Grid item>
              <Hidden mdUp>
                <SideDrawer slug={slug} />
              </Hidden>
              <Hidden smDown>
                <HorizontalMenu />
              </Hidden>
            </Grid>
            <div className={classes.logoDiv}>
              <Link href={`/${slug}`}>
                <a
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <img
                    src="/barber-logo.jpg"
                    alt="logo"
                    width="auto"
                    height="60"
                  />
                </a>
              </Link>
            </div>
            <Grid item>
              {exibirBotoes && (
                <Box>
                  <Hidden smDown>
                    <FormControl>
                      {/* <SearchField /> */}
                    </FormControl>
                  </Hidden>

                  {true && (
                    <>
                      <IconButton
                        aria-controls="primary-search-account-menu"
                        className={classes.avatarButton}>
                        <UserAvatar
                          size={40}
                          style={{
                            borderWidth: 2,
                            borderColor: 'white',
                            borderStyle: 'solid',
                          }}
                          src={
                            'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'
                          }
                        />
                        {true ? (
                          <ExpandLess style={{ color: '#fff' }} />
                        ) : (
                            <ExpandMore style={{ color: '#fff' }} />
                          )}
                      </IconButton>
                    </>
                  )}
                </Box>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Nav;
