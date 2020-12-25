import 'date-fns';
import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';
import { Creators as SchedulesListDetailsCreators } from 'appStore/ducks/schedules/list';

export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  useEffect(() => {
    dispatch(
      SchedulesListDetailsCreators.getRequest({
        date: moment(selectedDate).format('YYYY-MM-DD'),
      })
    );
  }, [selectedDate]);

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
        .MuiTextField-root {
          width: 100% !important;
        }
        .MuiFormLabel-root {
          font-size: 25px;
          font-weight: bolder;
          color: #eb961f !important;
        }
        .MuiInputBase-root {
          margin-top: 25px !important;
        }
      `}</style>
    </>
  );
}
