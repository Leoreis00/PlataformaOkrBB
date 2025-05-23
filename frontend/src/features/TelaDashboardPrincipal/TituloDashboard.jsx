import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import styles from "./TituloDashboard.module.css";

export default function TituloDashboard() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.header}>
      <div className={styles.titleFiltro}>
        <h1 className={styles.titulo}>Dashboard Principal</h1>
        <div className={styles.filtro} ref={dropdownRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={open}
            className={styles.dropdownButton}
          >
            Filtro <FaChevronDown className={styles.icon} />
          </button>

          {open && (
            <ul className={styles.dropdownMenu} role="menu">
              <li role="menuitem" tabIndex={0} className={styles.dropdownItem}>
                Último trimestre
              </li>
              <li role="menuitem" tabIndex={0} className={styles.dropdownItem}>
                Recursos Humanos
              </li>
              <li role="menuitem" tabIndex={0} className={styles.dropdownItem}>
                Financeiro
              </li>
              <li role="menuitem" tabIndex={0} className={styles.dropdownItem}>
                Marketing
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
