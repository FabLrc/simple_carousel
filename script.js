// Configuration du carrousel
const config = {
  mainImageSelector: '.carousel-main-image',
  thumbnailsSelector: '.carousel-thumbnails',
  thumbnailSelector: '.carousel-thumb',
  prevBtnSelector: '.carousel-prev',
  nextBtnSelector: '.carousel-next',
  activeClass: 'active'
};

let currentIndex = 0;

// Fonction d'initialisation
function initCarousel() {
  const mainImg = document.querySelector(config.mainImageSelector);
  const thumbs = document.querySelectorAll(config.thumbnailSelector);
  const prevBtn = document.querySelector(config.prevBtnSelector);
  const nextBtn = document.querySelector(config.nextBtnSelector);
  
  if (!mainImg || !thumbs.length) return;
  
  // Clic sur les miniatures
  thumbs.forEach((thumb, idx) => {
    thumb.addEventListener('click', () => {
      currentIndex = idx;
      updateCarousel();
    });
  });
  
  // Bouton précédent
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : thumbs.length - 1;
      updateCarousel();
    });
  }
  
  // Bouton suivant
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = currentIndex < thumbs.length - 1 ? currentIndex + 1 : 0;
      updateCarousel();
    });
  }
  
  // Navigation au clavier
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : thumbs.length - 1;
      updateCarousel();
    } else if (e.key === 'ArrowRight') {
      currentIndex = currentIndex < thumbs.length - 1 ? currentIndex + 1 : 0;
      updateCarousel();
    }
  });
  
  updateCarousel();
}

// Mise à jour du carrousel
function updateCarousel() {
  const mainImg = document.querySelector(config.mainImageSelector);
  const thumbs = document.querySelectorAll(config.thumbnailSelector);
  
  if (!mainImg || !thumbs[currentIndex]) return;
  
  const activeThumb = thumbs[currentIndex];
  
  // Récupérer l'image source depuis la miniature active
  let imageSrc = '';
  const thumbImg = activeThumb.querySelector('img');
  
  if (thumbImg) {
    // Si la miniature contient une balise <img>
    imageSrc = thumbImg.src;
  } else if (activeThumb.style.backgroundImage) {
    // Si la miniature utilise un background-image
    imageSrc = activeThumb.style.backgroundImage.slice(5, -2);
  } else {
    // Si l'image est définie via CSS
    const computedStyle = window.getComputedStyle(activeThumb);
    imageSrc = computedStyle.backgroundImage.slice(5, -2);
  }
  
  // Mise à jour de l'image principale
  if (mainImg.tagName === 'IMG') {
    mainImg.src = imageSrc;
  } else {
    mainImg.style.backgroundImage = `url(${imageSrc})`;
  }
  
  // Mise à jour des classes actives
  thumbs.forEach((thumb, idx) => {
    thumb.classList.toggle(config.activeClass, idx === currentIndex);
  });
}

// Lancement au chargement du DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCarousel);
} else {
  initCarousel();
}

// Pour Oxygen Builder - réinitialiser lors de l'édition
if (window.jQuery) {
  jQuery(document).on('oxygen-ajax-element-loaded', initCarousel);
}