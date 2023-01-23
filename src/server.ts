import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import { router as postRouter } from './routes/posts';
import { router as commentsRouter } from './routes/comments';

const router = express.Router();

const app = express();

app.use(cors());

router.get('/', (req, res) => {
  res.json({
    hello: '123',
  });
});

app.use('/posts', express.json(), postRouter);
app.use('/posts/:postId/comment', express.json(), commentsRouter);

app.listen(5050, () => {
  // eslint-disable-next-line no-console
  console.log('Server started');
});

export const handler = serverless(app);
