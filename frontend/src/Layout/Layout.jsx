import { useState } from 'react';
import Navbar from './Navbar';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';

function Layout() {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Navbar 
        isExpanded={isMenuExpanded}
        toggleSidebar={() => setIsMenuExpanded(!isMenuExpanded)}
      />
      
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ position: "sticky", top: 0, zIndex: 10 }}>
          <Topbar 
            usuario={{ nome: "Ana Beatriz", perfil: "Presidenta" }}
            isMenuExpanded={isMenuExpanded}
          />
        </div>

        <main style={{
          flexGrow: 1,
          overflowY: "auto",
          padding: "1rem",
          backgroundColor: "#f0f2fa"
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;