// upload.js
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

const storage = new GridFsStorage({
  url: process.env.DB, // Use environment variable for DB URL
  file: (req, file) => {
    return {
      bucketName: 'photos',
      filename: `${Date.now()}-blog-${file.originalname}`
    };
  }
});

const upload = multer({ storage });

export default upload;
