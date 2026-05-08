import Movie from '../models/Movie.js';

export const crud = {
  // POST
  criar: async (req, res) => {
    try {
      const novoFilme = await Movie.create(req.body); 
      res.status(201).json(novoFilme);
    } catch (error) {
      res.status(400).json({ message: "Erro ao criar filme", error });
    }
  },
  
  // GET
  listar: async (req, res) => {
    try {
      const movies = await Movie.find();
      res.json(movies);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar filmes" });
    }
  },

  // GET
  buscarPorId: async (req, res) => {
    try {
      const filme = await Movie.findById(req.params.id);
      if (!filme) return res.status(404).json({ message: "Filme não encontrado" });
      res.json(filme);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar o filme" });
    }
  },

  // PUT
  atualizar: async (req, res) => {
    try {
      const filmeAtualizado = await Movie.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true } 
      );
      if (!filmeAtualizado) return res.status(404).json({ message: "Filme não encontrado" });
      res.json(filmeAtualizado);
    } catch (error) {
      res.status(400).json({ message: "Erro ao atualizar" });
    }
  },
 
  // DELETE
  deletar: async (req, res) => {
    try {
      const deletado = await Movie.findByIdAndDelete(req.params.id);
      if (!deletado) return res.status(404).json({ message: "Filme não encontrado" });
      res.status(200).json({ message: "Filme removido com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar" });
    }
  }
};