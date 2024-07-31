import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

const storage = new GridFsStorage({
  url: process.env.MONGODB_URL, // Ensure this is correctly set
  file: (req, file) => {
    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`
    };
  }
});

const upload = multer({ storage });

export default upload; // Ensure this line is present
