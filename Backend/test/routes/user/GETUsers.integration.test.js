import request from 'supertest';
import { app, server } from '../../../src';
import mongoose from 'mongoose';
import User from '../../../src/models/user/user.model'; // Ajusta la ruta según sea necesario

describe('User Routes - Get Users', () => {
  beforeAll(async () => {
    const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/test';
    await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  beforeEach(async () => {
    // Limpia la colección de usuarios antes de cada prueba
    await User.deleteMany({});

    // Crear algunos usuarios de prueba
    const users = [
      { username: 'user1', email: 'user1@example.com', password: 'password1', phone: '1111111111' },
      { username: 'user2', email: 'user2@example.com', password: 'password2', phone: '2222222222' },
    ];

    await User.insertMany(users);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await server.close();
  });

  test('GET /users should return a list of users', async () => {
    const response = await request(app.callback()).get('/users');

    console.log('Response:', response.body); // Registrar la respuesta
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(Array.isArray(response.body.users)).toBe(true);
    expect(response.body.users.length).toBe(2);
    expect(response.body.users[0]).toHaveProperty('username', 'user1');
    expect(response.body.users[1]).toHaveProperty('username', 'user2');
  });
});
