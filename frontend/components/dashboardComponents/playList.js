import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import ListVideoLesson from 'components/PlayListComponents/ListVideoLesson';
import ListAttachmentLesson from 'components/PlayListComponents/ListAttachmentLesson';
import List from '@material-ui/core/List';
import ListIcon from '@material-ui/icons/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(() => ({
  root: {
    color: '#fff',
    maxHeight: 460,
    maxWidth: 600,
    overflow: 'hidden',
    width: '100%',
    '@media (max-width: 600px)': {
      width: '100%',
    },
  },
  titles: {
    color: '#fff',
    padding: 10,
    paddingTop: 0,
    whiteSpace: 'wrap',
    fontSize: 13,
    fontWeight: 'bold',
  },
  listSection: {
    maxHeight: 420,
    overflowX: 'hidden',
    overflowY: 'auto',
  },
}));

export default function PlayList({
  course,
  currentVideo,
  setCurrentVideo,
  setCurrentDescription,
  // setCurrentLoad,
  setCurrentLesson,
  openModule,
  currentModule,
  openFirstModule,
  handleClick,
  setLessonDetails,
  setCurrentMedia,
  setChangeMedia,
  attachmentSelected,
  setAttachmentSelected,
}) {
  const classes = useStyles();

  const { isAuth } = useSelector(state => state.auth);

  const handleAttachmentSelect = item => {
    setChangeMedia(true);
    setAttachmentSelected(item.id);
    setCurrentMedia({
      id: item.id,
      name: item.name,
      type: item.type,
      url: item.file.original,
    });
  };

  const handleLessonSelect = (
    video,
    description,
    status,
    courseId,
    moduleId,
    lessonId,
    item,
    itemMod,
    lesson
  ) => {
    setAttachmentSelected(0);
    setChangeMedia(false);
    if (item === 0 || isAuth)
      setCurrentVideo({
        url: video,
        status: status,
        courseId: courseId,
        moduleId: moduleId,
        lessonId: lessonId,
        nextLessonPosition: item + 1,
        modulePosition: itemMod,
      });
    setCurrentDescription({ text: description });
    setCurrentLesson(lesson);
    setLessonDetails({ name: lesson?.name });
  };

  return (
    <>
      {course && (
        <List
          className={classes.root}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <div className={classes.titles}>
              <span>{course.name}</span>
            </div>
          }>
          {
            // CASO O CURSO TENHA MAIS DO QUE 1 MÓDULO
          }
          {course?.modules && course?.modules.length > 1 ? (
            course.modules.map((mod, itemMod) => (
              <React.Fragment key={mod.id}>
                <ListItem
                  button
                  onClick={() =>
                    handleClick(mod.id, mod.description, mod.course_load)
                  }>
                  <ListItemIcon>
                    <ListIcon style={{ color: '#fff' }} />
                  </ListItemIcon>
                  <ListItemText>
                    <span className={classes.titles}>{mod.name}</span>
                  </ListItemText>
                  {openModule && currentModule == mod.id ? (
                    <ExpandLess style={{ color: '#fff' }} />
                  ) : (
                    <ExpandMore style={{ color: '#fff' }} />
                  )}
                </ListItem>
                <Collapse
                  style={{
                    maxHeight: 325,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                  }}
                  in={
                    (itemMod === 0 && openFirstModule) ||
                    (openModule && currentModule == mod.id)
                  }
                  timeout="auto"
                  unmountOnExit>
                  <List
                    component="div"
                    disablePadding
                    className={classes.listSection}>
                    {mod.lessons.length > 0 &&
                      mod.lessons.map((lesson, item) => (
                        <>
                          <ListVideoLesson
                            key={lesson.id}
                            lesson={lesson}
                            handleLessonSelect={handleLessonSelect}
                            itemMod={itemMod}
                            course={course}
                            item={item}
                            attachmentSelected={attachmentSelected}
                            currentVideo={currentVideo}
                          />
                        </>
                      ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))
          ) : (
            <>
              <List
                component="div"
                disablePadding
                className={classes.listSection}>
                {course?.modules &&
                  course?.modules[0].lessons.map((lesson, item) => (
                    <>
                      {lesson.type === 1 ? (
                        <ListVideoLesson
                          key={lesson.id}
                          lesson={lesson}
                          handleLessonSelect={handleLessonSelect}
                          course={course}
                          item={item}
                          attachmentSelected={attachmentSelected}
                          currentVideo={currentVideo}
                        />
                      ) : (
                        <>
                          {lesson.attachments.map(item => (
                            <>
                              <ListAttachmentLesson
                                item={item}
                                handleAttachmentSelect={handleAttachmentSelect}
                                attachmentSelected={attachmentSelected}
                              />
                            </>
                          ))}
                        </>
                      )}
                    </>
                  ))}
                {
                  // Renderiza o Audio e Pdf na Play List se for da categoria AO VIVO
                  course.categories &&
                    course.categories[0]?.id === 17 &&
                    course.modules[0].lessons[0].attachments.map(item => (
                      <>
                        <ListAttachmentLesson
                          item={item}
                          handleAttachmentSelect={handleAttachmentSelect}
                          attachmentSelected={attachmentSelected}
                        />
                      </>
                    ))
                }
              </List>
            </>
          )}
        </List>
      )}
    </>
  );
}
