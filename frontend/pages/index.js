/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Layout from 'components/layout';
import CalendarPicker from 'components/CalendarPicker';
import SchedulesDay from 'components/SchedulesDay';
import { Container, makeStyles, Modal } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ModalFails from 'components/modalFails';
import { Creators as UserDetailsCreators } from 'appStore/ducks/user/details';
import { Creators as ServicesListCreators } from 'appStore/ducks/services/list';
import { Creators as SchedulesDetailsCreators } from 'appStore/ducks/schedules/details';
import { Creators as SchedulesCreateCreators } from 'appStore/ducks/schedules/create';
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

  const [openModalFail, setOpenModalFail] = useState(false);
  const handleCloseModal = () => {
    setOpenModalFail(false);
  };

  const handleOpenModal = () => {
    setOpenModalFail(true);
  };

  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

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

    var date = moment(selectedDate).format('YYYY-MM-DD')
    var now = moment().format('YYYY-MM-DD');

    if (now > date) {
      handleOpenModal();
      setSelectedDate(new Date());
    } else {
      getSchedulesDay();
    }

  }, [selectedDate]);

  useEffect(() => {
    if (!loadingUser) {
      dispatch(UserDetailsCreators.getRequest())
    }
    getSchedulesDay();
    dispatch(ServicesListCreators.getRequest());
  }, []);

  const onSchedulerSubmit = data => {
    dispatch(SchedulesCreateCreators.getRequest({ 
      data: { ...data.filter(item => item.checked) },
      selectedDate: moment(selectedDate).format('YYYY-MM-DD'), 
      selectedTime 
    }));
  };

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
              selectedDate={selectedDate && moment(selectedDate).format('DD/MM/YYYY')}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              onSchedulerSubmit={onSchedulerSubmit}
            />
          </div>
        </Container>
        <Modal
          open={openModalFail}
          onClose={handleCloseModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description">
          <ModalFails
            error={'Não é possível agendar pra ontem.'}
            setOpenModalFail={setOpenModalFail}
            showButton={false}
          />
        </Modal>
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
