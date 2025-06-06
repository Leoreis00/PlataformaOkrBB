import RelatorioDesempenho from "./RelatorioDesempenho";
import CardResumoOKRs from "./CardResumoOKRs";
import ListaRelatorios from "./ListaRelatorios";
import styles from "./PaginaRelatorios.module.css";

const PaginaRelatorios = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <h1 className={styles.pageTitle}>Relatórios</h1>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Pesquisar relatório"
            className={styles.input}
          />
        </div>
      </div>
      
      <div className={styles.grid}>
        <RelatorioDesempenho />
        <CardResumoOKRs />
      </div>

      <div className={styles.listaRelatorios}>
        <ListaRelatorios />
      </div>
    </div>
  );
};

export default PaginaRelatorios;