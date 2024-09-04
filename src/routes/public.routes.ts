import { Router } from 'express';
import { ViewController } from '../controllers/views.controller';
import { verifyToken } from '../middlewares/auth.middlewares';
export const viewRoutes = Router();

viewRoutes.get('/admin', verifyToken, ViewController.index);
viewRoutes.get('/login', ViewController.login);
viewRoutes.get('/verify', ViewController.otp);
