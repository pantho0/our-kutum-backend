import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { uploadImage } from './app/utils/uploadImage';
const app: Application = express();

app.use(express.json({ limit: '10mb' }));
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);

app.use('/api/v1', router);

app.post('/api/v1/cloudinary', async (req, res) => {
  const { image } = req.body;
  const result = await uploadImage(image);
  res.status(200).json(result);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Our Kutum Restaurant 🍔');
});

app.use(globalErrorHandler);

export default app;
