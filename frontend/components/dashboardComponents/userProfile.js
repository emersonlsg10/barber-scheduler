import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserStatistics from 'components/dashboardComponents/userStatistics';
import GridBooks from 'components/dashboardComponents/gridBooks';
import PaginationControlled from 'components/PaginationComponent/index';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    color: '#fff',
    marginLeft: 5,
  },
  subTitle: {
    marginLeft: 20,
    fontSize: 27,
    fontWeight: 'bold',
  },
  titleDiv: {
    marginLeft: 20,
    marginTop: 5,
  },
}));

const UserProfile = ({ userWatching, dashInfo, onChange, total }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.titleDiv}>
        <span style={{ fontSize: 35, fontWeight: 'lighter' }}>
          Meu <strong>Perfil</strong>
        </span>
      </div>
      {dashInfo && <UserStatistics dashInfo={dashInfo} />}
      <hr style={{ marginTop: 30, marginBottom: 20 }} />
      {userWatching.length > 0 ? (
        <span className={classes.subTitle}>Estou assistindo</span>
      ) : (
        <span className={classes.subTitle}>
          Você não está assistindo nenhum curso no momento!
        </span>
      )}

      {userWatching.length > 0 && (
        <>
          <GridBooks userWatching={userWatching} />
          <PaginationControlled onChange={onChange} total={total} />
        </>
      )}
      <style jsx>{``}</style>
    </div>
  );
};

export default UserProfile;
