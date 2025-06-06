import { useState, useMemo } from "react";
import { Download, ChevronDown, FileDown, Inbox } from "lucide-react";
import styles from "./ListaRelatorios.module.css";

// DADOS MOCKADOS (sem alteração)
const relatoriosMock = [
  { id: 1, title: "Relatório de Progresso de OKRs", generatedAt: "04/06/2025", period: "Q2 2025", status: "Pendente" },
  { id: 2, title: "Relatório de Alinhamento Estratégico", generatedAt: "03/06/2025", period: "Q2 2025", status: "Concluído" },
  { id: 3, title: "Relatório de Desempenho por Equipe", generatedAt: "03/06/2025", period: "Anual 2025", status: "Concluído" },
  { id: 4, title: "Relatório de OKRs Críticos", generatedAt: "02/06/2025", period: "Q2 2025", status: "Atrasado" },
  { id: 5, title: "Relatório de Impacto Estratégico", generatedAt: "01/06/2025", period: "Q1 2025", status: "Concluído" },
  { id: 6, title: "Relatório de Lições Aprendidas", generatedAt: "31/05/2025", period: "Q1 2025", status: "Pendente" },
];

const statusMap = {
  Concluído: styles.statusConcluido,
  Pendente: styles.statusPendente,
  Atrasado: styles.statusAtrasado,
};

const ListaRelatorios = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filtroSelecionado, setFiltroSelecionado] = useState("Todos");
  const [itensSelecionados, setItensSelecionados] = useState([]);
  const opcoesFiltro = ["Todos", "Concluído", "Pendente", "Atrasado"];

  const relatoriosFiltrados = useMemo(() => {
    if (filtroSelecionado === "Todos") return relatoriosMock;
    return relatoriosMock.filter((r) => r.status === filtroSelecionado);
  }, [filtroSelecionado]);

  const handleSelect = (id) => {
    setItensSelecionados((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setItensSelecionados(relatoriosFiltrados.map((r) => r.id));
    } else {
      setItensSelecionados([]);
    }
  };

  const isAllSelected = itensSelecionados.length === relatoriosFiltrados.length && relatoriosFiltrados.length > 0;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.titulo}>Relatórios</h1>
        <div className={styles.acoes}>
          <div className={styles.dropdownWrapper}>
            <button className={styles.dropdownButton} onClick={() => setDropdownOpen(!dropdownOpen)}>
              {filtroSelecionado} <ChevronDown size={16} />
            </button>
            {dropdownOpen && (
              <ul className={styles.dropdownList}>
                {opcoesFiltro.map((opcao) => (
                  <li key={opcao} className={styles.dropdownItem} onClick={() => { setFiltroSelecionado(opcao); setDropdownOpen(false); }}>
                    {opcao}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {itensSelecionados.length > 0 && (
            <button className={styles.botaoAcaoPrincipal}>
              <FileDown size={16} />
              Baixar ({itensSelecionados.length})
            </button>
          )}
        </div>
      </header>

      <main className={styles.listaContainer}>
        {relatoriosFiltrados.length > 0 ? (
          <>
            <div className={styles.listaHeader}>
              <input type="checkbox" onChange={handleSelectAll} checked={isAllSelected} aria-label="Selecionar todos os relatórios"/>
              <span>Relatório</span>
              <span>Data</span>
              <span>Período</span>
              <span className={styles.statusHeader}>Status</span>
            </div>
            {relatoriosFiltrados.map((relatorio) => (
              <div
                key={relatorio.id}
                // ✨ MUDANÇA PRINCIPAL AQUI: Adiciona a classe .itemSelecionado dinamicamente ✨
                className={`${styles.itemRelatorio} ${itensSelecionados.includes(relatorio.id) ? styles.itemSelecionado : ''}`}
              >
                <input type="checkbox" checked={itensSelecionados.includes(relatorio.id)} onChange={() => handleSelect(relatorio.id)}/>
                <span className={styles.itemTitle}>{relatorio.title}</span>
                <span className={styles.itemMeta}>{relatorio.generatedAt}</span>
                <span className={styles.itemMeta}>{relatorio.period}</span>
                <div className={styles.itemStatus}>
                  <span className={`${styles.statusDot} ${statusMap[relatorio.status]}`}></span>
                  {relatorio.status}
                </div>
                <button className={styles.botaoDownloadIcone} aria-label={`Baixar o relatório ${relatorio.title}`}>
                  <Download size={18} />
                </button>
              </div>
            ))}
          </>
        ) : (
          <div className={styles.estadoVazio}>
            <Inbox size={48} />
            <h2>Nenhum Relatório Encontrado</h2>
            <p>Tente ajustar os filtros para encontrar o que você procura.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ListaRelatorios;