import React from 'react';
import { Box, Typography } from '@material-ui/core';


export default function ProfileDescriptionItem({ label, value }) {
  return (
    <Box style={{ marginTop: 8 }}>
      <Typography
        style={{
          color: '#314c51',
          fontSize: 20,
          fontWeight: '600',
        }}
      >
        {label}
      </Typography>
      <Typography
        style={{
          color: '#384d59',
          fontSize: 15,
        // fontWeight: '400',
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
