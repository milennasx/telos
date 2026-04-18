import express from 'express';
import { crud } from '../controllers/movieController.js';

const router = express.Router();

router.post('/movies', crud.criar);    
router.get('/movies', crud.listar);     
router.put('/movies/:id', crud.atualizar); 
router.delete('/movies/:id', crud.deletar); 

export default router;