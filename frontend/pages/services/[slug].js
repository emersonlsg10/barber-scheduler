/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import ServiceForm from 'components/dashboardComponents/serviceForm';
import Layout from 'components/layout';
import ServiceTable from 'components/ServicesTable';
import { Container, makeStyles, Modal } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ModalFails from 'components/modalFails';
import { Creators as ServicesDeleteCreators } from 'appStore/ducks/services/delete';
import { Creators as ServicesCreateCreators } from 'appStore/ducks/services/create';
import { Creators as ServicesListCreators } from 'appStore/ducks/services/list';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.primary.main,
    fontSize: 20,
    marginTop: 20,
  },
}));

export default function Index({ slug }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { data: dataServices, loading: loadingServices } = useSelector(
    state => state.services.list
  );

  const { loading: loadingServicesCreate } = useSelector(
    state => state.services.create
  );

  useEffect(() => {
    dispatch(ServicesListCreators.getRequest({ slug }));
  }, []);

  const onDeleteService = id => {
    dispatch(ServicesDeleteCreators.getRequest({ id }));
  };

  const onSubmit = formData => {
    dispatch(ServicesCreateCreators.getRequest(formData));
  };
  return (
    <>
      <Layout maxWidth={false} slug={slug}>
        <Container maxWidth={'lg'}>
          <div className={classes.title}>
            Cadadastro de <strong>Serviços</strong>
          </div>
          <ServiceForm onSubmit={onSubmit} loading={loadingServicesCreate} />
          <ServiceTable
            dataServices={dataServices}
            loadingServices={loadingServices}
            onDeleteService={onDeleteService}
          />
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
