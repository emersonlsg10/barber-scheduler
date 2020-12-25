/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ModalScheduler from 'components/modalScheduler';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.gray,
  },
  list: {
    backgroundColor: theme.palette.background.primary,
  },
  listItem: {
    height: 35,
    '&:nth-of-type(odd)': {
      backgroundColor: '#cecece',
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
  perHour: ['00', '15', '30', '45'],
};

export default function SchedulesDay({ dataSchedules, loading, dataServices, loadingServices }) {
  const classes = useStyles();

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = (hour, min) => {
    setTimeout(() => {
      setOpenModal(true);
    }, 150)
    console.log(hour, min);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const verifyHourSchedule = hour => {
    return dataSchedules?.find(item => item.schedule === hour);
  }

  return (
    <div className={classes.root}>
      <List component="nav" className={classes.list} aria-label="main mailbox folders">
        {!loading && !!dataSchedules && configs.hoursPerDays.map((hour, index) => (
          <>
            {configs.perHour.map(min => (
              <>
                {verifyHourSchedule(`${hour}:${min}:00`) ? (
                  <ListItem key={index} button className={classes.listItem}>
                    <ListItemIcon>
                      <AccessTimeIcon />
                    </ListItemIcon>
                    <ListItemText primary={`${hour}:${min}`} />
                  Reservado
                  </ListItem>) : (
                    <ListItem key={index} onClick={() => handleOpenModal(hour, min)} button className={classes.listItem}>
                      <ListItemIcon>
                        <AccessTimeIcon />
                      </ListItemIcon>
                      <ListItemText primary={`${hour}:${min}`} />
                      <AddCircleOutlineIcon />
                    </ListItem>)}
                <Divider />
              </>
            ))}
          </>
        ))}
      </List>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <ModalScheduler dataServices={dataServices} loadingServices={loadingServices} />
      </Modal>
    </div>
  );
}
