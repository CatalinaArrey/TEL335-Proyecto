import request from 'supertest';
import mongoose from 'mongoose';
import User from '../../../src/models/user/user.model';
import Pet from '../../../src/models/pets/pet.model';
import jwt from 'jsonwebtoken';
import { app, server } from '../../../src';

describe('Pets Routes - Register Pet', () => {
  let user, accessToken;

  beforeAll(async () => {
    const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/test';
    await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  beforeEach(async () => {
    // Limpia la colección de usuarios y mascotas antes de cada prueba
    await User.deleteMany({});
    await Pet.deleteMany({});

    // Crear un usuario de prueba
    user = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword',
      phone: '1234567890'
    });

    await user.save();

    // Crear un token de acceso válido
    accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close(); // Cierra el servidor después de todas las pruebas
  });

  test('POST /pet should register a pet', async () => {
    const response = await request(app.callback())
      .post('/pet')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Buddy',
        species: 'Dog',
        breed: 'Golden Retriever',
        birthday: '2021-01-01'
      });

    console.log('Response:', response.body); // Registrar la respuesta
    expect(response.status).toBe(201);
    expect(response.body.status).toBe('OK');
    expect(response.body.pet).toHaveProperty('name', 'Buddy');
    expect(response.body.pet).toHaveProperty('species', 'Dog');
  });
});
