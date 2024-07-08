import request from 'supertest';
import { app, server } from '../../../src';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../../src/models/user/user.model'; // Ajusta la ruta según sea necesario

describe('Auth Routes - Logout', () => {
  let accessToken;

  beforeAll(async () => {
    const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/test';
    await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  beforeEach(async () => {
    // Limpia la colección de usuarios antes de cada prueba
    await User.deleteMany({});
    // Crear un usuario de prueba y un token de acceso
    const hashedPassword = await bcrypt.hash('testPassword', 10);
    const user = new User({
      username: 'testUser',
      email: 'test@example.com',
      password: hashedPassword
    });
    await user.save();

    // Crear un token de acceso válido
    accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await server.close();
  });

  test('POST /auth/logout should logout a user', async () => {
    const response = await request(app.callback())
      .post('/auth/logout')
      .send({
        token: accessToken
      });

    expect(response.status).toBe(204);
  });
});
