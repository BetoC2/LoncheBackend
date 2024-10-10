import { Router } from 'express';
import commentsRoutes from './comments';
import citiesRoutes from './cities';
import postsRoutes from './posts';

const router = Router();

router.use('/comments', commentsRoutes);
router.use('/cities', citiesRoutes);
router.use('/posts', postsRoutes);

export default router;
