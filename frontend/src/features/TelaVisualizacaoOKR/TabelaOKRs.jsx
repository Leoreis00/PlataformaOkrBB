import React from "react"; // Removed useState
import styles from "./TabelaOKRs.module.css";

export default function TabelaOKRs({ dados }) {
  // const [expandedRow, setExpandedRow] = useState(null); // Removed

  if (!dados || dados.length === 0) {
    return <p className={styles.semDados}>Nenhum OKR cadastrado ainda.</p>;
  }

  const ultimosDados = dados.slice(-7).reverse();

  // const handleRowClick = (id) => { // Removed
  //   setExpandedRow(expandedRow === id ? null : id);
  // };

  function getProgressColorClass(index) {
    const colorClasses = [
      styles.progressBlue,
      styles.progressGreen,
      styles.progressRed,
    ];
    return colorClasses[index % colorClasses.length];
  }

  function getStatusClass(status) {
    if (!status) return styles.statusDefault;
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('concluído') || lowerStatus.includes('finalizado')) {
      return styles.statusCompleted;
    }
    if (lowerStatus.includes('andamento') || lowerStatus.includes('progresso')) {
      return styles.statusInProgress;
    }
    if (lowerStatus.includes('atrasado') || lowerStatus.includes('bloqueado') || lowerStatus.includes('risco')) {
      return styles.statusDelayed;
    }
    if (lowerStatus.includes('planejado') || lowerStatus.includes('futuro')) {
      return styles.statusPlanned;
    }
    return styles.statusDefault;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Últimas OKRs Cadastradas</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              <th className={`${styles.tableHeader} ${styles.idHeader}`}>ID</th>
              <th className={`${styles.tableHeader} ${styles.departamentoHeader}`}>Departamento</th>
              <th className={`${styles.tableHeader} ${styles.statusHeader}`}>Status</th>
              <th className={`${styles.tableHeader} ${styles.progressoHeader}`}>Progresso</th>
              <th className={`${styles.tableHeader} ${styles.tipoHeader}`}>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {ultimosDados.map((okr, i) => (
              <tr
                key={okr.id || i}
                className={styles.row} // Removed styles.clickableRow
                // onClick={() => handleRowClick(okr.id)} // Removed
              >
                <td className={`${styles.tableCell} ${styles.idCell}`}>{okr.id}</td>
                <td className={`${styles.tableCell} ${styles.departamentoCell}`}>{okr.area_responsavel}</td>
                <td className={`${styles.tableCell} ${styles.statusCell}`}>
                  <span className={`${styles.statusBadge} ${getStatusClass(okr.status)}`}>
                    {okr.status}
                  </span>
                </td>
                <td className={`${styles.tableCell} ${styles.progressoCell}`}>
                  <div className={styles.progressWrapper}>
                    <div className={styles.progressBarBackground}>
                      <div
                        className={`${styles.progressBarFill} ${getProgressColorClass(i)}`}
                        style={{ width: `${okr.progresso || 0}%` }}
                      ></div>
                    </div>
                    <span className={styles.progressNumber}>{okr.progresso || 0}%</span>
                  </div>
                </td>
                <td className={`${styles.tableCell} ${styles.tipoCell}`}>{okr.tipo}</td>
              </tr>
              // Removed expandedRow conditional rendering
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}