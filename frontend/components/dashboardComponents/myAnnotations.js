import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Creators as UserAnnotationActionsCreators } from 'appStore/ducks/userAnnotation/actions';
import { makeStyles } from '@material-ui/core/styles';
import ModalRTE from 'components/modals/AnnotationsModal/ModalRTE';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { CircularProgress } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    color: '#fff',
    marginTop: 5,
    marginLeft: 10,
    fontSize: 12,
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  titleDiv: {
    marginLeft: 15,
  },
  courseImg: {
    width: 130,
    height: 180,
    '@media (max-width: 992px)': {
      width: 70,
      height: 96,
    },
    '@media (max-width: 480px)': {
      width: 47,
      height: 64,
    },
  },
  divCardAnnotations: {
    backgroundColor: '#333333',
    minHeight: 50,
    borderTop: '3px solid #EB961F',
    borderRadius: 5,
    marginTop: 10,
    fontSize: 12,
    padding: '2px 5px',
  },
  createIcon: {
    fontSize: 15,
    padding: 0,
    marginRight: 5,
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.main,
    },
    '@media (max-width: 660px)': {
      fontSize: 18,
      marginRight: 10,
    },
  },
  deleteIcon: {
    fontSize: 15,
    padding: 0,
    marginRight: 5,
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.main,
    },
    '@media (max-width: 660px)': {
      fontSize: 18,
    },
  },
  paper: {
    color: '#fff',
    position: 'absolute',
    width: 415,
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
  annotationText: {
    maxHeight: 100,
    paddingLeft: 5,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 4 /* number of lines to show */,
    '-webkit-box-orient': 'vertical',
    '& > *': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      '-webkit-line-clamp': 4 /* number of lines to show */,
      '-webkit-box-orient': 'vertical',
    },
  },
  modalAnnotations: {
    '@media (max-width: 600px)': {
      width: '90%',
    },
  },
}));

export const formInitialValues = {
  text: '',
  father: 0,
  courseId: 0,
};

const MyAnnotations = ({ userAnnotationList, loading }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [openModal, setOpenModal] = React.useState(false);
  const [idAnnotation, setIdAnnotation] = React.useState(false);

  const [openModalRTE, setOpenModalRTE] = React.useState(false);
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [currentAnnotationId, setCurrentAnnotationId] = React.useState(0);
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    if (!formSubmitted && loading) {
      setFormSubmitted(true);
      setTimeout(function () {
        setOpenModalRTE(false);
      }, 1000);
    } else {
      setFormSubmitted(false);
    }
  }, [loading]);

  const onEditAnnotation = (idAnnotation, text) => {
    setCurrentAnnotationId(idAnnotation);
    setText(text);
    setOpenModalRTE(true);
  };

  const onSubmitAnnotation = text => {
    if (currentAnnotationId == 0) {
      const formData = { text, currentAnnotationId: currentAnnotationId };
      dispatch(UserAnnotationActionsCreators.getCreateRequest(formData));
    } else {
      const formData = {
        text,
        idAnnotation: currentAnnotationId,
      };
      dispatch(UserAnnotationActionsCreators.getUpdateRequest(formData));
    }
  };

  const handleCancelClick = () => {
    setOpenModalRTE(false);
  };

  const handleCloseModalRTE = () => {
    setOpenModalRTE(false);
    setCurrentAnnotationId(0);
    setText('');
  };

  const onDeleteConfirm = () => {
    const formData = { idAnnotation: idAnnotation };
    dispatch(UserAnnotationActionsCreators.getDeleteRequest(formData));
    setTimeout(function () {
      handleCloseModal();
    }, 1000);
  };

  const onDeleteAnnotation = idAnnotation => {
    setIdAnnotation(idAnnotation);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const body = (
    <div className={classes.paper}>
      <span id="simple-modal-title" style={{ fontSize: 17 }}>
        Realmente deseja excluir esse comentário?
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
          onClick={onDeleteConfirm}>
          {loading ? <CircularProgress size={15} /> : 'Confirmar'}
        </Button>
      </div>
    </div>
  );
  return (
    <div className={classes.root}>
      <div className={classes.titleDiv}>
        <span style={{ fontSize: 35, fontWeight: 'lighter' }}>
          Minhas <strong>Anotações</strong>
        </span>
        <h2>Anotações</h2>
      </div>
      <div>
        {userAnnotationList.length > 0 &&
          userAnnotationList.map(item => (
            <div key={item.course.id} style={{ marginLeft: 15 }}>
              <Grid container spacing={3}>
                <Grid item xs={2}>
                  <Link
                    href="/assistir/[slug]"
                    as={`/assistir/${item.course.slug}`}>
                    <a>
                      <img
                        src={
                          item != undefined
                            ? item.course.images.large
                            : 'img/book2.png'
                        }
                        alt={'book'}
                        className={classes.courseImg}
                      />
                    </a>
                  </Link>
                </Grid>
                <Grid item xs={10}>
                  <div style={{ marginLeft: 10 }}>
                    <Link
                      href="/assistir/[slug]"
                      as={`/assistir/${item.course.slug}`}>
                      <a style={{ textDecoration: 'none' }}>
                        <span style={{ fontSize: 17, color: '#aaa' }}>
                          {'Curso: ' + item.course.name + ' '}
                          <br />
                          {' Aula: ' + item.course.module.lesson.name}
                        </span>
                      </a>
                    </Link>
                    <Divider variant="middle" component="hr" />
                    <Grid container spacing={2} style={{ marginTop: 5 }}>
                      <Grid item xs={10} md={11}>
                        {item.course.module.lesson.annotations.length > 0 &&
                          item.course.module.lesson.annotations.map(ann => (
                            <div
                              key={ann.id}
                              className={classes.divCardAnnotations}>
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                  padding: 0,
                                }}>
                                <CreateIcon
                                  className={classes.createIcon}
                                  onClick={() =>
                                    onEditAnnotation(ann.id, ann.text)
                                  }
                                />
                                <DeleteIcon
                                  className={classes.deleteIcon}
                                  onClick={() => onDeleteAnnotation(ann.id)}
                                />
                              </div>
                              <div
                                style={{ marginBottom: 5 }}
                                className={classes.annotationText}
                                dangerouslySetInnerHTML={{
                                  __html: ann.text,
                                }}></div>
                            </div>
                          ))}
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </div>
          ))}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description">
          {body}
        </Modal>
        <Modal
          open={openModalRTE}
          onClose={handleCloseModalRTE}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description">
          <ModalRTE
            loading={loading}
            viaMyannotations={true}
            onSubmitAnnotation={onSubmitAnnotation}
            onCancelClick={handleCancelClick}
            formSubmitted={formSubmitted}
            value={text}
          />
        </Modal>
      </div>
      <style jsx>{``}</style>
    </div>
  );
};

export default MyAnnotations;
