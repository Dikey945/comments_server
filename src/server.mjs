import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';

const router = express.Router();

const app = express();

app.use(cors());

router.get('/', (req, res) => {
  res.json({
    'hello': '123',
  })
})

app.use('/', router);
app.use(express.static('dist'))

app.listen(5000, () => {
  console.log('Server started');
});

export const handler = serverless(app);
