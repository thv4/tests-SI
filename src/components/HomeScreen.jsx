import React from 'react';
import './HomeScreen.css';

export default function HomeScreen({ temas, onSelectTema }) {
  return (
    <div className="home-screen">
      <div className="home-hero">
        <div className="hero-badge">Modo práctica</div>
        <h1 className="home-title">Test de Repaso</h1>
        <p className="home-subtitle">Selecciona un tema para comenzar. Responde las preguntas y comprueba tus conocimientos al instante.</p>
      </div>

      <div className="temas-grid">
        {temas.map((tema, i) => (
          <button
            key={tema.id}
            id={`tema-${tema.id}`}
            className="tema-card"
            onClick={() => onSelectTema(tema)}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="tema-number">{String(tema.id).padStart(2, '0')}</div>
            <div className="tema-info">
              <h3 className="tema-nombre">{tema.nombre}</h3>
              {tema.descripcion && <p className="tema-desc">{tema.descripcion}</p>}
            </div>
            <div className="tema-meta">
              <span className="tema-count">{tema.preguntas.length} preguntas</span>
              <span className="tema-arrow">→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
