const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const cadastrarOKR = async (okr) => {
  try {
    const response = await fetch(`${API_URL}/okrs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(okr),
    });
    if (!response.ok) throw new Error('Erro ao cadastrar OKR');
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const buscarOKRs = async () => {
  try {
    const response = await fetch(`${API_URL}/okrs`);
    if (!response.ok) throw new Error('Erro ao buscar OKRs');
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
export async function buscarDadosGraficoTrimestre() {
  try {
    const resposta = await fetch(`${API_URL}/okrs/grafico-trimestre`);
    if (!resposta.ok) {
      throw new Error('Erro ao buscar dados do gráfico');
    }
    return await resposta.json();
  } catch (erro) {
    console.error(erro);
    return [];
  }
}
