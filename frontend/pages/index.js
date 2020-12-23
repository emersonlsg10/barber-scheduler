/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import Layout from 'components/layout';
import CalendarPicker from 'components/CalendarPicker';
import SchedulesDay from 'components/SchedulesDay';
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.primary.main,
    marginLeft: 10,
    marginTop: 35,
  },
}));


export default function Index() {
  const classes = useStyles();

  return (
    <>
      <Layout maxWidth={false}>
        <Container maxWidth={'lg'}>
          <CalendarPicker />
          <h3 className={classes.title}>Selecione um horário: </h3>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
          }}>
            <SchedulesDay />
          </div>
        </Container>
      </Layout>
    </>
  );
}

Index.getInitialProps = async ({ store }) => { };
