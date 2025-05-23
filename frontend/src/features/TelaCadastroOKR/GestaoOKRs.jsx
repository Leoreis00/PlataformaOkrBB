import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './GestaoOKRs.module.css';

const apiUrl = import.meta.env.VITE_API_URL;

const statusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'planejamento':
      return styles.planejamento;
    case 'em andamento':
      return styles.emandamento;
    case 'concluído':
      return styles.concluido;
    default:
      return '';
  }
};

const GestaoOKRs = () => {
  const [okrs, setOkrs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchOkrs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${apiUrl}/okrs`);
      setOkrs(response.data);
    } catch (err) {
      setError('Erro ao carregar OKRs.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOkrs();
  }, []);

  const handleExcluir = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta OKR?')) return;

    try {
      await axios.delete(`${apiUrl}/okrs/${id}`);
      setOkrs(okrs.filter((okr) => okr.id !== id));
    } catch (err) {
      alert('Erro ao excluir OKR. Tente novamente.');
      console.error(err);
    }
  };

  const handleEditar = (id) => {
    navigate(`/editar/${id}`);
  };

  if (loading) return <p className={styles.pageTitle}>Carregando OKRs...</p>;
  if (error) return <p className={styles.pageTitle} style={{ color: 'red' }}>{error}</p>;

  if (okrs.length === 0) {
    return (
      <div className={styles.pageWrapper}>
        <h1 className={styles.pageTitle}>Gestão de OKRs</h1>
        <p>Nenhuma OKR cadastrada.</p>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.pageTitle}>Gestão de OKRs</h1>
      <div className={styles.cardsContainer}>
        {okrs.map((okr, index) => (
          <div className={styles.card} key={okr.id}>
            <div className={styles.cardHeader}>
              <div className={styles.cardNumber}>{index + 1}</div>
              <h2 className={styles.cardTitle}>{okr.objetivo}</h2>
            </div>
            <p><strong>Área Responsável:</strong> {okr.area_responsavel}</p>
            <p>
              <strong>Status: </strong>
              <span className={`${styles.status} ${statusClass(okr.status)}`}>
                {okr.status}
              </span>
            </p>
            <div className={styles.cardActions}>
              <button
                className={`${styles.actionButton} ${styles.editButton}`}
                onClick={() => handleEditar(okr.id)}
              >
                Editar
              </button>
              <button
                className={`${styles.actionButton} ${styles.deleteButton}`}
                onClick={() => handleExcluir(okr.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestaoOKRs;
