import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();
// TODO: Its better to use absolute path for this include it in .env
const imageUploadPath = '/home/meirl/Documents/travel-time-mern/server/img_uploads_temp';

router.post('/img', async (req, res, next) => {
    console.log('img post request recieved!');
});

export default router;
