import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import cokieParser from 'cookie-parser';
import * as process from 'process';
import { router as postRouter } from './routes/posts';
import { router as commentsRouter } from './routes/comments';
import { authRouter } from './routes/auth';
import { errorMiddleware } from './middlewares/errorMiddleware';

const router = express.Router();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());

app.use(cokieParser());

router.get('/', (req, res) => {
  res.json({
    hello: '123',
  });
});

app.use('/posts', postRouter);
app.use('/posts/:postId/comment', commentsRouter);
app.use('/registration', authRouter);
app.use(errorMiddleware);

app.listen(5050, () => {
  // eslint-disable-next-line no-console
  console.log('Server started');
});

export const handler = serverless(app);
