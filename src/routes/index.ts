import { Router } from 'express';
import commentsRoutes from './comments';

const router = Router();

router.use('/comments', commentsRoutes);

export default router;
