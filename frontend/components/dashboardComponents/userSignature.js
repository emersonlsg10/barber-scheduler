import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    color: '#fff',
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 12,
    '@media (max-width: 960px)': {
      marginLeft: 22,
    },
  },
  titleDiv: {
    marginLeft: 15,
    marginTop: 20,
    '@media (max-width: 960px)': {
      marginLeft: 0,
    },
  },
  contentContainer: {
    color: 'white',
    marginTop: '20px',
    paddingLeft: 15,
    '@media (max-width: 960px)': {
      paddingLeft: 0,
    },
  },
  loginLogo: {
    maxWidth: 90,
  },
  statusContainer: {
    '@media (max-width: 550px)': {
      justifyContent: 'space-around',
      flexDirection: 'column',
    },
  },
  statusItem: {
    marginBottom: 40,
    '@media (max-width: 550px)': {
      maxWidth: 240,
      marginBottom: 30,
    },
  },
  greenButtonItem: {
    '@media (max-width: 550px)': {
      marginBottom: 30,
      alignSelf: 'center',
    },
  },
  feedBackContainer: {
    paddingBottom: 30,
    paddingTop: 18,
  },
  paper: {
    color: '#fff',
    position: 'absolute',
    width: 450,
    '@media (min-width: 610px)': {
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
  confirmButton: {
    width: 150,
    fontSize: 13,
    fontStyle: 'bold',
    color: '#fff',
    backgroundColor: '#EB961F',
    height: 40,
    padding: 5,
    marginTop: 'auto',
    marginBottom: 'auto',
    '@media (max-width: 739px)': {
      marginTop: 15,
      marginLeft: 10,
    },
  },
  canlcelButton: {
    width: 140,
    fontSize: 13,
    fontStyle: 'bold',
    color: '#EB961F',
    height: 40,
    padding: 5,
    marginTop: 'auto',
    marginBottom: 'auto',
    '@media (max-width: 739px)': {
      marginTop: 15,
      marginLeft: 10,
    },
    backgroundColor: '#fff',
  },
}));

const UserSignature = ({ data }) => {
  const classes = useStyles();

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirmModal = () => {
    // setOpenModal(false);
  };

  const body = (
    <div className={classes.paper}>
      <span id="simple-modal-title" style={{ fontSize: 17 }}>
        Realmente deseja suspender a sua assinatura?
      </span>
      <hr style={{ borderColor: '#EB961F', borderSize: 8 }} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 15,
        }}>
        <Button
          className={classes.canlcelButton}
          variant="outlined"
          color="secondary"
          onClick={handleCloseModal}>
          Voltar
        </Button>
        <Button
          className={classes.confirmButton}
          variant="outlined"
          color="secondary"
          onClick={handleConfirmModal}>
          Confirmar
        </Button>
      </div>
    </div>
  );

  return (
    <div className={classes.root}>
      <div className={classes.titleDiv}>
        <span style={{ fontSize: 35, fontWeight: 'lighter' }}>
          Minha <strong>Assinatura</strong>
        </span>
      </div>
      <Grid container className={classes.contentContainer}>
        <Grid
          container
          justify="space-between"
          className={classes.statusContainer}>
          <Grid item className={classes.statusItem}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <img
                  src="/img/icone_ead.png"
                  alt="logo"
                  className={classes.loginLogo}
                  width="100%"
                />
              </Grid>
              <Grid item xs={8}>
                <div style={{ marginTop: 5, marginLeft: 5 }}>
                  <span
                    style={{
                      fontSize: '16px',
                      color: '#aaa',
                      fontWeight: 'lighter',
                    }}>
                    Sua conta está
                  </span>
                  <br />
                  {data?.status == 1 ? (
                    <span
                      style={{
                        //color: '#00FF00',
                        color: '#00FF00',
                        fontWeiht: 'bold',
                        fontSize: 45,
                        lineHeight: 0.9,
                      }}>
                      Ativada
                    </span>
                  ) : (
                    <span
                      style={{
                        color: 'red',
                        fontWeight: 'bold',
                        fontSize: 45,
                        lineHeight: 0.9,
                      }}>
                      Desativada
                    </span>
                  )}
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.greenButtonItem}>
            {data?.status == 1 && (
              <Link href="/minha-biblioteca">
                <a style={{ textDecoration: 'none' }}>
                  <Button
                    style={{
                      backgroundColor: '#32cd32',
                      borderRadius: 25,
                      height: 70,
                      padding: 10,
                      alignContent: 'center',
                      justifyContent: 'center',
                      justifyItems: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}
                    variant="contained"
                    startIcon={
                      <PlayCircleFilledWhiteIcon
                        style={{ fontSize: 50, color: 'white' }}
                      />
                    }>
                    <span>
                      Voltar agora <br /> <strong>para Assistir</strong>
                    </span>
                  </Button>
                </a>
              </Link>
            )}
          </Grid>
        </Grid>
        <Grid container>
          <hr style={{ color: '#fff', width: '100%' }} />
        </Grid>
        <Grid container spacing={3} className={classes.feedBackContainer}>
          <Grid item lg={6}>
            <Typography variant="h5" style={{ color: '#EB961F' }}>
              Queremos o seu feedback
            </Typography>
            <p>
              Envie um email informando como podemos melhorar
              <br /> o nosso Portal? Com o assunto: [CIS]
              <br /> Contato via Portal <br />
              <br />
              <span>comunidadecis@febracis.com.br</span>
            </p>
            <Button
              style={{
                marginTop: 20,
                marginBottom: 10,
                backgroundColor: '#D36821',
                borderRadius: 25,
                color: '#fff',
              }}
              variant="contained">
              ENVIAR FEEDBACK
            </Button>
          </Grid>
          <Grid item lg={6}>
            <Typography variant="h5" style={{ color: '#aaa' }}>
              Quer suspender sua assinatura?
            </Typography>
            <p>
              Envie um email informando o que motivou você a solicitar o
              cancelamento e como podemos melhorar nosso portal. Com o assunto:
              [TPQA] SOLICITAÇÃO DE CANCELAMENTO
              <br />
              <br />
              <span>comunidadecis@febracis.com.br</span>
            </p>
            <Button
              onClick={handleOpenModal}
              style={{
                marginTop: 20,
                minHeight: 36,
                backgroundColor: '#252525',
                color: '#aaa',
                borderRadius: '25px',
                borderColor: '#aaa',
                borderWidth: '1px',
              }}
              variant="outlined">
              SUSPENDER ASSINATURA
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        {body}
      </Modal>
    </div>
  );
};

export default UserSignature;
