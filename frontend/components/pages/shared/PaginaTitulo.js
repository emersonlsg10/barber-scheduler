import React from 'react';
import { Typography } from '@material-ui/core';

function PaginaTitulo({ children, titulo }) {
  return (
    <Typography
      color="primary"
      style={{ textTransform: 'uppercase', marginTop: 10 }}
      variant="h4"
      align="center"
    >
      {children || titulo}
    </Typography>
  );
}

export default PaginaTitulo;
