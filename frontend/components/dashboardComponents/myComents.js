import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { Creators as UserCreator } from 'appStore/ducks/user';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Link from 'next/link';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    color: '#fff',
    marginTop: 5,
    marginLeft: 0,
    fontSize: 12,
    '@media (max-width: 960px)': {
      marginLeft: 10,
    },
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  nameComent: {
    color: '#EB961F',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  listItemText: {
    '@media (max-width: 720px)': {
      marginLeft: 0,
    },
    '@media (min-width: 721px) and (max-width: 992px)': {
      marginLeft: 20,
    },
  },
  button: {
    height: 15,
    padding: 0,
    fontSize: 10,
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
}));

export const formInitialValues = {
  text: '',
  father: 0,
  courseId: 0,
};

const formSchema = Yup.object().shape({
  text: Yup.string(),
  father: Yup.string(),
  courseId: Yup.string(),
});

const MyComents = ({ comments, user }) => {
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = React.useState(false);
  const [visibleForm, setVisibleForm] = React.useState({ id: 0 });
  const showInputComment = item => {
    setVisibleForm({ id: item });
    setOpenForm(!openForm);
  };
  const hideInputComment = () => {
    setVisibleForm({ id: 0 });
  };
  const updateTextField = event => {
    event.preventDefault();
    const Ids = event.target.id;
    const father = Ids.split(':');
    const course = Ids.split(':');
    formInitialValues.father = father[0];
    formInitialValues.courseId = course[1];
    formInitialValues.text = event.target.value;
  };

  const deleteComment = (idComment, idCourse) => {
    dispatch(UserCreator.DeleteCommentRequest({ idComment, idCourse }));
  };

  const onSubmit = data => {
    dispatch(UserCreator.CommentRequest(data));
    hideInputComment();
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.titleDiv}>
        <span style={{ fontSize: 35, fontWeight: 'lighter' }}>
          Meus <strong>Comentários</strong>
        </span>
        <h2>Comentários</h2>
      </div>
      <div>
        {comments.length > 0 &&
          comments.map(item => (
            <div key={item.comment_father.id} style={{ marginLeft: 15 }}>
              <Grid container spacing={3}>
                <Grid item xs={2}>
                  <Link
                    href="/assistir/[slug]"
                    as={`/assistir/${item.course.slug}`}>
                    <a>
                      <img
                        src={item.course.images.large}
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
                          {item != undefined
                            ? 'Curso: ' + item.course.name
                            : 'Curso: ...'}
                        </span>
                      </a>
                    </Link>
                    <Divider variant="middle" component="hr" />
                    <Grid container spacing={2} style={{ marginTop: 5 }}>
                      <Grid item xs={2} md={1}>
                        <Avatar
                          style={{ marginTop: 5 }}
                          alt="Remy Sharp"
                          src={item?.comment_father.user.images.original}
                          className={classes.large}
                        />
                      </Grid>
                      <Grid item xs={10} md={11}>
                        <div
                          style={{
                            marginLeft: 5,
                          }}>
                          <span className={classes.nameComent}>
                            {item?.comment_father.user.name}
                          </span>
                          <br />
                          <div style={{ marginTop: 10 }}>
                            {item.comment_father.text}
                            {user.id == item.comment_father.user.id && (
                              <div style={{ marginTop: 5 }}>
                                <Button
                                  className={classes.button}
                                  variant="contained"
                                  color="primary"
                                  onClick={() => {
                                    deleteComment(
                                      item.comment_father.id,
                                      item.course.id
                                    );
                                  }}>
                                  Excluir
                                </Button>
                              </div>
                            )}
                          </div>
                          <Hidden smDown>
                            <ChildComments
                              item={item}
                              user={user}
                              deleteComment={deleteComment}
                            />
                          </Hidden>
                          <div style={{ marginTop: 10 }}>
                            <Button
                              className={classes.button}
                              color="primary"
                              onClick={() => {
                                showInputComment(item.comment_father.id);
                              }}>
                              Responder
                            </Button>
                            {openForm &&
                              visibleForm.id == item.comment_father.id && (
                                <div>
                                  <Formik
                                    initialValues={formInitialValues}
                                    validationSchema={formSchema}
                                    onSubmit={onSubmit}>
                                    {({ handleSubmit }) => (
                                      <Form>
                                        <TextareaAutosize
                                          style={{
                                            width: '100%',
                                            borderRadius: 10,
                                            marginTop: 10,
                                            padding: 10,
                                            backgroundColor: '#252525',
                                            color: '#fff',
                                          }}
                                          id={
                                            Object.keys(item.comment_father)
                                              .length > 0 &&
                                            item.comment_father.id +
                                              ':' +
                                              item.course.id
                                          }
                                          name="text"
                                          rows="2"
                                          cols="28"
                                          onChange={updateTextField}
                                        />
                                        <Grid
                                          item
                                          xs={12}
                                          style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                          }}>
                                          <Button
                                            type="submit"
                                            onClick={handleSubmit}
                                            style={{
                                              backgroundColor: '#ff4000',
                                              width: 230,
                                              borderRadius: 20,
                                              color: 'white',
                                              marginTop: 10,
                                            }}
                                            variant="contained">
                                            Enviar
                                          </Button>
                                        </Grid>
                                      </Form>
                                    )}
                                  </Formik>
                                </div>
                              )}
                          </div>
                        </div>
                      </Grid>
                      <Hidden mdUp>
                        <div
                          style={{
                            marginLeft: 10,
                          }}>
                          <ChildComments
                            item={item}
                            user={user}
                            deleteComment={deleteComment}
                          />
                        </div>
                      </Hidden>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </div>
          ))}
      </div>
      <style jsx>{``}</style>
    </div>
  );
};

const ChildComments = ({ item, user, deleteComment }) => {
  const classes = useStyles();
  return item?.comment_father.comment_child.map(child => (
    <Comment
      key={child.id}
      className={classes.childComment}
      avatar={
        child.user.images.original != ''
          ? child.user.images.original
          : 'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'
      }
      name={child != '' ? child.user.name : 'Karen Lorena Godoy'}
      comment={child.text != '' ? child.text : 'Lorem ipsun'}
      idUser={user.id}
      idUserComment={child.user.id}
      idComment={child.id}
      idCourse={item.course.id}
      deleteComment={deleteComment}
    />
  ));
};

const Comment = ({
  avatar,
  name,
  comment,
  idUser,
  idUserComment,
  idComment,
  idCourse,
  deleteComment,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.comments}>
      <ListItem alignItems="flex-start" style={{ paddingLeft: 0 }}>
        <ListItemAvatar>
          <Avatar
            alt="Remy Sharp"
            src={avatar}
            style={{ width: 48, height: 48 }}
          />
        </ListItemAvatar>
        <ListItemText
          className={classes.listItemText}
          primary={<span className={classes.nameComent}>{name}</span>}
          secondary={
            <React.Fragment>
              <span style={{ color: '#fff' }}>{comment}</span>
              <br />
              {idUser == idUserComment && (
                <Button
                  className={classes.button}
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    deleteComment(idComment, idCourse);
                  }}>
                  Excluir
                </Button>
              )}
            </React.Fragment>
          }
        />
      </ListItem>
    </div>
  );
};

export default MyComents;
