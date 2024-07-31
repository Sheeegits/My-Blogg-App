// server/controller/image-controller.js
import grid from 'gridfs-stream';
import mongoose from 'mongoose';

const url = process.env.PHOTO_URL;

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'photos'
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection('photos');
  console.log('GridFS connection established.');
});

export const uploadImage = (request, response) => {
  if (!request.file) 
    return response.status(404).json("File not found");

  const imageUrl = `${url}/file/${request.file.filename}`;
  console.log('Image uploaded:', imageUrl);

  response.status(200).json(imageUrl);    
}

export const getImage = async (request, response) => {
  try {
    const file = await gfs.files.findOne({ filename: request.params.filename });
    if (!file) {
      return response.status(404).json({ msg: 'File not found' });
    }

    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(response);
  } catch (error) {
    console.error('Error fetching image:', error.message);
    response.status(500).json({ msg: error.message });
  }
}
