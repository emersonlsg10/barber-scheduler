import React from 'react';
import Head from 'components/head';
import Nav from 'components/nav';
import Footer from 'components/footer';
import { Container, makeStyles } from '@material-ui/core';
// import BuildIcon from '@material-ui/icons/Build';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.primary,
    minHeight: '100%',
    //position: 'relative',
  },
  contentContainer: {
    paddingBottom: '2.5rem',
    minHeight: '85vh',
  },
}));

function Layout({ children, maxWidth = 'lg' }) {
  const classes = useStyles();

  return (
    <>
      <Head title="Agenda Aqui" />
      <Nav />
      <Container
        className={classes.contentContainer}
        maxWidth={maxWidth}
        {...(maxWidth === false && {
          style: {
            paddingLeft: 0,
            paddingRight: 0,
            margin: 0,
            padding: 0,
          },
        })}>
        {children}
      </Container>
      <Footer />

      <style global jsx>{`
        #__next {
          background-color: #252525;
          position: relative;
          min-height: 100vh;
        }
        ::-webkit-scrollbar-track {
          background-color: #f4f4f4;
        }
        ::-webkit-scrollbar {
          width: 5px;
          background: #f4f4f4;
        }
        ::-webkit-scrollbar-thumb {
          background: #eb961f;
        }
      `}</style>
    </>
  );
}
export default Layout;
