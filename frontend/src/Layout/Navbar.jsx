import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

// Ícones
import iconeDashboard from "./assets/img/iconeDashboard.png";
import iconeOKR from "./assets/img/iconeOKR.png";
import iconeRelatorio from "./assets/img/iconeRelatorio.png";
import iconeMetas from "./assets/img/iconeMetas.png";
import iconeConfig from "./assets/img/iconeConfig.png";
import iconeAjuda from "./assets/img/iconeAjuda.png";
import iconeSobre from "./assets/img/iconeSobre.png";
import iconeSair from "./assets/img/iconeSair.png";

function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();

  const toggleSidebar = () => setIsExpanded(!isExpanded);
  const toggleSubMenu = (menu) => setActiveMenu(activeMenu === menu ? null : menu);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path);

  return (
    <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="top-bar">
        <button className="NavButton" onClick={toggleSidebar}>☰</button>
      </div>

      <div className="menu">
        {/* Dashboard */}
        <div className={`menu-item ${isActive("/dashboard") ? "active" : ""}`}>
          <Link to="/dashboard" className="menu-link">
            <img className="StyleIcones" src={iconeDashboard} alt="Dashboard"/>
            {isExpanded && <span className="NavText">Dashboard <br/> Principal</span>}
          </Link>
        </div>

        {/* Menu de OKRs com subitens - ATUALIZADO */}
        <div className="with-submenu">
          <div 
            onClick={() => toggleSubMenu("okrs")} 
            className={`menu-item ${activeMenu === "okrs" ? "submenu-active" : ""}`}
          >
            <img className="StyleIcones" src={iconeOKR} alt="OKRs"/>
            {isExpanded && <span className="NavText">OKRs</span>}
          </div>
          
          {activeMenu === "okrs" && isExpanded && (
            <div className="submenu">
              <div className={`submenu-item ${isActive("/visualizar-okr") ? "active" : ""}`}>
                <Link to="/visualizar-okr" className="submenu-link">Visualizar OKRs</Link>
              </div>
              <div className={`submenu-item ${isActive("/cadastro-okr") ? "active" : ""}`}>
  <Link to="/cadastro-okr" className="submenu-link">Gestão de OKRs</Link>
</div>

            </div>
          )}
        </div>

        {/* Relatórios */}
        <div className={`menu-item ${isActive("/relatorios") ? "active" : ""}`}>
          <Link to="/relatorios" className="menu-link">
            <img className="StyleIcones" src={iconeRelatorio} alt="Relatórios"/>
            {isExpanded && <span className="NavText">Relatórios</span>}
          </Link>
        </div>

        {/* Criar Metas */}
        <div className={`menu-item ${isActive("/cadastrar-meta") ? "active" : ""}`}>
          <Link to="/cadastrar-meta" className="menu-link">
            <img className="StyleIcones" src={iconeMetas} alt="Metas"/>
            {isExpanded && <span className="NavText">Criar Metas</span>}
          </Link>
        </div>

        <hr style={{ borderColor: 'rgba(255,255,255,0.2)', margin: '1rem 0 8.5rem 0' }} />

        

        {/* Ajuda */}
        <div className={`menu-item ${isActive("/ajuda") ? "active" : ""}`}>
          <Link to="/ajuda" className="menu-link">
            <img className="StyleIcones" src={iconeAjuda} alt="Ajuda"/>
            {isExpanded && <span className="NavText">Ajuda e Suporte</span>}
          </Link>
        </div>

        {/* Sobre */}
        <div className={`menu-item ${isActive("/sobre") ? "active" : ""}`}>
          <Link to="/sobre" className="menu-link">
            <img className="StyleIcones" src={iconeSobre} alt="Sobre"/>
            {isExpanded && <span className="NavText">Sobre</span>}
          </Link>
        </div>

        {/* Sair */}
        <div className="menu-item">
          <div className="menu-link" onClick={() => console.log("Sair")}>
            <img className="StyleIcones" src={iconeSair} alt="Sair"/>
            {isExpanded && <span className="NavText">Sair</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;