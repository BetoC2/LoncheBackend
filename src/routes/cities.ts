import { Router } from 'express';
import citiesController from '../controllers/citiesController';

const citiesRoutes = Router();

/**
 * @swagger
 * /cities:
 *   post:
 *     summary: Create a new city
 *     tags: [Cities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               region:
 *                 type: string
 *               country:
 *                 type: string
 *               language:
 *                 type: string
 *             required:
 *               - name
 *               - region
 *               - country
 *               - language
 *     responses:
 *       201:
 *         description: City created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
citiesRoutes.post('/', citiesController.create);

/**
 * @swagger
 * /cities:
 *   get:
 *     summary: Retrieve all cities
 *     tags: [Cities]
 *     responses:
 *       200:
 *         description: List of cities
 *       500:
 *         description: Internal server error
 */
citiesRoutes.get('/', citiesController.getCities);

/**
 * @swagger
 * /cities/{id}:
 *   get:
 *     summary: Retrieve a city by ID
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: City ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: City found
 *       404:
 *         description: City not found
 *       500:
 *         description: Internal server error
 */
citiesRoutes.get('/:id', citiesController.getCityByID);

/**
 *  @swagger
 *  /cities/{id}:
 *    put:
 *      summary: Update a city by ID
 *      tags: [Cities]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: City ID
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                region:
 *                  type: string
 *                country:
 *                  type: string
 *                language:
 *                  type: string
 *      responses:
 *        200:
 *          description: City updated successfully
 *        400:
 *          description: Validation error
 *        404:
 *          description: City not found
 *        500:
 *          description: Internal server error
 */
citiesRoutes.put('/:id', citiesController.updateCity);

/**
 * @swagger
 * /cities/{id}:
 *   delete:
 *     summary: Delete a city by ID
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: City ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: City deleted successfully
 *       404:
 *         description: City not found
 *       500:
 *         description: Internal server error
 */
citiesRoutes.delete('/:id', citiesController.deleteCity);

export default citiesRoutes;
