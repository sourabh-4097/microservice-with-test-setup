import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from '../src/app';
import request from "supertest";

let mongoServer;


beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

global.signin = async () => {
  const email = 'test@test.com'
  const password = 'password'
  const name = 'testy'

  const response = await request(app)
    .post('/users')
    .send({
      email,
      password,
      name
    })
    .expect(201)

  const cookie = response.get('Set-Cookie')

  return cookie
}