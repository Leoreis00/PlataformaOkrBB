const okrModel = require('../models/okrModel');
const db = require('../config/db'); // Importação correta

// Criar OKR
exports.createOKR = (req, res) => {
  const {
    objetivo,
    resultado_chave,
    area_responsavel,
    periodo,
    tipo,
    status,
    descricao,
    progresso,
    impacto_financeiro,
    trimestre,
    peso_kpi,
  } = req.body;

  const novaOKR = {
    objetivo,
    resultado_chave,
    area_responsavel,
    periodo,
    tipo,
    status,
    descricao,
    progresso,
    impacto_financeiro,
    trimestre,
    peso_kpi,
  };

  okrModel.createOKR(novaOKR, (err, results) => {
    if (err) {
      console.error('Erro ao salvar OKR:', err);
      return res.status(500).json({ error: 'Erro ao salvar OKR' });
    }
    res.status(201).json({ message: 'OKR criada com sucesso' });
  });
};

// Buscar todas as OKRs
exports.getOKRs = (req, res) => {
  okrModel.getAllOKRs((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar OKRs' });
    }
    res.status(200).json(results);
  });
};

// Buscar OKR por ID
exports.getOKRById = (req, res) => {
  const id = req.params.id;

  okrModel.getOKRById(id, (err, okr) => {
    if (err) {
      console.error('Erro ao buscar OKR por ID:', err);
      return res.status(500).json({ error: 'Erro ao buscar OKR' });
    }

    if (!okr) {
      return res.status(404).json({ error: 'OKR não encontrada' });
    }

    res.status(200).json(okr);
  });
};

// Excluir OKR
exports.deleteOKR = (req, res) => {
  const id = req.params.id;

  okrModel.deleteOKR(id, (err, result) => {
    if (err) {
      console.error('Erro ao excluir OKR:', err);
      return res.status(500).json({ error: 'Erro ao excluir OKR' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'OKR não encontrada' });
    }

    res.status(200).json({ message: 'OKR excluída com sucesso' });
  });
};

// Atualizar OKR
exports.updateOKR = (req, res) => {
  const id = req.params.id;
  const dadosAtualizados = req.body;

  okrModel.updateOKR(id, dadosAtualizados, (err, resultado) => {
    if (err) {
      console.error('Erro ao atualizar OKR:', err);
      return res.status(500).json({ error: 'Erro ao atualizar OKR' });
    }
    res.status(200).json({ message: 'OKR atualizada com sucesso' });
  });
};

// Resumo das OKRs
exports.getResumoOKRs = (req, res) => {
  const query = `
    SELECT
      COUNT(*) AS total,
      SUM(CASE WHEN status = 'Concluído' THEN 1 ELSE 0 END) AS concluidos,
      AVG(progresso) AS media_progresso,
      SUM(impacto_financeiro) AS impacto_total
    FROM okrs
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar resumo de OKRs:', err);
      return res.status(500).json({ error: 'Erro ao buscar resumo' });
    }

    const { total, concluidos, media_progresso, impacto_total } = results[0];
    const percentualConcluidos = total > 0 ? Math.round((concluidos / total) * 100) : 0;
    const percentualEsforco = Math.round(media_progresso || 0);
    const impactoFinanceiro = impacto_total || 0;

    res.status(200).json({
      total,
      percentualConcluidos,
      percentualEsforco,
      impactoFinanceiro,
    });
  });
};

// Gráfico por trimestre
exports.getGraficoTrimestre = (req, res) => {
  const query = `
    SELECT 
      trimestre,
      tipo,
      AVG(progresso) AS media_progresso
    FROM okrs
    WHERE periodo = '2025'
    GROUP BY trimestre, tipo
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados do gráfico:', err);
      return res.status(500).json({ error: 'Erro ao buscar dados do gráfico' });
    }

    const dadosPorTrimestre = {};

    results.forEach(({ trimestre, tipo, media_progresso }) => {
      if (!dadosPorTrimestre[trimestre]) {
        dadosPorTrimestre[trimestre] = { trimestre, Resultado: 0, Esforço: 0 };
      }

      if (tipo === 'Resultado') {
        dadosPorTrimestre[trimestre].Resultado = parseFloat(media_progresso);
      } else if (tipo === 'Esforço') {
        dadosPorTrimestre[trimestre].Esforço = parseFloat(media_progresso);
      }
    });

    const resultadoFinal = ['Q1', 'Q2', 'Q3', 'Q4'].map((q) => {
      return dadosPorTrimestre[q] || { trimestre: q, Resultado: 0, Esforço: 0 };
    });

    res.status(200).json(resultadoFinal);
  });
};

// Gráfico radar por departamento
exports.getRadarDesempenho = (req, res) => {
  const query = `
    SELECT 
      area_responsavel AS subject,
      tipo,
      SUM(progresso) AS total_progresso
    FROM okrs
    WHERE periodo = '2025'
    GROUP BY area_responsavel, tipo
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados do radar:', err);
      return res.status(500).json({ error: 'Erro ao buscar dados do radar' });
    }

    const dadosPorArea = {};

    results.forEach(({ subject, tipo, total_progresso }) => {
      if (!dadosPorArea[subject]) {
        dadosPorArea[subject] = { subject, Esforco: 0, Resultado: 0 };
      }

      if (tipo === 'Resultado') {
        dadosPorArea[subject].Resultado = parseFloat(total_progresso);
      } else if (tipo === 'Esforço') {
        dadosPorArea[subject].Esforco = parseFloat(total_progresso);
      }
    });

    const resultadoFinal = Object.values(dadosPorArea);

    res.status(200).json(resultadoFinal);
  });
};
// Buscar todas as OKRs com filtros
exports.getOKRs = (req, res) => {
  const { trimestre, departamento } = req.query; // Pega os parâmetros da query string

  okrModel.getAllOKRs(trimestre, departamento, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao buscar OKRs" });
    }
    res.status(200).json(results);
  });
};