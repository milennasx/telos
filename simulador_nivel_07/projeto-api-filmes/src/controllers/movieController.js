let movies = []; 
let idAtual = 1;

export const crud = {
 
  criar: (req, res) => {
    const novoFilme = { id: idAtual++, ...req.body };  
    movies.push(novoFilme);
    res.status(201).json(novoFilme);
  },
  
  listar: (req, res) => res.json(movies),

  atualizar: (req, res) => {
    const index = movies.findIndex(m => m.id == req.params.id);
    if (index === -1) return res.status(404).send("Não encontrado");
    movies[index] = { ...movies[index], ...req.body };
    res.json(movies[index]);
  },
 
  deletar: (req, res) => {
    movies = movies.filter(m => m.id != req.params.id);
    res.status(204).send();
  }
};