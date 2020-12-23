import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Creators as LibraryActions } from 'appStore/ducks/library/actions';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Modal from '@material-ui/core/Modal';
import { Button, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  books: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    marginTop: 5,
    '@media (max-width: 460px)': {
      width: '100%',
    },
  },
  bookContainer: {
    '@media (max-width: 460px)': {
      width: '100%',
    },
  },
  book: {
    marginBottom: 5,
    marginRight: 15,
    width: 165,
    height: 250,
    '@media (max-width: 460px)': {
      marginBottom: 20,
      width: '100%',
      height: 'auto',
    },
  },
  addBook: {
    marginBottom: 5,
    marginRight: 15,
    width: 165,
    height: 250,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#474747',
    cursor: 'pointer',
    '@media (max-width: 460px)': {
      marginBottom: 20,
      width: 402,
      minHeight: 580,
      margin: 0,
    },
  },
  hoverDelete: {
    position: 'absolute',
    cursor: 'pointer',
    backgroundColor: '#EB961F',
    padding: 2,
    borderRadius: 50,
    display: 'block',
    justifyContent: 'center',
    marginTop: 5,
    marginLeft: 135,
    '@media (max-width: 460px)': {
      right: 25,
    },
    color: '#fff',
  },
  paper: {
    color: '#fff',
    position: 'absolute',
    width: 430,
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
    height: 30,
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
    height: 30,
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

const BooksListNoSlide = ({ title, courses }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [openModal, setOpenModal] = React.useState(false);
  const [currentCourseId, setCurrentCourseId] = React.useState(0);

  const { loading } = useSelector(state => state.library.actions);

  const deleteHandleClick = id => {
    setCurrentCourseId(id);
    setOpenModal(true);
  };

  const onDeleteConfirm = () => {
    dispatch(LibraryActions.getDeleteRequest({ id: currentCourseId, page: 1 }));
    setTimeout(function () {
      handleCloseModal();
    }, 1000);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const body = (
    <div className={classes.paper}>
      <span id="simple-modal-title" style={{ fontSize: 17 }}>
        Realmente deseja remover esse curso da biblioteca?
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
          Cancelar
        </Button>
        <Button
          className={classes.confirmButton}
          variant="outlined"
          color="secondary"
          onClick={onDeleteConfirm}>
          {loading ? <CircularProgress size={15} /> : 'Confirmar'}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {title != false && <h2>{title}</h2>}
      <div className={classes.books}>
        {courses.length > 0 &&
          courses.map(item => (
            <div key={item.id} className={classes.bookContainer}>
              <DeleteIcon
                className={classes.hoverDelete}
                onClick={() => deleteHandleClick(item.id)}
              />
              <Link href="/assistir/[slug]" as={`/assistir/${item.slug}`}>
                <a>
                  <img
                    className={classes.book}
                    src={item.images.large}
                    alt={item.name}
                  />
                </a>
              </Link>
            </div>
          ))}
        <Link href="/categorias" as={`/categorias`}>
          <div className={classes.addBook}>
            <AddCircleOutlineIcon style={{ fontSize: 70, color: '#6B6B6B' }} />
          </div>
        </Link>
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        {body}
      </Modal>
    </>
  );
};

export default BooksListNoSlide;
