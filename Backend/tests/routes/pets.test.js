const { register, getPetsByUser } = require('../../src/routes/pets/pets'); // Ajusta la ruta al archivo correcto
const petActions = require('../../src/actions/pets/pets');

jest.mock('../../src/actions/pets/pets');

describe('Pets Routes Tests', () => {
    let ctx;
  
    beforeEach(() => {
      ctx = {
        request: {
          body: {}
        },
        params: {},
        body: null,
        status: null
      };
    });
  
    test('should register a new pet', async () => {
      const petData = {
        name: 'Buddy',
        species: 'Dog',
        breed: 'Golden Retriever',
        birthday: '2020-01-01'
      };
      ctx.request.body = petData;
  
      petActions.createPet.mockReturnValue({ id: 1, ...petData, ownerId: 1 });
  
      await register(ctx);
  
      expect(ctx.status).toBe(200);
      expect(ctx.body).toEqual({
        status: 'OK',
        pet: { id: 1, ...petData, ownerId: 1 }
      });
    });
  
    test('should return error if pet data is invalid', async () => {
      const petData = {
        name: '',
        species: 'Dog',
        breed: 'Golden Retriever',
        birthday: '2020-01-01'
      };
      ctx.request.body = petData;
  
      await register(ctx);
  
      expect(ctx.status).toBe(400);
      expect(ctx.body).toEqual({
        status: 'NOK',
        error_msg: 'Invalid name'
      });
    });
  
    test('should return pets by user', async () => {
      const userId = 1;
      ctx.params.userId = userId;
  
      const pets = [
        { id: 1, name: 'Buddy', species: 'Dog', breed: 'Golden Retriever', birthday: '2020-01-01', ownerId: userId },
        { id: 2, name: 'Mittens', species: 'Cat', breed: 'Tabby', birthday: '2019-06-15', ownerId: userId }
      ];
  
      petActions.listPetsByUser.mockReturnValue(pets);
  
      await getPetsByUser(ctx);
  
      expect(ctx.status).toBe(200);
      expect(ctx.body).toEqual({
        status: 'OK',
        pets
      });
    });
  
    test('should return error if an exception is thrown in getPetsByUser', async () => {
      const userId = 1;
      ctx.params.userId = userId;
  
      petActions.listPetsByUser.mockImplementation(() => {
        throw new Error('Test error');
      });
  
      await getPetsByUser(ctx);
  
      expect(ctx.status).toBe(500);
      expect(ctx.body).toEqual({
        status: 'NOK',
        error_msg: 'INTERNAL SERVER ERROR'
      });
    });
  });