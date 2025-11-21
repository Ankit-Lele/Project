import { appConfig } from './app.config';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const serverConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    // ...existing server providers...
  ]
};

export const config = {
  providers: [
    ...(appConfig?.providers || []),
    ...(serverConfig?.providers || [])
  ]
};
