import React from 'react';
import { Avatar, type AvatarProps } from '@material-ui/core';

const UserAvatar = ({ size = 100, ...props }: AvatarProps) => {
  return (
    <Avatar
      alt={'avatar'}
      style={{
        width: size,
        height: size,
      }}
      {...props}
    />
  );
};

export default UserAvatar;
