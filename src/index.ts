import express from 'express';
import userRouters from './routes/userRoutes';

const app = express();
const port = 3000;

app.use(express.json())

app.use('/users', userRouters)


app.listen(port, () => {
  console.log(`La API está escuchando en http://localhost:${port}`);
});


