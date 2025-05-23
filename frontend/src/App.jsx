import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import DashboardPrincipal from './features/TelaDashboardPrincipal/DashboardPrincipal';
import VisualizarOKR from './features/TelaVisualizacaoOKR/DashboardResumo';
// Importe as telas que ainda não existem (crie arquivos vazios depois):
import CadastroOKR from './features/TelaCadastroOKR/CadastroOKR';
import GestaoOKRs from './features/TelaCadastroOKR/GestaoOKRs';
import EditarOKR from './features/TelaCadastroOKR/EditarOKR';
import CadastroMetas from './features/TelaCadastroMetas/CadastroMetas';
import Relatorios from './features/TelaRelatorios/Relatorios';
import Configuracoes from './features/TelaConfiguracoes/Configuracoes';
import CadastroOKRsUnificada from './features/TelaCadastroOKR/CadastroOKRsUnificada';
import Ajuda from './features/TelaAjuda/Ajuda';
import Sobre from './features/TelaSobre/Sobre';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Todas as rotas dentro de <Layout> terão menu + header */}
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPrincipal />} />
          <Route path="dashboard" element={<DashboardPrincipal />} />
          <Route path="visualizar-okr" element={<VisualizarOKR />} />
          <Route path="cadastro-okr" element={<CadastroOKRsUnificada />} />
          <Route path="gestao" element={<GestaoOKRs />} />
          <Route path="editar/:id" element={<EditarOKR />} />
          <Route path="editar-okr/:id" element={<EditarOKR />} />
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