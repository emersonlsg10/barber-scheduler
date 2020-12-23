import React from 'react';
import Carousel from '@brainhubeu/react-carousel';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Link from 'next/link';
import appUtils from 'utils/appUtils';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  book: {
    marginRight: 15,
    width: '100%',
    height: 250,
  },
}));

const BooksList = ({ title, courses }) => {
  const breakpoints = appUtils.generateBreakPoints();
  const classes = useStyles();
  return (
    <>
      {title != false && <h2>{title}</h2>}
      <Carousel
        slidesPerPage={6}
        infinite
        autoPlay={3000}
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
          courses.map(item => (
            <div key={item.id} style={{ padding: '0 10px', width: '100%' }}>
              <Link href="/assistir/[slug]" as={`/assistir/${item.slug}`}>
                <a>
                  <img
                    className={classes.book}
                    src={item.images.large}
                    alt={item.name}
                  />
                </a>
              </Link>
            </div>
          ))}
      </Carousel>
    </>
  );
};
export default BooksList;
