import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';

const router = express.Router();
// TODO: Its better to use absolute path for this include it in .env
const UPLOAD_PATH = '/home/meirl/Documents/travel-time-mern/server/img_uploads_temp';

// In case its needed I found this aricle to follow:
//https://omarshishani.com/how-to-upload-images-to-server-with-react-and-express/
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, UPLOAD_PATH) 
  },
  // Using date for uniuqeness
  filename: function(req, file, cb) {
    cb(null, `${file.fieldname}_dateVal_${Date.now()}_${file.originalname}`)
  }
})

const imageUpload = multer({storage: storage})

// I guess the argument we send in will handle the upload?
router.post('/img', imageUpload.array("image-file"), async (req, res, next) => {
    try{
        console.log('img post request recieved!');
        console.log('Axios POST body: ', req.body);
        res.send({'status':'uploaded'});
    }catch(err){
        next(err)
    }
});

export default router;
