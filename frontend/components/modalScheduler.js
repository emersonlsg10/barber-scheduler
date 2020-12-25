import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { Button, CircularProgress } from '@material-ui/core';
import appUtils from 'utils/appUtils';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  modal: {
    color: '#fff',
    position: 'absolute',
    width: 450,
    '@media (min-width: 600px)': {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    },
    '@media (max-width: 600px)': {
      width: '90%',
      top: `30%`,
      left: '50%',
      transform: `translate(-50%)`,
    },
    backgroundColor: '#252525',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  title: {
    color: theme.palette.primary.main,
    marginLeft: 10,
    marginTop: 35,
  },
  buttonLogin: {
    marginTop: 25,
    marginBottom: 0,
    minHeight: 40,
    borderRadius: 50,
    background: 'linear-gradient(45deg, #c85c21 30%, #dc7322 90%)',
    color: 'white',
    width: '100%',
  },
}));

function ModalScheduler({ dataServices, loadingServices }) {
  const classes = useStyles();

  const [state, setState] = React.useState(null);

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  // { ...item, checked: item.checked }

  useEffect(() => {
    if (!loadingServices && dataServices) {
      dataServices?.data.map(item => ({
        [item.name]: false,
      }));
      setState(
        dataServices?.data.map(item => ({
          [item.name]: false,
        }))
      );
    }
  }, [dataServices]);
  return (
    <>
      <div className={classes.modal}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Selecione os serviços:</FormLabel>
          <FormGroup>
            {dataServices?.data.length > 0 &&
              dataServices?.data.map(item => (
                <FormControlLabel
                  key={item.id}
                  control={
                    <Checkbox
                      checked={item.checked}
                      onChange={handleChange}
                      color="primary"
                      name={item.name}
                    />
                  }
                  label={`${item.name} - ${appUtils.formatPrice(
                    item.price
                  )} - ${item.time} min`}
                />
              ))}
          </FormGroup>
        </FormControl>
        <Button
          type="submit"
          className={classes.buttonLogin}
          variant="contained">
          {false ? <CircularProgress size={22} color="primary" /> : 'Agendar'}
        </Button>
      </div>
    </>
  );
}
export default ModalScheduler;
