const translate = require('@vitalets/google-translate-api');

const enTexts = {
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.gallery': 'Gallery',
  'nav.video': 'Video',
  'nav.contact': 'Contact',
  'hero.subtitle': 'Professional Cover Band',
  'hero.description': 'We bring the energy of live music to your event. From classic hits to modern chart-toppers — every performance is unforgettable.',
  'hero.cta': 'Book Now',
  'about.tag': 'Who We Are',
  'about.title': 'Your Event. Our Sound.',
  'about.quote': 'Music is what feelings sound like',
  'about.heading1': 'The Sound of Every Generation',
  'about.text1': 'Hit Factory is a professional cover band that transforms any event into an unforgettable experience. Our repertoire spans decades — from timeless classics to today\'s biggest hits.',
  'about.heading2': 'Concert-Level Show',
  'about.text2': 'Five talented musicians, state-of-the-art sound, and a spectacular light show — we deliver a concert-level performance at every event, whether it\'s a corporate party, wedding, or private celebration.',
  'about.musicians': 'Musicians',
  'about.songs': 'Songs in Repertoire',
  'about.events': 'Events Performed',
  'about.years': 'Years Together',
  'about.guitar': 'Guitar and Vocals',
  'about.vocals': 'Lead Vocals',
  'about.bass': 'Bass',
  'about.drums': 'Drums',
  'about.keys': 'Keys',
  'gallery.tag': 'Gallery',
  'gallery.title': 'Live Moments',
  'video.tag': 'Promo',
  'video.title': 'See Us Live',
  'video.subtitle': 'Watch our latest promo video',
  'contact.tag': 'Get in Touch',
  'contact.title': 'Book Hit Factory',
  'contact.description': 'Ready to make your event unforgettable? Reach out to us through any of the channels below.',
  'contact.phone': 'Phone',
  'contact.email': 'Email',
  'footer.rights': 'All rights reserved.'
};

async function translateAll() {
  const result = {};
  const keys = Object.keys(enTexts);

  for (const key of keys) {
    try {
      const res = await translate.translate(enTexts[key], { to: 'hy' });
      result[key] = res.text;
      console.log(`${key}: ${res.text}`);
      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 300));
    } catch (e) {
      console.error(`Error translating ${key}: ${e.message}`);
      result[key] = enTexts[key];
    }
  }

  console.log('\n// Armenian translations object:');
  console.log('hy: ' + JSON.stringify(result, null, 2));
}

translateAll();
