import React from 'react';
import './Topbar.css';
import logoBB from '../../assets/img/img-branco.png';
import iconeRobo from '../../assets/img/iconeRobo.png';

function Topbar({ usuario = { nome: 'Usuário', perfil: 'ADM' }, isMenuExpanded }) {
  return (
    <div className={`topbar-container ${isMenuExpanded ? 'menu-expanded' : ''}`}>
      <div className="logo-container">
        <img 
          src={logoBB} 
          alt="Banco do Brasil" 
          className="logo-banco"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://www.bb.com.br/assets/img/logo-bb.png';
          }}
        />
      </div>

      <div className="user-area">
        <div className="user-badge">
          <img src={iconeRobo} alt="Ícone usuário" className="user-icon" />
          <div className="user-details">
            <span className="user-name">{usuario.nome}</span>
            <span className="user-role">{usuario.perfil}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;