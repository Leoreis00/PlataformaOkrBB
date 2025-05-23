import React, { useEffect, useState } from 'react';
import styles from './CadastroOKRsUnificada.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const CadastroOKRsUnificada = () => {
  const [form, setForm] = useState({
    objetivo: '',
    resultado_chave: '',
    area_responsavel: '',
    periodo: '',
    tipo: '',
    status: '',
    progresso: 0,
    impacto_financeiro: 0,
    trimestre: '',
    peso_kpi: 0,
    descricao: '',
  });

  const [okrs, setOkrs] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    buscarOKRs();
  }, []);

  const buscarOKRs = async () => {
    const resposta = await axios.get(`${apiUrl}/okrs`);
    setOkrs(resposta.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dadosParaEnviar = {
        ...form,
        progresso: Number(form.progresso),
        impacto_financeiro: Number(form.impacto_financeiro),
        peso_kpi: Number(form.peso_kpi),
      };

      if (editandoId) {
        await axios.put(`${apiUrl}/okrs/${editandoId}`, dadosParaEnviar);
        setMensagem('OKR atualizada com sucesso!');
      } else {
        await axios.post(`${apiUrl}/okrs`, dadosParaEnviar);
        setMensagem('OKR cadastrada com sucesso!');
      }

      setForm({
        objetivo: '',
        resultado_chave: '',
        area_responsavel: '',
        periodo: '',
        tipo: '',
        status: '',
        progresso: 0,
        impacto_financeiro: 0,
        trimestre: '',
        peso_kpi: 0,
        descricao: '',
      });
      setEditandoId(null);
      buscarOKRs();
    } catch (error) {
      setMensagem('Erro ao salvar OKR');
    }
  };

  const handleEditar = (okr) => {
    setForm(okr);
    setEditandoId(okr.id);
  };

  const handleExcluir = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta OKR?')) return;

    try {
      await axios.delete(`${apiUrl}/okrs/${id}`);
      setMensagem('OKR excluída com sucesso!');
      buscarOKRs();
    } catch {
      setMensagem('Erro ao excluir OKR');
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.pageTitle}>Gestão de OKRs</h1>

      <div className={styles.container}>
        <form className={styles.formulario} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>{editandoId ? 'Editar OKR' : 'Cadastro de OKRs'}</h2>

          {[
            { label: 'Objetivo', name: 'objetivo', type: 'text' },
            { label: 'Resultado-chave', name: 'resultado_chave', type: 'text' },
            { label: 'Período', name: 'periodo', type: 'text' },
            { label: 'Progresso (%)', name: 'progresso', type: 'number', min: 0, max: 100 },
            { label: 'Impacto Financeiro (R$)', name: 'impacto_financeiro', type: 'number' }
          ].map(({ label, name, type, ...rest }) => (
            <div className={styles.formGroup} key={name}>
              <label>{label}</label>
              <input type={type} name={name} value={form[name]} onChange={handleChange} {...rest} />
            </div>
          ))}

          <div className={styles.formGroup}>
            <label>Área Responsável</label>
            <select name="area_responsavel" value={form.area_responsavel} onChange={handleChange} required>
              <option value="">Selecione</option>
              {['TI', 'RH', 'Marketing', 'Vendas', 'Operações', 'Financeiro'].map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Tipo</label>
            <select name="tipo" value={form.tipo} onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="Resultado">Resultado</option>
              <option value="Esforço">Esforço</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="">Selecione</option>
              {['Planejamento', 'Em andamento', 'Concluído'].map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Trimestre</label>
            <select name="trimestre" value={form.trimestre} onChange={handleChange}>
              <option value="">Selecione</option>
              {['Q1', 'Q2', 'Q3', 'Q4'].map((q) => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Peso no KPI</label>
            <select name="peso_kpi" value={form.peso_kpi} onChange={handleChange} required>
              <option value="">Selecione</option>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>

          {/* Descrição por último */}
          <div className={styles.formGroup}>
            <label>Descrição</label>
            <textarea name="descricao" value={form.descricao} onChange={handleChange} />
          </div>

          <button type="submit">{editandoId ? 'Atualizar' : 'Cadastrar'}</button>
          {mensagem && <p className={styles.mensagem}>{mensagem}</p>}
        </form>

        <div className={styles.cardsContainer}>
          {okrs.map((okr, index) => (
            <div key={okr.id} className={styles.cardOKR}>
              <h3>{index + 1}. {okr.objetivo}</h3>
              <p><strong>Resultado-chave:</strong> {okr.resultado_chave}</p>
              <p><strong>Área:</strong> {okr.area_responsavel}</p>
              <p><strong>Período:</strong> {okr.periodo}</p>
              <p><strong>Tipo:</strong> {okr.tipo}</p>
              <p><strong>Status:</strong> {okr.status}</p>
              <p><strong>Progresso:</strong> {okr.progresso}%</p>
              <p><strong>Impacto Financeiro:</strong> R$ {okr.impacto_financeiro?.toLocaleString('pt-BR')}</p>
              <p><strong>Trimestre:</strong> {okr.trimestre}</p>
              <p><strong>Peso no KPI:</strong> {okr.peso_kpi}</p>
              <p><strong>Descrição:</strong> {okr.descricao}</p>

              <div className={styles.cardButtons}>
                <button onClick={() => handleEditar(okr)} title="Editar"><FaEdit /></button>
                <button onClick={() => handleExcluir(okr.id)} title="Excluir"><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CadastroOKRsUnificada;
