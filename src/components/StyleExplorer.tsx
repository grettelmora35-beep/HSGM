import { useEffect, useState } from "react";
import { STYLES, type StyleId } from "../data/quiz";
import "./quiz.css";

// Número de WhatsApp de The Woods (México, con código de país 52).
const WHATSAPP_NUMBER = "525555010188";

function imgFallback(
  e: React.SyntheticEvent<HTMLImageElement>,
  seed: string
) {
  const el = e.currentTarget;
  if (el.dataset.fallback) return;
  el.dataset.fallback = "1";
  el.src = `https://picsum.photos/seed/${encodeURIComponent(seed)}/800/600`;
}

export default function StyleExplorer() {
  const [modalStyle, setModalStyle] = useState<StyleId | null>(null);

  useEffect(() => {
    if (!modalStyle) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalStyle(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalStyle]);

  function whatsappHref(styleName: string): string {
    const lineas = [
      `¡Hola The Woods! 👋`,
      ``,
      `Me interesa el estilo: *${styleName}*.`,
      `Me gustaría ver más productos y opciones.`,
    ];
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      lineas.join("\n")
    )}`;
  }

  const styles = Object.values(STYLES);

  return (
    <>
      <div className="explorer-grid">
        {styles.map((s) => (
          <button
            key={s.id}
            className="explorer-card"
            onClick={() => setModalStyle(s.id)}
            aria-label={`Ver galería del estilo ${s.name}`}
          >
            <span className="explorer-card-img">
              <img
                src={s.images[0]}
                alt={s.name}
                loading="lazy"
                onError={(e) => imgFallback(e, `${s.id}-card`)}
              />
            </span>
            <span className="explorer-card-body">
              <span className="explorer-card-name">{s.name}</span>
              <span className="explorer-card-tag">{s.tagline}</span>
              <span className="swatches">
                {s.palette.map((c) => (
                  <span key={c} className="swatch" style={{ background: c }} />
                ))}
              </span>
              <span className="explorer-card-link">Ver galería ›</span>
            </span>
          </button>
        ))}
      </div>

      {modalStyle &&
        (() => {
          const s = STYLES[modalStyle];
          return (
            <div className="style-modal" onClick={() => setModalStyle(null)}>
              <div
                className="style-modal-card"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
              >
                <button
                  className="style-modal-close"
                  onClick={() => setModalStyle(null)}
                  aria-label="Cerrar"
                >
                  ×
                </button>
                <span className="eyebrow">Estilo · productos</span>
                <h3 className="style-modal-name">{s.name}</h3>
                <p className="result-tagline" style={{ marginBottom: 14 }}>
                  {s.tagline}
                </p>
                <p className="text-muted" style={{ marginBottom: 18 }}>
                  {s.description}
                </p>
                <div className="style-modal-grid">
                  {s.gallery.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`${s.name} ${i + 1}`}
                      loading="lazy"
                      onError={(e) => imgFallback(e, `${s.id}-modal-${i}`)}
                    />
                  ))}
                </div>
                <div className="chips" style={{ marginTop: 18 }}>
                  {s.materials.map((m) => (
                    <span key={m} className="chip">
                      {m}
                    </span>
                  ))}
                </div>
                <a
                  className="btn btn-wa"
                  href={whatsappHref(s.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: 22 }}
                >
                  <WhatsAppIcon />
                  Cotizar productos {s.name}
                </a>
              </div>
            </div>
          );
        })()}
    </>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.53.07-.8.38-.28.3-1.05 1.03-1.05 2.5 0 1.48 1.07 2.9 1.22 3.1.15.2 2.11 3.22 5.11 4.52.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 01-4.8-1.32l-.34-.2-3.57.93.96-3.48-.22-.36a9.44 9.44 0 01-1.44-5.02c0-5.2 4.24-9.44 9.46-9.44 2.53 0 4.9.99 6.69 2.78a9.38 9.38 0 012.76 6.67c0 5.2-4.24 9.44-9.45 9.44zm8.04-17.49A11.34 11.34 0 0012.05.5C5.79.5.7 5.59.7 11.84c0 2 .52 3.95 1.52 5.67L.6 23.5l6.13-1.6a11.34 11.34 0 005.32 1.35h.01c6.26 0 11.35-5.09 11.35-11.34 0-3.03-1.18-5.88-3.32-8.02z" />
    </svg>
  );
}
