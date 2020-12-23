import React from 'react';
import Carousel from '@brainhubeu/react-carousel';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Link from 'next/link';
import appUtils from 'utils/appUtils';

const CarouselItens = ({ courses = [], carouselLimite = 10 }) => {
  const breakpoints = appUtils.generateBreakPoints(220, 10);
  return (
    <>
      {courses && (
        <Carousel
          slidesPerPage={6}
          infinite
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
          {courses.slice(0, carouselLimite).map(item => (
            <div key={item.id} style={{ padding: '0 10px', width: '100%' }}>
              <Link href="/assistir/[slug]" as={`/assistir/${item.slug}`}>
                <a>
                  <img
                    className={'divBook'}
                    src={item.images.medium}
                    alt={item.name}
                    style={{ width: '100%' }}
                  />
                </a>
              </Link>
            </div>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default CarouselItens;
