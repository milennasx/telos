const dadosRepassesInvalidos = require('./dadosRepassesInvalidos.js');
const { agruparCampo, somarCampo } = require('./biblioteca.js');

// História de Usuário 5

// a. O sistema deverá exibir detalhes das transações que não foram processadas com sucesso

const invalidas = dadosRepassesInvalidos.filter(t => t.status === "falha" && !t.motivo);


console.log("Transações inválidas:", invalidas);



