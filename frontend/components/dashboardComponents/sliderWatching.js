import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const tileData = [
  {
    img: 'img/book1.png',
    title: 'logo',
  },
  {
    img: 'img/book2.png',
    title: 'logo',
  },
  {
    img: 'img/book3.png',
    title: 'logo',
  },
];

export default function SliderWatching() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={3.5}>
        {tileData.map(tile => (
          <img
            key={tile.id}
            src={tile.img}
            alt={tile.title}
            width="250"
            height="200"
          />
        ))}
      </GridList>
    </div>
  );
}
