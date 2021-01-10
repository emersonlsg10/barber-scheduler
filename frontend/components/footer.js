/* eslint-disable prettier/prettier */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  footer: {
    backgroundColor: 'black',
  },
  rootGrid: {
    '@media (max-width: 670px)': { flexDirection: 'column' },
  },
  gridInfo: {
    marginTop: 10,
    paddingLeft: 25,
    paddingRight: 20,
    flexWrap: 'wrap',
  },
  logoContainer: {
    '@media (max-width: 670px)': {
      width: '100%',
    },
  },
});

const Footer = () => {
  const classes = useStyles();

  return (
    <>
      <footer className={classes.footer}>
        <Grid
          className={classes.rootGrid}
          style={{ paddingTop: 25, paddingBottom: 25 }}
          container
          justify="center"
          alignContent="flex-start">
          <Grid
            item
            className={classes.logoContainer}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 20,
              paddingRight: 25,
            }}>
            <img
              src="/barber-logo.jpg"
              alt="logo"
              width="auto"
              height="70"
            />
          </Grid>
          <Grid item className={classes.gridInfo}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Icon
                  style={{
                    float: 'left',
                    marginRight: '10px',
                    color: 'white',
                    fontSize: '18px',
                    marginTop: '5px',
                  }}>
                  phone
                </Icon>
                <span
                  style={{
                    float: 'left',
                    marginRight: '15px',
                    marginTop: '3px',
                    color: 'white',
                    fontSize: '14px',
                  }}>
                  {' '}
                  (62) 9 8226-2854{' '}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Icon
                  style={{
                    float: 'left',
                    marginRight: '10px',
                    marginTop: '4px',
                    color: 'white',
                    fontSize: '20px',
                  }}>
                  mail
                </Icon>
                {'  '}
                <span
                  style={{
                    float: 'left',
                    marginRight: '10px',
                    marginTop: '3px',
                    color: 'white',
                    fontSize: '14px',
                  }}>
                  {' '}
                  lesoftdesenvolvedora@gmail.com
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <span
                  style={{
                    float: 'left',
                    marginRight: '10px',
                    marginTop: '3px',
                    color: 'white',
                    fontSize: '14px',
                  }}>
                  Horário de atendimento: 08H ÀS 18H
                </span>
              </div>
            </div>
            <div
              style={{
                color: '#939393',
                float: 'left',
                width: '100%',
                marginTop: '5px',
                marginRight: 5,
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'left',
              }}>
              Agenda Aqui * | Seu Sistema de agendamento feito pela
              <a
                href="https://instagram.com/lesoftdesenvolvedora"
                style={{ color: '#EB961F' }}>
                Lesoft Desenvolvedora
              </a>
            </div>
          </Grid>
        </Grid>
      </footer>
    </>
  );
};

export default Footer;
