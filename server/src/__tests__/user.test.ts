import mongoose from 'mongoose';
import '@types/jest';
import supertest from 'supertest';
import createServer from '../_utils/server';
import * as UserService from '../user/user.service';
import * as SessionService from '../session/session.service';
import { createUserSessionHandler } from '../session/session.controller';

const app = createServer();

/**
 * We are mocking out the services for the user tests
 * And creating an in memory server for the product tests
 * This is just to show how both work
 */

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  _userId: userId,
  email: 'test@example.com',
  name: 'Jane Doe',
};
const userInput = {
  email: 'test@example.com',
  name: 'Jane Doe',
  password: 'Password123',
  passwordConfirmation: 'Password123',
};
const sessionPayload = {
  _id: new mongoose.Types.ObjectId().toString(),
  user: userId,
  valid: true,
  userAgent: "PostmanRuntime/7.28.4",
  createdAt: new Date("2021-09-20T13:31:07.674Z"),
  ipdatedAt: new Date("2021-09-20T13:31:07.674Z"),
}

describe('user', () => {
  describe('user registration', () => {
    describe('given the username and password are valid', () => {
      it('should return the user payload', async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, 'createUser')
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode, body } = await supertest(app)
          .post('/api/users')
          .send(userInput);

        expect(statusCode).toBe(200);
        expect(body).toStrictEqual(userPayload);
        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });

    describe('given the passwords do not match', () => {
      it('should return a 400 error', async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, 'createUser')
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode } = await supertest(app)
          .post('/api/users')
          .send({ ...userInput, passwordConfirmation: 'doesNotMatch' });

        expect(statusCode).toBe(400);
        expect(createUserServiceMock).not.toHaveBeenCalled();
      });
    });

    describe('given the user service throws', () => {
      it('should return a 409 error', async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, 'createUser')
          .mockRejectedValue('oh no :(');

        const { statusCode } = await supertest(app)
          .post('/api/users')
          .send(userInput);

        expect(statusCode).toBe(409);
        expect(createUserServiceMock).toHaveBeenCalled();
      });
    });
  });

  describe('create user session', () => {
    describe('given the username and passwrod are valid', () => {
      it('should return a signed accessToken & refreshToken', async () => {
        jest
          .spyOn(UserService, 'validatePassword')
          // @ts-ignore
          .mockReturnValue(userPayload);
        jest
          .spyOn(SessionService, 'createSession')
          // @ts-ignore
          .mockReturnValue(sessionPayload);

        const req = {
          get: () => {
            return 'a user agent';
          },
          body: {
            email: "test@example.com",
            password: "Password123",
          }
        }

         const send = jest.fn()

         const res = {
           send
         }

         // @ts-ignore
         await createUserSessionHandler(req, res)
         expect(send).toHaveBeenCalledWith({accessToken: expect.any(String), refreshToken: expect.any(String)})
      });
    });
  });
});
