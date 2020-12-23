import React from 'react';
import Carousel from '@brainhubeu/react-carousel';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Link from 'next/link';
import appUtils from 'utils/appUtils';

const CarouselContinue = ({ courses, carouselLimite = 10 }) => {
  const breakpoints = appUtils.generateBreakPoints(220, 10);
  const [isIfinite, setIsInfinite] = React.useState(true);

  const tamanho2 = useMediaQuery('(max-width: 470px) and (min-width:320px)');
  const tamanho3 = useMediaQuery('(max-width: 720px) and (min-width:520px)');
  const tamanho4 = useMediaQuery('(max-width: 920px) and (min-width:770px)');
  const tamanho5 = useMediaQuery('(max-width: 1170px) and (min-width:970px)');
  const tamanho6 = useMediaQuery('(max-width: 1440px) and (min-width:1200px)');
  const tamanho7 = useMediaQuery('(max-width: 1670px) and (min-width:1470px)');
  const tamanho8 = useMediaQuery('(max-width: 1920px) and (min-width:1720px)');
  const tamanho11 = useMediaQuery('(max-width: 2560px) and (min-width:1921px)');

  React.useEffect(() => {
    if (tamanho2 && courses.length <= 2) {
      setIsInfinite(false);
    } else if (tamanho3 && courses.length <= 3) {
      setIsInfinite(false);
    } else if (tamanho4 && courses.length <= 4) {
      setIsInfinite(false);
    } else if (tamanho5 && courses.length <= 5) {
      setIsInfinite(false);
    } else if (tamanho6 && courses.length <= 6) {
      setIsInfinite(false);
    } else if (tamanho7 && courses.length <= 7) {
      setIsInfinite(false);
    } else if (tamanho8 && courses.length <= 8) {
      setIsInfinite(false);
    } else if (tamanho11 && courses.length <= 11) {
      setIsInfinite(false);
    }
  }, [
    tamanho2,
    tamanho3,
    tamanho4,
    tamanho5,
    tamanho6,
    tamanho7,
    tamanho8,
    tamanho11,
  ]);

  return (
    <>
      {courses && (
        <Carousel
          infinite={isIfinite}
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

export default CarouselContinue;
