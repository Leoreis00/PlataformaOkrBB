import React from "react";
import {
  FaCheckCircle,
  FaPlusCircle,
  FaEdit,
  FaUserPlus,
  FaSyncAlt,
  FaTimesCircle,
} from "react-icons/fa";
import styles from "./UltimasAtividades.module.css";

export default function UltimasAtividades() {
  return (
    <div>
      <h3 className={styles.titulo}>Últimas atividades</h3>

      <div className={styles.container}>
        <ul className={styles.lista}>
          <li><FaCheckCircle className={styles.icon} /> Resultado-chave concluído: 'Alcançar 95% de satisfação...' – 11 de abril, 09:42</li>
          <li><FaPlusCircle className={styles.icon} /> Novo OKR criado: 'Expandir presença digital...' – 10 de abril, 17:30</li>
          <li><FaEdit className={styles.icon} /> Meta editada: 'Aumentar engajamento...' – 10 de abril, 15:12</li>
          <li><FaUserPlus className={styles.icon} /> Proprietário adicionado: Ana Lima atribuída à meta – 10 de abril, 13:08</li>
          <li><FaSyncAlt className={styles.icon} /> Progressos atualizados – 9 de abril, 18:40</li>
          <li><FaTimesCircle className={styles.icon} /> OKR encerrado: 'Reduzir tempo médio de atendimento...' – 9 de abril, 10:25</li>
          <li><FaTimesCircle className={styles.icon} /> OKR encerrado: 'Reduzir tempo médio de...' – 9 de abril, 8:25</li>
        </ul>
      </div>
    </div>
  );
}
