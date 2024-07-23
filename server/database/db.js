import mongoose from 'mongoose';

const Connection = async (username, password) => {
  const URL= `mongodb://${username}:${password}@ac-jj2umct-shard-00-00.ry84bji.mongodb.net:27017,ac-jj2umct-shard-00-01.ry84bji.mongodb.net:27017,ac-jj2umct-shard-00-02.ry84bji.mongodb.net:27017/?ssl=true&replicaSet=atlas-px7rer-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`;
    try {
        await mongoose.connect(URL)
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;
