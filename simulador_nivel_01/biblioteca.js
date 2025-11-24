function agruparCampo(lista, campo) {
    return lista.reduce((acc, item) => {
        acc[item[campo]] = (acc[item[campo]] || 0) + 1;
        return acc;
    }, {});
}

function somarCampo(lista, campo) {
  return lista.reduce((acc, item) => {
    acc[item[campo]] = (acc[item[campo]] || 0) + item.valor;
    return acc;
  }, {});
}

module.exports = { 
    agruparCampo, 
    somarCampo 
};