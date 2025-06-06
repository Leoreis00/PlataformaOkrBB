import React, { useEffect, useState, useMemo } from 'react';
import styles from './CadastroOKRsUnificada.module.css';
import {
    FaEdit, FaTrash, FaPlus, FaTimes, FaChartLine,
    FaBullseye, FaKey, FaCalendarAlt, FaUsers,
    FaProjectDiagram, FaPercentage, FaDollarSign,
    FaAlignLeft
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const getProgressBarColorClass = (progresso) => {
    if (progresso < 34) return styles.progressRed;
    if (progresso < 67) return styles.progressBlue;
    return styles.progressGreen;
};

// Nova função para obter a classe de cor de fundo do cabeçalho do card
// Garante que o status é formatado para corresponder às classes CSS
const getCardHeaderColorClass = (status) => {
    // Normaliza o status para remover espaços e converter para minúsculas
    const statusFormatted = status.replace(/\s+/g, '').toLowerCase();
    switch (statusFormatted) {
        case 'planejamento': return styles.statusplanejamento_bg;
        case 'emandamento': return styles.statusemandamento_bg;
        case 'concluído': return styles.statusconcluído_bg;
        case 'bloqueado': return styles.statusbloqueado_bg;
        case 'cancelado': return styles.statuscancelado_bg;
        default: return '';
    }
};

const CadastroOKRsUnificada = () => {
    const [form, setForm] = useState({
        objetivo: '', resultado_chave: '', area_responsavel: '', periodo: '',
        tipo: '', status: 'Planejamento', progresso: 0, impacto_financeiro: '',
        trimestre: '', peso_kpi: 0, descricao: '',
    });

    const [okrs, setOkrs] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });
    const [trimestreFiltro, setTrimestreFiltro] = useState('recentes');

    useEffect(() => {
        buscarOKRs();
    }, []);

    const buscarOKRs = async () => {
        try {
            const resposta = await axios.get(`${apiUrl}/okrs`);
            const okrsOrdenados = [...resposta.data].sort((a, b) => b.id - a.id);
            setOkrs(okrsOrdenados);
        } catch (error) {
            console.error("Erro ao buscar OKRs:", error);
            setMensagem({ texto: 'Falha ao carregar OKRs. Verifique a conexão com o backend.', tipo: 'erro' });
        }
    };

    const limparFormulario = () => {
        setForm({
            objetivo: '', resultado_chave: '', area_responsavel: '', periodo: '',
            tipo: '', status: 'Planejamento', progresso: 0, impacto_financeiro: '',
            trimestre: '', peso_kpi: 0, descricao: '',
        });
        setEditandoId(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensagem({ texto: '', tipo: '' });
        try {
            const dadosParaEnviar = { ...form, progresso: Number(form.progresso) || 0, impacto_financeiro: parseFloat(String(form.impacto_financeiro).replace(',', '.')) || 0, peso_kpi: Number(form.peso_kpi) || 0 };
            if (editandoId) {
                await axios.put(`${apiUrl}/okrs/${editandoId}`, dadosParaEnviar);
                setMensagem({ texto: 'OKR atualizada com sucesso!', tipo: 'sucesso' });
            } else {
                await axios.post(`${apiUrl}/okrs`, dadosParaEnviar);
                setMensagem({ texto: 'OKR cadastrada com sucesso!', tipo: 'sucesso' });
            }
            limparFormulario();
            buscarOKRs();
        } catch (error) {
            console.error('Erro ao salvar OKR:', error);
            const errorMsg = error.response?.data?.error || 'Erro desconhecido ao salvar OKR.';
            setMensagem({ texto: `Erro ao salvar OKR: ${errorMsg}`, tipo: 'erro' });
        }
    };

    const handleEditar = (okr) => {
        setForm({ ...okr, impacto_financeiro: String(okr.impacto_financeiro || ''), progresso: String(okr.progresso || '0'), peso_kpi: String(okr.peso_kpi || '0') });
        setEditandoId(okr.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelarEdicao = () => {
        limparFormulario();
    };

    const handleExcluir = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir esta OKR?')) return;
        try {
            await axios.delete(`${apiUrl}/okrs/${id}`);
            setMensagem({ texto: 'OKR excluída com sucesso!', tipo: 'sucesso' });
            buscarOKRs();
        } catch {
            setMensagem({ texto: 'Erro ao excluir OKR.', tipo: 'erro' });
        }
    };

    const okrsExibidas = useMemo(() => {
        if (trimestreFiltro === 'recentes') {
            return okrs.slice(0, 6);
        }
        return okrs.filter(okr => okr.trimestre === trimestreFiltro);
    }, [okrs, trimestreFiltro]);

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>Gestão de OKRs</h1>
                <div className={styles.headerActions}>
                    <div className={styles.filtroWrapper}>
                        <label htmlFor="filtroTrimestre" className={styles.filtroLabel}>Filtrar por:</label>
                        <select
                            id="filtroTrimestre"
                            className={styles.filtroSelect}
                            value={trimestreFiltro}
                            onChange={(e) => setTrimestreFiltro(e.target.value)}
                        >
                            <option value="recentes">Mais Recentes</option>
                            <option value="Q1">1º Trimestre (Q1)</option>
                            <option value="Q2">2º Trimestre (Q2)</option>
                            <option value="Q3">3º Trimestre (Q3)</option>
                            <option value="Q4">4º Trimestre (Q4)</option>
                        </select>
                    </div>
                    <Link to="/visualizar-okr" className={`${styles.botaoNavegacao} ${styles.botaoVisualizar}`}>
                        <FaChartLine /> Visualizar OKRs
                    </Link>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.formularioWrapper}>
                    <form className={styles.formulario} onSubmit={handleSubmit}>
                        <h2 className={styles.formTitle}>{editandoId ? `Editando OKR (ID: ${editandoId})` : <> Cadastrar Nova OKR</>}</h2>
                        <div className={styles.formGroup}>
                            <div>
                                <label htmlFor="objetivo">Objetivo</label>
                                <div className={styles.inputWrapper}>
                                    <FaBullseye className={styles.inputIcon}/>
                                    <input id="objetivo" name="objetivo" onChange={handleChange} placeholder="Ex: Expandir para novos mercados globais" required type="text" value={form.objetivo}/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="resultado_chave">Resultado-Chave</label>
                                <div className={styles.inputWrapper}>
                                    <FaKey className={styles.inputIcon}/>
                                    <input id="resultado_chave" name="resultado_chave" onChange={handleChange} placeholder="Ex: Aumentar receita em 20% no mercado internacional" required type="text" value={form.resultado_chave}/>
                                </div>
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <div className={styles.gridDois}>
                                <div>
                                    <label htmlFor="area_responsavel">Área Responsável</label>
                                    <select id="area_responsavel" name="area_responsavel" onChange={handleChange} required value={form.area_responsavel}>
                                        <option value="">Selecione a Área</option>
                                        {['TI','RH','Marketing','Vendas','Operações','Financeiro','Diretoria'].map((area)=><option key={area} value={area}>{area}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="periodo">Período de Vigência</label>
                                    <div className={styles.inputWrapper}>
                                        <FaCalendarAlt className={styles.inputIcon}/>
                                        <input id="periodo" name="periodo" onChange={handleChange} placeholder="Ex: 2025 Anual" required type="text" value={form.periodo}/>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.gridDois}>
                                <div>
                                    <label htmlFor="trimestre">Trimestre Foco</label>
                                    <select id="trimestre" name="trimestre" onChange={handleChange} required value={form.trimestre}>
                                        <option value="">Selecione o Trimestre</option>
                                        {['Q1','Q2','Q3','Q4'].map((q)=><option key={q} value={q}>{q}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="tipo">Tipo de OKR</label>
                                    <select id="tipo" name="tipo" onChange={handleChange} required value={form.tipo}>
                                        <option value="">Selecione o Tipo</option>
                                        <option value="Resultado">Resultado (Outcome)</option>
                                        <option value="Esforço">Esforço (Output)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <div className={styles.gridTres}>
                                <div>
                                    <label htmlFor="progresso">Progresso Atual (%)</label>
                                    <div className={styles.inputWrapper}>
                                        <FaPercentage className={styles.inputIcon}/>
                                        <input id="progresso" max="100" min="0" name="progresso" onChange={handleChange} placeholder="0-100" required type="number" value={form.progresso}/>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="impacto_financeiro">Impacto Financeiro (R$)</label>
                                    <div className={styles.inputWrapper}>
                                        <FaDollarSign className={styles.inputIcon}/>
                                        <input id="impacto_financeiro" name="impacto_financeiro" onChange={handleChange} placeholder="Ex: 1500,50" type="text" value={form.impacto_financeiro}/>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="peso_kpi">Peso KPI</label>
                                    <select id="peso_kpi" name="peso_kpi" onChange={handleChange} required value={form.peso_kpi}>
                                        <option value="">Selecione</option>
                                        {[...Array(10)].map((_,i)=><option key={i+1} value={i+1}>{i+1}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="status">Status Atual</label>
                                <select id="status" name="status" onChange={handleChange} required value={form.status}>
                                    <option value="">Selecione o Status</option>
                                    {['Planejamento','Em andamento','Concluído','Bloqueado','Cancelado'].map((s)=><option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="descricao">Descrição Detalhada</label>
                                <div className={styles.inputWrapper}>
                                    <FaAlignLeft className={styles.inputIconTextarea}/>
                                    <textarea id="descricao" name="descricao" onChange={handleChange} placeholder="Detalhes adicionais, contexto, dependências..." value={form.descricao}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className={styles.botoesForm}>
                            <button className={styles.botaoPrincipal} type="submit">{editandoId ? 'Salvar Alterações' : <><FaPlus/> Cadastrar OKR</>}</button>
                            {editandoId && <button className={styles.botaoCancelar} onClick={handleCancelarEdicao} type="button"><FaTimes/> Cancelar</button>}
                        </div>
                        {mensagem.texto && <p className={mensagem.tipo === 'sucesso' ? styles.mensagemSucesso : styles.mensagemErro}>{mensagem.texto}</p>}
                    </form>
                </div>

                <div className={styles.colunaCards}>
                    <div className={styles.cardsHeader}>
                        <h2>
                            {trimestreFiltro === 'recentes'
                                ? 'OKRs Recentes'
                                : `OKRs do ${trimestreFiltro}`}
                        </h2>
                    </div>
                    <div className={styles.cardsContainer}>
                        {okrsExibidas.map((okr, index) => (
                            <div key={okr.id} className={styles.cardOKR}>
                                {/* Aplica a classe de cor de fundo baseada no status */}
                                <div className={`${styles.cardHeader} ${getCardHeaderColorClass(okr.status)}`}>
                                    <h3><span className={styles.cardIndex}>{index + 1}.</span> {okr.objetivo}</h3>
                                    {/* Manteve o statusBadge para o texto do status */}
                                    <span className={`${styles.statusBadge} ${styles['status' + okr.status.replace(/\s+/g, '').toLowerCase()]}`}>{okr.status}</span>
                                </div>
                                <div className={styles.cardBody}>
                                    <p><FaKey className={styles.cardInfoIcon} /><strong>ID:</strong> {okr.id}</p>
                                    <p><FaBullseye className={styles.cardInfoIcon} /><strong>KR:</strong> {okr.resultado_chave}</p>
                                    <p><FaUsers className={styles.cardInfoIcon} /><strong>Área:</strong> {okr.area_responsavel}</p>
                                    <p><FaProjectDiagram className={styles.cardInfoIcon} /><strong>Tipo:</strong> {okr.tipo}</p>
                                </div>
                                <div className={styles.cardFooter}>
                                    <div className={styles.progressoInfo}>
                                        <span className={styles.progressText}>{okr.progresso}%</span>
                                        <div className={styles.progressBarContainer}>
                                            <div className={`${styles.progressBarFill} ${getProgressBarColorClass(okr.progresso)}`} style={{width: `${okr.progresso}%`}}></div>
                                        </div>
                                    </div>
                                    <div className={styles.cardButtons}>
                                        <button type="button" onClick={() => handleEditar(okr)} className={styles.acaoLink}><FaEdit /> Editar</button>
                                        <button type="button" onClick={() => handleExcluir(okr.id)} className={`${styles.acaoLink} ${styles.acaoExcluir}`}><FaTrash /> Excluir</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {okrsExibidas.length === 0 && (
                            <p className={styles.semOkrs}>
                                {trimestreFiltro === 'recentes'
                                    ? 'Nenhuma OKR cadastrada para exibir.'
                                    : `Nenhuma OKR encontrada para o ${trimestreFiltro}.`}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CadastroOKRsUnificada;