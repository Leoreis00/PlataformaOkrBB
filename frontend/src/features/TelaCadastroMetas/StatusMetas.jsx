import styles from './StatusMetas.module.css';
import { FaStar } from 'react-icons/fa';

export function StatusMetas() {
  return (
    <div className={styles.statusContainer}>
      <h2 className={styles.statusTitle}>
        Status de Metas <FaStar style={{ color: 'yellow' }} />
      </h2>

      <div className={styles.inProgress}>
        <p>Em progresso</p>
        <h1>2</h1>
        <span>Metas em andamento</span>
      </div>

      <div className={styles.completed}>
        <p>Concluídas</p>
        <h1>0</h1>
        <span>Metas concluídas</span>
      </div>
    </div>
  );
}
