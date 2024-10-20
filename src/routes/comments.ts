import { Router } from 'express';
import commentsController from '../controllers/commentsController';

const commentsRoutes = Router();

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_post:
 *                 type: string
 *               id_user:
 *                 type: string
 *               content:
 *                 type: string
 *               likes:
 *                 type: number
 *               dislikes:
 *                 type: number
 *             required:
 *               - id_post
 *               - id_user
 *               - content
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
commentsRoutes.post('/', commentsController.create);

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Retrieve all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: List of comments
 *       500:
 *         description: Internal server error
 */
commentsRoutes.get('/', commentsController.getComments);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Retrieve a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Comment ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment found
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */
commentsRoutes.get('/:id', commentsController.getCommentByID);

/**
 *  @swagger
 *  /comments/{id}:
 *    put:
 *      summary: Update a comment by ID
 *      tags: [Comments]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: Comment ID
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id_post:
 *                  type: string
 *                id_user:
 *                  type: string
 *                content:
 *                  type: string
 *                likes:
 *                  type: number
 *                dislikes:
 *                  type: number
 *      responses:
 *        200:
 *          description: Comment updated successfully
 *        400:
 *          description: Validation error
 *        404:
 *          description: Comment not found
 *        500:
 *          description: Internal server error
 */
commentsRoutes.put('/:id', commentsController.updateComment);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Comment ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */
commentsRoutes.delete('/:id', commentsController.deleteComment);

export default commentsRoutes;
