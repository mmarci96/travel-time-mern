import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.post('/img', async (req,res,next) => {
    console.log('img post request recieved!')
})

export default router