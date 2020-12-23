import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import TimeLineTitleSearch from 'components/timelineComponents/TimeLineTitleSearch';
import CardTimeLine from 'components/timelineComponents/CardTimeLine';
import appUtils from 'utils/appUtils';
import { IconButton, CircularProgress, Hidden } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    color: '#fff',
    marginTop: 5,
    fontSize: 12,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
  },
  nameUser: {
    '@media (min-width: 1441px)': { marginLeft: 30 },
    '@media (max-width: 1440px)': { marginLeft: 60 },
    '@media (max-width: 1024px)': { marginLeft: 25 },
    '@media (max-width: 768px)': { marginLeft: 30 },
  },
  infoUser: {
    fontSize: 14,
    maxWidth: 130,
    wordWrap: 'nowrap',
  },
  contentContainer: {
    color: 'white',
    marginTop: 20,
    '@media (max-width: 960px)': {
      paddingLeft: 0,
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
    marginLeft: 15,
  },
  avatar: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    borderColor: '#EB961F',
    borderStyle: 'solid',
  },
  timeline: {
    paddingRight: 10,
    padding: '6px 0px',
    marginTop: 15,
    maxWidth: '100%',
    '@media (max-width: 768px)': { width: '81vw' }, //tablet
    '@media (max-width: 425px)': { width: '50vw' },
  },
  colorDotLinesTimeline: {
    backgroundColor: '#EB961F',
  },
  buttonPagination: {
    backgroundColor: '#EB961F',
    '&:hover': {
      backgroundColor: '#EB961F',
    },
    '@media (max-width: 599px)': {
      width: 30,
      height: 30,
      position: 'relative',
      left: 6,
    },
  },
  emptyBall: {
    backgroundColor: '#EB961F',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 4,
    '@media (max-width: 599px)': {
      marginLeft: 5,
      width: 30,
      height: 30,
    },
  },
  timelineOpositeContent: {
    padding: '0px 3.5px',
    marginRight: 5,
    textAlign: 'right',
    fontSize: 11,
    '@media (min-width: 600px)': {
      width: 65,
    },
  },
  timelineEndBall: {
    position: 'absolute',
    marginLeft: 8,
    left: 3,
    '@media (max-width: 599px)': {
      left: -51,
    },
  },
}));

const ContentTimeline = ({
  data,
  // isFriend = false,
  isGlobalTimeline = false,
  total,
  otherProfile = false,
  page,
  per_page,
  onSubmitResponse,
  onLikeSubmit,
  onPaginate,
  idPost,
  loadingList,
  loadingActions,
  onDeleteComment,
}) => {
  const classes = useStyles();
  const [firstLoading, setFirstLoading] = React.useState(true);
  // const { data: user } = useSelector(state => state.user);
  const formInitialValues = {
    text: '',
    activity_id: 0,
    parent_id: 0,
  };

  React.useEffect(() => {
    if (!loadingList && firstLoading) {
      setFirstLoading(false);
    }
  }, [loadingList]);
  // const [currentFriend, setCurrentFriend] = React.useState(false);

  // const [currentSolicited, setCurrentSolicited] = React.useState(
  //   data.user_profile?.user?.is_friendship_requested
  // );
  return (
    <div className={classes.root}>
      {!firstLoading && data?.time_line && (
        <>
          {(!otherProfile ||
            isGlobalTimeline ||
            data.user_profile?.user.is_friend ||
            data.user_profile?.user.is_public_profile) && (
            <Grid container spacing={1} style={{ maxWidth: '100%' }}>
              <Grid item lg={12} style={{ maxWidth: '100%' }}>
                <TimeLineTitleSearch
                  isGlobalTimeline={isGlobalTimeline}
                  otherProfile={otherProfile}
                />
                <GlobalTimeLine
                  data={data?.time_line}
                  isGlobalTimeline={isGlobalTimeline}
                  otherProfile={otherProfile}
                  formInitialValues={formInitialValues}
                  responseSubmit={onSubmitResponse}
                  likeSubmit={onLikeSubmit}
                  onPaginate={onPaginate}
                  page={page}
                  total={total}
                  per_page={per_page}
                  idPost={idPost}
                  loadingList={loadingList}
                  loadingActions={loadingActions}
                  onDeleteComment={onDeleteComment}
                />
              </Grid>
            </Grid>
          )}
        </>
      )}
      {(firstLoading || !data.user_profile) && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 15,
          }}>
          <CircularProgress size={35} />
        </div>
      )}
    </div>
  );
};

const GlobalTimeLine = ({
  data,
  isGlobalTimeline,
  otherProfile,
  formInitialValues,
  responseSubmit,
  likeSubmit,
  onPaginate,
  page,
  per_page,
  total,
  idPost,
  loadingList,
  loadingActions,
  onDeleteComment,
}) => {
  const classes = useStyles();
  return (
    <Timeline align="left" className={classes.timeline}>
      {data &&
        data.map(item => (
          <TimelineItem key={item.id}>
            <TimelineOppositeContent class={classes.timelineOpositeContent}>
              <Hidden xsDown>
                <Typography variant="span" color="white">
                  {appUtils.formatDateAndTime(item.created_at)}
                </Typography>
              </Hidden>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot className={classes.colorDotLinesTimeline} />
              <TimelineConnector className={classes.colorDotLinesTimeline} />
            </TimelineSeparator>
            <TimelineContent style={{ maxWidth: '100%' }}>
              <Hidden smUp>
                <Typography variant="span" color="white">
                  {appUtils.formatDateAndTime(item.created_at)}
                </Typography>
              </Hidden>
              <CardTimeLine
                otherProfile={otherProfile}
                isGlobalTimeline={isGlobalTimeline}
                dataInfo={item}
                formInitialValues={formInitialValues}
                responseSubmit={responseSubmit}
                likeSubmit={likeSubmit}
                idPost={idPost}
                loadingList={loadingList}
                loadingActions={loadingActions}
                onDeleteComment={onDeleteComment}
              />
            </TimelineContent>
          </TimelineItem>
        ))}
      {page * per_page < total && (
        <TimelineItem style={{ marginLeft: 40 }}>
          <TimelineSeparator className={classes.timelineEndBall}>
            <IconButton
              onClick={onPaginate}
              className={classes.buttonPagination}
              aria-label="pagination">
              <AddIcon />
            </IconButton>
          </TimelineSeparator>
        </TimelineItem>
      )}
      {page * per_page >= total && (
        <TimelineItem style={{ marginLeft: 40 }}>
          <TimelineSeparator className={classes.timelineEndBall}>
            <div className={classes.emptyBall}></div>
          </TimelineSeparator>
        </TimelineItem>
      )}
    </Timeline>
  );
};

export default ContentTimeline;
