import { Router } from 'express';
import usersController from '../controllers/usersController';

const usersRoutes = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_city:
 *                type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               lastname:
 *                 type: string
 *               birthdate:
 *                 type: string
 *                 format: date
 *             required:
 *               - id_city
 *               - username
 *               - email
 *               - password
 *               - name
 *               - lastname
 *               - birthdate
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
usersRoutes.post('/', usersController.createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Internal server error
 */
usersRoutes.get('/', usersController.getAll);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
usersRoutes.get('/:id', usersController.getUserByID);

/**
 *  @swagger
 *  /users/{id}:
 *    put:
 *      summary: Update a user by ID
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: User ID
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                email:
 *                  type: string
 *                name:
 *                  type: string
 *                lastname:
 *                  type: string
 *                birthdate:
 *                  type: string
 *                  format: date
 *      responses:
 *        200:
 *          description: User updated successfully
 *        400:
 *          description: Validation error
 *        404:
 *          description: User not found
 *        500:
 *          description: Internal server error
 */
usersRoutes.put('/:id', usersController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
usersRoutes.delete('/:id', usersController.deleteUser);

export default usersRoutes;
