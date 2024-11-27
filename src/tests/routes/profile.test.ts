import request from 'supertest'; // Paquete para hacer solicitudes HTTP en pruebas
import app from '../../index';
import HTTP_STATUS_CODES from '../../types/http-status-codes';

describe('POST /profile', () => {
  it(`should return ${HTTP_STATUS_CODES.OK} if the token is valid`, async () => {
    const response = await request(app).post('/login').send({
      email: 'beto@correo2.com',
      password: 'salsa159',
    });

    const token = response.body.token;

    const profileResponse = await request(app)
      .get('/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(profileResponse.status).toBe(HTTP_STATUS_CODES.OK);
    expect(profileResponse.body).toHaveProperty('id_city');
    expect(profileResponse.body).toHaveProperty('username');
    expect(profileResponse.body).toHaveProperty('email');
    expect(profileResponse.body).not.toHaveProperty('password');
  });

  it(`should return ${HTTP_STATUS_CODES.FORBIDDEN} if the token is invalid`, async () => {
    const profileResponse = await request(app)
      .get('/profile')
      .set('Authorization', `Bearer invalidtoken`);

    expect(profileResponse.status).toBe(HTTP_STATUS_CODES.UNAUTHORIZED);
  });
});
