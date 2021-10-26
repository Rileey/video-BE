import multer from 'multer';
import path from 'path';



const videoStorage =  multer.diskStorage({ 
    destination: 'videos',
    filename: (req, file, cb) => {
        cb (null, file.fieldname + '_' + Date.now()
        + path.extname(file.originalname))
    }
});

const videoUpload = multer({
    storage: videoStorage,
    limits: {
        fileSize: 10000000 // 10 MB
    },
    fileFilter: (req, file, cb) => {
        // let ext = path.extname(file.originalname);
        if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
            return cb(new Error("File type is not supported"));
        }
        cb(undefined, true);
    }
})

export default videoUpload;
