import http from 'http';
import supertest from 'supertest';
import { exhaustMap, map, mergeAll, of } from 'rxjs';
import { HttpRouter } from '../src';

const EXAMPLE_FALSE: boolean = false;

it('should correctly serialize false returned by interceptor', async () => {
  // sync
  {
    const httpRouter: HttpRouter = new HttpRouter();

    httpRouter
      .intercept((request, response, next) => {
        return next.handle().pipe(map(() => EXAMPLE_FALSE));
      })
      .route({ handler: () => undefined, method: 'GET', path: '/' });

    const httpServer: http.Server = http.createServer((request, response) => {
      httpRouter.handle(request, response);
    });

    const raw: string = JSON.stringify(EXAMPLE_FALSE);

    const response = await supertest(httpServer)
      .get('/');

    expect(response.body).toEqual(EXAMPLE_FALSE);
    expect(response.headers['content-length']).toBe(Buffer.byteLength(raw).toString());
    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
  }

  // async
  {
    const httpRouter: HttpRouter = new HttpRouter();

    httpRouter
      .intercept((request, response, next) => {
        return next.handle().pipe(exhaustMap(() => Promise.resolve(EXAMPLE_FALSE)));
      })
      .route({ handler: () => undefined, method: 'GET', path: '/' });

    const httpServer: http.Server = http.createServer((request, response) => {
      httpRouter.handle(request, response);
    });

    const raw: string = JSON.stringify(EXAMPLE_FALSE);

    const response = await supertest(httpServer)
      .get('/');

    expect(response.body).toEqual(EXAMPLE_FALSE);
    expect(response.headers['content-length']).toBe(Buffer.byteLength(raw).toString());
    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
  }

  // sync + observable
  {
    const httpRouter: HttpRouter = new HttpRouter();

    httpRouter
      .intercept((request, response, next) => {
        return next.handle().pipe(exhaustMap(() => of(EXAMPLE_FALSE)));
      })
      .route({ handler: () => undefined, method: 'GET', path: '/' });

    const httpServer: http.Server = http.createServer((request, response) => {
      httpRouter.handle(request, response);
    });

    const raw: string = JSON.stringify(EXAMPLE_FALSE);

    const response = await supertest(httpServer)
      .get('/');

    expect(response.body).toEqual(EXAMPLE_FALSE);
    expect(response.headers['content-length']).toBe(Buffer.byteLength(raw).toString());
    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
  }

  // async + observable
  {
    const httpRouter: HttpRouter = new HttpRouter();

    httpRouter
      .intercept((request, response, next) => {
        return next.handle().pipe(exhaustMap(() => Promise.resolve(of(EXAMPLE_FALSE))), mergeAll());
      })
      .route({ handler: () => undefined, method: 'GET', path: '/' });

    const httpServer: http.Server = http.createServer((request, response) => {
      httpRouter.handle(request, response);
    });

    const raw: string = JSON.stringify(EXAMPLE_FALSE);

    const response = await supertest(httpServer)
      .get('/');

    expect(response.body).toEqual(EXAMPLE_FALSE);
    expect(response.headers['content-length']).toBe(Buffer.byteLength(raw).toString());
    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
  }
});

it('should correctly overwrite headers after false serialization, if specified in the interceptor', async () => {
  const httpRouter: HttpRouter = new HttpRouter();

  httpRouter
    .intercept((request, response, next) => {
      return next.handle().pipe(map(() => {
        response
          .setHeader('content-length', '4')
          .setHeader('content-type', 'guinea/pig');

        return EXAMPLE_FALSE;
      }));
    })
    .route({ handler: () => undefined, method: 'GET', path: '/' });

  const httpServer: http.Server = http.createServer((request, response) => {
    httpRouter.handle(request, response);
  });

  const response = await supertest(httpServer)
    .get('/');

  expect(response.headers['content-length']).toBe('4');
  expect(response.headers['content-type']).toBe('guinea/pig');
});
