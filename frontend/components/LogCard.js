import React from 'react';
import { Button } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false,
};
const formatarData = data =>
  new Intl.DateTimeFormat('pt-BR', options).format(new Date(data));

export default function LogCard({ item }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderBody = debug => {
    try {
      const data = JSON.parse(debug);
      return JSON.stringify(data, null, 2);
    } catch (error) {
      return debug;
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar
          alt="item.userId"
          src={`http://coredata.sanesul.ms.gov.br/api/funcionarios/${item.userId}/foto`}
        />
      </ListItemAvatar>
      <ListItemText
        primary={`${item.userId} - ${item.appName}`}
        secondary={
          <>
            <Button variant="text" aria-describedby={id} onClick={handleClick}>
              {formatarData(item.time)}
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}>
              <Typography
                component="pre"
                variant="subtitle1"
                style={{ padding: 15 }}>
                {renderBody(item.debug)}
              </Typography>
            </Popover>
          </>
        }
      />
    </ListItem>
  );
}
