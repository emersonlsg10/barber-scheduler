import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import appUtils from 'utils/appUtils';
import CommentForm from 'components/pages/assistir/CommentForm';
import { Creators as CourseCommentsActionsCreator } from 'appStore/ducks/course/comment/actions';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    color: '#fff',
    overflow: 'hidden',
    marginBottom: 20,
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  comments: {
    padding: 0,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  comment: {
    color: '#fff',
    fontSize: 16,
  },
  nameComent: {
    color: '#EB961F',
    fontSize: 19,
    fontWeight: 'bold',
  },
  button: {
    height: 15,
    padding: 0,
    fontSize: 10,
  },
  title: {
    marginLeft: 10,
  },
  avatarGrid: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export const formInitialValues = {
  text: '',
  father: 0,
  courseId: 0,
};

const Coments = ({
  onSubmit,
  comments,
  user,
  totalComments,
  courseID,
  setOpenModal,
}) => {
  const classes = useStyles();

  const userId = user !== null ? user.id : 0;

  const dispatch = useDispatch();
  const comment = useSelector(state => state.course.comment.actions.data);
  const { isAuth } = useSelector(state => state.auth);
  //const commentLoading = useSelector(state => state.user.commentLoading);

  const [openForm, setOpenForm] = React.useState(false);
  const [visibleForm, setVisibleForm] = React.useState({ id: 0 });
  const [scrollToCommentId, setScrollToCommentId] = React.useState(null);
  const [firstTime, setFirstTime] = React.useState(true);

  const showInputComment = item => {
    if (isAuth) {
      setVisibleForm({ id: item });
      setOpenForm(!openForm);
    } else {
      setOpenModal(true);
    }
  };
  const hideInputComment = () => {
    setVisibleForm({ id: 0 });
  };

  const deleteComment = (idComment, idCourse) => {
    dispatch(
      CourseCommentsActionsCreator.getDeleteRequest({ idComment, idCourse })
    );
  };

  const responseSubmit = data => {
    if (isAuth) {
      onSubmit(data);
      hideInputComment();
    } else {
      alert('Você precisa estar logado para comentar!');
    }
  };

  React.useEffect(() => {
    if (!firstTime) {
      setScrollToCommentId(comment.id);
    } else {
      setFirstTime(false);
    }
  }, [comment]);

  React.useEffect(() => {
    if (
      scrollToCommentId &&
      comments.find(
        curComment => curComment.comment_father.id === scrollToCommentId
      )
    ) {
      appUtils.scrollToElm(
        document.querySelector(`[commentid='${scrollToCommentId}']`),
        1000
      );
      setScrollToCommentId(null);
      formInitialValues.text = '';
    }
  }, [scrollToCommentId, comments]);

  return (
    <div className={classes.root}>
      <div style={{ marginTop: 40, marginBottom: 40 }}>
        <h1
          style={{
            display: 'block',
            textAlign: 'center',
          }}>
          {comments.length > 0 && 'COMENTÁRIOS (' + totalComments + ')'}
        </h1>
      </div>
      <h2 className={classes.title}>Quem assistiu comentou</h2>
      {comments &&
        comments.length > 0 &&
        comments.map(item => (
          <Grid
            key={item.comment_father.id}
            commentId={item.comment_father.id}
            container
            spacing={4}
            style={{ marginLeft: 5 }}>
            <Grid
              item
              md={1}
              xs={2}
              justify="center"
              className={classes.avatarGrid}>
              <Avatar
                style={{ marginTop: 5 }}
                alt="Remy Sharp"
                src={item?.comment_father.user.images.original}
                className={classes.large}
              />
            </Grid>
            <Grid item md={10} xs={9}>
              <div>
                <span className={classes.nameComent}>
                  {item?.comment_father.user.name}
                </span>
                <br />
                <span className={classes.comment}>
                  {item.comment_father.text}
                </span>
                {userId == item.comment_father.user.id && (
                  <>
                    <br />
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        deleteComment(item.comment_father.id, item.course.id);
                      }}
                      className={classes.button}>
                      Excluir
                    </Button>
                  </>
                )}
                {item?.comment_father.comment_child.map(child => (
                  <Comment
                    key={child.id}
                    avatar={
                      child.user.images.original != ''
                        ? child.user.images.original
                        : 'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'
                    }
                    name={child != '' ? child.user.name : 'Karen Lorena Godoy'}
                    comment={child.text != '' ? child.text : 'Lorem ipsun'}
                    idUser={userId}
                    idUserComment={child.user.id}
                    idComment={child.id}
                    idCourse={item.course.id}
                    deleteComment={deleteComment}
                  />
                ))}
                <div style={{ marginTop: 10 }}>
                  <Button
                    onClick={() => {
                      showInputComment(item.comment_father.id);
                    }}
                    className={classes.button}
                    color="primary">
                    Responder
                  </Button>
                  {openForm && visibleForm.id == item.comment_father.id && (
                    <div>
                      <CommentForm
                        initialValues={{
                          ...formInitialValues,
                          father: item.comment_father.id,
                          courseId: courseID,
                        }}
                        onSubmit={responseSubmit}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Grid>
          </Grid>
        ))}
    </div>
  );
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
          <Avatar alt="Remy Sharp" src={avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={<span className={classes.nameComent}>{name}</span>}
          secondary={
            <React.Fragment>
              <span className={classes.comment}>{comment}</span>
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

export default Coments;
