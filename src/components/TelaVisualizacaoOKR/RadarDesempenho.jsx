import React from "react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend, ResponsiveContainer
} from 'recharts';

const data = [
  { subject: 'Marketing', Esforco: 60, Resultado: 40 },
  { subject: 'Vendas', Esforco: 85, Resultado: 47 },
  { subject: 'Operações', Esforco: 90, Resultado: 97 },
  { subject: 'RH', Esforco: 75, Resultado: 73 },
  { subject: 'TI', Esforco: 60, Resultado: 65 },
  { subject: 'Financeiro', Esforco: 85, Resultado: 80 },
];

export default function DesempenhoRadar() {
  return (
    <div className="container">
      <h3 className="title">Desempenho por Departamento</h3>
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
