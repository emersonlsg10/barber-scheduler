import React from 'react';
import Head from 'components/head';
import Nav from 'components/nav';
import withAuth from 'lib/withAuth';
import { Creators } from 'appStore/ducks/users';
import { useSelector } from 'react-redux';

function Dashboard() {
  const { users } = useSelector(state => state.users);
  return (
    <>
      <Head title="Meus Dashboard" />

      <Nav />
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </>
  );
}

Dashboard.getInitialProps = async ({ store, ...ctx }) => {
  await withAuth(ctx);
  store.dispatch(Creators.getRequest(1));
};

export default Dashboard;
