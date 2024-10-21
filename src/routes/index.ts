import { Router } from 'express';
import commentsRoutes from './comments';
import citiesRoutes from './cities';
import postsRoutes from './posts';
import usersRoutes from './users';
import swaggerRoutes from './swagger';
import loginRoutes from './login';

const router = Router();

router.use('/swagger', swaggerRoutes);
router.use('/comments', commentsRoutes);
router.use('/cities', citiesRoutes);
router.use('/posts', postsRoutes);
router.use('/users', usersRoutes);
router.use('/login', loginRoutes);

export default router;
