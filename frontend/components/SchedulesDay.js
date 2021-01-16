/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
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
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import { Creators as SchedulesDeleteCreators } from 'appStore/ducks/schedules/delete';

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
  labelReserva: {
    fontStyle: 'italic',
    fontSize: 13,
  },
}));

const configs = {
  perHour: ['00'],
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
  dataUser,
  hoursPerDays,
  companyLoading,
  per_schedule,
  razao,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    data: dataScheduleDetails,
    loading: loadingScheduleDetails,
  } = useSelector(state => state.schedules.details);

  const {
    loading: loadingScheduleCreate,
    data: dataScheduleCreate,
  } = useSelector(state => state.schedules.create);

  const {
    loading: loadingScheduleDelete,
    data: dataScheduleDelete,
  } = useSelector(state => state.schedules.delete);

  const [openModal, setOpenModal] = useState(false);
  const [limitTimeService, setLimitTimeService] = useState(null);

  const verifyHourSchedule = hour => {
    return dataSchedules?.find(item => item.schedule === hour);
  };

  const filterHourSchedule = hour => {
    return dataSchedules?.filter(item => item.schedule === hour);
  };

  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedScheduleServices, setSelectedScheduleServices] = useState(
    null
  );
  const onEditSchedule = schedule => {
    setSelectedScheduleServices(JSON.parse(schedule.service_id));
    setSelectedSchedule(schedule);
    setTimeout(() => {
      setOpenModal(true);
    }, 200);
  };

  const onCancelSchedule = id => {
    dispatch(SchedulesDeleteCreators.getRequest({ id }));
  };

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
    setSelectedScheduleServices(null);
    setSelectedSchedule(null);
  };

  const countLimit = schedule => {
    let count = 1;
    let scanTime = 120; // minutes
    let tempRazao = razao;
    let tempHour = `${schedule}`;
    let firstOneFounded = null;

    for (let i = 0; i < scanTime / tempRazao; i++) {
      tempHour = moment(tempHour, 'HH:mm:ss')
        .add(tempRazao, 'minutes')
        .format('HH:mm:ss');
      console.log(tempHour, 'verificando', !!verifyHourSchedule(`${tempHour}`), filterHourSchedule(tempHour).length);
      if (verifyHourSchedule(`${tempHour}`) && filterHourSchedule(tempHour).length < per_schedule) {
        firstOneFounded = tempHour;
        continue;
      } else {
        if (!firstOneFounded) count++;
      }
    }
    setLimitTimeService(count);
    console.log(count);
  };

  const countLimitBefore = schedule => {
    let scanTime = 60; // minutes
    let tempRazao = razao;
    let tempHour = `${schedule}`;

    for (let i = 1; i <= scanTime / tempRazao; i++) {
      tempHour = moment(tempHour, 'HH:mm:ss')
        .subtract(tempRazao, 'minutes')
        .format('HH:mm:ss');

      const verifyExists = verifyHourSchedule(`${tempHour}`);
      if (verifyExists && verifyExists?.total_time > tempRazao * i) {
        return verifyExists;
      }
    }
    return null;
  };

  const onAdminClick = schedules => {
    console.log(schedules);
  };

  useEffect(() => {
    setOpenModal(false);
  }, []);

  useEffect(() => {
    if (!loadingScheduleDetails && !!dataScheduleDetails) {
      if (
        !loadingSchedules &&
        selectedTime &&
        !!dataSchedules &&
        dataScheduleDetails.length < per_schedule
      ) {
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
    if ((!loadingScheduleCreate && !!dataScheduleCreate) || (!loadingScheduleDelete && !!dataScheduleDelete)) {
      getSchedulesDay();
      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    }
  }, [dataScheduleCreate, dataScheduleDelete]);

  const [delayLoading, setDelayLoading] = useState(false);
  useEffect(() => {
    if (loadingSchedules) {
      setDelayLoading(true);
      setTimeout(() => {
        setDelayLoading(false);
      }, 500);
    }
  }, [loadingSchedules]);

  return (
    <div className={classes.root}>
      <Backdrop
        className={classes.backdrop}
        open={loadingScheduleDetails || delayLoading || companyLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <List
        component="nav"
        className={classes.list}
        aria-label="main mailbox folders">
        {hoursPerDays?.map((hour, index) => (
          <>
            {configs.perHour.map(min => (
              <>
                <ItemList
                  key={index}
                  index={index}
                  hour={hour}
                  min={min}
                  verifyHourSchedule={verifyHourSchedule}
                  dataUser={dataUser}
                  handleOpenModal={handleOpenModal}
                  selectedTime={selectedTime}
                  loadingSchedules={loadingSchedules}
                  loadingScheduleDetails={loadingScheduleDetails}
                  countLimitBefore={countLimitBefore}
                  filterHourSchedule={filterHourSchedule}
                  per_schedule={per_schedule}
                  onEditSchedule={onEditSchedule}
                  onAdminClick={onAdminClick}
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
          dataServices={
            !selectedScheduleServices ? dataServices : selectedScheduleServices
          }
          selectedSchedule={selectedSchedule}
          loadingServices={loadingServices}
          selectedTime={selectedTime}
          limitTimeService={limitTimeService && limitTimeService}
          selectedDate={selectedDate}
          onSchedulerSubmit={onSchedulerSubmit}
          loadingScheduleCreate={loadingScheduleCreate}
          onCancelSchedule={onCancelSchedule}
          loadingScheduleDelete={loadingScheduleDelete}
          razao={razao}
        />
      </Modal>
    </div>
  );
}

const ItemList = ({
  hour,
  min,
  dataUser,
  handleOpenModal,
  filterHourSchedule,
  per_schedule,
  onEditSchedule,
  onAdminClick
}) => {
  const classes = useStyles();
  // const VerifySchedule = verifyHourSchedule(`${hour}:${min}:00`);
  // const VerifyBefore = countLimitBefore(`${hour}:${min}:00`);
  const VerifyCount = filterHourSchedule(`${hour}:${min}:00`);
  const mySchedule = VerifyCount.find(item => item.client_id === dataUser?.id);

  return (
    <>
      {VerifyCount.length >= per_schedule || mySchedule ? (
        <ListItem
          button
          onClick={() => dataUser?.group === '1' ?  onAdminClick(VerifyCount) : onEditSchedule(mySchedule)}
          className={classes.listItem}>
          <ListItemIcon>
            <AccessTimeIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary={`${hour}:${min}`} />
          {dataUser && mySchedule ? (
            <>
              <span className={classes.labelReserva}>Reservado</span>
              <IconButton
                style={{ padding: 0, marginLeft: 10 }}
                aria-label="delete"
                color="primary">
                <CancelIcon color="primary" />
              </IconButton>
            </>
          ) : (
            <span className={classes.labelReserva}>
              Reservado por outra pessoa
            </span>
          )}
        </ListItem>
      ) : (
        <ListItem
          onClick={() => dataUser?.group === '1' ?  onAdminClick(VerifyCount) : handleOpenModal(hour, min)}
          button
          className={classes.listItem}>
          <ListItemIcon>
            <AccessTimeIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary={`${hour}:${min}`} />
          <span className={classes.labelReserva}>{`${
            per_schedule - VerifyCount.length
          } vagas`}</span>
          <AddCircleOutlineIcon style={{ marginLeft: 10 }} />
        </ListItem>
      )}
      <style global jsx>{`
        .MuiListItemText-primary {
          color: white !important;
        }
      `}</style>
    </>
  );
};
