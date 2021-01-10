import React, { useEffect, useState } from 'react';
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
      top: `40%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    },
    '@media (max-width: 600px)': {
      width: '90%',
      top: `20%`,
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
    marginTop: 10,
    marginBottom: 0,
    minHeight: 40,
    borderRadius: 50,
    background: 'linear-gradient(45deg, #c85c21 30%, #dc7322 90%)',
    color: 'white',
    width: '100%',
  },
  formControl: {
    marginTop: 15,
  },
}));

function ModalScheduler({
  dataServices,
  loadingServices,
  razao,
  selectedTime,
  limitTimeService,
  selectedDate,
  onSchedulerSubmit,
  loadingScheduleCreate,
  selectedSchedule,
  onCancelSchedule,
  loadingScheduleDelete,
}) {
  const classes = useStyles();
  const [state, setState] = useState(null);
  const [countTime, setCountTime] = useState(0);
  const [countPrice, setCountPrice] = useState(0);
  const [showCancelMessage, setShowCancelMessage] = useState(false);
  const handleChange = (event, index, rowData) => {
    if (selectedSchedule) {
      setShowCancelMessage(true);
      return;
    }
    if (event.target.checked) {
      setCountTime(countTime + rowData.time);
      setCountPrice(countPrice + rowData.price);
    } else {
      setCountTime(countTime - rowData.time);
      setCountPrice(countPrice - rowData.price);
    }

    state[index] = {
      checked: event.target.checked,
      time: rowData.time,
      price: rowData.price,
      name: rowData.name,
      id: rowData.id,
    };
  };

  const filterLimitTime = item => item.time <= limitTimeService * razao;

  useEffect(() => {
    if (!loadingServices && dataServices) {
      setState([
        ...dataServices?.filter(filterLimitTime).map(item => ({
          checked: !!item.checked,
          time: item.time,
          price: item.price,
          name: item.name,
          id: item.id,
        })),
      ]);
    }
  }, [dataServices]);

  return (
    <>
      <div className={classes.modal}>
        <span>Horário selecionado: {selectedTime}</span>
        <div>Data selecionada: {selectedDate}</div>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">
            Escolha os serviços disponíveis no horário selecionado:
          </FormLabel>
          <FormGroup style={{ marginTop: 20 }}>
            {dataServices &&
              dataServices?.length > 0 &&
              dataServices.map((item, index) => (
                <FormControlLabel
                  key={item.id}
                  control={
                    <Checkbox
                      checked={item.checked}
                      onChange={e => handleChange(e, index, item)}
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
        <div style={{ marginTop: 20 }}>
          <div>
            {countPrice > 0 && (
              <span>
                Valor total: <strong>{appUtils.formatPrice(countPrice)}</strong>
              </span>
            )}
          </div>
          <div>
            {countTime > 0 && (
              <span>
                Tempo estimado: <strong>{countTime} minutos</strong>
              </span>
            )}
          </div>
        </div>
        <div style={{ marginTop: 15 }}>
          {!filterLimitTime({ time: countTime }) && (
            <span style={{ fontSize: 13, color: 'red' }}>
              O Tempo total não pode ser maior que {limitTimeService * razao}{' '}
              min neste horário selecionado!
            </span>
          )}
          {showCancelMessage && (
            <span style={{ fontSize: 13, fontWeight: 'bold', color: 'red' }}>
              Por enquanto você não pode editar, apenas cancelar e agendar
              novamente!
            </span>
          )}
        </div>
        <Button
          type="submit"
          onClick={() =>
            selectedSchedule
              ? onCancelSchedule(selectedSchedule.id)
              : countTime > 0 && onSchedulerSubmit(state)
          }
          disabled={!filterLimitTime({ time: countTime })}
          className={classes.buttonLogin}
          variant="contained">
          {loadingScheduleCreate || loadingScheduleDelete ? (
            <CircularProgress size={22} color="primary" />
          ) : (
            <>{selectedSchedule ? 'Cancelar Agendamento' : 'Agendar'}</>
          )}
        </Button>
      </div>
      <style global jsx>{`
        .MuiFormControlLabel-label {
          color: white !important;
        }
      `}</style>
    </>
  );
}
export default ModalScheduler;
