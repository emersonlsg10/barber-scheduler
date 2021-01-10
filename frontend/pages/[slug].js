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
import { Creators as LoginCreators } from 'appStore/ducks/login';
import { Creators as ServicesListCreators } from 'appStore/ducks/services/list';
import { Creators as SchedulesDetailsCreators } from 'appStore/ducks/schedules/details';
import { Creators as SchedulesCreateCreators } from 'appStore/ducks/schedules/create';
import { Creators as CompanyDetailsCreators } from 'appStore/ducks/company/details';
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
    color: 'white',
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

export default function Index({ slug }) {
  const dispatch = useDispatch();

  const classes = useStyles();

  const { isAuth } = useSelector(state => state.auth);

  const { data: companyData, loading: companyLoading } = useSelector(state => state.company.details);
  const { data: dataUser, loading: loadingUser } = useSelector(
    state => state.user.details
  );

  const { data: dataSchedules, loading: loadingSchedules } = useSelector(
    state => state.schedules.list
  );

  const { data: dataServices, loading: loadingServices } = useSelector(
    state => state.services.list
  );

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
        slug,
      })
    );
  };

  const getSchedulesDetails = schedule => {
    dispatch(
      SchedulesDetailsCreators.getRequest({
        date: moment(selectedDate).format('YYYY-MM-DD'),
        schedule,
        slug,
      })
    );
  };

  useEffect(() => {
    if (!isAuth && !slug) return;
    var date = moment(selectedDate).format('YYYY-MM-DD');
    var now = moment().format('YYYY-MM-DD');

    if (now > date) {
      handleOpenModal();
      setSelectedDate(new Date());
    } else {
      getSchedulesDay();
    }
  }, [selectedDate]);

  useEffect(() => {
    if (slug) {
      if (isAuth) {
        dispatch(UserDetailsCreators.getRequest());
        dispatch(CompanyDetailsCreators.getRequest({ slug }));
        dispatch(ServicesListCreators.getRequest({ slug }));
      } else {
        dispatch(LoginCreators.getLoginRedirect(slug));
      }
    }
  }, []);

  const onSchedulerSubmit = data => {
    if (companyData) {
      dispatch(
        SchedulesCreateCreators.getRequest({
          service_id: [...data],
          date: moment(selectedDate).format('YYYY-MM-DD'),
          schedule: selectedTime,
          company_id: companyData?.id,
        })
      );
    }
  };

  return (
    <>
      <Layout maxWidth={false} slug={slug}>
        {isAuth && (
          <Container maxWidth={'lg'}>
            <Greetings name={dataUser?.username} />
            <CalendarPicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <h3 className={classes.title}>Selecione um horário: </h3>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}>
              <SchedulesDay
                dataSchedules={dataSchedules ? dataSchedules : []}
                loadingSchedules={loadingSchedules}
                dataServices={dataServices}
                loadingServices={loadingServices}
                getSchedulesDay={getSchedulesDay}
                getSchedulesDetails={getSchedulesDetails}
                selectedDate={
                  selectedDate && moment(selectedDate).format('DD/MM/YYYY')
                }
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                onSchedulerSubmit={onSchedulerSubmit}
                dataUser={dataUser}
                companyLoading={companyLoading}
                hoursPerDays={companyData ? JSON.parse(companyData?.hours_per_day) : []}
                per_schedule={companyData ? companyData?.per_schedule : 1}
                razao={companyData ? companyData?.razao : 1}
              />
            </div>
          </Container>
        )}
        <Modal
          open={openModalFail}
          onClose={handleCloseModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description">
          <ModalFails
            error={'Não é possível agendar para datas anteriores.'}
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
    <div className={classes.greetings}>
      Olá <strong>{name}</strong>, seja bem vindo!
    </div>
  );
};

Index.getInitialProps = async ({ ...ctx }) => {
  const slug = ctx.query.slug;
  if (slug && slug.indexOf('.') === -1) {
    return { slug };
  }
};
