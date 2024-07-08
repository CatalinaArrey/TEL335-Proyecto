import request from 'supertest';
import { app, server } from '../../../src';
import mongoose from 'mongoose';
import User from '../../../src/models/user/user.model'; // Ajusta la ruta según sea necesario
import jwt from 'jsonwebtoken';

describe('User Routes - Get User by ID', () => {
  let user, accessToken;

  beforeAll(async () => {
    const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/test';
    await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  beforeEach(async () => {
    // Limpia la colección de usuarios antes de cada prueba
    await User.deleteMany({});

    // Crear un usuario de prueba
    user = new User({
      username: 'testUser',
      email: 'test@example.com',
      password: 'testPassword',
      phone: '1234567890'
    });

    await user.save();

    // Crear un token de acceso válido
    accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await server.close();
  });

  test('GET /user should return a user by ID', async () => {
    const response = await request(app.callback())
      .get('/user')
      .set('Authorization', `Bearer ${accessToken}`);

    console.log('Response:', response.body); // Registrar la respuesta
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.user).toHaveProperty('username', 'testuser'); // Cambiar a minúsculas
    expect(response.body.user).toHaveProperty('email', 'test@example.com');
  });
});
