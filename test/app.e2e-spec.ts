import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { bootstrap } from '../src/main';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  afterEach(async () => {
    await app.close();
  });

  describe('GET /resources/:id 501', () => {
    beforeEach(async () => {
      process.env.FEATURE_FLAG_ENABLE_FIND_BY_ID = 'true';
      app = await bootstrap();
      await app.init();
    });

    it('should return 501 when enableFindById feature flag is true', () => {
      return request(app.getHttpServer()).get('/resources/test').expect(501);
    });
  });

  describe('GET /resources/:id 501', () => {
    beforeEach(async () => {
      process.env.FEATURE_FLAG_ENABLE_FIND_BY_ID = 'false';
      app = await bootstrap();
      await app.init();
    });

    it('should return 404 when enableFindById feature flag is false', () => {
      return request(app.getHttpServer()).get('/resources/test').expect(404);
    });
  });
});
