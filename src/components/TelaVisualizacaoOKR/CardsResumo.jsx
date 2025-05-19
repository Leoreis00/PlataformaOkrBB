import React from "react";
import styles from "./CardsResumo.module.css";

const cards = [
  { label: "Total de OKRs cadastrados", value: 12, subtitle: "Cadastro" },
  { label: "Percentual de OKRs Concluídos", value: "58%", subtitle: "Concluídos" },
  { label: "Percentual de OKRs esforço", value: "53%", subtitle: "OKRs de esforço" },
  { label: "Impacto financeiro atual", value: "+R$1.200.000", subtitle: "Impacto financeiro" },
];

export default function CardsResumo() {
  return (
    <div className={styles.grid}>
      {cards.map((item, idx) => (
        <div key={idx} className={styles.card}>
          <h3 className={styles.subtitle}>{item.subtitle}</h3>
          <p className={styles.value}>{item.value}</p>
          <p className={styles.label}>{item.label}</p>
        </div>
      ))}
    </div>
  );
}
