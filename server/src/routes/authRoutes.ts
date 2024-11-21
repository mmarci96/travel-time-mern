import express, { Request, Response, NextFunction } from 'express';
import { createUser } from '../services/userService';
import { createToken, createRefreshToken } from '../services/authService';
import { toUserDTO } from '../dto/user.dto';

const router = express.Router();

router.post(
    '/signup',
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                return res
                    .status(400)
                    .json({ error: 'All fields are required' });
            }

            const newUser = await createUser(username, email, password);
            // const userDTO = toUserDTO(newUser); // Use the DTO to sanitize the response
            const response = {
                username: newUser.username,
                email: newUser.email,
            };

            return res.status(201).send(response);
        } catch (err: any) {
            if (
                err.message === 'Username is already taken' ||
                err.message === 'Email is already registered'
            ) {
                return res.status(409).json({ error: err.message });
            }
            next(err);
        }
    },
);

router.post(
    '/login',
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res
                    .status(400)
                    .json({ error: 'All fields are required' });
            }
            const newToken = await createToken(email, password);
            const refreshToken = await createRefreshToken(email, password);
            console.log(newToken, refreshToken);
            const response = { token: newToken, refreshToken: refreshToken };
            return res.status(200).send(response);
        } catch (err: any) {
            if (
                err.message === 'No user with email' ||
                err.message === 'Wrong password!'
            ) {
                return res.status(409).json({ error: err.message });
            }
            next(err);
        }
    },
);

export default router;
