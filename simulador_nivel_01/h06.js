const {dadosInvalidosFiltrados} = require('./dadosRepassesInvalidos.js');
const { agruparCampo, somarCampo } = require('./biblioteca.js');

// História de Usuário 6
//O sistema não deverá levar em consideração as transações inválidas para efetuar os cálculos anteriormente realizados

//=====================================================//

// História de Usuário 1

// A quantidade total de repasses no arquivo deverá ser exibida no console


const totalRepasses = dadosInvalidosFiltrados.length;
console.log(`O total de repasses: ${totalRepasses}`);

//=====================================================//

// História de Usuário 2

// filtro dos sucessos
const sucessos = dadosInvalidosFiltrados.filter(t => t.status === "sucesso");

// filtro das falhas
const falhas = dadosInvalidosFiltrados.filter(t => t.status === "falha");


// 1. O sistema deverá exibir um resumo dos repasses bem sucedidos. Esse resumo deve ter as seguintes informações:

// a. Quantidade total de repasses bem sucedidos
console.log("Quantidade total:", sucessos.length);

// b. Quantidade total de repasses bem sucedidos por órgão
console.log("Quantidade por órgão:", agruparCampo(sucessos, "orgao"));

// c. Valor total de repasses bem sucedidos
console.log("Valor total:", sucessos.reduce((s,t) => s + t.valor,0));

// d. Valor total de repasses bem sucedidos por órgão
console.log("Valor total por órgão:", somarCampo(sucessos,"orgao"));

// 2. O sistema deverá exibir um resumo dos repasses com falha. Esse resumo deve ter as seguintes informações:

// a. Quantidade total de repasses com falha
console.log("Quantidade total:", falhas.length);

// b. Quantidade total de repasses com falha por órgão
console.log("Quantidade por órgão:", agruparCampo(falhas, "orgao"));

// c. Quantidade total de repasses com falha por motivo
console.log("Quantidade por motivo:", agruparCampo(falhas, "motivo"));

// d. Valor total de repasses com falha
console.log("Valor total:", falhas.reduce((s, t) => s + t.valor, 0));

// e. Valor total de repasses com falha por órgão
console.log("Valor total por órgão:", somarCampo(falhas, "orgao"));

// f. Valor total de repasses com falha por motivo
console.log("Valor total por motivo:", somarCampo(falhas, "motivo"));

//=====================================================//

// História de Usuário 3

// O sistema deverá exibir os seguintes repasses:

const ordenarRepasses = [...dadosInvalidosFiltrados].sort((a,b) => a.valor - b.valor);

// a. Detalhes do repasse com maior valor
console.log("Maior repasse:", ordenarRepasses[ordenarRepasses.length-1]);

// b. Detalhes do repasse com menor valor
console.log("Menor repasse:", ordenarRepasses[0]);

// c. Dia com mais repasses
const repassePorDia = agruparCampo(dadosInvalidosFiltrados, "data");
const diaComMaisRepasse = Object.entries(repassePorDia).reduce((a,b)=>b[1]>a[1] ? b:a);
console.log("Dia com mais repasses:", diaComMaisRepasse);

// d. Órgão com mais repasses
const repassePorOrgao = agruparCampo(dadosInvalidosFiltrados, "orgao");
const orgaoComMaisRepasse = Object.entries(repassePorOrgao).reduce((a,b)=>b[1]>a[1] ? b:a);
console.log("Órgão com mais repasses:", orgaoComMaisRepasse);

// e. Órgão com mais repasses com sucesso
const listaSucesso = agruparCampo(sucessos, "orgao");
const orgaoComMaisSucesso = Object.entries(listaSucesso).reduce((a,b)=>b[1] > a[1] ? b : a);
console.log("Órgão com mais sucessos:", orgaoComMaisSucesso);

// f. Órgão com mais repasses falhados
const listaFalhas = agruparCampo(falhas, "orgao");
const orgaoComMaisFalhas = Object.entries(listaFalhas).reduce((a,b)=>b[1] > a[1] ? b : a);
console.log("Órgão com mais falhas:", orgaoComMaisFalhas);

// g. Motivo de falha com mais repasses
const motivos = dadosInvalidosFiltrados.filter(t => t.motivo);
const listaMotivos = agruparCampo(motivos,"motivo");
const motivoMaisComum = Object.entries(listaMotivos).reduce((a,b) => b[1] > a[1] ? b : a);
console.log("Motivo com mais falhas:", motivoMaisComum);

//=====================================================//

// História de Usuário 4

// a. O sistema deve ser capaz de identificar automaticamente transações que atendam ao critério de órgão responsável
// b. Os resultados da busca devem ser exibidos no console de forma organizada, apresentando todos os detalhes das transações encontradas.
// c. A busca portransações deve ser realizada pelo sistema automaticamente, sem a necessidade de interação do usuário.

const escolhaOrgao = "Receita Federal";

const transacoesOrgao = dadosInvalidosFiltrados.filter(t => t.orgao === escolhaOrgao.toLowerCase());

console.log(`Transações encontradas para ${escolhaOrgao}:`);
console.log(transacoesOrgao)


