/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import Layout from 'components/layout';
import CalendarPicker from 'components/CalendarPicker';
import SchedulesDay from 'components/SchedulesDay';
import { Container, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as UserDetailsCreators } from 'appStore/ducks/user/details';
import { Creators as ServicesListCreators } from 'appStore/ducks/services/list';
import { Creators as SchedulesDetailsCreators } from 'appStore/ducks/schedules/details';
import moment from 'moment';
import { Creators as SchedulesListDetailsCreators } from 'appStore/ducks/schedules/list';

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.primary.main,
    // marginLeft: 10,
    marginTop: 35,
  },
  greetings: {
    fontSize: 20,
    margin: '15px 0 0 0px',
  },
}));


export default function Index() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const {
    data: dataUser,
    loading: loadingUser,
  } = useSelector(state => state.user.details);

  const {
    data: dataSchedules,
    loading: loadingSchedules,
  } = useSelector(state => state.schedules.list);

  const {
    data: dataServices,
    loading: loadingServices,
  } = useSelector(state => state.services.list);

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const getSchedulesDay = () => {
    dispatch(
      SchedulesListDetailsCreators.getRequest({
        date: moment(selectedDate).format('YYYY-MM-DD'),
      })
    );
  };

  const getSchedulesDetails = schedule => {
    dispatch(
      SchedulesDetailsCreators.getRequest({
        date: moment(selectedDate).format('YYYY-MM-DD'),
        schedule,
      })
    );
  };

  useEffect(() => {
    getSchedulesDay();
  }, [selectedDate]);

  useEffect(() => {
    if (!loadingUser) {
      dispatch(UserDetailsCreators.getRequest())
    }
    getSchedulesDay();
    dispatch(ServicesListCreators.getRequest());
  }, []);

  return (
    <>
      <Layout maxWidth={false}>
        <Container maxWidth={'lg'}>
          <Greetings name={dataUser?.username} />
          <CalendarPicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          <h3 className={classes.title}>Selecione um horário: </h3>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
          }}>
            <SchedulesDay
              dataSchedules={dataSchedules ? dataSchedules?.data : []}
              loadingSchedules={loadingSchedules}
              dataServices={dataServices}
              loadingServices={loadingServices}
              getSchedulesDay={getSchedulesDay}
              getSchedulesDetails={getSchedulesDetails}
            />
          </div>
        </Container>
      </Layout>
    </>
  );
}

const Greetings = ({ name }) => {
  const classes = useStyles();
  return (
    <div className={classes.greetings}>Olá <strong>{name}</strong>, seja bem vindo!</div>
  )
};

Index.getInitialProps = async ({ store }) => {
  store.dispatch(UserDetailsCreators.getRequest())
};
