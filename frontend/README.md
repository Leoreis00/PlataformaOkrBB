# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

```
TelasOKR.BB
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ img
│  │  │  ├─ iconeAjuda.png
│  │  │  ├─ iconeConfig.png
│  │  │  ├─ iconeDashboard.png
│  │  │  ├─ iconeMetas.png
│  │  │  ├─ iconeOKR.png
│  │  │  ├─ iconeRelatorio.png
│  │  │  ├─ iconeRobo.png
│  │  │  ├─ iconeSair.png
│  │  │  ├─ iconeSobre.png
│  │  │  └─ img-branco.png
│  │  └─ react.svg
│  ├─ components
│  │  ├─ Layout
│  │  │  ├─ assets
│  │  │  │  ├─ img
│  │  │  │  │  ├─ iconeAjuda.png
│  │  │  │  │  ├─ iconeConfig.png
│  │  │  │  │  ├─ iconeDashboard.png
│  │  │  │  │  ├─ iconeMetas.png
│  │  │  │  │  ├─ iconeOKR.png
│  │  │  │  │  ├─ iconeRelatorio.png
│  │  │  │  │  ├─ iconeRobo.png
│  │  │  │  │  ├─ iconeSair.png
│  │  │  │  │  ├─ iconeSobre.png
│  │  │  │  │  └─ img-branco.png
│  │  │  │  └─ react.svg
│  │  │  ├─ index.css
│  │  │  ├─ Layout.jsx
│  │  │  ├─ Navbar.css
│  │  │  ├─ Navbar.jsx
│  │  │  └─ Topbar.jsx
│  │  ├─ TelaDashboardPrincipal
│  │  │  ├─ DashboardPrincipal.jsx
│  │  │  ├─ DashboardPrincipal.module.css
│  │  │  ├─ GraficoTrimestre.jsx
│  │  │  ├─ GraficoTrimestre.module.css
│  │  │  ├─ PainelIntro.jsx
│  │  │  ├─ PainelIntro.module.css
│  │  │  ├─ RelatorioDesempenho.jsx
│  │  │  ├─ RelatorioDesempenho.module.css
│  │  │  ├─ StatusMetas.jsx
│  │  │  ├─ StatusMetas.module.css
│  │  │  ├─ TituloDashboard.jsx
│  │  │  ├─ TituloDashboard.module.css
│  │  │  ├─ UltimasAtividades.jsx
│  │  │  └─ UltimasAtividades.module.css
│  │  └─ TelaVisualizacaoOKR
│  │     ├─ Alertas.jsx
│  │     ├─ Alertas.module.css
│  │     ├─ CardsResumo.jsx
│  │     ├─ CardsResumo.module.css
│  │     ├─ DashboardResumo.jsx
│  │     ├─ DashboardResumo.module.css
│  │     ├─ GraficoTrimestre.jsx
│  │     ├─ GraficoTrimestre.module.css
│  │     ├─ RadarDesempenho.jsx
│  │     ├─ RadarDesempenho.module.css
│  │     ├─ TabelaOKRs.jsx
│  │     ├─ TabelaOKRs.module.css
│  │     ├─ Titulo.jsx
│  │     └─ Titulo.module.css
│  ├─ index.css
│  └─ main.jsx
└─ vite.config.js

```
```
TelasOKR.BB
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ img
│  │  │  ├─ iconeAjuda.png
│  │  │  ├─ iconeConfig.png
│  │  │  ├─ iconeDashboard.png
│  │  │  ├─ iconeMetas.png
│  │  │  ├─ iconeOKR.png
│  │  │  ├─ iconeRelatorio.png
│  │  │  ├─ iconeRobo.png
│  │  │  ├─ iconeSair.png
│  │  │  ├─ iconeSobre.png
│  │  │  └─ img-branco.png
│  │  └─ react.svg
│  ├─ components
│  │  ├─ Layout
│  │  │  ├─ assets
│  │  │  │  ├─ img
│  │  │  │  │  ├─ iconeAjuda.png
│  │  │  │  │  ├─ iconeConfig.png
│  │  │  │  │  ├─ iconeDashboard.png
│  │  │  │  │  ├─ iconeMetas.png
│  │  │  │  │  ├─ iconeOKR.png
│  │  │  │  │  ├─ iconeRelatorio.png
│  │  │  │  │  ├─ iconeRobo.png
│  │  │  │  │  ├─ iconeSair.png
│  │  │  │  │  ├─ iconeSobre.png
│  │  │  │  │  └─ img-branco.png
│  │  │  │  └─ react.svg
│  │  │  ├─ index.css
│  │  │  ├─ Layout.jsx
│  │  │  ├─ Navbar.css
│  │  │  ├─ Navbar.jsx
│  │  │  └─ Topbar.jsx
│  │  ├─ TelaCadastroMetas
│  │  ├─ TelaCadastroOKR
│  │  ├─ TelaDashboardPrincipal
│  │  │  ├─ DashboardPrincipal.jsx
│  │  │  ├─ DashboardPrincipal.module.css
│  │  │  ├─ GraficoTrimestre.jsx
│  │  │  ├─ GraficoTrimestre.module.css
│  │  │  ├─ PainelIntro.jsx
│  │  │  ├─ PainelIntro.module.css
│  │  │  ├─ RelatorioDesempenho.jsx
│  │  │  ├─ RelatorioDesempenho.module.css
│  │  │  ├─ StatusMetas.jsx
│  │  │  ├─ StatusMetas.module.css
│  │  │  ├─ TituloDashboard.jsx
│  │  │  ├─ TituloDashboard.module.css
│  │  │  ├─ UltimasAtividades.jsx
│  │  │  └─ UltimasAtividades.module.css
│  │  ├─ TelaErroPermissao
│  │  ├─ TelaRelatorios
│  │  └─ TelaVisualizacaoOKR
│  │     ├─ Alertas.jsx
│  │     ├─ Alertas.module.css
│  │     ├─ CardsResumo.jsx
│  │     ├─ CardsResumo.module.css
│  │     ├─ DashboardResumo.jsx
│  │     ├─ DashboardResumo.module.css
│  │     ├─ GraficoTrimestre.jsx
│  │     ├─ GraficoTrimestre.module.css
│  │     ├─ RadarDesempenho.jsx
│  │     ├─ RadarDesempenho.module.css
│  │     ├─ TabelaOKRs.jsx
│  │     ├─ TabelaOKRs.module.css
│  │     ├─ Titulo.jsx
│  │     └─ Titulo.module.css
│  ├─ index.css
│  └─ main.jsx
└─ vite.config.js

```
```
TelasOKR.BB
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ img
│  │  │  ├─ iconeAjuda.png
│  │  │  ├─ iconeConfig.png
│  │  │  ├─ iconeDashboard.png
│  │  │  ├─ iconeMetas.png
│  │  │  ├─ iconeOKR.png
│  │  │  ├─ iconeRelatorio.png
│  │  │  ├─ iconeRobo.png
│  │  │  ├─ iconeSair.png
│  │  │  ├─ iconeSobre.png
│  │  │  └─ img-branco.png
│  │  └─ react.svg
│  ├─ components
│  │  ├─ Layout
│  │  │  ├─ assets
│  │  │  │  ├─ img
│  │  │  │  │  ├─ iconeAjuda.png
│  │  │  │  │  ├─ iconeConfig.png
│  │  │  │  │  ├─ iconeDashboard.png
│  │  │  │  │  ├─ iconeMetas.png
│  │  │  │  │  ├─ iconeOKR.png
│  │  │  │  │  ├─ iconeRelatorio.png
│  │  │  │  │  ├─ iconeRobo.png
│  │  │  │  │  ├─ iconeSair.png
│  │  │  │  │  ├─ iconeSobre.png
│  │  │  │  │  └─ img-branco.png
│  │  │  │  └─ react.svg
│  │  │  ├─ index.css
│  │  │  ├─ Layout.jsx
│  │  │  ├─ Navbar.css
│  │  │  ├─ Navbar.jsx
│  │  │  ├─ Topbar.css
│  │  │  └─ Topbar.jsx
│  │  ├─ TelaAjuda
│  │  │  └─ Ajuda.jsx
│  │  ├─ TelaCadastroMetas
│  │  │  └─ CadastroMetas.jsx
│  │  ├─ TelaCadastroOKR
│  │  │  └─ CadastroOKR.jsx
│  │  ├─ TelaConfiguracoes
│  │  │  └─ Configuracoes.jsx
│  │  ├─ TelaDashboardPrincipal
│  │  │  ├─ DashboardPrincipal.jsx
│  │  │  ├─ DashboardPrincipal.module.css
│  │  │  ├─ GraficoTrimestre.jsx
│  │  │  ├─ GraficoTrimestre.module.css
│  │  │  ├─ PainelIntro.jsx
│  │  │  ├─ PainelIntro.module.css
│  │  │  ├─ RelatorioDesempenho.jsx
│  │  │  ├─ RelatorioDesempenho.module.css
│  │  │  ├─ StatusMetas.jsx
│  │  │  ├─ StatusMetas.module.css
│  │  │  ├─ TituloDashboard.jsx
│  │  │  ├─ TituloDashboard.module.css
│  │  │  ├─ UltimasAtividades.jsx
│  │  │  └─ UltimasAtividades.module.css
│  │  ├─ TelaErroPermissao
│  │  ├─ TelaRelatorios
│  │  │  └─ Relatorios.jsx
│  │  ├─ TelaSobre
│  │  │  └─ Sobre.jsx
│  │  └─ TelaVisualizacaoOKR
│  │     ├─ Alertas.jsx
│  │     ├─ Alertas.module.css
│  │     ├─ CardsResumo.jsx
│  │     ├─ CardsResumo.module.css
│  │     ├─ DashboardResumo.jsx
│  │     ├─ DashboardResumo.module.css
│  │     ├─ GraficoTrimestre.jsx
│  │     ├─ GraficoTrimestre.module.css
│  │     ├─ RadarDesempenho.jsx
│  │     ├─ RadarDesempenho.module.css
│  │     ├─ TabelaOKRs.jsx
│  │     ├─ TabelaOKRs.module.css
│  │     ├─ Titulo.jsx
│  │     └─ Titulo.module.css
│  ├─ index.css
│  └─ main.jsx
└─ vite.config.js

```
```
TelasOKR.BB
├─ eslint.config.js
├─ frontend
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ api
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ img
│  │  │  ├─ iconeAjuda.png
│  │  │  ├─ iconeConfig.png
│  │  │  ├─ iconeDashboard.png
│  │  │  ├─ iconeMetas.png
│  │  │  ├─ iconeOKR.png
│  │  │  ├─ iconeRelatorio.png
│  │  │  ├─ iconeRobo.png
│  │  │  ├─ iconeSair.png
│  │  │  ├─ iconeSobre.png
│  │  │  └─ img-branco.png
│  │  └─ react.svg
│  ├─ components
│  │  └─ Layout
│  │     ├─ assets
│  │     │  ├─ img
│  │     │  │  ├─ iconeAjuda.png
│  │     │  │  ├─ iconeConfig.png
│  │     │  │  ├─ iconeDashboard.png
│  │     │  │  ├─ iconeMetas.png
│  │     │  │  ├─ iconeOKR.png
│  │     │  │  ├─ iconeRelatorio.png
│  │     │  │  ├─ iconeRobo.png
│  │     │  │  ├─ iconeSair.png
│  │     │  │  ├─ iconeSobre.png
│  │     │  │  └─ img-branco.png
│  │     │  └─ react.svg
│  │     ├─ index.css
│  │     ├─ Layout.jsx
│  │     ├─ Navbar.css
│  │     ├─ Navbar.jsx
│  │     ├─ Topbar.css
│  │     └─ Topbar.jsx
│  ├─ index.css
│  ├─ main.jsx
│  ├─ routes
│  ├─ telas
│  │  ├─ TelaAjuda
│  │  │  └─ Ajuda.jsx
│  │  ├─ TelaCadastroMetas
│  │  │  └─ CadastroMetas.jsx
│  │  ├─ TelaCadastroOKR
│  │  │  └─ CadastroOKR.jsx
│  │  ├─ TelaConfiguracoes
│  │  │  └─ Configuracoes.jsx
│  │  ├─ TelaDashboardPrincipal
│  │  │  ├─ DashboardPrincipal.jsx
│  │  │  ├─ DashboardPrincipal.module.css
│  │  │  ├─ GraficoTrimestre.jsx
│  │  │  ├─ GraficoTrimestre.module.css
│  │  │  ├─ PainelIntro.jsx
│  │  │  ├─ PainelIntro.module.css
│  │  │  ├─ RelatorioDesempenho.jsx
│  │  │  ├─ RelatorioDesempenho.module.css
│  │  │  ├─ StatusMetas.jsx
│  │  │  ├─ StatusMetas.module.css
│  │  │  ├─ TituloDashboard.jsx
│  │  │  ├─ TituloDashboard.module.css
│  │  │  ├─ UltimasAtividades.jsx
│  │  │  └─ UltimasAtividades.module.css
│  │  ├─ TelaErroPermissao
│  │  ├─ TelaRelatorios
│  │  │  └─ Relatorios.jsx
│  │  ├─ TelaSobre
│  │  │  └─ Sobre.jsx
│  │  └─ TelaVisualizacaoOKR
│  │     ├─ Alertas.jsx
│  │     ├─ Alertas.module.css
│  │     ├─ CardsResumo.jsx
│  │     ├─ CardsResumo.module.css
│  │     ├─ DashboardResumo.jsx
│  │     ├─ DashboardResumo.module.css
│  │     ├─ GraficoTrimestre.jsx
│  │     ├─ GraficoTrimestre.module.css
│  │     ├─ RadarDesempenho.jsx
│  │     ├─ RadarDesempenho.module.css
│  │     ├─ TabelaOKRs.jsx
│  │     ├─ TabelaOKRs.module.css
│  │     ├─ Titulo.jsx
│  │     └─ Titulo.module.css
│  └─ utils
└─ vite.config.js

```