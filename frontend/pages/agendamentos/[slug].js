/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import ServiceForm from 'components/dashboardComponents/serviceForm';
import Layout from 'components/layout';
import ServiceTable from 'components/ServicesTable';
import { Container, makeStyles, Modal } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ModalFails from 'components/modalFails';
import { Creators as SchedulesListDetailsCreators } from 'appStore/ducks/schedules/list';
import { Creators as SchedulesDetailsCreators } from 'appStore/ducks/schedules/details';
import { Creators as ServicesDeleteCreators } from 'appStore/ducks/services/delete';
import { Creators as ServicesCreateCreators } from 'appStore/ducks/services/create';
import { Creators as ServicesListCreators } from 'appStore/ducks/services/list';
import { Creators as UserDetailsCreators } from 'appStore/ducks/user/details';
import { Creators as LoginCreators } from 'appStore/ducks/login';
import { Creators as SchedulesCreateCreators } from 'appStore/ducks/schedules/create';
import { Creators as CompanyDetailsCreators } from 'appStore/ducks/company/details';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import moment from 'moment';

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.primary.main,
    fontSize: 20,
    marginTop: 20,
  },
  root: {
    width: '100%',
    marginTop: 30,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function Index({ slug }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { isAuth } = useSelector(state => state.auth);
  const { data: dataSchedules, loading: loadingSchedules } = useSelector(
    state => state.schedules.list
  );
  console.log(dataSchedules);
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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

  useEffect(() => {
    if (!isAuth && !slug) return;
    getSchedulesDay();
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

  return (
    <>
      <Layout maxWidth={false} slug={slug}>
        <Container maxWidth={'lg'}>
          <div className={classes.title}>
            Detalhes dos <strong>Agendamentos</strong>
          </div>
          <div className={classes.root}>
            {dataSchedules &&
              dataSchedules.map(item => (
                <Accordion
                  key={item.id}
                  expanded={expanded === `panel${item.id}`}
                  onChange={handleChange(`panel${item.id}`)}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header">
                    <Typography className={classes.heading}>
                      {item.schedule}
                    </Typography>
                    <Typography className={classes.secondaryHeading}>
                    {item.client_id}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Nulla facilisi. Phasellus sollicitudin nulla et quam
                      mattis feugiat. Aliquam eget maximus est, id dignissim
                      quam.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
          </div>
        </Container>
      </Layout>
    </>
  );
}

Index.getInitialProps = async ({ ...ctx }) => {
  const slug = ctx.query.slug;
  if (slug && slug.indexOf('.') === -1) {
    return { slug };
  }
};
