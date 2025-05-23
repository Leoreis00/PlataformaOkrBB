import React from "react";
import { FaStar } from "react-icons/fa";
import styles from "./StatusMetas.module.css";

export default function StatusMetas() {
  return (
    <div>
      <div className={styles.tituloComIcone}>
        <h3>Status de Metas</h3>
        <FaStar className={styles.iconeEstrela} />
      </div>

      <div className={styles.container}>
        <div className={styles.statusBloco}>
          <h3>Em progresso</h3>
          <span className={styles.numero}>2</span>
          <p>Metas em andamento</p>
        </div>

        <div className={styles.statusBlocoConcluidas}>
          <h3>Concluídas</h3>
          <span className={styles.numero}>1</span>
          <p>Metas concluídas</p>
        </div>
      </div>
    </div>
  );
}
