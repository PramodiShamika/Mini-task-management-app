import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const uri = process.env.MONGO_URI;
if (!uri) throw new Error('MONGO_URI missing');


mongoose.connect(uri).then(() => console.log('MongoDB connected')).catch(err => {
console.error('MongoDB connection error:', err.message);
process.exit(1);
});