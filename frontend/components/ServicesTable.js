import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import appUtils from 'utils/appUtils';
import Table from '@material-ui/core/Table';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  table: {
    width: '100%',
    marginTop: 15,
  },
  tableHead: {
    fontWeight: 'bolder',
    fontSize: 18,
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.gray,
    },
  },
}))(TableRow);

export default function ServiceTable({
  dataServices,
  loadingServices,
  onDeleteService,
}) {
  const classes = useStyles();

  const [delayLoading, setDelayLoading] = useState(false);
  useEffect(() => {
    if (loadingServices) {
      setDelayLoading(true);
      setTimeout(() => {
        setDelayLoading(false);
      }, 1000);
    }
  }, [loadingServices]);

  return (
    <>
      <TableContainer component={Paper}>
        <Backdrop className={classes.backdrop} open={delayLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead}>Nome</TableCell>
              <TableCell className={classes.tableHead} align="center">
                Tempo
              </TableCell>
              <TableCell className={classes.tableHead} align="center">
                Valor
              </TableCell>
              <TableCell className={classes.tableHead} align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataServices &&
              dataServices.map(row => (
                <StyledTableRow key={row.name}>
                  <TableCell align="left" component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.time}</TableCell>
                  <TableCell align="center">
                    {appUtils.formatPrice(row.price)}
                  </TableCell>
                  <TableCell align="left">
                    <IconButton
                      onClick={() => onDeleteService(row.id)}
                      aria-label="delete"
                      color="primary">
                      <DeleteIcon color="primary" />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <style global jsx>{`
        .MuiTableContainer-root {
          width: 100%;
          overflow-x: hidden !important;
        }
      `}</style>
    </>
  );
}
