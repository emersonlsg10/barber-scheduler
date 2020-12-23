/* eslint-disable no-unused-vars */
import React from 'react';
import Layout from 'components/layout';
import Container from '@material-ui/core/Container';

export default function Index() {

  return (
    <>
      <Layout maxWidth={false}>
        <Container maxWidth={'lg'}>Teste</Container>
      </Layout>
    </>
  );
}

Index.getInitialProps = async ({ store }) => {

};
