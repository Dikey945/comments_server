import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';

const router = express.Router();
const API_PATH = '/.netlify/functions/server'
const app = express();

app.use(cors());

app.use(`${API_PATH}`, router);

// // for local testing
// app.listen(5000, () => {
//   console.log('Server started');
// });

export const handler = serverless(app);
