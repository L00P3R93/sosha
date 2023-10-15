import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import { signUp } from './controllers/auth.js';
import { createPost } from './controllers/posts.js';
import { verifyToken } from './middleware/auth.js';

import User from './models/user.js';
import Post from './models/posts.js';

import { users, posts } from './data/index.js';



/**CONFIGURATION  */
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/**FILE STORAGE */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const upload = multer({ storage });

/**ROUTES WITH FILES */
app.post('/auth/signup', upload.single('picture'), signUp);
app.post('/posts', verifyToken, upload.single('picture'), createPost);

/**ROUTES */
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

/**MONGOOSE SETUP */
const PORT  = process.env.PORT || 6001;
const username = encodeURIComponent(process.env.MONGODB_USERNAME);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);

const MONGODB_URI = `mongodb+srv://${username}:${password}@sntaks-sosha.od4e8mr.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, '❗❗ connection error:'));
db.once('open', () => {
    console.log(`🚀 🚀 Connected to MongoDB`);
    app.listen(PORT, () => {
        console.log(`🚀 🚀 Server running on port: ${PORT}`);
    })

    /**ADD DATA ONE TIME */
    //User.insertMany(users);
    //Post.insertMany(posts);
})