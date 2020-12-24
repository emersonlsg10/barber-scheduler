import React from 'react';
import Notifications from 'react-notification-system-redux';
import { useSelector } from 'react-redux';

function NotificationContainer() {
  const notifications = useSelector(state => state.notifications);
  return <Notifications notifications={notifications} />;
}

export default NotificationContainer;
