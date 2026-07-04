import { useEffect, useMemo, useState } from "react";
import {
  QUESTIONS,
  STYLES,
  scoreAnswers,
  type StyleId,
} from "../data/quiz";
import "./quiz.css";

type Phase = "intro" | "quiz" | "result";

// Número de WhatsApp de The Woods (México, con código de país 52).
const WHATSAPP_NUMBER = "525555010188";

const PRESUPUESTOS = [
  "Aún no lo sé",
  "Menos de $20,000 MXN",
  "$20,000 – $50,000 MXN",
  "$50,000 – $150,000 MXN",
  "Más de $150,000 MXN",
];

// Fallback si una imagen de Unsplash no carga.
function imgFallback(
  e: React.SyntheticEvent<HTMLImageElement>,
  seed: string
) {
  const el = e.currentTarget;
  if (el.dataset.fallback) return;
  el.dataset.fallback = "1";
  el.src = `https://picsum.photos/seed/${encodeURIComponent(seed)}/800/600`;
}

export default function StyleQuiz() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const [presupuesto, setPresupuesto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [modalStyle, setModalStyle] = useState<StyleId | null>(null);

  // Cerrar el modal de estilo con la tecla Escape.
  useEffect(() => {
    if (!modalStyle) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalStyle(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalStyle]);

  const result = useMemo(() => {
    if (phase !== "result") return null;
    return scoreAnswers(answers);
  }, [phase, answers]);

  const winner = result ? STYLES[result.winner] : null;

  const progress = phase === "quiz" ? (current / QUESTIONS.length) * 100 : 0;

  function choose(optIndex: number) {
    const next = [...answers];
    next[current] = optIndex;
    setAnswers(next);

    // pequeña pausa para feedback visual
    window.setTimeout(() => {
      if (current + 1 < QUESTIONS.length) {
        setCurrent(current + 1);
      } else {
        setPhase("result");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 180);
  }

  function back() {
    if (current === 0) {
      setPhase("intro");
    } else {
      setCurrent(current - 1);
    }
  }

  function restart() {
    setPhase("intro");
    setCurrent(0);
    setAnswers([]);
    setPresupuesto("");
    setMensaje("");
    setModalStyle(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Arma el enlace directo a WhatsApp con el resultado del test precargado.
  function whatsappHref(styleName?: string): string {
    const nombre = styleName ?? winner?.name;
    if (!nombre) return `https://wa.me/${WHATSAPP_NUMBER}`;
    const lineas = [
      `¡Hola The Woods! 👋 Acabo de hacer el test de estilo.`,
      ``,
      `Me interesa el estilo: *${nombre}*.`,
      `Me gustaría recibir más información y una propuesta.`,
    ];
    if (presupuesto) lineas.push(``, `Presupuesto estimado: ${presupuesto}.`);
    if (mensaje.trim()) lineas.push(``, `Sobre mi proyecto: ${mensaje.trim()}`);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      lineas.join("\n")
    )}`;
  }

  /* ---------------- INTRO ---------------- */
  if (phase === "intro") {
    return (
      <div className="quiz-wrap">
        <div className="quiz-intro">
          <span className="eyebrow">Test de estilo · ~2 min</span>
          <h1 className="quiz-h1">
            Descubre tu estilo<br />en decoración
          </h1>
          <p className="lead" style={{ margin: "0 auto" }}>
            Responde {QUESTIONS.length} preguntas visuales y te diremos con qué
            estética de interior y exterior te identificas. Al final verás una
            galería curada con tu estilo y podrás pedir información por WhatsApp.
          </p>
          <button
            className="btn btn-dark"
            onClick={() => setPhase("quiz")}
            style={{ marginTop: 28 }}
          >
            Comenzar
            <Arrow />
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- QUIZ ---------------- */
  if (phase === "quiz") {
    const q = QUESTIONS[current];
    const chosen = answers[current];
    return (
      <div className="quiz-wrap">
        <div className="quiz-topbar">
          <button className="quiz-back" onClick={back}>
            ← Atrás
          </button>
          <span className="quiz-count">
            {current + 1} / {QUESTIONS.length}
          </span>
        </div>
        <div className="quiz-progress">
          <span style={{ width: `${progress}%` }} />
        </div>

        <div className="quiz-question" key={q.id}>
          <h2 className="quiz-prompt">{q.prompt}</h2>
          {q.helper && <p className="quiz-helper">{q.helper}</p>}

          <div className="quiz-options">
            {q.options.map((opt, i) => (
              <button
                key={i}
                className={`quiz-option ${chosen === i ? "is-active" : ""}`}
                onClick={() => choose(i)}
              >
                <span className="quiz-option-img">
                  <img
                    src={opt.image}
                    alt={opt.text}
                    loading="lazy"
                    onError={(e) => imgFallback(e, `${q.id}-${i}`)}
                  />
                </span>
                <span className="quiz-option-label">
                  <span className="quiz-bullet">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- RESULT ---------------- */
  if (phase === "result" && result && winner) {
    return (
      <div className="quiz-wrap result">
        {/* Encabezado del resultado */}
        <div className="result-head">
          <span className="eyebrow">Tu estilo es</span>
          <h1 className="result-name">{winner.name}</h1>
          <p className="result-tagline">{winner.tagline}</p>
        </div>

        {/* CTA principal — visible al terminar, sin necesidad de bajar */}
        <div className="result-cta-top">
          <a
            className="btn btn-wa"
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            Cotizar por WhatsApp
          </a>
          <a className="result-cta-detail" href="#presupuesto">
            Ver detalle y presupuesto ↓
          </a>
        </div>

        {/* Galería en grid estilo editorial */}
        <div className="result-gallery">
          {winner.images.map((src, i) => (
            <figure key={i} className={`g g-${i}`}>
              <img
                src={src}
                alt={`${winner.name} ${i + 1}`}
                loading="lazy"
                onError={(e) => imgFallback(e, `${winner.id}-${i}`)}
              />
            </figure>
          ))}
        </div>

        {/* Descripción + detalles */}
        <div className="result-detail">
          <div>
            <h2 className="result-sub">Sobre tu estética</h2>
            <p className="lead">{winner.description}</p>

            <div className="result-tags">
              <div>
                <span className="result-tag-label">Maderas sugeridas</span>
                <div className="chips">
                  {winner.materials.map((m) => (
                    <span key={m} className="chip">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="result-tag-label">Paleta</span>
                <div className="swatches">
                  {winner.palette.map((c) => (
                    <span
                      key={c}
                      className="swatch"
                      style={{ background: c }}
                      title={c}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="result-ranking">
            <span className="result-tag-label">Tu afinidad</span>
            <p className="rank-hint">Toca un estilo para ver sus productos ↓</p>
            {result.ranking.map((r) => {
              const max = result.ranking[0].score || 1;
              const pct = Math.round((r.score / max) * 100);
              return (
                <button
                  className="rank-row"
                  key={r.id}
                  onClick={() => setModalStyle(r.id)}
                  aria-label={`Ver productos del estilo ${STYLES[r.id].name}`}
                >
                  <div className="rank-top">
                    <span>{STYLES[r.id].name}</span>
                    <span className="rank-pct">{pct}% ›</span>
                  </div>
                  <div className="rank-bar">
                    <span style={{ width: `${pct}%` }} />
                  </div>
                </button>
              );
            })}
          </aside>
        </div>

        {/* CTA — contacto directo por WhatsApp */}
        <div id="presupuesto" className="lead-card">
          <div className="lead-card-head">
            <span className="pill">Presupuesto sin compromiso</span>
            <h2 className="result-sub" style={{ marginTop: 16 }}>
              ¿Te gustaría llevar el estilo {winner.name} a tu espacio?
            </h2>
            <p className="text-muted">
              Escríbenos por WhatsApp y con gusto te damos información y una
              propuesta a tu medida. Tu resultado ya va incluido en el mensaje.
              El presupuesto es opcional.
            </p>
          </div>

          <div className="wa-form">
            <label className="field">
              <span>Presupuesto estimado (opcional)</span>
              <select
                value={presupuesto}
                onChange={(e) => setPresupuesto(e.target.value)}
              >
                <option value="">Selecciona una opción</option>
                {PRESUPUESTOS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>

            <label className="field field-full">
              <span>Cuéntanos sobre tu proyecto (opcional)</span>
              <textarea
                rows={3}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Sala, cocina, terraza, metros aproximados..."
              />
            </label>

            <div className="field-full lead-actions">
              <a
                className="btn btn-wa"
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
                Pedir información por WhatsApp
              </a>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={restart}
              >
                Repetir test
              </button>
            </div>
          </div>
        </div>

        {/* Modal: galería de productos por estilo */}
        {modalStyle &&
          (() => {
            const s = STYLES[modalStyle];
            return (
              <div
                className="style-modal"
                onClick={() => setModalStyle(null)}
              >
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
                  <p className="result-tagline" style={{ marginBottom: 18 }}>
                    {s.tagline}
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
      </div>
    );
  }

  return null;
}

function Arrow() {
  return (
    <svg
      className="arrow"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
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
