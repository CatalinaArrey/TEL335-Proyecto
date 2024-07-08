import request from 'supertest';
import { app, server } from '../../../src';
import mongoose from 'mongoose';
import User from '../../../src/models/user/user.model'; // Ajusta la ruta según sea necesario

describe('User Routes - Register', () => {
  beforeAll(async () => {
    const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/test';
    await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  beforeEach(async () => {
    // Limpia la colección de usuarios antes de cada prueba
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await server.close();
  });

  test('POST /user should register a user', async () => {
    const response = await request(app.callback())
      .post('/user')
      .send({
        username: 'testUser',
        email: 'test@example.com',
        password: 'testPassword',
        phone: '1234567890'
      });

    console.log('Response:', response.body); // Registrar la respuesta
    expect(response.status).toBe(201);
    expect(response.body.status).toBe('OK');
  });
});
