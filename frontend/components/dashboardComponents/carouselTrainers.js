import React from 'react';
import Carousel from '@brainhubeu/react-carousel';
import { Grid, makeStyles } from '@material-ui/core';
import appUtils from 'utils/appUtils';
import Avatar from '@material-ui/core/Avatar';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  avatar: {
    marginTop: 25,
    display: 'flex',
  },
  large: {
    width: theme.spacing(17),
    height: theme.spacing(17),
    borderColor: '#EB961F',
    borderStyle: 'solid',
  },
  trainerItem: {
    alignContent: 'center',
  },
}));

const CarouselTrainers = ({ trainerList, carouselLimite = 10 }) => {
  const breakpoints = appUtils.generateBreakPoints(220, 10);
  const classes = useStyles();

  const splitName = nameX => {
    const nameSeparado = nameX.split(' ');
    return (
      <span style={{ fontSize: 16 }}>
        <strong>{nameSeparado[0] + ' '}</strong>
        <span style={{ fontWeight: 'lighter' }}>{nameSeparado[1]}</span>
      </span>
    );
  };
  return (
    <div style={{ padding: '10px' }}>
      <Carousel
        slidesPerPage={6}
        totalSlides={10}
        infinite={true}
        autoPlay={6000}
        breakpoints={breakpoints}
        addArrowClickHandler>
        {trainerList.slice(0, carouselLimite).map(item => (
          <Grid container key={item.id}>
            <Grid item xs>
              <div className={classes.avatar}>
                <Link href="/trainers/[slug]" as={`/trainers/${item.slug}`}>
                  <div className={classes.trainerItem}>
                    <div style={{ cursor: 'pointer', marginRight: 0 }}>
                      <Avatar
                        alt={item.name}
                        src={item?.images.original && item.images.original}
                        className={classes.large}
                      />
                    </div>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                      <span style={{ color: '#fff' }}>
                        {splitName(item.name)}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </Grid>
          </Grid>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselTrainers;
