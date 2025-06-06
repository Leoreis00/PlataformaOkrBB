import React, { useState } from 'react';
import styles from "./CardResumoOKRs.module.css";
import powerPointIconSrc from "./Microsoft PowerPoint 2019.svg"; // Garanta que este caminho esteja correto

const CardResumoOKRs = () => {
  const [trimestreSelecionado, setTrimestreSelecionado] = useState('Q1');
  const [departamentoSelecionado, setDepartamentoSelecionado] = useState('Recursos Humanos'); // Valor inicial

  const trimestres = ['Q1', 'Q2', 'Q3', 'Q4'];
  // Nomes completos para exibição no dropdown, se desejar, ou pode usar os mesmos para valor e texto.
  const trimestresDisplay = {
    'Q1': '1º Trimestre',
    'Q2': '2º Trimestre',
    'Q3': '3º Trimestre',
    'Q4': '4º Trimestre',
  };

  const departamentos = ['Recursos Humanos', 'Financeiro', 'Marketing', 'TI', 'Vendas', 'Operações'];

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.tituloPrincipal}>Gerar Apresentação de OKR</h1>
      <div className={styles.containerPrincipal}>
        <div className={styles.conteudoCard}>
          <p className={styles.descricao}>
            Gerar uma apresentação em PowerPoint com o resumo geral dos OKRs do trimestre e departamento selecionados, incluindo visão estratégica, progresso por objetivo, destaques por equipe, metas críticas, lições aprendidas e gráficos de desempenho.
          </p>

          {/* Agrupador para todos os filtros */}
          <div className={styles.filtrosContainer}>
            {/* Filtro de Trimestre */}
            <div className={styles.grupoFiltro}>
              <label className={styles.labelFiltro} htmlFor="trimestreSelect">
                Selecione o Trimestre:
              </label>
              <div className={styles.grupoBotoesTrimestre} id="trimestreSelect">
                {trimestres.map((trimestre) => (
                  <button
                    key={trimestre}
                    className={`${styles.botaoTrimestre} ${trimestreSelecionado === trimestre ? styles.ativo : ''}`}
                    onClick={() => setTrimestreSelecionado(trimestre)}
                    aria-pressed={trimestreSelecionado === trimestre}
                    title={trimestresDisplay[trimestre]} /* Tooltip com nome completo */
                  >
                    {trimestre} {/* Exibe Q1, Q2 etc. no botão */}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtro de Departamento */}
            <div className={styles.grupoFiltro}>
              <label className={styles.labelFiltro} htmlFor="departamentoSelect">
              Departamento:
              </label>
              <select
                id="departamentoSelect"
                className={styles.selectDepartamento}
                value={departamentoSelecionado}
                onChange={(e) => setDepartamentoSelecionado(e.target.value)}
              >
                {departamentos.map((depto) => (
                  <option key={depto} value={depto}>
                    {depto}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className={styles.botaoGerar}>
            Gerar Apresentação ({trimestreSelecionado} - {departamentoSelecionado})
            <img
              className={styles.iconPowerPoint}
              src={powerPointIconSrc}
              alt="Ícone do PowerPoint"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardResumoOKRs;