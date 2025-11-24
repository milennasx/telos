const dadosRepasses = require('./dadosRepasses.js');
const { agruparCampo, somarCampo } = require('./biblioteca.js');

// História de Usuário 2

// filtro dos sucessos
const sucessos = dadosRepasses.filter(t => t.status === "sucesso");

// filtro das falhas
const falhas = dadosRepasses.filter(t => t.status === "falha");


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

