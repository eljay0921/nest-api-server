import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
    
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/movies', () => {
    it('get all movies', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200);
    });

    it('add one movie', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test title',
          year: 2020,
          genres: ['action', 'drama', 'sports'],
        })
        .expect(201);
    });

    it('FAIL - add one movie', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test title',
          year: 2020,
          genres: ['action', 'drama', 'sports'],
          something: 'strange',
        })
        .expect(400);
    });

    it('remove one movie', () => {
      return request(app.getHttpServer())
        .delete('/movies/9999')
        .expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('get one movie', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200)
    });

    it('get 404 error', () => {
      return request(app.getHttpServer())
        .get('/movies/9999')
        .expect(404)
    });

    it('update one movie', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({
          title: 'test title2',
        })
        .expect(200)
    });

    it('remove one movie', () => {
      return request(app.getHttpServer())
        .delete('/movies/1')
        .expect(200)
    });
  });
});
