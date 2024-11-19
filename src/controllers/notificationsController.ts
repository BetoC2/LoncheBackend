import { Request, Response } from 'express';
import Notification from '../models/Notification';
import mongoose from 'mongoose';

export const getNotifications = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id; // ID del usuario
        const limit = parseInt(req.query.limit as string) || 10; // Límite opcional, por defecto 10

        const notifications = await Notification.find({ receiver: userId })
            .sort({ createdAt: -1 }) // Ordenar por las más recientes
            .limit(limit); // Aplicar el límite

        res.status(200).json({
            success: true,
            data: notifications,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las notificaciones',
            error: (error as Error).message,
        });
    }
};

// Función para crear una nueva notificación
export const createNotification = async (req: Request, res: Response) => {
    try {
        // const { sender, receiver, type, date } = req.body;
        const { sender, receiver, type, post, date } = req.body;

        // Crear una nueva instancia de notificación
        const newNotification = new Notification({
            sender,
            receiver,
            type,
            post,
            date: date || new Date(), // Si no se envía una fecha, se usa la fecha actual
        });

        // Guardar la notificación en la base de datos
        await newNotification.save();

        res.status(201).json({
            success: true,
            message: 'Notification created successfully',
            data: newNotification,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating notification',
            error: (error as Error).message,
        });
    }
};
