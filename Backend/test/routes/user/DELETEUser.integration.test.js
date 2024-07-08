import request from 'supertest';
import { app, server } from '../../../src';
import mongoose from 'mongoose';
import User from '../../../src/models/user/user.model'; // Ajusta la ruta según sea necesario

describe('User Routes - Delete User', () => {
  let user;

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
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await server.close();
  });

  test('DELETE /user/:userId should delete a user', async () => {
    const response = await request(app.callback()).delete(`/user/${user._id}`);

    console.log('Response:', response.body); // Registrar la respuesta
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.msg).toBe('User was successfully removed');

    const deletedUser = await User.findById(user._id);
    expect(deletedUser).toBeNull();
  });
});
