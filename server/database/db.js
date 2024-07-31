import mongoose from 'mongoose';

let isConnected = false;

const Connection = async (username, password) => {
  const URL = `mongodb://${username}:${password}@ac-jj2umct-shard-00-00.ry84bji.mongodb.net:27017,ac-jj2umct-shard-00-01.ry84bji.mongodb.net:27017,ac-jj2umct-shard-00-02.ry84bji.mongodb.net:27017/?ssl=true&replicaSet=atlas-px7rer-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`;
  try {
    if (!isConnected) {
      await mongoose.connect(URL, {
        serverSelectionTimeoutMS: 5000
      });
      isConnected = true;
      console.log('Database connected successfully');
    }
  } catch (error) {
    console.error('Error while connecting to the database', error);
  }
};

export default Connection;
