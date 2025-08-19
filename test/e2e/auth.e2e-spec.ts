import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/login (POST) - successful login', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@example.com', password: 'admin' })
      .expect(200)
      .expect(res => {
        expect(res.body).toHaveProperty('accessToken');
        expect(res.body).toHaveProperty('refreshToken');
      });
  });

  it('/auth/login (POST) - unauthorized login', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@example.com', password: 'wrongpassword' })
      .expect(401);
  });
});
