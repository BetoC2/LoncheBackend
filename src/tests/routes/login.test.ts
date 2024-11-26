import request from 'supertest';
import app from '../../index'; // Asegúrate de importar correctamente la app
import HTTP_STATUS_CODES from '../../types/http-status-codes';

describe('POST /login', () => {
  it('should return 200 and a token if credentials are valid', async () => {
    const response = await request(app)
    // const response = await request('http://localhost:1234')
      .post('/login')  // Asegúrate de que esta sea la ruta correcta de login
      .send({
        email: 'beto@correo2.com',
        password: 'salsa159', // Sustituye con credenciales válidas de tu base de datos
      });

    expect(response.status).toBe(HTTP_STATUS_CODES.OK);  // Esperamos un 200 OK
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
  });

// it('should return 401 if credentials are invalid', async () => {
//     const response = await request(app)
//     .post('/login')  // Asegúrate de que esta sea la ruta correcta de login
//     .send({
//         username: 'beto@correo2.com',
//         password: 'incorrectpassword',  // Contraseña incorrecta
//     });

//     expect(response.status).toBe(HTTP_STATUS_CODES.UNAUTHORIZED);  // Esperamos un 401 Unauthorized
//     expect(response.body).toHaveProperty('message', 'Invalid credentials');  // Mensaje de error
// });
});
