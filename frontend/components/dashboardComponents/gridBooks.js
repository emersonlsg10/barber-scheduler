import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  books: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    marginRight: 12,
    marginTop: 30,
    justifyContent: 'flex-start',
    '& > *': {
      margin: theme.spacing(1),
    },
    '@media (max-width: 460px)': {
      justifyContent: 'center',
    },
  },
  book: {
    marginRight: '5px',
    width: '180px',
    height: 'auto',
    '@media (max-width: 460px)': {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
  linkDiv: {
    '@media (max-width: 460px)': {
      width: '100%',
      paddingTop: '138%', // Defines aspect ratio
      position: 'relative',
    },
  },
}));

const GridBooks = ({ userWatching, allCourses = false }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.books}
      style={
        !allCourses
          ? {
              marginLeft: 14,
            }
          : { marginLeft: 0 }
      }>
      {userWatching &&
        userWatching.map(item => (
          <div
            key={item.id}
            className={classes.linkDiv}
            style={
              !allCourses
                ? {
                    marginLeft: 8,
                  }
                : { marginLeft: 0 }
            }>
            <Link href="/assistir/[slug]" as={`/assistir/${item.slug}`}>
              <a>
                <img
                  className={classes.book}
                  src={item.images.original}
                  alt={item.name}
                />
              </a>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default GridBooks;
