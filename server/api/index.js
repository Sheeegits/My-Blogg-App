import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { GridFSBucket } from 'mongodb';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database connected successfully');
}).catch((error) => {
  console.error('Database connection error:', error);
});

const db = mongoose.connection;
let gfs, gridfsBucket;

db.once('open', () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(db.db, {
    bucketName: 'photos'
  });
  gfs = gridfsBucket;
});

// Your routes here
import route from './routes/route.js';
app.use('/', route);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
