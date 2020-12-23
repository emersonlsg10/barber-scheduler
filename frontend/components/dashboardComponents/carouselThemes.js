import React from 'react';
import Carousel from '@brainhubeu/react-carousel';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Link from 'next/link';
import appUtils from 'utils/appUtils';
import { makeStyles } from '@material-ui/core';

const CarouselThemes = ({ categoryList, carouselLimite = 10 }) => {
  const useStyles = makeStyles(() => ({
    titleTheme: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      color: '#EB961F',
      position: 'absolute',
      bottom: 20,
      fontSize: 24,
      textAlign: 'center',
      fontWeight: 'bold',
      textShadow: '0px 0px 5px black',
      '@media (max-width: 580px)': {
        fontSize: 16,
      },
    },
    figure: {
      position: 'relative',
      display: 'inline-block',
      cursor: 'pointer',
      width: '100%',
      marginLeft: 0,
      marginRight: 0,
    },
  }));
  const classes = useStyles();

  const [isXl, setXl] = React.useState(false);
  const widthScreen = useMediaQuery('(min-width:1441px)');

  React.useEffect(() => {
    if (widthScreen) {
      setXl(true);
    }
  }, [isXl]);

  const breakpoints = appUtils.generateBreakPoints(
    isXl || widthScreen ? 580 : 300,
    10
  );
  return (
    <div style={{ maxHeight: 200 }}>
      <Carousel
        slidesPerPage={3.5}
        autoPlay={6000}
        infinite
        breakpoints={breakpoints}>
        {categoryList
          .filter(category => category.images.original)
          .slice(0, carouselLimite)
          .map(category => (
            <div
              key={category.id}
              style={{
                padding: '0px',
                paddingRight: 10,
                paddingLeft: 10,
                width: '100%',
                marginBottom: 30,
              }}>
              <Link href="/pilares/[slug]" as={`/pilares/${category.slug}`}>
                <figure className={classes.figure}>
                  <img
                    style={{ borderRadius: 10, width: '100%' }}
                    height="160"
                    className={'divBook'}
                    src={category.images.original}
                    alt={category.slug}
                  />
                  <figcaption className={classes.titleTheme}>
                    {category.name !== 'Lançamentos' && category.name}
                  </figcaption>
                </figure>
              </Link>
            </div>
          ))}
      </Carousel>
      <style jsx>{`
        .divBook {
          margin-right: 0px;
        }
      `}</style>
    </div>
  );
};

export default CarouselThemes;
