import { ImageModel } from '../model/Image';
import multer from 'multer';

// TODO: Its better to use absolute path for this include it in .env
const UPLOAD_PATH =
    '/home/meirl/Documents/travel-time-mern/server/img_uploads_temp';

export const getStorage = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, UPLOAD_PATH);
        },
        // Using date for uniuqeness
        filename: function (req, file, cb) {
            cb(
                null,
                `${file.fieldname}_dateVal_${Date.now()}_${file.originalname}`,
            );
        },
    });

    return multer({ storage: storage });
};
