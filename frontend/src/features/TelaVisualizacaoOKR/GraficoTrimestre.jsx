import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";
import styles from "./GraficoTrimestre.module.css";
import axios from "axios";

export default function GraficoTrimestre() {
  const [dataBar, setDataBar] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/api/okrs"); // Altere para a rota real da sua API
        const dados = response.data;

        const trimestres = ["Q1", "Q2", "Q3", "Q4"];
        const resultado = trimestres.map((t) => {
          const resultadoTotal = dados
            .filter((item) => item.trimestre === t && item.tipo === "Resultado")
            .reduce((acc, curr) => acc + curr.progresso, 0);

          const esforcoTotal = dados
            .filter((item) => item.trimestre === t && item.tipo === "Esforço")
            .reduce((acc, curr) => acc + curr.progresso, 0);

          return {
            trimestre: t,
            Resultado: resultadoTotal,
            Esforço: esforcoTotal,
          };
        });

        setDataBar(resultado);
      } catch (error) {
        console.error("Erro ao buscar dados do gráfico:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Esforço vs Resultado por Trimestre</h2>
      <div className={styles.content}>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dataBar}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="trimestre" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Resultado" fill="#2563eb">
              <LabelList
                dataKey="Resultado"
                position="insideTop"
                formatter={(value) => `${value}%`}
                fill="#ffffff"
              />
            </Bar>
            <Bar dataKey="Esforço" fill="#f43f5e">
              <LabelList
                dataKey="Esforço"
                position="insideTop"
                formatter={(value) => `${value}%`}
                fill="#ffffff"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className={styles.footerText}>Q1: Trimestre</p>
      </div>
    </div>
  );
}
