import React from "react";
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

const dataBar = [
  { trimestre: "Q1", Resultado: 54, Esforço: 65 },
  { trimestre: "Q2", Resultado: 51, Esforço: 60 },
  { trimestre: "Q3", Resultado: 43, Esforço: 70 },
  { trimestre: "Q4", Resultado: 27, Esforço: 82 },
];

export default function GraficoTrimestre() {
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
            <LabelList dataKey="Resultado" position="insideTop" formatter={(value) => `${value}%`} fill="#ffffff"/>
          </Bar>
          <Bar dataKey="Esforço" fill="#f43f5e">
            <LabelList dataKey="Esforço" position="insideTop" formatter={(value) => `${value}%`} fill="#ffffff"/>
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className={styles.footerText}>Q1: Trimestre</p>
    </div>
  );
}
