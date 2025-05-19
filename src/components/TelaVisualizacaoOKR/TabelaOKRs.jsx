import React from "react";
import styles from "./TabelaOKRs.module.css";

const dados = [
  {
    depto: "Marketing",
    objetivo: "Aumentar engajamento no app",
    status: "Em andamento",
    progresso: 70,
    tipo: "Resultado",
    color: "#2563eb",
  },
  {
    depto: "Recursos Humanos",
    objetivo: "Reduzir turnover",
    status: "Concluído",
    progresso: 100,
    tipo: "Esforço",
    color: "#22c55e",
  },
  {
    depto: "Financeiro",
    objetivo: "Aumentar receita recorrente",
    status: "Atrasado",
    progresso: 43,
    tipo: "Resultado",
    color: "#ef4444",
  },
  {
    depto: "Recursos Humanos",
    objetivo: "Melhorar treinamento de funcionários",
    status: "Em andamento",
    progresso: 56,
    tipo: "Esforço",
    color: "#60a5fa",
  },
];

export default function TabelaOKRs() {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th>Departamento</th>
            <th>Objetivo</th>
            <th>Status</th>
            <th>Progresso</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((okr, i) => (
            <tr key={i} className={styles.row}>
              <td>{okr.depto}</td>
              <td>{okr.objetivo}</td>
              <td>{okr.status}</td>
              <td>
                <div className={styles.progressBarBackground}>
                  <div
                    className={styles.progressBarFill}
                    style={{
                      width: `${okr.progresso}%`,
                      backgroundColor: okr.color,
                    }}
                  >
                    <span className={styles.progressText}>{okr.progresso}%</span>
                  </div>
                </div>
              </td>
              <td>{okr.tipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
