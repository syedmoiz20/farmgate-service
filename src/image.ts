import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
const uri: string = process.env.MONGO_CONNECT as string;
await mongoose.connect(uri);

const uploadImageFiletoMDB = (file: File) => {
    // Create a GridFSBucket instance
    const gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'images'
    });

    const stream = gridFSBucket.openUploadStream('myFile');

    const readStream = fs.createReadStream(file.path);

    // Pipe the read stream to the GridFS write stream
    readStream.pipe(stream);
}
