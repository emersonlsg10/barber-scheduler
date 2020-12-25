import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Link from 'next/link';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles(theme => ({
  modal: {
    color: '#fff',
    position: 'absolute',
    width: 450,
    '@media (min-width: 600px)': {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    },
    '@media (max-width: 600px)': {
      width: '90%',
      top: `30%`,
      left: '50%',
      transform: `translate(-50%)`,
    },
    backgroundColor: '#252525',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function ModalFails({ error, setOpenModalFail, showButton = true }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.modal}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <div>
            <ErrorOutlineIcon
              style={{ color: '#b63d1b', width: 100, height: 100 }}
            />
          </div>
          <div>
            <h3>{error && error}</h3>
          </div>
          {showButton && (
            <div className={classes.logoDiv}>
              <Button
                onClick={() => setOpenModalFail(false)}
                style={{
                  backgroundColor: '#D36821',
                  width: 230,
                  borderRadius: 20,
                  color: 'white',
                  marginTop: 30,
                }}
                variant="contained">
                Tentar novamente
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default ModalFails;
