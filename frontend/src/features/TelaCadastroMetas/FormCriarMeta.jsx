import React, { useState, useRef } from 'react'; // Importe useRef
import styles from './FormCriarMeta.module.css'; // CSS Module para este componente
import {
    FaBullseye,    // Para Nome da Meta (similar a Objetivo)
    FaListUl,      // Para Tipo de Meta (um ícone genérico para tipo/categoria)
    FaCalendarAlt, // Para Prazo
    FaUsers,       // Para Área Responsável
    FaTasks,       // Para Valor Esperado (genérico para metas/valores)
    FaAlignLeft,   // Para Descrição
    FaPlus         // Para o botão de criar
} from 'react-icons/fa';

export function FormCriarMeta() {
    const [formData, setFormData] = useState({
        nomeMeta: '',
        tipoMeta: '',
        prazoMeta: '',
        areaResponsavelMeta: '',
        valorEsperado: '',
        descricaoMeta: ''
    });

    // Crie uma ref para o input de prazo
    const prazoMetaRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implementar a lógica de submissão da meta
        console.log('Dados da Meta:', formData);
        // Ex: limparFormulario(); setMensagem({ texto: 'Meta criada com sucesso!', tipo: 'sucesso' });
    };

    const handleIconClick = () => {
        // Abre o seletor de data do input referenciado
        if (prazoMetaRef.current) {
            prazoMetaRef.current.showPicker();
        }
    };

    return (
        <div className={styles.formulario}> {/* Classe principal do formulário */}
            <h2 className={styles.formTitle}>
                {/* Opcional: Adicionar ícone ao título, se desejado, ex: <FaPlus style={{ marginRight: '8px' }} /> */}
                Criar Nova Meta
            </h2>
            <form onSubmit={handleSubmit}>
                {/* Nome da Meta */}
                <div className={styles.formGroup}>
                    <div>
                        <label htmlFor="nomeMeta">Nome da Meta</label>
                        <div className={styles.inputWrapper}>
                            <FaBullseye className={styles.inputIcon} />
                            <input
                                id="nomeMeta"
                                name="nomeMeta"
                                value={formData.nomeMeta}
                                onChange={handleChange}
                                placeholder="Defina um nome claro e conciso para sua meta"
                                required
                                type="text"
                            />
                        </div>
                    </div>
                </div>

                {/* Tipo de Meta e Prazo para Cumprimento */}
                <div className={styles.formGroup}>
                    <div className={styles.gridDois}>
                        <div>
                            <label htmlFor="tipoMeta">Tipo de Meta</label>
                            {/* Selects não utilizam inputWrapper com ícone no padrão OKR */}
                            <select
                                id="tipoMeta"
                                name="tipoMeta"
                                value={formData.tipoMeta}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione o tipo</option>
                                <option value="Financeira">Financeira</option>
                                <option value="Operacional">Operacional</option>
                                <option value="Estratégica">Estratégica</option>
                                <option value="Desenvolvimento Pessoal">Desenvolvimento Pessoal</option>
                                {/* Adicione mais tipos conforme necessário */}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="prazoMeta">Prazo para Cumprimento</label>
                            <div className={styles.inputWrapper}>
                                {/* Ícone clicável para abrir o calendário */}
                                <FaCalendarAlt className={styles.inputIcon} onClick={handleIconClick} />
                                <input
                                    id="prazoMeta"
                                    name="prazoMeta"
                                    type="date" // Mantido como 'date' para que showPicker() funcione
                                    value={formData.prazoMeta}
                                    onChange={handleChange}
                                    required
                                    ref={prazoMetaRef} // Anexe a ref ao input
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Área Responsável e Valor Esperado */}
                <div className={styles.formGroup}>
                    <div className={styles.gridDois}>
                        <div>
                            <label htmlFor="areaResponsavelMeta">Área Responsável</label>
                            <select
                                id="areaResponsavelMeta"
                                name="areaResponsavelMeta"
                                value={formData.areaResponsavelMeta}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione a área</option>
                                {['TI', 'RH', 'Marketing', 'Vendas', 'Operações', 'Financeiro', 'Diretoria', 'Individual'].map((area) => (
                                    <option key={area} value={area}>{area}</option>
                                ))}
                                {/* Adicione mais áreas conforme necessário */}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="valorEsperado">Valor Esperado</label>
                            <div className={styles.inputWrapper}>
                                <FaTasks className={styles.inputIcon} /> {/* Ou FaDollarSign, FaPercentage dependendo do foco */}
                                <input
                                    id="valorEsperado"
                                    name="valorEsperado"
                                    value={formData.valorEsperado}
                                    onChange={handleChange}
                                    placeholder='Ex: 150.000, 80%, Concluído'
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Descrição */}
                <div className={styles.formGroup}>
                    <div>
                        <label htmlFor="descricaoMeta">Descrição Detalhada</label>
                        <div className={styles.inputWrapper}>
                            <FaAlignLeft className={styles.inputIconTextarea} />
                            <textarea
                                id="descricaoMeta"
                                name="descricaoMeta"
                                value={formData.descricaoMeta}
                                onChange={handleChange}
                                placeholder="Detalhe aqui informações adicionais, contexto ou etapas chave para alcançar esta meta..."
                            />
                        </div>
                    </div>
                </div>

                {/* Botões do Formulário */}
                <div className={styles.botoesForm}>
                    <button className={styles.botaoPrincipal} type="submit">
                        <FaPlus /> Criar Meta
                    </button>
                    {/* Exemplo de botão Cancelar, se necessário no futuro:
                    <button className={styles.botaoCancelar} type="button" onClick={() => console.log('Cancelado')}>
                        <FaTimes /> Cancelar
                    </button>
                    */}
                </div>

                {/* Área para mensagens de sucesso/erro (opcional, como no form de OKRs)
                {mensagem.texto && <p className={mensagem.tipo === 'sucesso' ? styles.mensagemSucesso : styles.mensagemErro}>{mensagem.texto}</p>}
                */}
            </form>
        </div>
    );
}