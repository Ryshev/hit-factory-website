/* Internationalization module */
const translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.gallery': 'Gallery',
    'nav.video': 'Video',
    'nav.contact': 'Contact',
    'hero.subtitle': 'Professional Cover Band',
    'hero.description': 'We bring the energy of live music to your event. From classic hits to modern chart-toppers — every performance is unforgettable.',
    'hero.cta': 'Book Now',
    'about.tag': 'Who We Are',
    'about.title': 'Your Event.<br>Our Sound.',
    'about.text1': 'Hit Factory is a professional cover band that transforms any event into an unforgettable experience. Our repertoire spans decades — from timeless classics to today\'s biggest hits.',
    'about.text2': 'Five talented musicians, state-of-the-art sound, and a spectacular light show — we deliver a concert-level performance at every event, whether it\'s a corporate party, wedding, or private celebration.',
    'about.musicians': 'Musicians',
    'about.songs': 'Songs',
    'about.events': 'Events',
    'gallery.tag': 'Gallery',
    'gallery.title': 'Live Moments',
    'video.tag': 'Promo',
    'video.title': 'See Us Live',
    'video.fallback': 'Your browser does not support the video tag.',
    'contact.tag': 'Get in Touch',
    'contact.title': 'Book Hit Factory',
    'contact.description': 'Ready to make your event unforgettable? Reach out to us through any of the channels below.',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'footer.rights': 'All rights reserved.'
  },
  ru: {
    'nav.home': 'Главная',
    'nav.about': 'О нас',
    'nav.gallery': 'Галерея',
    'nav.video': 'Видео',
    'nav.contact': 'Контакты',
    'hero.subtitle': 'Профессиональный Кавер Бенд',
    'hero.description': 'Мы привносим энергию живой музыки в ваше событие. От классических хитов до современных чарт-топперов — каждое выступление незабываемо.',
    'hero.cta': 'Забронировать',
    'about.tag': 'Кто мы',
    'about.title': 'Ваше Событие.<br>Наш Звук.',
    'about.text1': 'Hit Factory — профессиональный кавер-бенд, который превращает любое мероприятие в незабываемый опыт. Наш репертуар охватывает десятилетия — от вечной классики до главных хитов современности.',
    'about.text2': 'Пять талантливых музыкантов, первоклассный звук и впечатляющее световое шоу — мы обеспечиваем концертный уровень на каждом мероприятии, будь то корпоратив, свадьба или частный праздник.',
    'about.musicians': 'Музыкантов',
    'about.songs': 'Песен',
    'about.events': 'Мероприятий',
    'gallery.tag': 'Галерея',
    'gallery.title': 'Живые Моменты',
    'video.tag': 'Промо',
    'video.title': 'Смотрите Вживую',
    'video.fallback': 'Ваш браузер не поддерживает видео.',
    'contact.tag': 'Связаться',
    'contact.title': 'Забронировать Hit Factory',
    'contact.description': 'Готовы сделать ваше мероприятие незабываемым? Свяжитесь с нами любым удобным способом.',
    'contact.phone': 'Телефон',
    'contact.email': 'Почта',
    'footer.rights': 'Все права защищены.'
  }
};

function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      if (el.innerHTML.includes('<br>') || translations[lang][key].includes('<br>')) {
        el.innerHTML = translations[lang][key];
      } else {
        el.textContent = translations[lang][key];
      }
    }
  });
  localStorage.setItem('hf-lang', lang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

// Initialize language
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('hf-lang') || 'en';
  setLanguage(saved);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });
});
