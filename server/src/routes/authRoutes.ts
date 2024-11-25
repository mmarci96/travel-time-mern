import express, { NextFunction, Request, Response } from 'express';
import { createUser } from '../services/userService';
import {
    createRefreshToken,
    createToken,
    refreshToken,
} from '../services/authService';
import { AuthRequest } from '../types/AuthRequest';
import { Types } from 'mongoose';

const router = express.Router();

router.post(
  '/signup',
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      try {
          const { username, email, password } = req.body;
          const user = await createUser(username, email, password);

          return res.status(201).send(user);
      } catch (err) {
          next(err);
      }
  },
);

router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      try {
          const { email, password } = req.body;

          const token = await createToken(email, password);
          const refresh_token = await createRefreshToken(email, password);

          const response = { token, refresh_token };
          return res.status(200).send(response);
      } catch (err) {
          next(err);
      }
  },
);

router.get(
  '/refresh_token',
  async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
      try {
          const userId = req.userId as Types.ObjectId;

          const token = await refreshToken(userId)
          return res.status(200).send(token);
      } catch (err) {
          next(err);
      }
  },
);

export default router;
