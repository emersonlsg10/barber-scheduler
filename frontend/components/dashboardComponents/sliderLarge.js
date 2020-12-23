import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
// import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const useStyles = makeStyles(theme => ({
  slider: {
    width: '100%',
    height: '500px',
    [theme.breakpoints.up('xs')]: {
      height: '200px',
    },
    [theme.breakpoints.up('sm')]: {
      height: '300px',
    },
    [theme.breakpoints.up('md')]: {
      height: '450px',
    },
    [theme.breakpoints.up('lg')]: {
      height: '500px',
    },
    [theme.breakpoints.up('xl')]: {
      height: '700px',
    },
  },
}));

const SliderLarge = ({ data, arrows = true }) => {
  if (data.length <= 0) {
    return null;
  }
  if (data.length == 1) {
    arrows = false;
  }
  const classes = useStyles();
  return (
    <AutoplaySlider
      interval={4000}
      play={true}
      organicArrows={arrows}
      cancelOnInteraction
      className={classes.slider}>
      {data[0].images.map(item => (
        <div key={item.id} data-src={item.sizes.original}>
          <a
            href={item.link}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
            }}>
            &nbsp;
          </a>
          {/*
          <Button
            variant="contained"
            color="primary"
            style={{
              position: 'absolute',
              display: 'block',
              marginLeft: '-605px',
              width: '420px',
              height: '50px',
              marginTop: '152px',
              borderRadius: '10px',
              color: '#fff',
            }}>
            ASSISTIR AGORA MESMO
          </Button>
          */}
        </div>
      ))}
    </AutoplaySlider>
  );
};

export default SliderLarge;
