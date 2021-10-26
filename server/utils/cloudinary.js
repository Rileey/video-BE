
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: "rileey",
    api_key: "431624876469397",
    api_secret: "BBFIkjpVApNzLR4npaKd2wEeezI"
})


export default cloudinary;