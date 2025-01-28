import express, { NextFunction, Request, Response } from 'express';
import { createUser } from '../services/userService';
import {
    createRefreshToken,
    createToken,
    refreshToken,
    validateRefreshToken,
} from '../services/authService';
import { UserModel } from '../model/UserModel';

const router = express.Router();

router.post(
    '/signup',
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { username, email, password } = req.body;
            const user = await createUser(username, email, password);
            console.log(user);
            return res.status(201).send(user);
        } catch (err) {
            next(err);
        }
    },
);

router.post(
    '/login2',
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

router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { email, password } = req.body;

      // Authenticate and generate tokens
      const token = await createToken(email, password);
      const refresh_token = await createRefreshToken(email, password);

      // Fetch user and check user details
      const user = await UserModel.findOne({ email }).populate('user_details');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const hasUserDetails = !!user.user_details;

      // Return tokens along with the `hasUserDetails` flag
      const response = {
        token,
        refresh_token,
        hasUserDetails, // Add this to inform the frontend
      };

      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
);


router.get(
    '/refresh_token',
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const authHeader = req.headers.authorization;
            const refreshTokenValue: string =
                (authHeader && authHeader.split(' ')[1]) || '';
            const userId = validateRefreshToken(refreshTokenValue);

            const token = await refreshToken(userId);
            return res.status(200).send({ token: token });
        } catch (err) {
            next(err);
        }
    },
);

export default router;
