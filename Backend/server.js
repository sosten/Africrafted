import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/usersRouter.js';
import productRouter from './routes/productRouter.js';
import seedRouter from './routes/seedRouter.js';

dotenv.config();

mongoose.connect(
    process.env.MONGODB_CONNECTION)
    .then(() => console.log('Database is connected'))
    .catch(e=>console.log(e));

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/api', seedRouter);
app.use('/api', userRouter);
app.use('/api', productRouter);
app.use((err, res, req, next)=>{
    res.status(500).send({message: err.message})
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is runnging on port ${PORT}`));