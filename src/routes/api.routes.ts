import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { salesRoutes } from './sales.routes';

const apiV1Routes = Router();
const routeName = '/api/v1';

apiV1Routes.use(routeName, authRoutes);
apiV1Routes.use(routeName, salesRoutes);

export { apiV1Routes };
