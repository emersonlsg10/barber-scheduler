import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Box, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RegisterForm from 'components/dashboardComponents/registerForm';
import ModalSuccess from 'components/modalSuccess';
import ModalFails from 'components/modalFails';
import { Creators as RegisterCreator } from 'appStore/ducks/register';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#252525',
  },
  container: {
    display: `flex`,
    background: 'linear-gradient(180deg, #2f2f30 30%, #0f0f0f 90%)',
    justifyContent: `center`,
    alignItems: `center`,
    minHeight: '100vh',
  },
  loginForm: {
    opacity: 0.9,
    borderRadius: 15,
    background: 'black',
    width: '370px',
    marginBottom: 15,
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

export default function Register() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const {
    data: dataRegister,
    loading: loadingRegister,
    error: errorRegister,
  } = useSelector(state => state.register);

  const [formSubmited, setFormSubmited] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalFail, setOpenModalFail] = useState(false);

  const handleOpenModal = () => {
    setTimeout(() => {
      setOpenModal(true);
    }, 150);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const onSubmit = formData => {
    dispatch(RegisterCreator.getRequest(formData));
    setFormSubmited(true);
  };

  useEffect(() => {
    if (!loadingRegister && formSubmited && !!dataRegister) {
      handleOpenModal();
      setTimeout(() => {
        setFormSubmited(false);
      }, 500);
    } else if (!loadingRegister && formSubmited && !!errorRegister) {
      setOpenModalFail(true);
      setTimeout(() => {
        setFormSubmited(false);
      }, 500);
    }
  }, [loadingRegister]);

  useEffect(() => {
    return () => {
      handleCloseModal();
    };
  }, []);
  return (
    <>
      <main className={'formLogin'}>
        <Box className={classes.container}>
          <Card className={classes.loginForm}>
            <RegisterForm onSubmit={onSubmit} loading={loadingRegister} />
          </Card>
        </Box>
      </main>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <ModalSuccess />
      </Modal>
      <Modal
        open={openModalFail}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <ModalFails
          error={errorRegister && errorRegister}
          setOpenModalFail={setOpenModalFail}
        />
      </Modal>
    </>
  );
}

Register.getInitialProps = async ({ store }) => {
  //   store.dispatch(UserCreator.getRequest());
};
