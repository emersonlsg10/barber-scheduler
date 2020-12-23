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

const booksListHome = ({ courses }) => {
  const classes = useStyles();
  const [localState, setLocalState] = React.useState([]);
  var localCourses = [];
  React.useEffect(() => {
    if (courses) {
      courses.map(item => {
        item.courses?.map(c => {
          localCourses.push(c);
        });
      });
      setLocalState(localCourses);
    }
  }, []);
  const breakpoints = appUtils.generateBreakPoints(220, 10);
  return (
    <div className={classes.root} style={{ marginTop: 30, marginBottom: 20 }}>
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
        {localState &&
          localState.map(item => (
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