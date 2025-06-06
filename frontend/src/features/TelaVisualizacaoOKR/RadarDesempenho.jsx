import React, { useEffect, useState } from "react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend, ResponsiveContainer
} from 'recharts';
import axios from "axios";
import styles from "./RadarDesempenho.module.css";

export default function DesempenhoRadar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchRadarData() {
      try {
        const response = await axios.get("http://localhost:5000/api/okrs/grafico-radar"); // 👈 troque se estiver sem proxy
        console.log("Radar data recebida:", response.data); // 👈 depuração
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do radar:", error);
      }
    }

    fetchRadarData();
  }, []);

  if (!data || data.length === 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>Desempenho por Departamento</h3>
        <p>Carregando dados...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Desempenho por Departamento</h3>
      <ResponsiveContainer width="100%" height={348}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar name="Esforço" dataKey="Esforco" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
          <Radar name="Resultado" dataKey="Resultado" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
