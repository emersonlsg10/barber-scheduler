import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from '@brainhubeu/react-carousel';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Link from 'next/link';
import appUtils from 'utils/appUtils';
// teste
const useStyles = makeStyles({
  root: {
    marginTop: '0px',
  },
});

const booksListHome = ({ courses, carouselLimite = 10 }) => {
  const classes = useStyles();
  const breakpoints = appUtils.generateBreakPoints(220, 10);
  return (
    <div className={classes.root} style={{ marginTop: 25 }}>
      <Carousel
        slidesPerPage={6}
        infinite={true}
        breakpoints={breakpoints}
        arrowLeft={
          <ArrowBackIosIcon
            name="angle-double-left"
            style={{ fontSize: '40px', color: '#fff' }}
          />
        }
        arrowLeftDisabled={
          <ArrowBackIosIcon
            name="angle-left"
            style={{ fontSize: '40px', color: '#fff' }}
          />
        }
        arrowRightDisabled={
          <ArrowForwardIosIcon
            name="angle-right"
            style={{ fontSize: '40px', color: '#fff' }}
          />
        }
        arrowRight={
          <ArrowForwardIosIcon
            name="angle-double-right"
            style={{ fontSize: '40px', color: '#fff' }}
          />
        }
        addArrowClickHandler>
        {courses &&
          courses.slice(0, carouselLimite).map(item => (
            <div key={item.id} style={{ padding: '0 10px', width: '100%' }}>
              <Link href="/assistir/[slug]" as={`/assistir/${item.slug}`}>
                <a>
                  <img
                    className={'divBook'}
                    src={item.images.large}
                    alt={item.name}
                    style={{ width: '100%' }}
                  />
                </a>
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
export default booksListHome;
