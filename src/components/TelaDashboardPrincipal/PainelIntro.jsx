import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import styles from "./PainelIntro.module.css";

export default function PainelIntro() {
  const handleClick = () => {
    alert("Novo indicador adicionado!");
  };

  return (
    <>
    <div className={styles.container}>
      <h3 className={styles.titulo}>Painel de visualização geral de OKR</h3>
      <div className={styles.painel}>
        <button className={styles.botao} onClick={handleClick}>
          <FaPlusCircle className={styles.icone} />
        </button>

        <p className={styles.texto}>
          Os dashboards são suas ferramentas centrais para acompanhar OKRs, metas e muito mais.
          Clique aqui para personalizar e visualizar os indicadores mais importantes para você.
        </p>
      </div>
    </div>
    </>
  );
}
