import React from 'react';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import Grid from '@material-ui/core/Grid';
import { GiOpenBook } from 'react-icons/gi';
import SchoolIcon from '@material-ui/icons/School';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    color: '#fff',
    marginTop: 20,
  },
  container: {
    margin: 0,
    paddingLeft: 20,
    paddingRight: 20,
  },
  card: {
    display: 'flex',
    color: '#aaa',
  },
  icon: {
    fontSize: 40,
    color: '#aaa',
  },
}));

const UserStatistics = ({ dashInfo }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container className={classes.container} justify="flex-start">
        {dashInfo && (
          <>
            <Grid item sm={4} md={4} lg={3}>
              <CardStatistic
                icon={<WatchLaterIcon className={classes.icon} />}
                text={
                  dashInfo.total_hours != ''
                    ? dashInfo.total_hours
                        .replace('day', 'dia')
                        .replace('days', 'dias')
                    : '0h00min'
                }
                span={' Total de Horas'}
              />
            </Grid>
            <Grid item sm={4} md={4} lg={3}>
              <CardStatistic
                icon={<GiOpenBook className={classes.icon} />}
                text={
                  dashInfo.lesson_completed != ''
                    ? dashInfo.lesson_completed + ' aulas'
                    : '0 Aulas'
                }
                span={' Aulas Concluídas'}
              />
            </Grid>
            <Grid item sm={4} md={4} lg={3}>
              <CardStatistic
                icon={<SchoolIcon className={classes.icon} />}
                text={
                  dashInfo.completed_courses != ''
                    ? dashInfo.completed_courses + ' cursos'
                    : '0 Cursos'
                }
                span={' Cursos Concluídos'}
              />
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

const CardStatistic = ({ icon, text, span }) => {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <div style={{ marginRight: 10 }}>{icon}</div>
      <div>
        <div style={{ whiteSpace: 'nowrap' }}>
          <span
            style={{
              fontSize: 30,
              color: '#fff',
              fontWeight: 'bold',
            }}>
            {text}
          </span>
        </div>
        <div>
          <span style={{ fontSize: 13, fontWeight: 'lighter', marginLeft: 1 }}>
            {span}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserStatistics;
