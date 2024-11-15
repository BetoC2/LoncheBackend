import { Socket } from 'socket.io';
import NotificationPayload from '../types/NotificationPayload';

const handleNotificationEvents = (socket: Socket) => {
  console.log('Handling notification events');

  socket.on('joinRoom', (userId: string) => {
    socket.join(userId);
    console.log(`User joined room: ${userId}`);
  });

  socket.on('sendPostNotification', (data: NotificationPayload) => {
    const { id_user, id_post, id_receiver, username, actionType } = data;
    const timestamp = new Date().toISOString();

    //TODO: Añadir registro a la base de datos
    const notification = {
      id_user,
      id_post,
      username,
      actionType,
      timestamp,
    };

    socket.to(id_receiver).emit('receiveNotification', notification);
    console.log('Notification sent:', notification);
  });

  socket.on('sendFollowNotification', (data: NotificationPayload) => {
    const { id_user, username, id_receiver } = data;
    const timestamp = new Date().toISOString();

    //TODO: Añadir registro a la base de datos
    const notification = {
      type: 'follow',
      id_user,
      username,
      timestamp,
    };

    socket.to(id_receiver).emit('receiveNotification', notification);
    console.log('Follow notification sent:', notification);
  });
};

export default handleNotificationEvents;
