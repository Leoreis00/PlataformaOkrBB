import React from "react";
import Titulo from "./Titulo";
import CardsResumo from "./CardsResumo";
import TabelaOKRs from "./TabelaOKRs";
import GraficoTrimestre from "./GraficoTrimestre";
import Alertas from "./Alertas";
import RadarDesempenho from "./RadarDesempenho";
import styles from "./DashboardResumo.module.css";

export default function DashboardResumo() {
  return (
    <div className={styles.container}>
      <Titulo />
      <CardsResumo />

      {/* Container flex só para tabela e gráfico lado a lado */}
      <div className={styles.containerFlex}>
        <div className={styles.leftSide}>
          <TabelaOKRs />
        </div>
        <div className={styles.rightSide}>
          <GraficoTrimestre />
        </div>
      </div>

      {/* Novo container flex para Radar e Alertas lado a lado */}
      <div className={styles.containerFlex}>
        <div className={styles.leftSide}>
          <Alertas />
        </div>
        <div className={styles.rightSide}>
          <RadarDesempenho />
        </div>
      </div>
    </div>
  );
}
