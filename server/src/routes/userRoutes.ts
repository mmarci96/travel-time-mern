import express, { NextFunction, Response } from 'express';
import { AuthRequest } from '../types/AuthRequest';
import {
  createUserDetails,
  getUserDetailsById,
  getUserInfoList,
  getUsers,
  updateUser,
} from '../services/userService';
import { authenticateToken } from '../middleware/authenticateToken';
import { Date, Schema, Types } from 'mongoose';
import { PostCreateDTO } from '../dto/post.dto';
import { createPost } from '../services/postService';
import { UserDetailsDTO, UserDetailsNewDTO, UserDetailsRequestDTO } from '../dto/user.dto';

const router = express.Router();
router.get(
  '/',
  authenticateToken,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const users = await getUsers();
      res.status(200).send({ users: users });
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  '/my-id',
  authenticateToken,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId as Types.ObjectId;
      res.status(200).send({ userId: userId });
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  '/discover',
  authenticateToken,
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    try {
      const { limit, page } = req.query;
      const users = await getUserInfoList(limit, page);

      res.status(200).send({ users: users });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/:userId',
  authenticateToken,
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    try {
      const { userId } = req.params;
      const user = await getUserDetailsById(new Types.ObjectId(userId));
      return res.status(200).send({ user: user });
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:userId',
  authenticateToken,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;

      const {
        first_name,
        last_name,
        birthdate,
        location,
        gender,
      } = req.body;
      const update = {
        first_name,
        last_name,
        birthdate,
        location,
        gender,
      };
      const updatedUser = await updateUser(
        new Types.ObjectId(userId),
        update,
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  });

router.post(
  '/userdetails',
  authenticateToken,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId as Types.ObjectId;
      const { first_name, last_name, birthdate, location, gender } = req.body;


      const userDetailed: UserDetailsNewDTO = {
        first_name,
        last_name,
        birthdate,
        location,
        gender,
      };

      const newUserDetailed = await createUserDetails(userDetailed, userId);

      res.status(201).json(newUserDetailed);
    } catch (error) {
      next(error);
    }
  }
);



export default router;
