import React from "react";
import styles from "./DashboardPrincipal.module.css";
import TituloDashboard from "./TituloDashboard";
import PainelIntro from "./PainelIntro";
import StatusMetas from "./StatusMetas";
import GraficoTrimestre from "./GraficoTrimestre";
import UltimasAtividades from "./UltimasAtividades";
import RelatorioDesempenho from "./RelatorioDesempenho";

export default function DashboardPrincipal() {
  return (
    <div className={styles.container}>
      <TituloDashboard />
      <div className={styles.grid}>
        <div className={styles.colEsquerda}>
          <PainelIntro />
          <StatusMetas />
          <GraficoTrimestre />
        </div>
        <div className={styles.colDireita}>
          <UltimasAtividades />
          <RelatorioDesempenho />
        </div>
      </div>
    </div>
  );
}
