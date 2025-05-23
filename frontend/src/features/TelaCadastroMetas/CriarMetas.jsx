import { FormCriarMeta } from '../TelaCadastroMetas/FormCriarMeta.jsx';
import { StatusMetas } from '../TelaCadastroMetas/StatusMetas.jsx';
import { UltimasMetas } from '../TelaCadastroMetas/UltimasMetas.jsx';
import styles from "../TelaCadastroMetas/CriarMetas.module.css";

export function CriarMetas() {
  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Criar metas</h1>
      <div className={styles.grid}>
        <FormCriarMeta />
        <div>
          <StatusMetas />
          <UltimasMetas />
        </div>
      </div>
    </div>
  );
}
