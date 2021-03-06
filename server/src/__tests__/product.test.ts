import supertest from 'supertest';
import '@types/jest';
import createServer from '../_utils/server';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { createProduct } from '../product/product.service';
import { signJwt } from '../_utils/jwt.utils';

/**
 * We are using an in memory server for the product tests
 * And mocking out the services for the user tests
 * This is just to show how both work
 */

const app = createServer();

/**
 * Payloads
 * should probably store these in a different file
 */
const userId = new mongoose.Types.ObjectId().toString();

const productPayload = {
  user: userId,
  title: 'Canon EOS 1500D DSLR Camera with 18-55mm Lens',
  description:
    'Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.',
  price: 879.99,
  image: 'https://i.imgur.com/QlRphfQ.jpg',
};

const userPayload = {
  _id: userId,
  email: 'jane.doe@example.com',
  name: 'Jane Doe',
};

/**
 * Tests
 */
// what is being tested 1
describe('product', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  // what is being tested 2
  describe('get product route', () => {
    // under what condition
    describe('given the product does not exist', () => {
      it('should return a 404', async () => {
        const productId = 'product-123';
        await supertest(app).get(`/api/products/${productId}`).expect(404);
      });
    });

    describe('given the product does exist', () => {
      it('should return a 200 status and the product', async () => {
        const product = await createProduct(productPayload);

        const { body, statusCode } = await supertest(app).get(
          `/api/products/${product.productId}`
        );

        expect(statusCode).toBe(200);
        expect(body.productId).toBe(product.productId);
      });
    });

    describe('create product route', () => {
      describe('given the user is not logged in', () => {
        it('should return a 403', async () => {
          // this only tests that the requireUser middleware is working
          const { statusCode } = await supertest(app).post('/api/products');
          expect(statusCode).toBe(403);
        });
      });
      describe('given the user is logged in', () => {
        it('should return a 200 and create the product', async () => {
          const jwt = signJwt(userPayload);
          const { statusCode, body } = await supertest(app)
            .post('/api/products')
            .set('Authorization', `Bearer ${jwt}`)
            .send(productPayload);

          expect(statusCode).toBe(200);

          expect(body).toEqual({
            __v: 0,
            _id: expect.any(String),
            createdAt: expect.any(String),
            description:
              'Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.',
            image: 'https://i.imgur.com/QlRphfQ.jpg',
            price: 879.99,
            productId: expect.any(String),
            title: 'Canon EOS 1500D DSLR Camera with 18-55mm Lens',
            updatedAt: expect.any(String),
            user: expect.any(String),
          });
        });
      });
    });
  });
});
