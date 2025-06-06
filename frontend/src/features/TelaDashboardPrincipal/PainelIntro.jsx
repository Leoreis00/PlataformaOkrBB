import React from "react"; 
import styles from "./PainelIntro.module.css";
import CardsResumo from "../TelaVisualizacaoOKR/CardsResumo"; 

export default function PainelIntro() {
  return (
    <div className={styles.container}>
      <h3 className={styles.titulo}>Painel de visualização geral de OKR</h3>
      
      <div className={styles.painel}>
        <CardsResumo origem="dashboard" />
      </div>
    </div>
  );
}
