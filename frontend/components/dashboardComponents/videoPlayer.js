/* eslint-disable react/display-name */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import dynamic from 'next/dynamic';
import PdfViewer from 'components/PdfReader';
import Grid from '@material-ui/core/Grid';
import ReactPlayer from 'react-player';
import Modal from '@material-ui/core/Modal';
import PlayList from 'components/dashboardComponents/playList';
import { Creators as LessonCreator } from 'appStore/ducks/lesson';
import { Creators as AnnotationListCreator } from 'appStore/ducks/annotation/list';
import {
  Creators as ActivityActionsCreators,
  ACTION_IDS,
} from 'appStore/ducks/activity/actions';
import { Creators as LessonTimeActions } from 'appStore/ducks/lesson/time/actions';
import { Creators as CourseFinishCreators } from 'appStore/ducks/course/finish/details';
import { Creators as CourseLikeActionsCreators } from 'appStore/ducks/course/like/actions';
import { Creators as LikeDetailsCreators } from 'appStore/ducks/course/like/details';
import { useDispatch, useSelector } from 'react-redux';
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import ShareIcon from '@material-ui/icons/Share';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TimelineIcon from '@material-ui/icons/Timeline';
import GetAppIcon from '@material-ui/icons/GetApp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FaFeatherAlt } from 'react-icons/fa';
import AnnotationsModal from 'components/modals/AnnotationsModal';
import DownloadsModal from 'components/modals/DownloadsModal';
import ShareLessonForm from 'components/pages/assistir/ShareLessonForm';

const useStyles = makeStyles(theme => ({
  root: {
    color: '#fff',
  },
  icons: {
    color: '#aaa',
    fontSize: 30,
    marginLeft: 5,
    marginTop: 3,
  },
  iconModal: {
    color: '#EB961F',
    fontSize: 21,
    marginLeft: 20,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: '',
    marginLeft: 5,
    cursor: 'pointer',
  },
  span: {
    color: '#bbb',
    fontSize: 11,
    whiteSpace: 'nowrap',
  },
  master: {
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    color: '#fff',
    position: 'absolute',
    width: 700,
    top: `50%`,
    left: '50%',
    transform: `translate(-50%, -50%)`,
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
  shareIconContainer: {
    cursor: 'pointer',
  },
  shareIcon: {
    color: '#FFF',
    fontSize: 20,
  },
  buttonsContainer: {
    maxWidth: 660,
    '@media (max-width: 629px)': {
      justifyContent: 'space-between',
      padding: '0px 15px',
      // flexDirection: 'column',
    },
    '@media (min-width: 1280px)': {
      marginBottom: 0,
      marginTop: 0,
    },
  },
  firstGrid: {
    maxWidth: '50%',
    '@media (max-width: 719px)': {
      justifyContent: 'space-between',
      maxWidth: '100%',
    },
  },
  secondGrid: {
    maxWidth: '50%',
    '@media (max-width: 719px)': {
      justifyContent: 'space-between',
      maxWidth: '100%',
      marginTop: 20,
      marginLeft: 20,
      paddingRight: 30,
    },
  },
  buttonItem: {
    width: 150,
  },
  button: {
    color: '#fff',
    marginTop: 10,
  },
}));

export const initialDuration = {
  time: 0,
};

export const CurrentVideoOnLeavePage = {
  currentVideo: {},
};

const VideoPlayer = ({
  isAuth,
  course,
  setCurrentDescription,
  setLessonDetails,
  // firstVerificationCourse,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { data: annotationList } = useSelector(state => state.annotation.list);

  const [openModal, setOpenModal] = React.useState(false);
  const [openModalNodownloads, setOpenModalNoDownloads] = React.useState(false);

  const [openModalAnnotations, setOpenModalAnnotations] = React.useState(false);

  const [openSharing, setOpenSharing] = React.useState(false);
  const [thisPath, setThisPath] = React.useState('');

  const [openLesson, setOpenLesson] = React.useState(false);
  const [currentLesson, setCurrentLesson] = React.useState([]);

  const [openModule, setOpenModule] = React.useState(false);
  const [currentModule, setCurrentModule] = React.useState(0);
  const [openFirstModule, setOpenFirstModule] = React.useState(true);

  const { data: lesson, loading, total } = useSelector(
    state => state.lesson.index
  );
  const { data: isLikedLesson, total: countLikes } = useSelector(
    state => state.course.like.details
  );

  const { data: lessonLastTime } = useSelector(
    state => state.lesson.time.details
  );

  // const [localStateCourseFinished, setLocalCourseFinished] = React.useState(false);
  const { data: firstVerificationCourse } = useSelector(
    state => state.course.verify.details
  );

  const [isLiked, setIsLiked] = React.useState(isLikedLesson);
  const [likeCount, setLikeCount] = React.useState(countLikes);

  // carrega as curtidas e is_like
  React.useEffect(() => {
    setIsLiked(isLikedLesson || false);
    setLikeCount(countLikes || 0);
  }, [countLikes, isLikedLesson]);

  // ações de compartilhar aula
  const [openShareTimeline, setOpenShareTimeline] = React.useState(false);
  const toggleOpenSharingTimeline = () => {
    setOpenShareTimeline(!openShareTimeline);
  };
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const { loading: loadingActivity } = useSelector(
    state => state.timeline.activity.actions
  );
  const initialValues = {
    text: '',
    course_id: course?.id,
    lesson_id: currentLesson?.id,
  };

  const onSubmit = data => {
    if (isAuth) {
      dispatch(
        ActivityActionsCreators.getRequest(
          ACTION_IDS.COMPARTILHOU_AULA,
          data.course_id,
          data.lesson_id,
          data.text
        )
      );
      setTimeout(function () {
        setFormSubmitted(true);
        setOpenShareTimeline(false);
        setOpenSharing(true);
      }, 1000);
    }
  };

  // verifica qual a última aula assistida
  React.useEffect(() => {
    if (!loading && total > 0 && lesson) {
      const idModule = lesson.course.module?.id;
      const idLesson = lesson.course.module.lesson?.id;
      const modulo = course.modules.filter(mod => mod?.id === idModule);

      let ModulePosition = 0;
      course.modules.map((item, index) => {
        if (item.id === idModule) {
          ModulePosition = index;
        }
      });

      let lastLessonX = null;

      modulo[0]?.lessons?.map((item, index) => {
        if (item?.id === idLesson) {
          lastLessonX = item;
          lastLessonX.nextPosition = index;
        }
      });
      setCurrentLesson(lastLessonX);
      setLessonDetails({ name: lastLessonX?.name });
      setOpenFirstModule(false);
      setCurrentModule(lastLessonX?.module?.id);
      setOpenModule(true);

      setCurrentVideo({
        url: lastLessonX?.video,
        status: lastLessonX?.status,
        courseId: lastLessonX?.course?.id,
        moduleId: lastLessonX?.module?.id,
        lessonId: lastLessonX?.id,
        nextLessonPosition: lastLessonX?.nextPosition + 1,
        modulePosition: ModulePosition,
      });

      // INICIA A AULA NOS SEGUNDOS EM QUE ELE PAROU
      setTimeout(() => {
        handleSeek(lesson?.course?.module?.lesson?.time);
        CurrentVideoOnLeavePage.currentVideo = currentVideo;
      }, 500);
    } else {
      if (course.modules[0]?.lessons[0].type === 1) {
        setCurrentLesson(course.modules[0]?.lessons[0]);
        setLessonDetails({ name: course.modules[0]?.lessons[0].name });
        // inicia a primeira aula do primeiro módulo
        setCurrentVideo({
          url: course.modules[0].lessons[0].video,
          status: course.modules[0].lessons[0].status,
          courseId: course.modules[0].lessons[0].course?.id,
          moduleId: course?.modules[0]?.id,
          lessonId: course.modules[0].lessons[0]?.id,
          nextLessonPosition: 1,
          modulePosition: 0,
        });
        setCurrentVideo(oldState => ({
          ...oldState,
          url: course.modules[0].lessons[0].video,
        }));

        CurrentVideoOnLeavePage.currentVideo = currentVideo;
      } else {
        setAttachmentSelected(course.modules[0].lessons[0].attachments[0].id);

        setChangeMedia(true);

        setTimeout(() => {
          setCurrentMedia({
            id: course.modules[0].lessons[0].attachments[0].id,
            name: course.modules[0].lessons[0].attachments[0].name,
            type: course.modules[0].lessons[0].attachments[0].type,
            url: course.modules[0].lessons[0].attachments[0].file.original,
          });
        }, 500);
      }
    }
  }, [lesson]);

  const handleClick = (id, description) => {
    setOpenModule(!openModule);
    setOpenFirstModule(false);
    setCurrentModule(id);
    // setCurrentLoad({ course_load: course_load });
    setCurrentDescription({ text: description });
  };
  const [currentVideo, setCurrentVideo] = React.useState({
    url: '',
    status: 0,
    courseId: 0,
    moduleId: 0,
    lessonId: 0,
    videoDuration: 0,
    nextLessonPosition: 1,
    modulePosition: 0,
  });

  // verifica se aquela aula ja foi curtida
  React.useEffect(() => {
    if (currentVideo.lessonId !== 0) {
      dispatch(
        LikeDetailsCreators.getCountRequest({
          id: currentVideo.lessonId,
        })
      );
      dispatch(
        LikeDetailsCreators.getRequest({
          id: currentVideo.lessonId,
        })
      );
    }
    CurrentVideoOnLeavePage.currentVideo = currentVideo;
  }, [currentVideo]);

  const { data: IsCourseFinished } = useSelector(
    state => state.course.finish.details
  );
  React.useEffect(() => {
    // VERIFICA SE O ALUNO JÁ CONCLUIU ESSE CURSO
    if (!firstVerificationCourse && IsCourseFinished) {
      dispatch(CourseFinishCreators.getSaveRequest(course?.id));

      dispatch(
        ActivityActionsCreators.getRequest(
          ACTION_IDS.CONCLUIU_CURSO,
          course?.id,
          0,
          ''
        )
      );
    }
  }, [IsCourseFinished]);

  React.useEffect(() => {
    if (course.modules[0]?.lessons[0]?.attachments[0]) {
      // setCurrentLesson(course.modules[0]?.lessons[0]);

      const idLesson = course.modules[0]?.lessons[0]?.id;
      dispatch(AnnotationListCreator.getRequest(idLesson, 1));
    }

    dispatch(
      LikeDetailsCreators.getRequest({ id: course?.modules[0]?.lessons[0]?.id })
    );
  }, []);
  const handleOpenModal = () => {
    if (
      currentLesson.attachments != undefined &&
      currentLesson.attachments.length > 0
    ) {
      setOpenModal(true);
    } else setOpenModalNoDownloads(true);
  };

  const handleCloseModalNodownloads = () => {
    setOpenModalNoDownloads(false);
  };

  const handleOpenModalAnnotations = () => {
    dispatch(AnnotationListCreator.getRequest(currentLesson?.id, 1));
    setOpenModalAnnotations(true);
  };

  const handleCloseModalAnnotations = () => {
    setOpenModalAnnotations(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const player = React.useRef(null);

  const handleSeek = seconds => {
    if (player?.current) player?.current.seekTo(parseFloat(seconds));
  };

  React.useEffect(() => {
    // função chamada ao sair para outra página
    // registra os segundos da aula
    return () => {
      if (player?.current && player?.current.getCurrentTime()) {
        initialDuration.time = player.current.getCurrentTime();
        const { currentVideo } = CurrentVideoOnLeavePage;
        dispatch(
          LessonTimeActions.getRequest({
            currentVideo,
            initialDuration,
            type: 1,
          })
        );
      }
    };
  }, []);

  const onStartHandle = () => {
    if (lessonLastTime) handleSeek(lessonLastTime?.seconds);
    dispatch(LessonCreator.getRegisterWatchLesson({ currentVideo }));
  };
  const onEndHandle = () => {
    // só chama a vericação se a primeira verificação for false
    if (!firstVerificationCourse) {
      // desativado por enquanto
      // dispatch(
      //   // LessonCreator.getFinishWatchLesson({ currentVideo, initialDuration })
      // );
      setTimeout(function () {
        dispatch(CourseFinishCreators.getRequest(course?.id));
      }, 350);
    }

    //pega a próxima aula
    const nextLesson =
      course.modules[currentVideo.modulePosition]?.lessons[
        currentVideo.nextLessonPosition
      ];
    if (nextLesson) {
      setCurrentVideo({
        url: nextLesson.video,
        status: nextLesson.status,
        courseId: nextLesson.course?.id,
        moduleId: nextLesson.module?.id,
        lessonId: nextLesson?.id,
        nextLessonPosition: currentVideo.nextLessonPosition + 1,
        modulePosition: currentVideo.modulePosition,
      });
      setCurrentDescription({ text: nextLesson.description });
      setCurrentLesson(nextLesson);
    } else {
      //verifica o próximo módulo
      const nextLesson =
        course.modules[currentVideo.modulePosition + 1]?.lessons[0];

      console.log(nextLesson, currentVideo.modulePosition, 'nextLesson');

      if (nextLesson) {
        //abre o próximo módulo na playlist
        setOpenFirstModule(false);
        setOpenModule(false);
        setCurrentModule(nextLesson.module?.id);
        setOpenModule(true);

        //seleciona a primeira aula do primeiro módulo
        setCurrentVideo({
          url: nextLesson.video,
          status: nextLesson.status,
          courseId: nextLesson.course?.id,
          moduleId: nextLesson.module?.id,
          lessonId: nextLesson?.id,
          nextLessonPosition: 1,
          modulePosition: currentVideo.modulePosition + 1,
        });
        setCurrentDescription({ text: nextLesson.description });
        setCurrentLesson(nextLesson);
      }
    }
  };
  const getDuration = duration => {
    initialDuration.time = duration;
  };

  const toggleOpenSharing = () => {
    setOpenSharing(!openSharing);
  };

  const handleClickLesson = () => {
    setOpenLesson(!openLesson);
  };

  const onDownloadAttachment = (file, id) => {
    window.open(file.original, '_blank');
    // desativado por enquanto
    // dispatch(LessonCreator.getRegisterDownload(id));
  };

  React.useEffect(() => {
    setThisPath(window.location.href);
  }, []);

  const shareOn = (network, e) => {
    e.preventDefault();

    const windowWidth = 750;
    const windowHeight = 750;
    const iMyWidth = window.screen.width / 2 - (windowWidth / 2 + 10);
    const iMyHeight = window.screen.height / 2 - (windowHeight / 2 + 50);

    switch (network) {
      case 'Facebook':
        window.open(
          `https://www.facebook.com/sharer.php?u=${encodeURI(thisPath)}`,
          '_blank',
          `resizable,width=${windowWidth},height=${windowHeight},left=${iMyWidth},top=${iMyHeight}`
        );
        break;
      case 'Twitter':
        window.open(
          `https://twitter.com/share?=url${encodeURI(
            thisPath
          )}&text=${encodeURI(
            'Estou assistindo um curso extraordinário no Cis Continuum'
          )}`,
          '_blank',
          `resizable,width=${windowWidth},height=${windowHeight},left=${iMyWidth},top=${iMyHeight}`
        );
        break;
      case 'LinkedIn':
        window.open(
          `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURI(
            thisPath
          )}`,
          '_blank',
          `resizable,width=${windowWidth},height=${windowHeight},left=${iMyWidth},top=${iMyHeight}`
        );
        break;
      case 'WhatsApp':
        window.open(
          `https://web.whatsapp.com/send?text=${encodeURI(
            'Estou assistindo um curso extraordinário no Cis Continuum - ' +
              thisPath
          )}`,
          '_blank',
          `resizable,width=${windowWidth},height=${windowHeight},left=${iMyWidth},top=${iMyHeight}`
        );
        break;
      case 'timeline':
        setOpenShareTimeline(true);
        break;
      default:
        break;
    }
  };

  const ShareBody = (
    <div className={classes.paper}>
      <span id="simple-modal-title" style={{ fontSize: 17 }}>
        Compartilhar
      </span>
      <hr style={{ borderColor: '#EB961F', borderSize: 8 }} />

      <List>
        <ListItem
          button
          onClick={e => shareOn('WhatsApp', e)}
          className={classes.shareIconContainer}>
          <ListItemIcon>
            <WhatsAppIcon className={classes.shareIcon} />
          </ListItemIcon>
          <ListItemText>WhatsApp</ListItemText>
        </ListItem>
        <ListItem
          button
          onClick={e => shareOn('Facebook', e)}
          className={classes.shareIconContainer}>
          <ListItemIcon>
            <FacebookIcon className={classes.shareIcon} />
          </ListItemIcon>
          <ListItemText>Facebook</ListItemText>
        </ListItem>
        <ListItem
          button
          onClick={e => shareOn('Twitter', e)}
          className={classes.shareIconContainer}>
          <ListItemIcon>
            <TwitterIcon className={classes.shareIcon} />
          </ListItemIcon>
          <ListItemText>Twitter</ListItemText>
        </ListItem>
        <ListItem
          button
          onClick={e => shareOn('LinkedIn', e)}
          className={classes.shareIconContainer}>
          <ListItemIcon>
            <LinkedInIcon className={classes.shareIcon} />
          </ListItemIcon>
          <ListItemText>LinkedIn</ListItemText>
        </ListItem>
        <ListItem
          button
          onClick={e => {
            shareOn('timeline', e);
          }}
          className={classes.shareIconContainer}>
          <ListItemIcon>
            <TimelineIcon className={classes.shareIcon} />
          </ListItemIcon>
          <ListItemText>Minha Timeline</ListItemText>
        </ListItem>
      </List>
    </div>
  );

  const annotationsBody = (
    <AnnotationsModal
      annotationList={annotationList}
      currentLesson={currentLesson}
    />
  );

  const bodyNoDownloads = (
    <div className={classes.paper}>
      <span id="simple-modal-title" style={{ fontSize: 17 }}>
        Sem downloads no momento para essa aula!
      </span>
      <hr style={{ borderColor: '#EB961F', borderSize: 8 }} />
    </div>
  );

  const body = (
    <DownloadsModal
      handleClickLesson={handleClickLesson}
      currentLesson={currentLesson}
      openLesson={openLesson}
      onDownloadAttachment={onDownloadAttachment}
    />
  );

  const bodyLike = (
    <div className={classes.paper} style={{ width: 300 }}>
      <span id="simple-modal-title" style={{ fontSize: 17 }}>
        Faça login para poder curtir!
      </span>
      <hr style={{ borderColor: '#EB961F', borderSize: 8 }} />
    </div>
  );

  const [openLikeModal, setOpenLikeModal] = React.useState(false);
  const handleCloseLikeModal = () => {
    setOpenLikeModal(false);
  };

  const LikeComponent = () => {
    const onLikeSubmit = (type = 'lesson') => {
      if (!isAuth) {
        setOpenLikeModal(true);
        return;
      }

      if (isLiked) {
        setLikeCount(likeCount - 1);
        dispatch(
          CourseLikeActionsCreators.getDislikeRequest({
            lesson_id: currentLesson?.id,
            type,
          })
        );
      } else {
        setLikeCount(likeCount + 1);
        dispatch(
          CourseLikeActionsCreators.getLikeRequest({
            activity_id: 0,
            comment_id: 0,
            type,
            lesson_id: currentLesson?.id,
          })
        );
      }

      setIsLiked(!isLiked);
    };

    return (
      <>
        <div>
          <ThumbUpAltRoundedIcon
            onClick={() => onLikeSubmit()}
            className={classes.icons}
            style={
              isLiked
                ? { color: '#EB961F', cursor: 'pointer' }
                : { color: '#aaa', cursor: 'pointer' }
            }
          />
        </div>
        <div
          className={classes.text}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <span>{likeCount}</span>
          <span className={classes.span}>Curtidas</span>
        </div>
      </>
    );
  };

  const [changeMedia, setChangeMedia] = React.useState(false);
  const [attachmentSelected, setAttachmentSelected] = React.useState(0);
  const [currentMedia, setCurrentMedia] = React.useState(null);

  // const PdfViewer = dynamic(() => import('components/PdfReader'), {
  //   ssr: false,
  // });

  return (
    <>
      <Grid container style={{ marginTop: 40, backgroundColor: '#272727' }}>
        <Grid
          item
          lg={8}
          sm={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          {!changeMedia ? (
            // TOCA VÍDEO
            <ReactPlayer
              playing
              ref={player}
              onStart={onStartHandle}
              onEnded={onEndHandle}
              onDuration={getDuration}
              url={currentVideo.url}
              width="100%"
              // height="400px"
              controls
            />
          ) : (
            <>
              {currentMedia && currentMedia.type === 6 ? (
                // TOCA ÁUDIO
                <div>
                  <ReactPlayer
                    playing
                    onStart={onStartHandle}
                    onEnded={onEndHandle}
                    onDuration={getDuration}
                    url={currentMedia.url}
                    // url={currentVideo.url}
                    width="100%"
                    height="auto"
                    controls
                  />
                </div>
              ) : (
                <>
                  {currentMedia && currentMedia.type === 3 ? (
                    <>
                      <div>
                        <PdfViewer url={currentMedia?.url} />
                      </div>
                    </>
                  ) : (
                    <>
                      {currentMedia &&
                        currentMedia.type !== 6 &&
                        currentMedia.type !== 3 && (
                          <div
                            style={{
                              minHeight: 400,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'flex-start',
                              color: 'white',
                            }}>
                            <DownloadsModal
                              lessonType={2}
                              currentMedia={currentMedia}
                              isAttachmentLesson
                              handleClickLesson={handleClickLesson}
                              currentLesson={currentLesson}
                              openLesson={openLesson}
                              onDownloadAttachment={onDownloadAttachment}
                            />
                          </div>
                        )}
                    </>
                  )}
                </>
              )}
            </>
          )}

          <Grid
            container
            direction="row"
            justify="space-around"
            alignContent="space-around"
            alignItems="center"
            // alignContent="flex-start"
            wrap="wrap"
            style={{ minHeight: 50, marginBottom: 10 }}
            className={classes.buttonsContainer}>
            <Grid
              item
              xs={5}
              sm={3}
              md={3}
              lg={3}
              className={classes.buttonItem}
              style={{ maxWidth: 80 }}>
              <div className={classes.master}>
                <LikeComponent />
              </div>
            </Grid>
            <Grid
              item
              xs={5}
              sm={3}
              md={3}
              lg={3}
              className={classes.buttonItem}>
              <div className={classes.master}>
                <div>
                  <FaFeatherAlt className={classes.icons} />
                </div>
                <div
                  onClick={handleOpenModalAnnotations}
                  className={classes.text}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}>
                  <span>Anotações</span>
                  <span className={classes.span}>Anotações da aula</span>
                </div>
                <Modal
                  open={openModalAnnotations}
                  onClose={handleCloseModalAnnotations}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description">
                  {annotationsBody}
                </Modal>
              </div>
            </Grid>
            <Grid
              onClick={toggleOpenSharing}
              item
              xs={5}
              sm={3}
              md={3}
              lg={3}
              className={classes.buttonItem}>
              <div className={classes.master}>
                <div>
                  <ShareIcon className={classes.icons} />
                </div>
                <div
                  className={classes.text}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}>
                  <span>Compartilhar</span>
                  <span className={classes.span}>Redes sociais</span>
                </div>
                <Modal
                  open={openSharing}
                  onClose={toggleOpenSharing}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description">
                  {ShareBody}
                </Modal>
              </div>
            </Grid>
            <Grid
              item
              xs={5}
              sm={3}
              md={3}
              lg={3}
              className={classes.buttonItem}>
              <div className={classes.master}>
                <div>
                  <GetAppIcon className={classes.icons} />
                </div>
                <div
                  onClick={handleOpenModal}
                  className={classes.text}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}>
                  <span>Downloads</span>
                  <span className={classes.span}>Conteúdos da aula</span>
                </div>
                <Modal
                  open={openModal}
                  onClose={handleCloseModal}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description">
                  {body}
                </Modal>
                <Modal
                  open={openModalNodownloads}
                  onClose={handleCloseModalNodownloads}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description">
                  {bodyNoDownloads}
                </Modal>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          lg={4}
          sm={12}
          style={{
            maxHeight: 470,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}>
          {course && (
            <PlayList
              course={course}
              handleClick={handleClick}
              openModule={openModule}
              currentModule={currentModule}
              openFirstModule={openFirstModule}
              currentVideo={currentVideo}
              setCurrentVideo={setCurrentVideo}
              setCurrentDescription={setCurrentDescription}
              // setCurrentLoad={setCurrentLoad}
              setCurrentLesson={setCurrentLesson}
              setLessonDetails={setLessonDetails}
              setChangeMedia={setChangeMedia}
              setCurrentMedia={setCurrentMedia}
              attachmentSelected={attachmentSelected}
              setAttachmentSelected={setAttachmentSelected}
            />
          )}
        </Grid>
      </Grid>
      <Modal
        open={openShareTimeline}
        onClose={toggleOpenSharingTimeline}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <div className={classes.paper}>
          <span id="simple-modal-title" style={{ fontSize: 17 }}>
            Compartilhar aula na minha Timeline
          </span>
          <hr
            style={{
              borderColor: '#EB961F',
              borderSize: 8,
              marginBottom: 20,
            }}
          />
          <ShareLessonForm
            loading={loadingActivity}
            initialValues={initialValues}
            onSubmit={onSubmit}
            formSubmitted={formSubmitted}
          />
        </div>
      </Modal>
      <Modal
        open={openLikeModal}
        onClose={handleCloseLikeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        {bodyLike}
      </Modal>
    </>
  );
};

export default VideoPlayer;
