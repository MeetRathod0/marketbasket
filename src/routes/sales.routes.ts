import { Router } from 'express';
import { assocRulesController } from '../controllers/sales.controller';
import { verifyToken } from '../middlewares/auth.middlewares';
export const salesRoutes = Router();

salesRoutes.post('/sales', verifyToken, assocRulesController);
