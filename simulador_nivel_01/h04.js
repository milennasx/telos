const dadosRepasses = require('./dadosRepasses.js');
const { agruparCampo, somarCampo } = require('./biblioteca.js');

// História de Usuário 4

// a. O sistema deve ser capaz de identificar automaticamente transações que atendam ao critério de órgão responsável
// b. Os resultados da busca devem ser exibidos no console de forma organizada, apresentando todos os detalhes das transações encontradas.
// c. A busca portransações deve ser realizada pelo sistema automaticamente, sem a necessidade de interação do usuário.

const escolhaOrgao = "Receita Federal";

const transacoesOrgao = dadosRepasses.filter(t => t.orgao === escolhaOrgao.toLowerCase());

console.log(`Transações encontradas para ${escolhaOrgao}:`);
console.log(transacoesOrgao)