import express from 'express';
import connectDB from './config/db.js';
import movieRoutes from './routes/movieRoutes.js';

const app = express();
connectDB(); 

app.use(express.json());
app.use(movieRoutes);

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));