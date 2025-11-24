const dadosRepasses = require('./dadosRepasses.js');
const { agruparCampo, somarCampo } = require('./biblioteca.js');

// História de Usuário 3

// O sistema deverá exibir os seguintes repasses:

const ordenarRepasses = [...dadosRepasses].sort((a,b) => a.valor - b.valor);

// a. Detalhes do repasse com maior valor
console.log("Maior repasse:", ordenarRepasses[ordenarRepasses.length-1]);

// b. Detalhes do repasse com menor valor
console.log("Menor repasse:", ordenarRepasses[0]);

// c. Dia com mais repasses
const repassePorDia = agruparCampo(dadosRepasses, "data");
const diaComMaisRepasse = Object.entries(repassePorDia).reduce((a,b)=>b[1]>a[1] ? b:a);
console.log("Dia com mais repasses:", diaComMaisRepasse);

// d. Órgão com mais repasses
const repassePorOrgao = agruparCampo(dadosRepasses, "orgao");
const orgaoComMaisRepasse = Object.entries(repassePorOrgao).reduce((a,b)=>b[1]>a[1] ? b:a);
console.log("Órgão com mais repasses:", orgaoComMaisRepasse);

// e. Órgão com mais repasses com sucesso
const sucessos = dadosRepasses.filter(t => t.status === "sucesso");
const listaSucesso = agruparCampo(sucessos, "orgao");
const orgaoComMaisSucesso = Object.entries(listaSucesso).reduce((a,b)=>b[1] > a[1] ? b : a);
console.log("Órgão com mais sucessos:", orgaoComMaisSucesso);

// f. Órgão com mais repasses falhados
const falhas = dadosRepasses.filter(t => t.status === "falha");
const listaFalhas = agruparCampo(falhas, "orgao");
const orgaoComMaisFalhas = Object.entries(listaFalhas).reduce((a,b)=>b[1] > a[1] ? b : a);
console.log("Órgão com mais falhas:", orgaoComMaisFalhas);

// g. Motivo de falha com mais repasses
const motivos = dadosRepasses.filter(t => t.motivo);
const listaMotivos = agruparCampo(motivos,"motivo");
const motivoMaisComum = Object.entries(listaMotivos).reduce((a,b) => b[1] > a[1] ? b : a);
console.log("Motivo com mais falhas:", motivoMaisComum);
