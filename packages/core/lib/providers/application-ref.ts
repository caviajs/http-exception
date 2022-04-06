import { ClassProvider } from '../types/provider';
import { Token } from '../types/token';

export const APPLICATION_REF: Token<ApplicationRef> = Symbol('APPLICATION_REF');

export function createApplicationRefProvider(application: any): ClassProvider<ApplicationRef> {
  return {
    provide: APPLICATION_REF,
    useClass: application,
  };
}

export type ApplicationRef = any;
