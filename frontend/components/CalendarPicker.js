import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers({ selectedDate, setSelectedDate }) {
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Selecione uma data:"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <style global jsx>{`
        #date-picker-inline {
          color: #fff !important;
        }
        .MuiTextField-root {
          width: 100% !important;
        }
        .MuiFormLabel-root {
          font-size: 23px;
          font-weight: bolder;
          color: #eb961f !important;
        }
        .MuiIconButton-label {
          color: #eb961f !important;
        }
        .MuiTypography-root {
          color: black !important;
        }
        .MuiInputBase-root {
          margin-top: 25px !important;
        }
      `}</style>
    </>
  );
}
