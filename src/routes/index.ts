import { Router } from 'express';
import commentsRoutes from './comments';
import citiesRoutes from './cities';
import postsRoutes from './posts';
import usersRoutes from './users';
import swaggerRoutes from './swagger';
import sessionRoutes from './session';
import notificationsRoutes from './notifications';
import likesRoutes from './likes';
import categoriesRoutes from './categories';
import { googleAuth } from '../middlewares/google-auth';

import { auth } from '../middlewares';
const router = Router();
googleAuth(router);

router.use('/swagger', swaggerRoutes);
router.use('/comments', commentsRoutes);
router.use('/cities', citiesRoutes);
router.use('/posts', postsRoutes);
router.use('/users', usersRoutes);
router.use('/notifications', notificationsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/', likesRoutes);
router.use('/', sessionRoutes);

export default router;
