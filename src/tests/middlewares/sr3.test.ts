import request from 'supertest';
import app from '../../index';
import HTTP_STATUS_CODES from '../../types/http-status-codes';
import fs from 'fs';
import path from 'path';

describe('POST /posts', () => {
    it('should return 200 when a file is uploaded successfully', async () => {
        const loginResponse = await request(app)
            .post('/login')
            .send({
                email: 'beto@correo2.com',
                password: 'salsa159',
            });

        const token = loginResponse.body.token;

        const filePath = path.join(__dirname, '..', '..', 'tests', 'middlewares', 'mozo.jpeg');
        console.log(filePath);  // Imprimir la ruta del archivo

        const fileBuffer = fs.readFileSync(filePath);

        // Enviar las categorías como un arreglo sin JSON.stringify
        const response = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .field('category', 'cultura')  // Enviar el arreglo directamente
            .attach('file', fileBuffer, 'mozo.jpeg');  // Adjuntar el archivo

        console.log(response.body);  // Imprimir la respuesta para depuración

        expect(response.status).toBe(HTTP_STATUS_CODES.OK);
        expect(response.body).toHaveProperty('message', 'File uploaded successfully');
    });

    it('should return 400 when no file is uploaded', async () => {
        const loginResponse = await request(app)
            .post('/login')
            .send({
                email: 'beto@correo2.com',
                password: 'salsa159',
            });

        const token = loginResponse.body.token;

        // Aquí también enviamos el campo 'categories' aunque no se suba archivo
        const response = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .field('category', 'cultura');  // Enviar el arreglo directamente

        console.log(response.body);  // Imprimir la respuesta para depuración

        expect(response.status).toBe(HTTP_STATUS_CODES.BAD_REQUEST);
        expect(response.body).toHaveProperty('message', 'No file uploaded');
    });
});