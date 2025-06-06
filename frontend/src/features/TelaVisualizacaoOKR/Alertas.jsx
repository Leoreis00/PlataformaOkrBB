import React, { useState, useEffect, useRef } from "react";
import styles from "./Alertas.module.css";
import {
  FaExclamationTriangle,
  FaCircle,
  FaPlus,
  FaTrash,
  FaStickyNote,
  FaInfoCircle,
  FaCheckCircle,
  FaEdit,
  FaSave,
} from "react-icons/fa";

export default function Alertas() {
  // ... (todo o seu estado e funções existentes permanecem aqui) ...
  // Estado para observações existentes
  const [observacoes, setObservacoes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // Estado para a nova observação
  const [newObs, setNewObs] = useState("");
  const [showActionButtons, setShowActionButtons] = useState(false);

  // Manipuladores para observações existentes (edição, remoção)
  function handleEdit(index) {
    setEditIndex(index);
    setEditText(observacoes[index]);
  }

  function handleEditChange(e) {
    setEditText(e.target.value);
  }

  function handleSaveEdit(index) {
    if (editText.trim() === "") {
      setEditIndex(null);
      setEditText("");
      return;
    }
    const updatedObservacoes = [...observacoes];
    updatedObservacoes[index] = editText.trim();
    setObservacoes(updatedObservacoes);
    setEditIndex(null);
    setEditText("");
  }

  const cancelEdit = () => {
    setEditIndex(null);
    setEditText("");
  };

  function handleRemove(index) {
    setObservacoes(prevObs => prevObs.filter((_, i) => i !== index));
  }

  // Manipuladores para a NOVA observação
  function handleNewObsChange(e) {
    setNewObs(e.target.value);
    if (e.target.value.trim() !== "" && !showActionButtons) {
      setShowActionButtons(true);
    }
  }

  function handleFormFocus() {
    setShowActionButtons(true);
  }

  function handleFormBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      if (newObs.trim() === "") {
        setShowActionButtons(false);
      }
    }
  }

  function handleNewObservationCancel() {
    setNewObs("");
    setShowActionButtons(false);
  }

  function handleNewObservationSubmit(e) {
    e.preventDefault();
    if (newObs.trim() === "") {
      if (showActionButtons) {
        setShowActionButtons(false);
      }
      return;
    }
    setObservacoes(prevObs => [...prevObs, newObs.trim()]);
    setNewObs("");
    setShowActionButtons(false);
  }

  return (
    <div className={styles.container}>
      {/* TÍTULO ADICIONADO AQUI */}
      <h2 className={styles.cardTitle}>Alertas e Observações</h2>

      {/* Restante do conteúdo do card... */}
      <div className={styles.alertWarning}>
        <span className={styles.icon}><FaExclamationTriangle /></span>
        OKR “Aumentar receita recorrente” está atrasado
      </div>
      <div className={styles.alertGray}>
        <span className={styles.icon}><FaCircle /></span>
        Este OKR teve pouco impacto nos KPIs
      </div>
      <div className={styles.alertInfo}>
        <span className={styles.icon}><FaInfoCircle /></span>
        Nova meta adicionada para o próximo trimestre
      </div>
      <div className={styles.alertSuccess}>
        <span className={styles.icon}><FaCheckCircle /></span>
        OKR “Melhorar satisfação do cliente” foi concluído com sucesso
      </div>

      {observacoes.map((texto, index) => (
        <div key={index} className={styles.alertObservacao}>
          <span className={styles.icon}><FaStickyNote /></span>
          {editIndex === index ? (
            <input
              type="text"
              value={editText}
              onChange={handleEditChange}
              className={styles.editInput}
              autoFocus
              onBlur={() => handleSaveEdit(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveEdit(index);
                if (e.key === 'Escape') cancelEdit();
              }}
            />
          ) : (
            <span className={styles.texto} onClick={() => handleEdit(index)} title="Clique para editar">
              {texto}
            </span>
          )}
          <div className={styles.actions}>
            {editIndex === index ? (
              <button onClick={() => handleSaveEdit(index)} className={styles.iconBtn} title="Salvar edição">
                <FaSave />
              </button>
            ) : (
              <button onClick={() => handleEdit(index)} className={styles.iconBtn} title="Editar observação">
                <FaEdit />
              </button>
            )}
            <button onClick={() => handleRemove(index)} className={styles.iconBtn} title="Excluir observação">
              <FaTrash />
            </button>
          </div>
        </div>
      ))}

      <div className={styles.alertWhite}>
        <span className={styles.icon}><FaPlus /></span>
        <form 
          onSubmit={handleNewObservationSubmit} 
          className={styles.inputForm}
          onFocus={handleFormFocus}
          onBlur={handleFormBlur}
        >
          <input
            type="text"
            value={newObs}
            onChange={handleNewObsChange}
            placeholder="Adicionar uma observação..."
            className={styles.inputObservacao}
          />
          {showActionButtons && (
            <div className={styles.formActions}>
              <button type="submit" className={styles.addBtnPrimary} title="Adicionar nova observação">
                Adicionar
              </button>
              <button type="button" className={styles.cancelTextBtn} onClick={handleNewObservationCancel} title="Cancelar adição">
                Cancelar
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}