import React, { useEffect, useState } from "react";
import styles from "./CardsResumo.module.css";
import axios from "axios"; 

export default function CardsResumo({ origem, filtroTrimestre, filtroDepartamento }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCardsData = async () => {
      setLoading(true);
      try {
        let apiUrl = `${import.meta.env.VITE_API_URL}/okrs`;
        const params = new URLSearchParams();

        if (filtroTrimestre && filtroTrimestre !== "Todos") {
          params.append("trimestre", filtroTrimestre.replace("º Trimestre", ""));
        }
        if (filtroDepartamento && filtroDepartamento !== "Todos") {
          params.append("departamento", filtroDepartamento);
        }

        if (params.toString()) {
          apiUrl = `${apiUrl}?${params.toString()}`;
        }

        const res = await axios.get(apiUrl);
        const okrs = res.data;
        const total = okrs.length;

        const concluidos = okrs.filter((o) => o.status?.toLowerCase() === "concluído").length;
        const esforco = okrs.filter((o) => o.tipo?.toLowerCase() === "esforço").length;
        const resultado = okrs.filter((o) => o.tipo?.toLowerCase() === "resultado").length;

        const impacto = okrs.reduce((acc, o) => acc + (Number(o.impacto_financeiro) || 0), 0);
        const impactoFormatado = impacto.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

        let cardsFormatados = [
          { label: "Total de OKRs cadastrados", value: total, subtitle: "Cadastro" },
          {
            label: "Percentual de OKRs Concluídos",
            value: `${Math.round((concluidos / total) * 100) || 0}%`,
            subtitle: "Concluídos",
          },
          {
            label: "Percentual de OKRs esforço",
            value: `${Math.round((esforco / total) * 100) || 0}%`,
            subtitle: "OKRs de esforço",
          },
          {
            label: "Percentual de OKRs de Resultado",
            value: `${Math.round((resultado / total) * 100) || 0}%`,
            subtitle: "OKRs de Resultado",
          },
          {
            label: "Impacto financeiro atual",
            value: `R$${impactoFormatado}`,
            subtitle: "Impacto financeiro",
          },
        ];

        if (origem === "dashboard") {
          cardsFormatados = cardsFormatados.filter(
            (card) => card.subtitle !== "OKRs de Resultado"
          );
        }

        setCards(cardsFormatados);
      } catch (err) {
        console.error("Erro ao buscar OKRs para cards:", err);
        setCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCardsData();
    
  }, [origem, filtroTrimestre, filtroDepartamento]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className={origem === "dashboard" ? styles.gridDashboard : styles.grid}>
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