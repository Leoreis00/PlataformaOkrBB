import styles from './UltimasMetas.module.css';
import { FaMapMarkerAlt, FaShapes, FaBuilding, FaChartLine, FaBullseye, FaCalendarAlt } from 'react-icons/fa';

export function UltimasMetas() {
  return (
    <div className={styles.ultimasContainer}>
      <h4 className={styles.titulo}>Últimas metas registradas</h4>

      <div className={styles.card}>
        <strong><FaMapMarkerAlt /> Aumentar engajamento nas redes sociais</strong>
        <p><FaShapes /> Tipo: Estratégica</p>
        <p><FaBuilding /> Área: Marketing</p>
        <p><FaChartLine /> Indicador: <span className={styles.link}>Taxa de engajamento</span></p>
        <p><FaBullseye /> Valor Esperado: <span className={styles.highlight}>25%</span></p>
        <p><FaCalendarAlt /> Prazo: 30/06/2025</p>
      </div>

      <div className={styles.card}>
        <strong><FaMapMarkerAlt /> Reduzir tempo de atendimento ao cliente</strong>
        <p><FaShapes /> Tipo: Operacional</p>
        <p><FaBuilding /> Área: Suporte</p>
        <p><FaChartLine /> Indicador: <span className={styles.link}>Tempo médio de atendimento</span></p>
        <p><FaBullseye /> Valor Esperado: <span className={styles.highlight}>5 minutos</span></p>
        <p><FaCalendarAlt /> Prazo: 31/05/2025</p>
      </div>
    </div>
  );
}
