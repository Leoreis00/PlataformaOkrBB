import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './EditarOKR.module.css';
import { useNavigate, useParams } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

const EditarOKR = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    objetivo: '',
    resultadoChave: '',
    metrica: '',
    areaResponsavel: '',
    periodo: '',
    tipo: '',
    status: '',
    descricao: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchOKR = async () => {
      try {
        const response = await axios.get(`${apiUrl}/okrs/${id}`);
        const data = response.data;

        setForm({
          objetivo: data.objetivo || '',
          resultadoChave: data.resultado_chave || '',
          metrica: data.metrica || '',
          areaResponsavel: data.area_responsavel || '',
          periodo: data.periodo || '',
          tipo: data.tipo || '',
          status: data.status || '',
          descricao: data.descricao || '',
        });
      } catch (err) {
        setError('Erro ao carregar dados da OKR.');
        console.error(err);
      }
    };

    fetchOKR();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg('');

    try {
      const dadosParaEnviar = {
        objetivo: form.objetivo,
        resultado_chave: form.resultadoChave,
        metrica: form.metrica,
        area_responsavel: form.areaResponsavel,
        periodo: form.periodo,
        tipo: form.tipo,
        status: form.status,
        descricao: form.descricao,
      };

      await axios.put(`${apiUrl}/okrs/${id}`, dadosParaEnviar);

      setSuccessMsg('OKR atualizada com sucesso!');
    } catch (err) {
      setError('Erro ao atualizar OKR. Tente novamente.');
      console.error('Erro ao atualizar OKR:', err.response || err.message || err);
    } finally {
      setLoading(false);
    }
  };

  const irParaGestao = () => {
    navigate('/gestao');
  };

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.pageTitle}>Editar OKR</h1>
      <div className={styles.container}>
        <h2 className={styles.formTitle}>Alterar informações da OKR</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Objetivo:
            <input
              type="text"
              name="objetivo"
              value={form.objetivo}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Resultado-chave:
            <input
              type="text"
              name="resultadoChave"
              value={form.resultadoChave}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Métrica:
            <input
              type="text"
              name="metrica"
              value={form.metrica}
              onChange={handleChange}
            />
          </label>

          <label>
            Área Responsável:
            <select
              name="areaResponsavel"
              value={form.areaResponsavel}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="TI">TI</option>
              <option value="RH">RH</option>
              <option value="Marketing">Marketing</option>
            </select>
          </label>

          <label>
            Período:
            <input
              type="text"
              name="periodo"
              value={form.periodo}
              onChange={handleChange}
            />
          </label>

          <label>
            Tipo:
            <select name="tipo" value={form.tipo} onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="Resultado">Resultado</option>
              <option value="Esforço">Esforço</option>
            </select>
          </label>

          <label>
            Status:
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="Planejamento">Planejamento</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Concluído">Concluído</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </label>

          <label>
            Descrição:
            <textarea
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
            />
          </label>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Salvando...' : 'Alterar OKR'}
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={irParaGestao}
            style={{ marginLeft: '1rem' }}
          >
            Ver OKRs
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
      </div>
    </div>
  );
};

export default EditarOKR;
