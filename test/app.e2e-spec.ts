import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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

    it('remove one movie', done => {
      request(app.getHttpServer())
        .delete('/movies/9999')
        .expect(404)
        .end(() => done());
    });
  });
});
