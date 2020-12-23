import React from 'react';
import { Box } from '@material-ui/core';

const HeaderBoxContainer = props => (
  <Box
    display="flex"
    flexDirection="row"
    flexWrap="wrap"
    justifyContent="center"
    {...props}
  />
);

export default HeaderBoxContainer;
