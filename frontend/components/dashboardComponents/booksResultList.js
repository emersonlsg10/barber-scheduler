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

const booksListHome = ({ userWatching, carouselLimite = 10 }) => {
  const classes = useStyles();

  const firstRef = React.useRef();

  // const [localState, setLocalState] = React.useState([]);
  // var localUserWatching = [];
  // React.useEffect(() => {
  //   if (userWatching) {
  //     userWatching.map(item => {
  //       item.userWatching?.map(c => {
  //         localUserWatching.push(c);
  //       });
  //     });
  //     setLocalState(localUserWatching);
  //   }
  // }, []);
  const breakpoints = appUtils.generateBreakPoints(220, 10);
  const percentageHorizontal = 238;
  React.useEffect(() => {
    if (firstRef && firstRef.current && firstRef.current.style) {
      const changeWidth = () => {
        const firstElm = firstRef.current;
        if (firstElm) {
          if (firstElm.style) {
            firstElm.style.paddingLeft = '0px';
          }
        }
        const liParent = firstElm.parentElement;
        if (liParent) {
          const parentWidth = liParent.style.width;
          if (parentWidth === '0px') {
            setTimeout(() => {
              changeWidth();
            }, 30);
          } else {
            const parentWidthFormatted = Number(parentWidth.replace('px', ''));
            const newWidth =
              (parentWidthFormatted * percentageHorizontal) / 100;
            const newWidthStr = `${Math.round(newWidth)}px`;
            liParent.style.width = newWidthStr;
            liParent.style.maxWidth = newWidthStr;
            liParent.style.minWidth = newWidthStr;
          }
        }
      };
      changeWidth();
    }
  }, [firstRef]);

  let userWatchingArr: [] = userWatching;

  if (userWatching && userWatching.length < 7) {
    userWatchingArr.push(userWatching[1]);
    userWatchingArr.push(userWatching[1]);
    userWatchingArr.push(userWatching[1]);
    userWatchingArr.push(userWatching[1]);
    userWatchingArr.push(userWatching[1]);
    userWatchingArr.push(userWatching[1]);
  }

  userWatchingArr = userWatchingArr.filter(x => x !== undefined);

  return (
    <div className={classes.root} style={{ marginTop: 30, marginBottom: 20 }}>
      <Carousel
        slidesPerPage={6}
        breakpoints={breakpoints}
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
        {userWatchingArr &&
          userWatchingArr.slice(0, carouselLimite).map((item, i) => (
            <div
              key={item.id}
              style={{ padding: '0 10px', width: '100%' }}
              ref={i === 0 ? firstRef : () => {}}>
              <Link href="/assistir/[slug]" as={`/assistir/${item.slug}`}>
                <a>
                  {i !== 0 ? (
                    <img
                      className={'divBook'}
                      src={item.images.large}
                      alt={item.name}
                      style={{ width: '100%' }}
                    />
                  ) : (
                    <img
                      className={'divBook'}
                      src={item.images_horizontal.large}
                      alt={item.name}
                      style={{ width: '100%' }}
                    />
                  )}
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
