// Pega aquí los enlaces definitivos cuando los tengas.
const INVITATION_LINKS = {
  maps: "https://www.google.com.mx/maps/place/Salon+de+Eventos+Club+Diamante/@16.8043329,-99.8246773,17z/data=!3m1!4b1!4m6!3m5!1s0x85ca5904820fa251:0xec0a25bba092d2aa!8m2!3d16.8043329!4d-99.8246773!16s%2Fg%2F11yhpjwwyj?entry=ttu&g_ep=EgoyMDI2MTExOC4xIKXMDSoASAFQAw%3D%3D",      // Ejemplo: https://maps.app.goo.gl/...
  whatsapp: "https://wa.me/7442818992?text=Hola%2C%20te%20confirmo%20mi%20asistencia%20para%20el%20baby%20shower%3A3"   // Ejemplo: https://wa.me/521XXXXXXXXXX?text=Hola...
};

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
  // Algunos navegadores requieren interacción explícita para reproducir audio.
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
  pendingNote.textContent = "¡Listo! Usa los botones para consultar los detalles y confirmar tu asistencia.";
}
