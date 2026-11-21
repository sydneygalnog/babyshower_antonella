// Pega aquí los enlaces definitivos cuando los tengas.
const INVITATION_LINKS = {
  maps: "https://www.google.com.mx/maps/place/Salon+de+Eventos+Club+Diamante/@16.8043329,-99.8246773,17z/data=!3m1!4b1!4m6!3m5!1s0x85ca5904820fa251:0xec0a25bba092d2aa!8m2!3d16.8043329!4d-99.8246773!16s%2Fg%2F11yhpjwwyj?entry=ttu&g_ep=EgoyMDI2MTExOC4xIKXMDSoASAFQAw%3D%3D",
  whatsapp: "https://wa.me/527442818992?text=Hola%2C%20te%20confirmo%20mi%20asistencia%20para%20el%20baby%20shower%20%3A3"
};

// CONFIGURA AQUÍ LA FECHA Y HORA DEL EVENTO (Formato: AAAA-MM-DDTHH:MM:SS)
const EVENT_DATE = new Date("2026-12-06T16:00:00").getTime();

const openButton = document.getElementById("openInvite");
const welcome = document.getElementById("welcome");
const invitation = document.getElementById("invitation");
const video = document.getElementById("inviteVideo");
const mapsButton = document.getElementById("mapsButton");
const whatsappButton = document.getElementById("whatsappButton");
const pendingNote = document.getElementById("pendingNote");

openButton.addEventListener("click", () => {
  welcome.classList.add("hidden");
  invitation.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
  video.play().catch(() => {
    // Si el navegador bloquea la reproducción automática, el invitado puede pulsar Play.
  });
});

function activateLink(element, url) {
  if (url && url.trim()) {
    element.href = url.trim();
    element.removeAttribute("aria-disabled");
    element.addEventListener("click", (event) => {
      if (!element.href || element.getAttribute("aria-disabled") === "true") event.preventDefault();
    });
  } else {
    element.href = "#";
    element.setAttribute("aria-disabled", "true");
    element.addEventListener("click", (event) => event.preventDefault());
  }
}

activateLink(mapsButton, INVITATION_LINKS.maps);
activateLink(whatsappButton, INVITATION_LINKS.whatsapp);

if (INVITATION_LINKS.maps || INVITATION_LINKS.whatsapp) {
  pendingNote.textContent = "Usa los botones para consultar los detalles y confirmar tu asistencia.";
}

// Lógica del contador regresivo
function updateCountdown() {
  const countdownEl = document.getElementById("countdown");
  if (!countdownEl) return;

  const now = new Date().getTime();
  const distance = EVENT_DATE - now;

  if (distance <= 0) {
    countdownEl.innerHTML = '<p class="countdown-finished">¡Hoy celebramos la llegada de Zoe Antonella! ♡</p>';
    clearInterval(countdownInterval);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);