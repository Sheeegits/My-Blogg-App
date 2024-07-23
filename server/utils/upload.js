import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

const storage = new GridFsStorage({
  url: 'mongodb://user:sheetalsingh@ac-jj2umct-shard-00-00.ry84bji.mongodb.net:27017,ac-jj2umct-shard-00-01.ry84bji.mongodb.net:27017,ac-jj2umct-shard-00-02.ry84bji.mongodb.net:27017/?ssl=true&replicaSet=atlas-px7rer-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0',
  file: (req, file) => {
    return {
      bucketName: "photos", // Specify your bucket name
      filename: `${Date.now()}-blog-${file.originalname}`
    };
  }
});

const upload = multer({ storage });

export default upload;