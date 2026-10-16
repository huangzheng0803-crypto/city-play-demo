const experience = document.querySelector('#experience');
const poster = document.querySelector('#poster');
const nextStopCta = document.querySelector('#nextStopCta');
const rednoteCta = document.querySelector('#rednoteCta');

function setCtaVisibility(cta, isVisible) {
  cta.classList.toggle('is-visible', isVisible);
  cta.setAttribute('aria-hidden', String(!isVisible));
  cta.tabIndex = isVisible ? 0 : -1;
}

function updateRednoteCta() {
  const maxScroll = Math.max(1, poster.offsetHeight - experience.clientHeight);
  const ratio = Math.min(1, Math.max(0, experience.scrollTop / maxScroll));
  setCtaVisibility(nextStopCta, ratio >= .28 && ratio < .44);
  setCtaVisibility(rednoteCta, ratio >= .68 && ratio < .96);
}

let scrollTicking = false;
experience.addEventListener('scroll', () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    updateRednoteCta();
    scrollTicking = false;
  });
}, { passive: true });

window.addEventListener('resize', updateRednoteCta);
updateRednoteCta();
