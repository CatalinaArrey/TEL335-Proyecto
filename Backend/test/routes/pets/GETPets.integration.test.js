const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../../../src/models/user/user.model');
const Pet = require('../../../src/models/pets/pet.model');
const jwt = require('jsonwebtoken');
const { app, server } = require('../../../src');

describe('Pets Routes - Get Pets by User', () => {
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

    // Crear algunas mascotas de prueba
    const pets = [
      { name: 'Buddy', species: 'Dog', breed: 'Golden Retriever', birthday: '2021-01-01', owner: user._id },
      { name: 'Mittens', species: 'Cat', breed: 'Siamese', birthday: '2020-05-15', owner: user._id }
    ];

    await Pet.insertMany(pets);

    // Crear un token de acceso válido
    accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close(); // Cierra el servidor después de todas las pruebas
  });

  test('GET /pets should return a list of pets by user', async () => {
    console.log('AccessToken:', accessToken); // Añadir registro del token de acceso

    const response = await request(app.callback())
      .get('/pets')
      .set('Authorization', `Bearer ${accessToken}`);

    console.log('Response:', response.status, response.body); // Registrar el estado y el cuerpo de la respuesta
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(Array.isArray(response.body.pets)).toBe(true);
    expect(response.body.pets.length).toBe(2);
    expect(response.body.pets[0]).toHaveProperty('name', 'Buddy');
    expect(response.body.pets[1]).toHaveProperty('name', 'Mittens');
  });
});
