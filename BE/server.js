import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import router from './routers/index.js';
import connectDB from './database/index.js';

const app = express();

dotenv.config();

app.use(express.json()); //req.body
app.use(cors());

const PORT = process.env.PORT;

router(app);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`server running on port ${PORT}`);
});
