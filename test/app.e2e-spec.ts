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

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/movies', () => {
    it('get all movies', done => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .end(() => done());
    });

    it('add one movie', done => {
      request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test title',
          year: 2020,
          genres: ['action', 'drama', 'sports'],
        })
        .expect(201)
        .end(() => done());
    });

    it('FAIL - add one movie', done => {
      request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test title',
          year: 2020,
          genres: ['action', 'drama', 'sports'],
          what: 'the fxxx',
        })
        .expect(400)
        .end(() => done());
    });

    it('remove one movie', done => {
      request(app.getHttpServer())
        .delete('/movies/9999')
        .expect(404)
        .end(() => done());
    });
  });

  describe('/movies/:id', () => {
    it('get one movie', done => {
      request(app.getHttpServer())
        .get('/movies/1')
        .expect(200)
        .end(() => done());
    });

    it('get 404 error', done => {
      request(app.getHttpServer())
        .get('/movies/9999')
        .expect(404)
        .end(() => done());
    });

    it('update one movie', done => {
      request(app.getHttpServer())
        .patch('/movies/1')
        .send({
          title: 'test title2',
        })
        .expect(200)
        .end(() => done());
    });

    it('remove one movie', done => {
      request(app.getHttpServer())
        .delete('/movies/1')
        .expect(200)
        .end(() => done());
    });
  });
});
