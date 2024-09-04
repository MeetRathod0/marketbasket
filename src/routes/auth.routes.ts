import { Router } from 'express';
import { AuthController } from '../controllers/auth.controllers';
export const authRoutes = Router();

authRoutes.post('/auth/login', AuthController.login);
authRoutes.post('/auth/makepass', AuthController.makepass);
authRoutes.post('/auth/verifyEmail', AuthController.verifyEmail);
authRoutes.post('/auth/verifyOTP', AuthController.verifyOTP);
