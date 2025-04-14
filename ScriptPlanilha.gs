function calcularDiferencasEmHoras() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Planilha1');
  var ultimaLinha = planilha.getLastRow();
  
  // Intervalo de dados nas colunas C e D (colunas 3 e 4), que contêm as datas
  var intervaloDados = planilha.getRange(2, 3, ultimaLinha - 1, 2).getValues(); 
  var valoresf = [];

  // Processa as diferenças para a coluna F
  for (var i = 0; i < intervaloDados.length; i++) {
    var data1 = new Date(intervaloDados[i][0]); // Coluna C (Agora a coluna 3)
    var data2 = new Date(intervaloDados[i][1]); // Coluna D (Agora a coluna 4)

    // Diferença para a coluna F
    var diferencaF = null;
    if (!isNaN(data1.getTime()) && !isNaN(data2.getTime())) {
      // Calcula a diferença entre as datas em milissegundos
      diferencaF = data2.getTime() - data1.getTime();
    }

    // Calcula horas, minutos e segundos a partir da diferença
    if (diferencaF !== null) {
      var horas = Math.floor(diferencaF / (1000 * 60 * 60)); // Calcula as horas
      var minutos = Math.floor((diferencaF % (1000 * 60 * 60)) / (1000 * 60)); // Calcula os minutos
      var segundos = Math.floor((diferencaF % (1000 * 60)) / 1000); // Calcula os segundos

      // Garante que os valores de horas, minutos e segundos sempre terão dois dígitos
      valoresf.push([padZero(horas) + ":" + padZero(minutos) + ":" + padZero(segundos)]);
    } else {
      valoresf.push([""]);
    }
  }

  // Atualiza a coluna F com as diferenças
  planilha.getRange(2, 6, valoresf.length, 1).setValues(valoresf); // Preenche a coluna F
}

// Função auxiliar para adicionar zero à esquerda (para formatar como 00, 01, etc)
function padZero(num) {
  return num < 10 ? "0" + num : num;
}
