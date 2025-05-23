import React from "react";
import styles from "./TabelaOKRs.module.css";

export default function TabelaOKRs({ dados }) {
  if (!dados || dados.length === 0) {
    return <p>Nenhum OKR cadastrado ainda.</p>;
  }

  function getProgressColorClass(index) {
    const colorClasses = [
      styles.progressBlue,   // índice 0, 3, 6, ...
      styles.progressGreen,  // índice 1, 4, 7, ...
      styles.progressRed     // índice 2, 5, 8, ...
    ];
    return colorClasses[index % 3];
  }

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
              <td>{okr.area_responsavel}</td>
              <td>{okr.objetivo}</td>
              <td className={styles.status}>{okr.status}</td>
              <td>
                <div className={styles.progressBarBackground}>
                  <div
                    className={`${styles.progressBarFill} ${getProgressColorClass(i)}`}
                    style={{ width: `${okr.progresso}%` }}
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
