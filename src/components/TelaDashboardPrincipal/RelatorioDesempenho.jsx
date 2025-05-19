import React from "react";
import { FaDownload, FaFilePowerpoint } from "react-icons/fa";
import styles from "./RelatorioDesempenho.module.css";

export default function RelatorioDesempenho() {
  return (
    <div>
      <h3 className={styles.titulo}>Relatórios</h3>

      <div className={styles.container}>
        <h4>Relatório de Desempenho de OKRs</h4>
        <p><strong>Status de OKRs:</strong> O total de OKRs cadastrados é (75%), 15 estão em andamento (15%) e 10 atrasados (10%).</p>
        <p><strong>KPIs de Desempenho:</strong> A satisfação dos stakeholders está baixa...</p>
        <p><strong>Metas Atrasadas:</strong> O número de OKRs baixos está preocupante...</p>
        <div className={styles.links}>
          <a href="#" className={styles.link}>
            <FaFilePowerpoint className={styles.icon} /> Gerar apresentação de OKR
          </a>
          <a href="#" className={styles.link}>
            <FaDownload className={styles.icon} /> Baixar relatório
          </a>
        </div>
      </div>
    </div>
  );
}
