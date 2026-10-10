/**
 * Hola Mundo DevOps ITLA — app.js
 * JS modular: sin frameworks, solo ES Modules + funciones puras.
 */

const $ = (selector) => document.querySelector(selector);

const state = {
  saludos: 0,
};

/** Reloj estilo iOS (formato 24h → 9:41) */
function tickReloj() {
  const el = $("#hora");
  if (!el) return;
  const ahora = new Date();
  const h = ahora.getHours() % 12 || 12;
  const m = String(ahora.getMinutes()).padStart(2, "0");
  el.textContent = `${h}:${m}`;
}

/** Muestra un mensaje temporal con animación */
function mostrarMensaje(texto) {
  const el = $("#mensaje");
  if (!el) return;
  el.textContent = texto;
  el.classList.add("message--visible");
  clearTimeout(mostrarMensaje._t);
  mostrarMensaje._t = setTimeout(() => el.classList.remove("message--visible"), 3200);
}

/** Handler: botón Saludar */
function onSaludar() {
  state.saludos += 1;
  const nombre = "DevOps ITLA";
  mostrarMensaje(
    state.saludos === 1
      ? `👋 ¡Hola Mundo — ${nombre}!`
      : `👋 ¡Hola de nuevo! Llevas ${state.saludos} saludos.`
  );
}

/** Handler: simula visualmente el push → ntfy.sh */
function onSimularNotificacion() {
  const badgeText = $("#badge-text");
  const ultimo = $("#ultimo-push");
  const ahora = new Date().toLocaleTimeString("es-DO", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  if (badgeText) badgeText.textContent = "Enviando push → ntfy.sh…";
  mostrarMensaje("📡 Simulando POST a ntfy.sh/devops-itla…");

  setTimeout(() => {
    if (badgeText) badgeText.textContent = "Push to Main → ntfy.sh ✓";
    if (ultimo) ultimo.textContent = `simulado ${ahora}`;
    mostrarMensaje("✅ Notificación simulada: rocket,computer 🚀");
  }, 900);
}

/** Init */
function init() {
  const btnSaludar = $("#btn-saludar");
  const btnNotificar = $("#btn-notificar");

  if (btnSaludar) btnSaludar.addEventListener("click", onSaludar);
  if (btnNotificar) btnNotificar.addEventListener("click", onSimularNotificacion);

  const anio = $("#anio");
  if (anio) anio.textContent = String(new Date().getFullYear());

  tickReloj();
  setInterval(tickReloj, 30_000);
}

document.addEventListener("DOMContentLoaded", init);

export { onSaludar, onSimularNotificacion };
