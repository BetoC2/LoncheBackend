import { Schema, model } from 'mongoose';

const notificationSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al usuario que envía la notificación
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al usuario que recibe la notificación
    type: {
      type: String,
      enum: ['like', 'comment', 'follow'], // Tipos de notificación permitidos
      required: true,
    },
    post: { type: Schema.Types.ObjectId, ref: 'Post' }, // Referencia al post para "like" y "comment"
    timestamp: { type: Date, default: Date.now }, // Fecha y hora de creación
  },
  {
    timestamps: true, // Agrega automáticamente campos createdAt y updatedAt
  }
);

// Creamos el modelo Notification
const Notification = model('Notification', notificationSchema);

export default Notification;
