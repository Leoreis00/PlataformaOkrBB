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
import { buscarDadosGraficoTrimestre } from "../../services/okrApi";

export default function GraficoTrimestre() {
  const [dataBar, setDataBar] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      const dados = await buscarDadosGraficoTrimestre();
      setDataBar(dados);
    }
    carregarDados();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Esforço vs Resultado por Trimestre</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={dataBar}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="trimestre" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Resultado" fill="#2563eb">
            <LabelList dataKey="Resultado" position="insideTop" formatter={(value) => `${value}%`} fill="#ffffff" />
          </Bar>
          <Bar dataKey="Esforço" fill="#f43f5e">
            <LabelList dataKey="Esforço" position="insideTop" formatter={(value) => `${value}%`} fill="#ffffff" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className={styles.footerText}>Q1: Trimestre</p>
    </div>
  );
}
