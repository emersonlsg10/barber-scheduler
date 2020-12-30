/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Creators as ServicesDeleteCreators } from 'appStore/ducks/services/delete';
import Layout from 'components/layout';
import ServiceTable from 'components/ServicesTable';
import { Container, makeStyles, Modal } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ModalFails from 'components/modalFails';
import { Creators as ServicesListCreators } from 'appStore/ducks/services/list';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.primary.main,
    fontSize: 20,
    marginTop: 20,
  },
}));


export default function Index() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const {
    data: dataServices,
    loading: loadingServices,
  } = useSelector(state => state.services.list);

  useEffect(() => {
    dispatch(ServicesListCreators.getRequest());
  }, []);

  const onDeleteService = id => {
    dispatch(ServicesDeleteCreators.getRequest({ id }));
  };

  return (
    <>
      <Layout maxWidth={false}>
        <Container maxWidth={'lg'}>
          <div className={classes.title}>Cadadastro de <strong>Serviços</strong></div>
          <ServiceTable 
            dataServices={dataServices?.data} 
            loadingServices={loadingServices}
            onDeleteService={onDeleteService}
          />
        </Container>
      </Layout>
    </>
  );
}