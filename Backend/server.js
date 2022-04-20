import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoute from './routes/route.js';

dotenv.config();

mongoose.connect(
    process.env.MONGODB_CONNECTION)
    .then(() => console.log('Database is connected'))
    .catch(e=>console.log(e));

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', userRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is runnging on port ${PORT}`));