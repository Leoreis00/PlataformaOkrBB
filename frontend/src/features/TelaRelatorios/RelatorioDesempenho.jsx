import React from "react";
import styles from "./RelatorioDesempenho.module.css";

const RelatorioDesempenho = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.titulo}>Relatório de Desempenho de OKRs</h2>

      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Status de OKRs</div>
          <div className={styles.sectionContent}>
            <p>
              O total de OKRs cadastrados é <strong>75%</strong>, 15 estão em andamento (<strong>15%</strong>) e 10 atrasados (<strong>10%</strong>). 
              A meta está confusa dentro da faixa muito ampla, será bom voltar até ela focar para avançar.
            </p>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>KPIs de Desempenho</div>
          <div className={styles.sectionContent}>
            <p>
              A satisfação dos stakeholders está baixa, situada em <strong>85%</strong>, o que é melhorável.
              O Lead Time poderia ser melhorado, com um índice de <strong>70%</strong>. Análise de impacto geral necessária.
            </p>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Metas Atrasadas</div>
          <div className={styles.sectionContent}>
            <p>
              O número de OKRs baixos está preocupante; atenção contínua é necessária. 
              Devemos prolongar o esforço nas metas para garantir que permaneçam monitoradas e otimizadas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatorioDesempenho;
