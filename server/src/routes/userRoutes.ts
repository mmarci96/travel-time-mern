import express from 'express';
import UserModel from '../model/UserModel';
import UserDetailsModel from '../model/UserDetailsModel';

const router = express.Router();
router.get('/', async (req, res, next) => {
    try {
        console.log(req.body);
        const users = await UserModel.find();
        res.status(200).send(users);
    } catch (err) {
        next(err);
    }
});

export default router;
