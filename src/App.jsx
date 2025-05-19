import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import DashboardPrincipal from './components/TelaDashboardPrincipal/DashboardPrincipal';
import VisualizarOKR from './components/TelaVisualizacaoOKR/DashboardResumo';
// Importe as telas que ainda não existem (crie arquivos vazios depois):
import CadastroOKR from './components/TelaCadastroOKR/CadastroOKR';
import CadastroMetas from './components/TelaCadastroMetas/CadastroMetas';
import Relatorios from './components/TelaRelatorios/Relatorios';
import Configuracoes from './components/TelaConfiguracoes/Configuracoes';
import Ajuda from './components/TelaAjuda/Ajuda';
import Sobre from './components/TelaSobre/Sobre';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Todas as rotas dentro de <Layout> terão menu + header */}
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPrincipal />} />
          <Route path="dashboard" element={<DashboardPrincipal />} />
          <Route path="visualizar-okr" element={<VisualizarOKR />} />
          <Route path="cadastrar-okr" element={<CadastroOKR />} />
          <Route path="cadastrar-meta" element={<CadastroMetas />} />
          <Route path="relatorios" element={<Relatorios />} />
          <Route path="configuracoes" element={<Configuracoes />} />
          <Route path="ajuda" element={<Ajuda />} />
          <Route path="sobre" element={<Sobre />} />
          {/* Rota para páginas não encontradas (opcional) */}
          <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;