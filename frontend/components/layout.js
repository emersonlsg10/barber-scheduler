import React from 'react';
import Head from 'components/head';
import Nav from 'components/nav';
import Footer from 'components/footer';
import { Container, makeStyles } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
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

export default function Layout({ children, maxWidth = 'lg', slug }) {
  const classes = useStyles();

  const { isAuth } = useSelector(state => state.auth);

  if (!isAuth) {
    return (
      <div
        style={{
          background: '#252525',
          margin: '0px 0',
          padding: 0,
          overflow: 'hidden',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <div
          style={{
            margin: '0 auto',
            width: '200px',
            padding: 50,
            marginLeft: 'auto',
            marginRight: 'auto',
            color: 'white',
            textAlign: 'center',
          }}>
          <span>Carregando...</span>
        </div>
        <CircularProgress size={35} />
      </div>
    );
  }

  return (
    <>
      {isAuth && (
        <>
          <Head title="Agenda Aqui" />
          <Nav slug={slug} />
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
      )}
    </>
  );
}
