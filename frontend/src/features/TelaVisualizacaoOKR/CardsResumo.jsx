import React, { useEffect, useState } from "react";
import styles from "./CardsResumo.module.css";
import axios from "axios";

export default function CardsResumo() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/okrs")
      .then(res => {
        const okrs = res.data;

        const total = okrs.length;

        const concluidos = okrs.filter(o => o.status?.toLowerCase() === "concluído").length;
        const esforco = okrs.filter(o => o.tipo?.toLowerCase() === "esforço").length;

        const impacto = okrs.reduce((acc, o) => acc + (o.impacto_financeiro || 0), 0);

        const cardsFormatados = [
          { label: "Total de OKRs cadastrados", value: total, subtitle: "Cadastro" },
          { label: "Percentual de OKRs Concluídos", value: `${Math.round((concluidos / total) * 100) || 0}%`, subtitle: "Concluídos" },
          { label: "Percentual de OKRs esforço", value: `${Math.round((esforco / total) * 100) || 0}%`, subtitle: "OKRs de esforço" },
         { label: "Impacto financeiro atual", value: `+R$${impacto.toFixed(2).toLocaleString('pt-BR')}`, subtitle: "Impacto financeiro" },
        ];

        setCards(cardsFormatados);
      })
      .catch(err => {
        console.error("Erro ao buscar OKRs:", err);
        setCards([]); // Evita crash
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando...</p>;

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
