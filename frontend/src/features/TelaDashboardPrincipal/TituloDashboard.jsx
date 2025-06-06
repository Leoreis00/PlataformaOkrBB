import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import styles from "./TituloDashboard.module.css";

export default function TituloDashboard() {
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
    setOpenDropdown(prev => (prev === type ? null : type));
  };

  return (
    <div className={styles.header}>
      <div className={styles.titleFiltro}>
        <h1 className={styles.titulo}>Dashboard Principal</h1>

        <div className={styles.filtrosWrapper} ref={dropdownRef}>
          {/* Dropdown Trimestre */}
          <div className={styles.filtro}>
            <button
              onClick={() => handleDropdownToggle("trimestre")}
              className={styles.dropdownButton}
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
              className={styles.dropdownButton}
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
    </div>
  );
}
