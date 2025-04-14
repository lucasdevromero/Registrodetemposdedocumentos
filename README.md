# 📋 Sistema de Controle de Tratativas de Documentos

Este projeto foi desenvolvido para facilitar o controle de **documentos corporativos que exigem tratativas manuais**, como **Notas Fiscais (NFs)**. Utilizando **Google Apps Script** integrado ao **Google Sheets**, com uma interface web simples e responsiva, o sistema permite registrar o início e o fim das tratativas desses documentos.

Com isso, é possível medir o tempo entre o início e a finalização de cada tratativa, fornecendo dados valiosos para **análise de performance e otimização de processos**.

---

## 💡 Funcionalidades

- Interface web amigável e responsiva.
- Registro de início e finalização de tratativas em lote.
- Validação automática para evitar registros duplicados.
- Registro de data e hora para análise de tempo de atendimento.
- Integração nativa com Google Sheets (dispensa banco de dados externo).
- **Cálculo de tempo de fila (tempo total de tratativa) para cada documento.**

---

## 🔧 Como Funciona

### 1. Interface Web

- Desenvolvida em HTML, CSS e JavaScript.
- O usuário pode:
  - Selecionar se deseja **iniciar** ou **finalizar** a tratativa de documentos.
  - Inserir múltiplos documentos (ex: números de NF) separados por vírgulas ou por linha.
  - Visualizar mensagens claras sobre sucesso, erro e status de carregamento.

---

### 2. Registro de Início de Tratativa (`registrarFilaMultipla`)

- Recebe uma lista de documentos digitados pelo usuário.
- Para cada documento:
  - Se já estiver como **"Pendente"**, não é registrado novamente e é informado como duplicado.
  - Se já estiver **"Finalizado"**, também é ignorado.
  - Se for **novo**, é registrado na planilha com:
    - Data/hora atual no campo de início.
    - Status definido como **"Pendente"**.
- Retorna um resumo ao usuário com:
  - Documentos novos registrados com sucesso.
  - Documentos já pendentes.
  - Documentos já finalizados.

---

### 3. Registro de Fim de Tratativa (`finalizarFilaMultipla`)

- Recebe uma lista de documentos.
- Para cada documento:
  - Se estiver com status **"Pendente"**, altera o status para **"Finalizado"** e registra a data/hora de encerramento.
  - Se já estiver com status **"Finalizado"**, informa que já foi concluído.
  - Se **não for encontrado na planilha**, retorna como não registrado.
- As atualizações são feitas de forma otimizada e em lote.

---

### 4. ⏱️ Cálculo de Tempo de Tratativa

- O tempo total de fila (ou tratativa) de cada documento pode ser calculado diretamente no Google Sheets, com base nas colunas:
  - **Data e Hora de Início** (coluna C)
  - **Data e Hora de Fim** (coluna D)
- Exemplo de fórmula no Google Sheets:
  
  ```excel
  =D2 - C2

---

## 🗃️ Estrutura do Projeto
---

## ✅ Tecnologias Utilizadas

- Google Apps Script (automação backend)
- Google Sheets (armazenamento de dados)
- HTML5 / CSS3 (interface visual)
- JavaScript (lógica e integração)

---

## 🎯 Objetivo do Sistema

O principal objetivo deste sistema é **controlar e monitorar o tempo de tratativa de documentos internos**, como NFs, que passam por processos manuais ou verificações. Com isso, é possível:

- Identificar gargalos operacionais.
- Otimizar etapas repetitivas.
- Garantir rastreabilidade e histórico.
- Aumentar a eficiência nos fluxos de trabalho.

---

## 👨‍💻 Desenvolvedor

**Lucas Romero da Silva**  
Responsável pela Análise de Dados | CEVA Logistics

---

## 📎 Códigos Fonte

Abaixo estão os arquivos de código utilizados neste projeto:

