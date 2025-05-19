import React, { useState } from "react";
import styles from "./Alertas.module.css";
import { 
  FaExclamationTriangle, 
  FaCircle, 
  FaPlus, 
  FaTrash, 
  FaStickyNote,
  FaInfoCircle,
  FaCheckCircle
} from "react-icons/fa";

export default function Alertas() {
  const [showInput, setShowInput] = useState(false);
  const [obs, setObs] = useState("");
  const [observacoes, setObservacoes] = useState([]);

  function handleAddClick() {
    setShowInput(true);
  }

  function handleChange(e) {
    setObs(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (obs.trim() === "") return;
    setObservacoes([...observacoes, obs.trim()]);
    setObs("");
    setShowInput(false);
  }

  function handleRemove(index) {
    setObservacoes(observacoes.filter((_, i) => i !== index));
  }

  return (
    <div className={styles.container}>
      <div className={styles.alertWarning}>
        <span className={styles.icon}><FaExclamationTriangle /></span>
        OKR “Aumentar receita recorrente” está atrasado
      </div>
      <div className={styles.alertGray}>
        <span className={styles.icon}><FaCircle /></span>
        Este OKR teve pouco impacto nos KPIs
      </div>

      {/* Novos alertas adicionados */}
      <div className={styles.alertInfo}>
        <span className={styles.icon}><FaInfoCircle /></span>
        Nova meta adicionada para o próximo trimestre
      </div>

      <div className={styles.alertSuccess}>
        <span className={styles.icon}><FaCheckCircle /></span>
        OKR “Melhorar satisfação do cliente” foi concluído com sucesso
      </div>

      {observacoes.length > 0 && (
        <div className={styles.observacoes}>
          {observacoes.map((o, i) => (
            <div key={i} className={styles.observacaoItem}>
              <span className={styles.icon}><FaStickyNote /></span> {o}
              <button 
                className={styles.removeBtn} 
                onClick={() => handleRemove(i)} 
                aria-label="Remover observação"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}

      <div
        className={styles.alertWhite}
        onClick={!showInput ? handleAddClick : undefined}
        style={{ cursor: !showInput ? "pointer" : "default" }}
      >
        <span className={styles.icon}><FaPlus /></span>
        {!showInput ? (
          "Adicionar observação"
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "inline" }}>
            <input
              type="text"
              value={obs}
              onChange={handleChange}
              onBlur={() => setShowInput(false)}
              autoFocus
              placeholder="Digite a observação"
              className={styles.inputObservacao}
            />
          </form>
        )}
      </div>
    </div>
  );
}
