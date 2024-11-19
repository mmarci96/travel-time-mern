import express from 'express';
import User from '../model/User';
import UserDetails from '../model/UserDetails';

const router = express.Router();
router.get('/', async (req, res, next) => {
    try {
        console.log(req.body);
        const users = await User.find();
        res.status(200).send(users);
    } catch (err) {
        next(err);
    }
});

export default router;
