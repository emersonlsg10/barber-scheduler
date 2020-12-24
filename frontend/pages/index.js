/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import Layout from 'components/layout';
import CalendarPicker from 'components/CalendarPicker';
import SchedulesDay from 'components/SchedulesDay';
import { Container, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  Creators as UserDetailsCreators,
} from 'appStore/ducks/user/details';

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.primary.main,
    marginLeft: 10,
    marginTop: 35,
  },
}));


export default function Index() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const {
    data: dataUser,
    loading: loadingUser,
  } = useSelector(state => state.user);

  return (
    <>
      <Layout maxWidth={false}>
        <Container maxWidth={'lg'}>
          <Greetings name={dataUser?.username} />
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

const Greetings = ({ user }) => {
  return (
    <div>Olá: {user?.name}</div>
  )
};

Index.getInitialProps = async ({ store }) => {
  store.dispatch(
    UserDetailsCreators.getRequest()
  );
};
