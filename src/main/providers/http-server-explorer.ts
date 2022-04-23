import { HttpServerRegistry } from './http-server-registry';
import { Injectable } from '../decorators/injectable';
import { OnApplicationBoot } from '../types/hooks';
import { Injector } from '../injector';
import { Route } from '../types/route';

@Injectable()
export class HttpServerExplorer implements OnApplicationBoot {
  constructor(
    protected readonly httpRouter: HttpServerRegistry,
    protected readonly injector: Injector,
  ) {
  }

  public async onApplicationBoot(): Promise<void> {
    const routes: Route[] = await this
      .injector
      .filter(provider => typeof provider === 'function' && provider.prototype instanceof Route);

    routes
      .map((route: Route) => {
        this.httpRouter.push(route);
      });
  }
}