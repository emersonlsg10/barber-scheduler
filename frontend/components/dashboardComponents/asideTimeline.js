import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
// import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import styled from 'styled-components';
import { Icon } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import Modal from '@material-ui/core/Modal';
import { Creators as TimelineActionsCreators } from 'appStore/ducks/timeline/actions';
import { Creators as FriendsCreators } from 'appStore/ducks/timeline/friends/list';
import FriendsList from 'components/timelineComponents/FriendsList';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    color: '#aaa',
    position: 'sticky',
    top: 50,
    bottom: 50,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    margin: '10px 0px',
    color: theme.palette.text.secondary,
    backgroundColor: '#282828 !important',
  },
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
  ListsFriends: {
    maxHeight: '45vh',
    overflow: 'auto',
    '@media (max-width: 600px)': {
      maxHeight: '100%',
    },
  },
  itemList: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255 , 0.1)',
    },
  },
  divSearch: {
    marginTop: 12,
  },
  Search: {
    height: 40,
    fontSize: 20,
  },
  SearchFriend: {
    height: 20,
    fontSize: 12,
  },
  divTitle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EB961F',
    color: 'black',
    borderRadius: 5,
    marginBottom: 5,
  },
  mainGrid: {
    '@media (max-width: 600px)': {
      maxHeight: '100%',
    },
  },
  gridAddFriend: {
    '@media (max-width: 600px)': {
      maxHeight: '100%',
    },
  },
  mt65: {
    marginTop: 65,
    '@media (max-width: 960px)': {
      margin: 0,
      maxHeight: '100%',
    },
  },
  divAddFriend: {
    margin: '50px 0px',
    '@media (max-width: 960px)': {
      margin: '0 0 50px 0',
    },
  },
}));

const AsideTimeline = ({ userFriends, onFriendClick }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const { data: searchResult } = useSelector(state => state.timeline.actions);

  const onSearchSubmit = text => {
    if (text !== '') {
      handleOpenModal();
      dispatch(TimelineActionsCreators.getSearchRequest({ search: text }));
    }
  };

  const onSearchMyFriends = text => {
    if (text !== '')
      dispatch(FriendsCreators.getRequest({ page: 1, name: text }));
    else dispatch(FriendsCreators.getRequest({ page: 1 }));
  };

  const body = (
    <div className={classes.modal}>
      <span id="simple-modal-title" style={{ fontSize: 17 }}>
        Resultados da busca:
      </span>
      {searchResult?.length > 0 ? (
        <FriendsList userFriends={searchResult} />
      ) : (
        <div>Não encontrado</div>
      )}
    </div>
  );

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="stretch"
        className={classes.mainGrid}>
        <Grid item xs className={classes.gridAddFriend}>
          <div className={classes.divAddFriend}>
            <DivTitle title={'Novos amigos'} icon={<GroupAddOutlinedIcon />} />
            <SearchInput
              searchFriends={false}
              onSearchSubmit={onSearchSubmit}
            />
          </div>
        </Grid>
        <Grid id="friendsGrid" item xs className={classes.mt65}>
          <DivTitle
            title={`Amigos (${userFriends?.length})`}
            icon={<PeopleAltOutlinedIcon />}
          />
          <div style={{ margin: '10px 0px' }}>
            <SearchInput
              searchFriends={true}
              onSearchMyFriends={onSearchMyFriends}
            />
          </div>
          <FriendsList
            userFriends={userFriends}
            onFriendClick={onFriendClick}
          />
        </Grid>
      </Grid>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        {body}
      </Modal>
    </div>
  );
};

const DivTitle = ({ title, icon }) => {
  const classes = useStyles();

  return (
    <div className={classes.divTitle}>
      <div>{icon}</div>
      <div>
        <Typography style={{ marginLeft: 10 }} variant="body2" color="white">
          {title}
        </Typography>
      </div>
    </div>
  );
};

const SearchInput = ({
  searchFriends = false,
  onSearchSubmit,
  onSearchMyFriends,
}) => {
  const classes = useStyles();
  const [text, setText] = React.useState('');

  const handleClickSeach = event => {
    event.preventDefault();
    if (!searchFriends) onSearchSubmit(text);
    else onSearchMyFriends(text);
  };

  const onChangeText = e => {
    setText(e.target.value);
    if (searchFriends && e.target.value === '') {
      onSearchMyFriends(text);
    }
  };
  const sizeIcon = searchFriends ? '17px' : '25px';
  const StyledIcon = styled(Icon)`
    && {
      cursor: pointer;
      color: white;
      font-size: ${sizeIcon};
      &:hover {
        color: #eb961f;
      }
    }
  `;

  return (
    <FormControl
      className={!searchFriends && classes.divSearch}
      style={{ width: '100%' }}>
      <Input
        id="outlined-adornment-search"
        type={'text'}
        placeholder={searchFriends ? 'Buscar por nome' : 'Buscar por código'}
        className={searchFriends ? classes.SearchFriend : classes.Friend}
        style={{ color: '#aaa' }}
        onChange={onChangeText}
        onKeyUp={onChangeText}
        endAdornment={
          <InputAdornment position="end">
            <StyledIcon onClick={handleClickSeach}>search</StyledIcon>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default AsideTimeline;
