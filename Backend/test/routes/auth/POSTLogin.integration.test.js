import request from 'supertest';
import { app, server } from '../../../src';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../../../src/models/user/user.model'; 

describe('Auth Routes - Login', () => {
  beforeAll(async () => {
    const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/test';
    await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  beforeEach(async () => {
    // Limpia la colección de usuarios antes de cada prueba
    await User.deleteMany({});
    // Crear un usuario de prueba
    const hashedPassword = await bcrypt.hash('testPassword', 10);
    const user = new User({
      username: 'testUser',
      email: 'test@example.com',
      password: hashedPassword
    });
    await user.save();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await server.close();
  });

  test('POST /auth/login should login a user', async () => {
    const response = await request(app.callback())
      .post('/auth/login')
      .send({
        identifier: 'testUser',
        password: 'testPassword'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
  });
});
