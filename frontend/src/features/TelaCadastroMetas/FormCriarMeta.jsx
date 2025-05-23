import styles from './FormCriarMeta.module.css';

export function FormCriarMeta() {
  return (
    <div className={styles.formContainer}>
      <h2>Criar Nova Meta</h2>
      <form>
        <label>Nome da Meta <span>*</span></label>
        <input placeholder="Crie nome da sua meta" required />

        <label>Tipo de Meta <span>*</span></label>
        <select required>
          <option value="">Selecione o tipo</option>
        </select>

        <label>Prazo para Cumprimento <span>*</span></label>
        <input type="date" required />

        <label>Área Responsável <span>*</span></label>
        <select required>
          <option value="">Selecione a área responsável</option>
        </select>

        <label>Valor Esperado</label>
        <input placeholder='Ex: "150.000", "80%", "5 minutos"' />

        <label>Descrição (opcional)</label>
        <textarea placeholder="Detalhe aqui os objetivos específicos dessa meta..."></textarea>

        <button type="submit">Criar meta</button>
      </form>
    </div>
  );
}

