/* Internationalization module — 6 languages */
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
    'about.title': 'Your Event. Our Sound.',
    'about.quote': '"Music is what feelings sound like"',
    'about.heading1': 'The Sound of Every Generation',
    'about.text1': 'Hit Factory is a professional cover band that transforms any event into an unforgettable experience. Our repertoire spans decades — from timeless classics to today\'s biggest hits.',
    'about.heading2': 'Concert-Level Show',
    'about.text2': 'Five talented musicians, state-of-the-art sound, and a spectacular light show — we deliver a concert-level performance at every event, whether it\'s a corporate party, wedding, or private celebration.',
    'about.musicians': 'Musicians',
    'about.songs': 'Songs in Repertoire',
    'about.events': 'Events Performed',
    'about.years': 'Years Together',
    'about.guitar': 'Guitar & Vocals',
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
  },

  ru: {
    'nav.home': 'Главная',
    'nav.about': 'О нас',
    'nav.gallery': 'Галерея',
    'nav.video': 'Видео',
    'nav.contact': 'Контакты',
    'hero.subtitle': 'Профессиональный Кавер Бенд',
    'hero.description': 'Мы привносим энергию живой музыки в ваше мероприятие. От классических хитов до современных чарт-топперов — каждое выступление незабываемо.',
    'hero.cta': 'Забронировать',
    'about.tag': 'Кто мы',
    'about.title': 'Ваше событие. Наш звук.',
    'about.quote': '\u00ABМузыка \u2014 это то, как звучат чувства\u00BB',
    'about.heading1': 'Звучание каждого поколения',
    'about.text1': 'Hit Factory \u2014 профессиональный кавер-бенд, который превращает любое мероприятие в незабываемый опыт. Наш репертуар охватывает десятилетия \u2014 от вечной классики до главных хитов современности.',
    'about.heading2': 'Шоу концертного уровня',
    'about.text2': 'Пять талантливых музыкантов, первоклассный звук и впечатляющее световое шоу \u2014 мы обеспечиваем концертный уровень на каждом мероприятии, будь то корпоратив, свадьба или частный праздник.',
    'about.musicians': 'Музыкантов',
    'about.songs': 'Песен в репертуаре',
    'about.events': 'Проведённых мероприятий',
    'about.years': 'Лет вместе',
    'about.guitar': 'Гитара и вокал',
    'about.vocals': 'Вокал',
    'about.bass': 'Бас-гитара',
    'about.drums': 'Ударные',
    'about.keys': 'Клавишные',
    'gallery.tag': 'Галерея',
    'gallery.title': 'Живые Моменты',
    'video.tag': 'Промо',
    'video.title': 'Смотрите Вживую',
    'video.subtitle': 'Наше новое промо-видео',
    'contact.tag': 'Связаться',
    'contact.title': 'Забронировать Hit Factory',
    'contact.description': 'Готовы сделать ваше мероприятие незабываемым? Свяжитесь с нами любым удобным способом.',
    'contact.phone': 'Телефон',
    'contact.email': 'Почта',
    'footer.rights': 'Все права защищены.'
  },

  uk: {
    'nav.home': 'Головна',
    'nav.about': 'Про нас',
    'nav.gallery': 'Галерея',
    'nav.video': 'В\u0456део',
    'nav.contact': 'Контакти',
    'hero.subtitle': 'Профес\u0456йний Кавер Бенд',
    'hero.description': 'Ми привносимо енерг\u0456ю живо\u0457 музики у вашу под\u0456ю. В\u0456д класичних х\u0456т\u0456в до сучасних чарт-топер\u0456в \u2014 кожен виступ незабутн\u0456й.',
    'hero.cta': 'Забронювати',
    'about.tag': 'Хто ми',
    'about.title': 'Ваша под\u0456я. Наш звук.',
    'about.quote': '\u00ABМузика \u2014 це те, як звучать почуття\u00BB',
    'about.heading1': 'Звучання кожного покол\u0456ння',
    'about.text1': 'Hit Factory \u2014 профес\u0456йний кавер-бенд, який перетворює будь-яку под\u0456ю на незабутн\u0456й досв\u0456д. Наш репертуар охоплює десятил\u0456ття \u2014 в\u0456д в\u0456чно\u0457 класики до головних х\u0456т\u0456в сучасност\u0456.',
    'about.heading2': 'Шоу концертного р\u0456вня',
    'about.text2': "П'ять талановитих музикант\u0456в, першокласний звук \u0456 вражаюче св\u0456тлове шоу \u2014 ми забезпечуємо концертний р\u0456вень на кожн\u0456й под\u0456\u0457, будь то корпоратив, вес\u0456лля чи приватне святкування.",
    'about.musicians': 'Музикант\u0456в',
    'about.songs': 'П\u0456сень у репертуар\u0456',
    'about.events': 'Проведених под\u0456й',
    'about.years': 'Рок\u0456в разом',
    'about.guitar': 'Г\u0456тара \u0456 вокал',
    'about.vocals': 'Вокал',
    'about.bass': 'Бас-г\u0456тара',
    'about.drums': 'Ударн\u0456',
    'about.keys': 'Клав\u0456шн\u0456',
    'gallery.tag': 'Галерея',
    'gallery.title': 'Жив\u0456 Моменти',
    'video.tag': 'Промо',
    'video.title': 'Див\u0456ться Наживо',
    'video.subtitle': 'Наше нове промо-в\u0456део',
    'contact.tag': "Зв'язатися",
    'contact.title': 'Забронювати Hit Factory',
    'contact.description': "Готов\u0456 зробити вашу под\u0456ю незабутньою? Зв'яж\u0456ться з нами будь-яким зручним способом.",
    'contact.phone': 'Телефон',
    'contact.email': 'Пошта',
    'footer.rights': 'Вс\u0456 права захищен\u0456.'
  },

  ka: {
    'nav.home': '\u10db\u10d7\u10d0\u10d5\u10d0\u10e0\u10d8',
    'nav.about': '\u10e9\u10d5\u10d4\u10dc\u10e1 \u10e8\u10d4\u10e1\u10d0\u10ee\u10d4\u10d1',
    'nav.gallery': '\u10d2\u10d0\u10da\u10d4\u10e0\u10d4\u10d0',
    'nav.video': '\u10d5\u10d8\u10d3\u10d4\u10dd',
    'nav.contact': '\u10d9\u10dd\u10dc\u10e2\u10d0\u10e5\u10e2\u10d8',
    'hero.subtitle': '\u10de\u10e0\u10dd\u10e4\u10d4\u10e1\u10d8\u10dd\u10dc\u10d0\u10da\u10e3\u10e0\u10d8 \u10e5\u10d0\u10d5\u10d4\u10e0 \u10d1\u10d4\u10dc\u10d3\u10d8',
    'hero.description': '\u10e9\u10d5\u10d4\u10dc \u10ea\u10dd\u10ea\u10ee\u10d0\u10da\u10d8 \u10db\u10e3\u10e1\u10d8\u10d9\u10d8\u10e1 \u10d4\u10dc\u10d4\u10e0\u10d2\u10d8\u10d0\u10e1 \u10e8\u10d4\u10db\u10dd\u10d5\u10d8\u10e2\u10d0\u10dc\u10d7 \u10d7\u10e5\u10d5\u10d4\u10dc\u10e1 \u10e6\u10dd\u10dc\u10d8\u10e1\u10eb\u10d8\u10d4\u10d1\u10d0\u10e8\u10d8. \u10d9\u10da\u10d0\u10e1\u10d8\u10d9\u10e3\u10e0\u10d8 \u10f0\u10d8\u10e2\u10d4\u10d1\u10d8\u10d3\u10d0\u10dc \u10d7\u10d0\u10dc\u10d0\u10db\u10d4\u10d3\u10e0\u10dd\u10d5\u10d4 \u10e9\u10d0\u10e0\u10e2-\u10e2\u10dd\u10de\u10d4\u10e0\u10d4\u10d1\u10d0\u10db\u10d3\u10d4 \u2014 \u10e7\u10dd\u10d5\u10d4\u10da\u10d8 \u10e8\u10dd\u10e3 \u10d3\u10d0\u10e3\u10d5\u10d8\u10ec\u10e7\u10d0\u10e0\u10d8\u10d0.',
    'hero.cta': '\u10d3\u10d0\u10ef\u10d0\u10d5\u10e8\u10dc\u10d0',
    'about.tag': '\u10d5\u10d8\u10dc \u10d5\u10d0\u10e0\u10d7',
    'about.title': '\u10d7\u10e5\u10d5\u10d4\u10dc\u10d8 \u10e6\u10dd\u10dc\u10d8\u10e1\u10eb\u10d8\u10d4\u10d1\u10d0. \u10e9\u10d5\u10d4\u10dc\u10d8 \u10ee\u10db\u10d0.',
    'about.quote': '\u201e\u10db\u10e3\u10e1\u10d8\u10d9\u10d0 \u10d0\u10e0\u10d8\u10e1 \u10d8\u10e1, \u10e0\u10dd\u10d2\u10dd\u10e0 \u10ef\u10e6\u10d4\u10e0\u10e1 \u10d2\u10e0\u10eb\u10dc\u10dd\u10d1\u10d4\u10d1\u10d8\u201c',
    'about.heading1': '\u10e7\u10dd\u10d5\u10d4\u10da\u10d8 \u10d7\u10d0\u10dd\u10d1\u10d8\u10e1 \u10ee\u10db\u10d0',
    'about.text1': 'Hit Factory \u10d0\u10e0\u10d8\u10e1 \u10de\u10e0\u10dd\u10e4\u10d4\u10e1\u10d8\u10dd\u10dc\u10d0\u10da\u10e3\u10e0\u10d8 \u10e5\u10d0\u10d5\u10d4\u10e0 \u10d1\u10d4\u10dc\u10d3\u10d8, \u10e0\u10dd\u10db\u10d4\u10da\u10d8\u10ea \u10dc\u10d4\u10d1\u10d8\u10e1\u10db\u10d8\u10d4\u10e0 \u10e6\u10dd\u10dc\u10d8\u10e1\u10eb\u10d8\u10d4\u10d1\u10d0\u10e1 \u10d3\u10d0\u10e3\u10d5\u10d8\u10ec\u10e7\u10d0\u10e0 \u10d2\u10d0\u10db\u10dd\u10ea\u10d3\u10d8\u10da\u10d4\u10d1\u10d0\u10d3 \u10d0\u10e5\u10ea\u10d4\u10d5\u10e1. \u10e9\u10d5\u10d4\u10dc\u10d8 \u10e0\u10d4\u10de\u10d4\u10e0\u10e2\u10e3\u10d0\u10e0\u10d8 \u10d0\u10d7\u10ec\u10da\u10d4\u10e3\u10da\u10d4\u10d1\u10e1 \u10db\u10dd\u10d8\u10ea\u10d0\u10d5\u10e1.',
    'about.heading2': '\u10e1\u10d0\u10d9\u10dd\u10dc\u10ea\u10d4\u10e0\u10e2\u10dd \u10d3\u10dd\u10dc\u10d8\u10e1 \u10e8\u10dd\u10e3',
    'about.text2': '\u10ee\u10e3\u10d7\u10d8 \u10dc\u10d8\u10ed\u10d8\u10d4\u10e0\u10d8 \u10db\u10e3\u10e1\u10d8\u10d9\u10dd\u10e1\u10d8, \u10e3\u10db\u10d0\u10e6\u10da\u10d4\u10e1\u10d8 \u10ee\u10d0\u10e0\u10d8\u10e1\u10ee\u10d8\u10e1 \u10ee\u10db\u10d0 \u10d3\u10d0 \u10e1\u10d0\u10dc\u10d0\u10ee\u10d0\u10dd\u10d1\u10e0\u10d8\u10d5\u10d8 \u10e1\u10d8\u10dc\u10d0\u10d7\u10da\u10d8\u10e1 \u10e8\u10dd\u10e3 \u2014 \u10e9\u10d5\u10d4\u10dc \u10e3\u10d6\u10e0\u10e3\u10dc\u10d5\u10d4\u10da\u10d5\u10e7\u10dd\u10e4\u10d7 \u10e1\u10d0\u10d9\u10dd\u10dc\u10ea\u10d4\u10e0\u10e2\u10dd \u10d3\u10dd\u10dc\u10d4\u10e1 \u10e7\u10d5\u10d4\u10da\u10d0 \u10e6\u10dd\u10dc\u10d8\u10e1\u10eb\u10d8\u10d4\u10d1\u10d0\u10d6\u10d4.',
    'about.musicians': '\u10db\u10e3\u10e1\u10d8\u10d9\u10dd\u10e1\u10d8',
    'about.songs': '\u10e1\u10d8\u10db\u10e6\u10d4\u10e0\u10d0 \u10e0\u10d4\u10de\u10d4\u10e0\u10e2\u10e3\u10d0\u10e0\u10e8\u10d8',
    'about.events': '\u10e9\u10d0\u10e2\u10d0\u10e0\u10d4\u10d1\u10e3\u10da\u10d8 \u10e6\u10dd\u10dc\u10d8\u10e1\u10eb\u10d8\u10d4\u10d1\u10d0',
    'about.years': '\u10ec\u10d4\u10da\u10d8 \u10d4\u10e0\u10d7\u10d0\u10d3',
    'about.guitar': '\u10d2\u10d8\u10e2\u10d0\u10e0\u10d0 \u10d3\u10d0 \u10d5\u10dd\u10d9\u10d0\u10da\u10d8',
    'about.vocals': '\u10d5\u10dd\u10d9\u10d0\u10da\u10d8',
    'about.bass': '\u10d1\u10d0\u10e1-\u10d2\u10d8\u10e2\u10d0\u10e0\u10d0',
    'about.drums': '\u10d3\u10e0\u10d0\u10db\u10d8',
    'about.keys': '\u10d9\u10da\u10d0\u10d5\u10d8\u10e8\u10d4\u10d1\u10d8',
    'gallery.tag': '\u10d2\u10d0\u10da\u10d4\u10e0\u10d4\u10d0',
    'gallery.title': '\u10ea\u10dd\u10ea\u10ee\u10d0\u10da\u10d8 \u10db\u10dd\u10db\u10d4\u10dc\u10e2\u10d4\u10d1\u10d8',
    'video.tag': '\u10de\u10e0\u10dd\u10db\u10dd',
    'video.title': '\u10dc\u10d0\u10ee\u10d4\u10d7 \u10ea\u10dd\u10ea\u10ee\u10d0\u10da\u10d3',
    'video.subtitle': '\u10e9\u10d5\u10d4\u10dc\u10d8 \u10d0\u10ee\u10d0\u10da\u10d8 \u10de\u10e0\u10dd\u10db\u10dd \u10d5\u10d8\u10d3\u10d4\u10dd',
    'contact.tag': '\u10d3\u10d0\u10d2\u10d5\u10d8\u10d9\u10d0\u10d5\u10e8\u10d8\u10e0\u10d3\u10d8\u10d7',
    'contact.title': '\u10d3\u10d0\u10ef\u10d0\u10d5\u10e8\u10dc\u10d4\u10d7 Hit Factory',
    'contact.description': '\u10db\u10d6\u10d0\u10d3 \u10ee\u10d0\u10e0\u10d7 \u10d7\u10e5\u10d5\u10d4\u10dc\u10d8 \u10e6\u10dd\u10dc\u10d8\u10e1\u10eb\u10d8\u10d4\u10d1\u10d0 \u10d3\u10d0\u10e3\u10d5\u10d8\u10ec\u10e7\u10d0\u10e0\u10d8 \u10d2\u10d0\u10ee\u10d0\u10d3\u10dd\u10d7? \u10d3\u10d0\u10d2\u10d5\u10d8\u10d9\u10d0\u10d5\u10e8\u10d8\u10e0\u10d3\u10d8\u10d7 \u10dc\u10d4\u10d1\u10d8\u10e1\u10db\u10d8\u10d4\u10e0\u10d8 \u10ee\u10d4\u10da\u10e1\u10d0\u10e7\u10e0\u10d4\u10da\u10d8 \u10e1\u10d0\u10e8\u10e3\u10d0\u10da\u10d4\u10d1\u10d8\u10d7.',
    'contact.phone': '\u10e2\u10d4\u10da\u10d4\u10e4\u10dd\u10dc\u10d8',
    'contact.email': '\u10d4\u10da. \u10e4\u10dd\u10e1\u10e2\u10d0',
    'footer.rights': '\u10e7\u10d5\u10d4\u10da\u10d0 \u10e3\u10e4\u10da\u10d4\u10d1\u10d0 \u10d3\u10d0\u10ea\u10e3\u10da\u10d8\u10d0.'
  },

  // Armenian — placeholder, needs professional translation
  hy: {
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
    'about.quote': '"Music is what feelings sound like"',
    'about.heading1': 'The Sound of Every Generation',
    'about.text1': 'Hit Factory is a professional cover band that transforms any event into an unforgettable experience. Our repertoire spans decades — from timeless classics to today\'s biggest hits.',
    'about.heading2': 'Concert-Level Show',
    'about.text2': 'Five talented musicians, state-of-the-art sound, and a spectacular light show — we deliver a concert-level performance at every event.',
    'about.musicians': 'Musicians',
    'about.songs': 'Songs in Repertoire',
    'about.events': 'Events Performed',
    'about.years': 'Years Together',
    'about.guitar': 'Guitar & Vocals',
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
  },

  kk: {
    'nav.home': 'Басты',
    'nav.about': 'Біз туралы',
    'nav.gallery': 'Галерея',
    'nav.video': 'Бейне',
    'nav.contact': 'Байланыс',
    'hero.subtitle': 'Кәсіби Кавер Бенд',
    'hero.description': 'Біз сіздің іс-шараңызға тірі музыканың энергиясын әкелеміз. Классикалық хиттерден бастап заманауи чарт-топтерге дейін \u2014 әр шоу ұмытылмас.',
    'hero.cta': 'Брондау',
    'about.tag': 'Біз кімбіз',
    'about.title': 'Сіздің іс-шара. Біздің дыбыс.',
    'about.quote': '\u00ABМузыка \u2014 сезімдердің дыбысы\u00BB',
    'about.heading1': 'Әр буынның дыбысы',
    'about.text1': 'Hit Factory \u2014 кез келген іс-шараны ұмытылмас тәжірибеге айналдыратын кәсіби кавер-бенд. Біздің репертуарымыз ондаған жылдарды қамтиды \u2014 мәңгілік классикадан бүгінгі хиттерге дейін.',
    'about.heading2': 'Концерттік деңгейдегі шоу',
    'about.text2': 'Бес талантты музыкант, жоғары сапалы дыбыс және керемет жарық шоу \u2014 біз корпоратив, той немесе жеке мереке болсын, әр іс-шарада концерттік деңгейді қамтамасыз етеміз.',
    'about.musicians': 'Музыкант',
    'about.songs': 'Репертуардағы ән',
    'about.events': 'Өткізілген іс-шара',
    'about.years': 'Жыл бірге',
    'about.guitar': 'Гитара және вокал',
    'about.vocals': 'Вокал',
    'about.bass': 'Бас-гитара',
    'about.drums': 'Барабан',
    'about.keys': 'Клавиш',
    'gallery.tag': 'Галерея',
    'gallery.title': 'Тірі Сәттер',
    'video.tag': 'Промо',
    'video.title': 'Тірі Көріңіз',
    'video.subtitle': 'Біздің жаңа промо бейне',
    'contact.tag': 'Байланысу',
    'contact.title': 'Hit Factory Брондау',
    'contact.description': 'Іс-шараңызды ұмытылмас етуге дайынсыз ба? Бізбен кез келген ыңғайлы жолмен байланысыңыз.',
    'contact.phone': 'Телефон',
    'contact.email': 'Пошта',
    'footer.rights': 'Барлық құқықтар қорғалған.'
  }
};

function setLanguage(lang) {
  document.documentElement.lang = lang;

  // Set font class for non-Latin/Cyrillic scripts
  document.body.classList.remove('font-georgian', 'font-armenian');
  if (lang === 'ka') document.body.classList.add('font-georgian');
  if (lang === 'hy') document.body.classList.add('font-armenian');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  localStorage.setItem('hf-lang', lang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update OG locale meta
  const localeMap = { en: 'en_US', ru: 'ru_RU', uk: 'uk_UA', ka: 'ka_GE', hy: 'hy_AM', kk: 'kk_KZ' };
  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (ogLocale) ogLocale.setAttribute('content', localeMap[lang] || 'en_US');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('hf-lang') || 'en';
  setLanguage(saved);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });
});
