import React, { useState, useCallback } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { Creators as AuthCreators } from 'appStore/ducks/auth';
import { useDispatch } from 'react-redux';
import ReactCrop from 'react-image-crop';
import Router from 'next/router';
import Modal from '@material-ui/core/Modal';
import { Creators as UserCreator } from 'appStore/ducks/user';
import { Creators as MenuCreators } from 'appStore/ducks/menu';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    color: '#aaa',
    minHeight: '100vh',
  },
  large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
  },
  input: {
    display: 'none',
  },
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(4),
    },
  },
  userImage: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: -20,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 1),
  },
  divUploadButton: {
    marginTop: '10px',
    display: 'fex',
    flexWrap: 'wrap',
    alignContent: 'spaceBetween',
  },
  button: {
    color: theme.palette.primary,
  },
  dashboardItens: {
    display: 'fex',
    justifyContent: 'center',
  },
}));

const AsideDashboard = ({ data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.user);
  const { tab } = useSelector(state => state.menu);
  const [upImg, setUpImg] = useState();
  const [imgRef, setImgRef] = useState(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 20 / 20 });
  const [previewUrl, setPreviewUrl] = useState();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleSubMenuSelector = name => {
    if (name === '/sair') onLogout();
    Router.push(name);
    dispatch(MenuCreators.changeTab(name));
  };
  const onLogout = () => {
    dispatch(AuthCreators.getLogoutRequest());
  };

  const uploadUserImage = fileImage => {
    dispatch(UserCreator.UserUpdateImageRequest(fileImage));
    if (!loading) {
      setTimeout(function () {
        setOpen(false);
      }, 3000);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      setOpen(true);
    }
  };

  const onLoad = useCallback(img => {
    setImgRef(img);
  }, []);

  const makeClientCrop = async crop => {
    if (imgRef && crop.width && crop.height) {
      createCropPreview(imgRef, crop, 'newFile.jpeg');
    }
  };

  const createCropPreview = async (image, crop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    // As Base64 string
    const base64Image = canvas.toDataURL('image/jpeg');
    setPreviewUrl(base64Image);
    // As a blob
    /*return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(previewUrl);
        setPreviewUrl(window.URL.createObjectURL(blob));
      }, 'image/jpeg');
    });*/
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <ReactCrop
        src={upImg}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={c => setCrop(c)}
        onComplete={makeClientCrop}
      />
      <div className={classes.divUploadButton}>
        <Button
          fullWidth
          onClick={() => uploadUserImage(previewUrl)}
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={
            !loading ? <CloudUploadIcon /> : <CircularProgress size={16} />
          }>
          Salvar e enviar
        </Button>
      </div>
    </div>
  );

  return (
    <div className={classes.root}>
      {data && (
        <>
          <div className={classes.avatar}>
            <Avatar
              alt="Remy Sharp"
              src={
                data.images?.medium ||
                'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'
              }
              className={classes.large}
            />
          </div>
          <div>
            <div className={classes.userImage}>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={onSelectFile}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  style={{ color: '#aaa' }}
                  aria-label="upload picture"
                  component="span">
                  <PhotoCamera style={{ fontSize: '18px' }} />
                  <span style={{ fontSize: '14px', marginLeft: '5px' }}>
                    Trocar foto
                  </span>
                </IconButton>
              </label>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                {body}
              </Modal>
            </div>
          </div>
          <div className={classes.dashboardItens}>
            <div className="userInfo">
              <div style={{ marginLeft: 15, fontSize: 25, fontWeight: 'bold' }}>
                {data.name != undefined ? data.name : 'Daniel Ferreira'}
              </div>
              <br />
              <span style={{ fontSize: 13, marginLeft: 15 }}>
                {(data.email != undefined) != ''
                  ? data.email
                  : 'danielpaulino@febracis.com.br'}
              </span>

              <List component="nav" aria-label="secondary mailbox folders">
                <ListItem
                  button
                  onClick={() => {
                    handleSubMenuSelector('/meu-perfil');
                  }}>
                  <ListItemText
                    primary="Meu Perfil"
                    style={
                      tab === '/meu-perfil'
                        ? { color: '#EB961F' }
                        : { color: '#aaa' }
                    }
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    handleSubMenuSelector('/editar-perfil');
                  }}>
                  <ListItemText
                    primary="Editar Perfil"
                    style={
                      tab === '/editar-perfil'
                        ? { color: '#EB961F' }
                        : { color: '#aaa' }
                    }
                  />
                </ListItem>
                {/* <ListItem
                  button
                  onClick={() => {
                    handleSubMenuSelector('/minha-timeline');
                  }}>
                  <ListItemText
                    primary="Minha Timeline"
                    style={
                      tab === '/minha-timeline'
                        ? { color: '#EB961F' }
                        : { color: '#aaa' }
                    }
                  />
                </ListItem> */}
                <ListItem
                  button
                  onClick={() => {
                    handleSubMenuSelector('/minha-assinatura');
                  }}>
                  <ListItemText
                    primary="Minha Assinatura"
                    style={
                      tab === '/minha-assinatura'
                        ? { color: '#EB961F' }
                        : { color: '#aaa' }
                    }
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    handleSubMenuSelector('/meus-comentarios');
                  }}>
                  <ListItemText
                    primary="Meus Comentários"
                    style={
                      tab === '/meus-comentarios'
                        ? { color: '#EB961F' }
                        : { color: '#aaa' }
                    }
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    handleSubMenuSelector('/minhas-anotacoes');
                  }}>
                  <ListItemText
                    primary="Minhas Anotações"
                    style={
                      tab === '/minhas-anotacoes'
                        ? { color: '#EB961F' }
                        : { color: '#aaa' }
                    }
                  />
                </ListItem>
                <ListItem button onClick={onLogout}>
                  <ListItemText primary="Sair" />
                </ListItem>
              </List>
            </div>
          </div>
        </>
      )}
      <style jsx>{`
        .userInfo {
          margin-top: 35px;
          margin-left: 25px;
        }
      `}</style>
    </div>
  );
};

AsideDashboard.getInitialProps = async ({ store }) => {
  store.dispatch(UserCreator.getRequest());
};

export default AsideDashboard;
