// backend/controllers/okrController.js
const Okr = require('../models/okrModel');

// --- CRUD ---
exports.createOKR = async (req, res) => {
    try {
        const okr = await Okr.create(req.body);
        res.status(201).json(okr);
    } catch (err) {
        console.error('Erro no controller ao criar OKR:', err);
        res.status(500).json({ error: 'Erro ao salvar OKR' });
    }
};

exports.getAllOKRs = async (req, res) => {
    try {
        const { trimestre, departamento } = req.query;
        const okrs = await Okr.getAll(trimestre, departamento);
        res.status(200).json(okrs);
    } catch (err) {
        console.error('Erro no controller ao buscar OKRs:', err);
        res.status(500).json({ error: 'Erro ao buscar OKRs' });
    }
};

exports.updateOKR = async (req, res) => {
    try {
        const result = await Okr.update(req.params.id, req.body);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'OKR não encontrada' });
        }
        res.status(200).json({ message: 'OKR atualizada com sucesso' });
    } catch (err) {
        console.error('Erro no controller ao atualizar OKR:', err);
        res.status(500).json({ error: 'Erro ao atualizar OKR' });
    }
};

exports.deleteOKR = async (req, res) => {
    try {
        const result = await Okr.delete(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'OKR não encontrada' });
        }
        res.status(200).json({ message: 'OKR excluída com sucesso' });
    } catch (err) {
        console.error('Erro no controller ao excluir OKR:', err);
        res.status(500).json({ error: 'Erro ao excluir OKR' });
    }
};

// --- Dashboard ---
exports.getResumoOKRs = async (req, res) => {
    try {
        const resumo = await Okr.getResumo();
        const { total, concluidos, media_progresso, impacto_total } = resumo;
        res.status(200).json({
            total,
            percentualConcluidos: total > 0 ? Math.round((concluidos / total) * 100) : 0,
            percentualEsforco: Math.round(media_progresso || 0),
            impactoFinanceiro: impacto_total || 0,
        });
    } catch (err) {
        console.error('Erro no controller ao buscar resumo:', err);
        res.status(500).json({ error: 'Erro ao buscar resumo' });
    }
};

exports.getGraficoTrimestre = async (req, res) => {
    try {
        const results = await Okr.getGraficoTrimestre();
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
        const resultadoFinal = ['Q1', 'Q2', 'Q3', 'Q4'].map(q => dadosPorTrimestre[q] || { trimestre: q, Resultado: 0, Esforço: 0 });
        res.status(200).json(resultadoFinal);
    } catch (err) {
        console.error('Erro no controller ao buscar dados do gráfico:', err);
        res.status(500).json({ error: 'Erro ao buscar dados do gráfico' });
    }
};

exports.getRadarDesempenho = async (req, res) => {
    try {
        const results = await Okr.getRadarDesempenho();
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
        res.status(200).json(Object.values(dadosPorArea));
    } catch (err) {
        console.error('Erro no controller ao buscar dados do radar:', err);
        res.status(500).json({ error: 'Erro ao buscar dados do radar' });
    }
};

// Renomeei esta função para evitar duplicidade. Ajuste suas rotas se necessário.
exports.getOKRsComFiltros = async (req, res) => {
    try {
        const { trimestre, departamento } = req.query;
        const okrs = await Okr.getAll(trimestre, departamento);
        res.status(200).json(okrs);
    } catch (err) {
        console.error("Erro no controller ao buscar OKRs:", err);
        res.status(500).json({ error: "Erro ao buscar OKRs" });
    }
};
