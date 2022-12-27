import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import { router as postsRouter} from './routes/posts';

const router = express.Router();
const app = express();

app.use(cors());

router.get('/', (req, res) => {
  res.json({
    'hello': '123',
  })
})

app.use('/posts', express.json(), postsRouter);
app.use(express.static('dist'))

app.listen(5000, () => {
  console.log('Server started');
});

export const handler = serverless(app);
