/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import moment from 'moment';
import { useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ModalScheduler from 'components/modalScheduler';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  list: {
    backgroundColor: theme.palette.background.primary,
    width: '100%',
  },
  listItem: {
    height: 35,
    color: '#fff',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.darkGray,
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const configs = {
  hoursPerDays: [
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
  ],
  perHour: ['00', '30'],
  razao: 30,
};

export default function SchedulesDay({
  dataSchedules,
  loadingSchedules,
  dataServices,
  loadingServices,
  getSchedulesDetails,
  getSchedulesDay,
  selectedDate,
  selectedTime,
  setSelectedTime,
  onSchedulerSubmit,
  dataUser
}) {
  const classes = useStyles();
  const {
    data: dataScheduleDetails,
    loading: loadingScheduleDetails,
  } = useSelector(state => state.schedules.details);

  const {
    loading: loadingScheduleCreate,
    data: dataScheduleCreate,
  } = useSelector(state => state.schedules.create);

  const [openModal, setOpenModal] = useState(false);
  const [limitTimeService, setLimitTimeService] = useState(null);

  const verifyHourSchedule = hour => {
    return dataSchedules?.find(item => item.schedule === hour);
  }

  const handleOpenModal = (hour, min, rowData) => {

    if (rowData) {
      const Teste = rowData[0]?.service_id;
      console.log(JSON.parse(Teste));
    }

    const formatedHour = `${hour}:${min}:00`;
    setSelectedTime(formatedHour);
    getSchedulesDetails(formatedHour);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const countLimit = schedule => {
    let count = 1;
    let scanTime = 120; // minutes
    let tempRazao = configs.razao;
    let tempHour = `${schedule}`;
    let firstOneFounded = null;

    for (let i = 0; i < scanTime / tempRazao; i++) {
      tempHour = moment(tempHour, 'HH:mm:ss').add(tempRazao, 'minutes').format('HH:mm:ss');
      console.log(tempHour, 'verificando', !!verifyHourSchedule(`${tempHour}`));
      if (verifyHourSchedule(`${tempHour}`)) {
        firstOneFounded = tempHour;
        continue;
      } else {
        if (!firstOneFounded)
          count++
      }
    }
    setLimitTimeService(count);
    console.log(count);
  };

  const countLimitBefore = schedule => {
    let scanTime = 60; // minutes
    let tempRazao = configs.razao;
    let tempHour = `${schedule}`;

    for (let i = 1; i <= scanTime / tempRazao; i++) {
      tempHour = moment(tempHour, 'HH:mm:ss').subtract(tempRazao, 'minutes').format('HH:mm:ss');

      const verifyExists = verifyHourSchedule(`${tempHour}`);
      if (verifyExists && verifyExists?.total_time > tempRazao * i) {
        return verifyExists;
      }
    }
    return null;
  };

  useEffect(() => {
    setOpenModal(false);
  }, [])

  useEffect(() => {
    if (!loadingScheduleDetails && !!dataScheduleDetails && dataScheduleDetails.length === 0) {
      if (!loadingSchedules && selectedTime && !!dataSchedules && !verifyHourSchedule(selectedTime)) {
        setOpenModal(true);
        countLimit(selectedTime);
      } else {
        getSchedulesDay();
      }
    } else {
      getSchedulesDay();
    }
  }, [dataScheduleDetails]);

  useEffect(() => {
    if (!loadingScheduleCreate && !!dataScheduleCreate) {
      getSchedulesDay();
      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    }
  }, [dataScheduleCreate]);

  const [delayLoading, setDelayLoading] = useState(false);
  useEffect(() => {
    if (loadingSchedules) {
      setDelayLoading(true);
      setTimeout(() => { setDelayLoading(false) }, 1000);
    }
  }, [loadingSchedules]);

  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={loadingScheduleDetails || delayLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <List component="nav" className={classes.list} aria-label="main mailbox folders">
        {configs.hoursPerDays.map((hour, index) => (
          <>
            {configs.perHour.map((min) => (
              <>
                <ItemList key={index}
                  index={index}
                  hour={hour}
                  min={min}
                  verifyHourSchedule={verifyHourSchedule}
                  dataUser={dataUser}
                  handleOpenModal={handleOpenModal}
                  selectedTim={selectedTime}
                  loadingSchedules={loadingSchedules}
                  loadingScheduleDetails={loadingScheduleDetails}
                  countLimitBefore={countLimitBefore}
                />
              </>
            ))}
          </>
        ))}
      </List>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <ModalScheduler
          dataServices={dataServices ? dataServices?.data : []}
          loadingServices={loadingServices}
          selectedTime={selectedTime}
          limitTimeService={limitTimeService && limitTimeService}
          selectedDate={selectedDate}
          onSchedulerSubmit={onSchedulerSubmit}
          loadingScheduleCreate={loadingScheduleCreate}
          razao={configs.razao} />
      </Modal>
    </div>
  );
}

const ItemList = ({
  hour,
  min,
  verifyHourSchedule,
  dataUser,
  handleOpenModal,
  selectedTime,
  loadingSchedules,
  loadingScheduleDetails,
  countLimitBefore,
}) => {
  const classes = useStyles();
  const VerifySchedule = verifyHourSchedule(`${hour}:${min}:00`);
  const VerifyBefore = countLimitBefore(`${hour}:${min}:00`);

  return (
    <>
      { VerifySchedule || VerifyBefore ? (
        <ListItem onClick={() => console.log(VerifySchedule)} button className={classes.listItem}>
          <ListItemIcon>
            <AccessTimeIcon />
          </ListItemIcon>
          <ListItemText primary={`${hour}:${min}`} />
          <span style={{ fontStyle: 'italic', fontSize: 13 }}>
            {(VerifyBefore && VerifyBefore.client_id === dataUser?.id) || (dataUser && VerifySchedule && dataUser?.id === VerifySchedule.client_id) ? 'Reservado por você' : 'Reservado por outra pessoa'}
          </span>
        </ListItem>) : (
          <ListItem style={{ marginLeft: 5 }} onClick={() => handleOpenModal(hour, min)} button className={classes.listItem}>
            <ListItemIcon>
              <AccessTimeIcon style={{ color: 'white' }}/>
            </ListItemIcon>
            <ListItemText primary={`${hour}:${min}`} />
            {(loadingScheduleDetails || loadingSchedules) && selectedTime === `${hour}:${min}:00` ? <CircularProgress color="primary" size={16} /> : <AddCircleOutlineIcon />}
          </ListItem>)}
          <style global jsx>{`
            .MuiListItemText-primary {
              color: white !important;
            }
          `}</style>
    </>
  );
};
