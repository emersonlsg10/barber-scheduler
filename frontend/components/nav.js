import React from 'react';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Grid,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import { Creators } from 'appStore/ducks/login';
import SideDrawer from './SideDrawer';
import UserAvatar from './pages/dashboard/UserAvatar';
import HorizontalMenu from './HorizontalMenu';

const Nav = ({ exibirBotoes = true }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const onLogout = () => {
    dispatch(Creators.getLogoutRequest());
  };
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'center', horizontal: 'left' }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      {/* <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
      <Divider /> */}
      <MenuItem onClick={onLogout}>Sair</MenuItem>
    </Menu>
  );

  return (
    <>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar style={{ paddingRight: 0 }}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center">
            <Grid item>
              <Hidden smUp>
                <SideDrawer />
              </Hidden>
              <Hidden xsDown>
                <HorizontalMenu />
              </Hidden>
            </Grid>
            <Grid item>
              {exibirBotoes && (
                <Box>
                  <IconButton
                    aria-controls="primary-search-account-menu"
                    onClick={handleProfileMenuOpen}>
                    <UserAvatar
                      size={35}
                      src="https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                    />
                  </IconButton>
                </Box>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </>
  );
};

export default Nav;
