import express from 'express';
import movieRoutes from './routes/movieRoutes.js';

const app = express();
app.use(express.json()); 
app.use(movieRoutes);   

app.listen(3000, () => console.log("Rodando na porta 3000"));