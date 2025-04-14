function doGet() {
  return HtmlService.createHtmlOutputFromFile('index'); // Carrega a interface HTML
}

function registrarFilaMultipla(numeros) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Planilha1');
  var dataHoraInicio = new Date();
  var erroMensagens = {
    pendentes: [],
    finalizados: [],
    novos: []
  };
  
  // Carregar dados da planilha
  var dados = sheet.getDataRange().getValues();

  // Encontrar a próxima linha para adicionar novos registros
  var lastRow = dados.length;

  // Registra cada número em uma nova linha
  numeros.forEach(function(numero) {
    if (!isNaN(numero) && numero.trim() !== "") {
      var existePendente = false;
      var existeFinalizado = false;

      // Verifica se o número já está na planilha
      for (var i = 0; i < dados.length; i++) {
        if (dados[i][1] == numero) {
          if (dados[i][4] === "Pendente") {
            existePendente = true;
            erroMensagens.pendentes.push(numero + " (Linha " + (i + 1) + ")");
            break;
          } else if (dados[i][4] === "Finalizado") {
            existeFinalizado = true;
            erroMensagens.finalizados.push(numero + " (Linha " + (i + 1) + ")");
            break;
          }
        }
      }

      // Se o número não está na planilha como Pendente ou Finalizado, registra
      if (!existePendente && !existeFinalizado) {
        // Adiciona a nova linha de dados na planilha
        sheet.appendRow([lastRow + 1, numero, dataHoraInicio, '', 'Pendente']);
        erroMensagens.novos.push(numero);
        lastRow++; // Atualiza o índice da última linha
      }
    } else {
      throw new Error('A entrada "' + numero + '" não é um número válido.');
    }
  });

  // Retorna as mensagens de erro ou sucesso
  return erroMensagens.pendentes.length || erroMensagens.finalizados.length || erroMensagens.novos.length ? erroMensagens : { sucesso: true };
}

function finalizarFilaMultipla(numeros) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Planilha1');
  var dataHoraFim = new Date();
  var erroMensagens = {
    pendentes: [],
    finalizados: [],
    naoEncontrados: []
  };

  // Carregar dados da planilha
  var dados = sheet.getDataRange().getValues();
  var updateRanges = []; // Array para armazenar os ranges que precisarão ser atualizados

  // Processa cada número da lista
  numeros.forEach(function(numero) {
    if (!isNaN(numero) && numero.trim() !== "") {
      var numeroFinalizado = false;

      // Para cada número, encontra a linha e altera o status para "Finalizado"
      for (var i = 0; i < dados.length; i++) {
        if (dados[i][1] == numero && dados[i][4] === "Pendente") {
          // Adiciona os ranges para atualização (em vez de setValue individualmente)
          updateRanges.push({
            row: i + 1,
            dataHoraFim: dataHoraFim,
            status: "Finalizado"
          });
          numeroFinalizado = true;
          break;
        } else if (dados[i][1] == numero && dados[i][4] === "Finalizado") {
          erroMensagens.finalizados.push(numero + " (Linha " + (i + 1) + ")");
          numeroFinalizado = true;
          break;
        }
      }

      if (!numeroFinalizado) {
        erroMensagens.naoEncontrados.push(numero);
      }
    } else {
      throw new Error('A entrada "' + numero + '" não é um número válido.');
    }
  });

  // Atualiza todos os registros de uma vez
  updateRanges.forEach(function(range) {
    sheet.getRange(range.row, 4).setValue(range.dataHoraFim); // Coluna D (Data e Hora Fim)
    sheet.getRange(range.row, 5).setValue(range.status); // Coluna E (Status)
  });

  // Retorna as mensagens de erro ou sucesso
  return erroMensagens.pendentes.length || erroMensagens.finalizados.length || erroMensagens.naoEncontrados.length ? erroMensagens : { sucesso: true };
}
