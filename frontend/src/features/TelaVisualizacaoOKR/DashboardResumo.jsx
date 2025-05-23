import React, { useEffect, useState } from "react";
import Titulo from "./Titulo";
import CardsResumo from "./CardsResumo";
import TabelaOKRs from "./TabelaOKRs";
import GraficoTrimestre from "./GraficoTrimestre";
import Alertas from "./Alertas";
import RadarDesempenho from "./RadarDesempenho";
import styles from "./DashboardResumo.module.css";
import { buscarOKRs } from "../../services/okrApi";

export default function DashboardResumo() {
  const [okrs, setOkrs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    buscarOKRs()
      .then(data => {
        setOkrs(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Não foi possível carregar os OKRs.");
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <Titulo />
      <CardsResumo />

      <div className={styles.containerFlex}>
        <div className={styles.leftSide}>
          {loading && <p>Carregando OKRs...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && !error && <TabelaOKRs dados={okrs} />}
        </div>
        <div className={styles.rightSide}>
          <GraficoTrimestre />
        </div>
      </div>

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
