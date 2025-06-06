import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaList } from "react-icons/fa"; // Importe FaList
import styles from "./Titulo.module.css";
import { Link } from "react-router-dom"; // Importe Link

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownToggle = (type) => {
    setOpenDropdown((prev) => (prev === type ? null : type));
  };

  return (
    <div className={styles.header}>
      <div className={styles.titleFiltro}>
        <h1 className={styles.titulo}>Visualização de OKRs</h1>

        <div className={styles.filtrosWrapper} ref={dropdownRef}>
          {/* Dropdown Trimestre */}
          <div className={styles.filtro}>
            <button
              onClick={() => handleDropdownToggle("trimestre")}
              className={`${styles.dropdownButton} ${styles.dropdownButtonPequeno}`}
            >
              Trimestre <FaChevronDown className={styles.icon} />
            </button>
            {openDropdown === "trimestre" && (
              <ul className={styles.dropdownMenu}>
                <li className={styles.dropdownItem}>1º Trimestre</li>
                <li className={styles.dropdownItem}>2º Trimestre</li>
                <li className={styles.dropdownItem}>3º Trimestre</li>
                <li className={styles.dropdownItem}>4º Trimestre</li>
              </ul>
            )}
          </div>

          {/* Dropdown Departamento */}
          <div className={styles.filtro}>
            <button
              onClick={() => handleDropdownToggle("departamento")}
              className={`${styles.dropdownButton} ${styles.dropdownButtonPequeno}`}
            >
              Departamento <FaChevronDown className={styles.icon} />
            </button>
            {openDropdown === "departamento" && (
              <ul className={styles.dropdownMenu}>
                <li className={styles.dropdownItem}>Recursos Humanos</li>
                <li className={styles.dropdownItem}>Financeiro</li>
                <li className={styles.dropdownItem}>Marketing</li>
                <li className={styles.dropdownItem}>TI</li>
                <li className={styles.dropdownItem}>Vendas</li>
                <li className={styles.dropdownItem}>Operações</li>
              </ul>
            )}
          </div>
        </div>
      </div>
      {/* Novo botão Gestão de OKR */}
      <Link to="/cadastro-okr" className={`${styles.botaoGestaoOKR} ${styles.dropdownButtonPequeno}`}>
        <FaList /> Gestão de OKR
      </Link>
    </div>
  );
}
