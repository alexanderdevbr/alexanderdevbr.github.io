/**
 * Analisa uma coluna específica de uma tabela e aplica o rowspan
 * nas células vazias subsequentes.
 * 
 * @param {HTMLTableElement} tabela - O elemento DOM da tabela.
 * @param {number} indiceColuna - O índice da coluna (0 = primeira, 1 = segunda, etc.).
 */
function agruparLinhasPorColuna(tabela, indiceColuna) {
  let celulaAnterior = null;
  let contadorRowspan = 1;

  // Seleciona apenas as linhas do corpo (ignora thead e tfoot)
  const linhas = tabela.querySelectorAll('tbody tr');

  linhas.forEach(linha => {
    // Prevenção de erro: verifica se a linha possui a coluna solicitada
    if (indiceColuna >= linha.cells.length) return;

    const celulaAtual = linha.cells[indiceColuna];

    // Verifica se a célula está vazia (trata espaços, quebras de linha ou &nbsp;)
    if (celulaAtual && celulaAtual.textContent.trim() === '') {
      if (celulaAnterior) {
        contadorRowspan++;
        celulaAnterior.setAttribute('rowspan', contadorRowspan);
        celulaAtual.style.display = 'none'; // Oculta a célula excedente
      }
    } else {
      // Encontrou uma célula com conteúdo: redefine a referência e o contador
      celulaAnterior = celulaAtual;
      contadorRowspan = 1;
      
      // Opcional: melhora o alinhamento visual do texto que foi agrupado
      if (celulaAnterior) {
        celulaAnterior.style.verticalAlign = 'middle';
      }
    }
  });
}