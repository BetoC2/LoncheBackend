import { Router } from 'express';
import commentsRoutes from './comments';
import citiesRoutes from './cities';
import postsRoutes from './posts';
import usersRoutes from './users';
import swaggerRoutes from './swagger';
import sessionRoutes from './session';
import notificationsRoutes from './notifications';
import likesRoutes from './likes';

import path from 'path';

const router = Router();

router.use('/swagger', swaggerRoutes);
router.use('/comments', commentsRoutes);
router.use('/cities', citiesRoutes);
router.use('/posts', postsRoutes);
router.use('/users', usersRoutes);
router.use('/notifications', notificationsRoutes);
router.use('/likes', likesRoutes);
router.use('/', sessionRoutes);

router.get('/archivo1', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'archivo1.html'));
});

// Configurar ruta para servir archivo2.html
router.get('/archivo2', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'archivo2.html'));
});

export default router;
