import express, { Request, Response, NextFunction } from 'express';
import { createUser } from '../services/userService';
import { createToken } from '../services/authService';
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
            const userDTO = toUserDTO(newUser); // Use the DTO to sanitize the response

            return res.status(201).json(userDTO);
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
            console.log(newToken);
            return res.status(200).json(newToken);
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
