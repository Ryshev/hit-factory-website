/* Internationalization module — 6 languages */
const translations = {
  en: {
    'page.title': 'Hit Factory — Premium Cover Band | Live Music for Events',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.gallery': 'Gallery',
    'nav.video': 'Video',
    'nav.contact': 'Contact',
    'hero.subtitle': 'Premium Cover Band',
    'hero.description': 'Fronted by the ex-guitarist of Gradusy. A team of professional musicians creating an unforgettable atmosphere with authentic live sound.',
    'hero.cta': 'Book Now',
    'about.tag': 'Who We Are',
    'about.title': 'Your Event \u2014 Our Show',
    'about.heading1': 'World Hits in Every Language',
    'about.text1': 'Hit Factory is a premium cover band fronted by the ex-guitarist of Gradusy. An experienced team of professional musicians delivering authentic live sound that creates a one-of-a-kind atmosphere. Modern, high-quality performances of iconic world hits in English, Russian, Georgian, Armenian, Kazakh and more.',
    'about.heading2': 'For Every Celebration',
    'about.text2': 'Weddings, corporate events, birthdays, and any special occasion. Flexible format: full band, trio, or acoustic set. A music show that stays in your memory — professional musicians, spectacular performance, and the hits everyone loves.',
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
    'page.title': 'Hit Factory — Премиум Кавер Бенд | Живая музыка на мероприятие',
    'nav.home': 'Главная',
    'nav.about': 'О нас',
    'nav.gallery': 'Галерея',
    'nav.video': 'Видео',
    'nav.contact': 'Контакты',
    'hero.subtitle': 'Премиум Кавер Бенд',
    'hero.description': 'Фронтмен \u2014 экс-гитарист группы \u00ABГрадусы\u00BB. Команда профессиональных музыкантов, создающая неповторимую атмосферу настоящим живым звуком.',
    'hero.cta': 'Забронировать',
    'about.tag': 'Кто мы',
    'about.title': 'Ваше событие \u2014 Наше шоу',
    'about.heading1': 'Мировые хиты на всех языках',
    'about.text1': 'Hit Factory \u2014 премиум кавер-бенд, фронтмен которого \u2014 экс-гитарист группы \u00ABГрадусы\u00BB. Опытная команда профессиональных музыкантов с настоящим живым звуком, который создаёт неповторимую атмосферу. Современное и качественное исполнение культовых мировых хитов на английском, русском, грузинском, армянском, казахском и других языках.',
    'about.heading2': 'Для любого праздника',
    'about.text2': 'Свадьбы, корпоративы, дни рождения и любые яркие праздники. Гибкий формат: полный состав, трио или акустическая программа. Музыка и шоу, которое останется в вашей памяти \u2014 профессиональные музыканты, впечатляющее выступление и хиты, которые любят все.',
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
    'page.title': 'Hit Factory — Преміум Кавер Бенд | Жива музика на подію',
    'nav.home': 'Головна',
    'nav.about': 'Про нас',
    'nav.gallery': 'Галерея',
    'nav.video': 'В\u0456део',
    'nav.contact': 'Контакти',
    'hero.subtitle': 'Прем\u0456ум Кавер Бенд',
    'hero.description': 'Фронтмен \u2014 екс-г\u0456тарист гурту \u00ABГрадуси\u00BB. Команда профес\u0456йних музикант\u0456в, що створює неповторну атмосферу справжн\u0456м живим звуком.',
    'hero.cta': 'Забронювати',
    'about.tag': 'Хто ми',
    'about.title': 'Ваша под\u0456я \u2014 Наше шоу',
    'about.heading1': 'Св\u0456тов\u0456 х\u0456ти вс\u0456ма мовами',
    'about.text1': 'Hit Factory \u2014 прем\u0456ум кавер-бенд, фронтмен якого \u2014 екс-г\u0456тарист гурту \u00ABГрадуси\u00BB. Досв\u0456дчена команда профес\u0456йних музикант\u0456в \u0456з справжн\u0456м живим звуком, який створює неповторну атмосферу. Сучасне та як\u0456сне виконання культових св\u0456тових х\u0456т\u0456в англ\u0456йською, рос\u0456йською, грузинською, в\u0456рменською, казахською та \u0456ншими мовами.',
    'about.heading2': 'Для будь-якого свята',
    'about.text2': 'Вес\u0456лля, корпоративи, дн\u0456 народження та будь-як\u0456 яскрав\u0456 свята. Гнучкий формат: повний склад, тр\u0456о або акустична програма. Музика та шоу, яке залишиться у ваш\u0456й пам\u2019ят\u0456 \u2014 профес\u0456йн\u0456 музиканти, вражаючий виступ та х\u0456ти, як\u0456 люблять ус\u0456.',
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
    'page.title': 'Hit Factory — Premium Cover Band',
    'nav.home': '\u10db\u10d7\u10d0\u10d5\u10d0\u10e0\u10d8',
    'nav.about': '\u10e9\u10d5\u10d4\u10dc\u10e1 \u10e8\u10d4\u10e1\u10d0\u10ee\u10d4\u10d1',
    'nav.gallery': '\u10d2\u10d0\u10da\u10d4\u10e0\u10d4\u10d0',
    'nav.video': '\u10d5\u10d8\u10d3\u10d4\u10dd',
    'nav.contact': '\u10d9\u10dd\u10dc\u10e2\u10d0\u10e5\u10e2\u10d8',
    'hero.subtitle': '\u10de\u10e0\u10dd\u10e4\u10d4\u10e1\u10d8\u10dd\u10dc\u10d0\u10da\u10e3\u10e0\u10d8 \u10e5\u10d0\u10d5\u10d4\u10e0 \u10d1\u10d4\u10dc\u10d3\u10d8',
    'hero.description': '\u10e9\u10d5\u10d4\u10dc \u10ea\u10dd\u10ea\u10ee\u10d0\u10da\u10d8 \u10db\u10e3\u10e1\u10d8\u10d9\u10d8\u10e1 \u10d4\u10dc\u10d4\u10e0\u10d2\u10d8\u10d0\u10e1 \u10e8\u10d4\u10db\u10dd\u10d5\u10d8\u10e2\u10d0\u10dc\u10d7 \u10d7\u10e5\u10d5\u10d4\u10dc\u10e1 \u10e6\u10dd\u10dc\u10d8\u10e1\u10eb\u10d8\u10d4\u10d1\u10d0\u10e8\u10d8. \u10d9\u10da\u10d0\u10e1\u10d8\u10d9\u10e3\u10e0\u10d8 \u10f0\u10d8\u10e2\u10d4\u10d1\u10d8\u10d3\u10d0\u10dc \u10d7\u10d0\u10dc\u10d0\u10db\u10d4\u10d3\u10e0\u10dd\u10d5\u10d4 \u10e9\u10d0\u10e0\u10e2-\u10e2\u10dd\u10de\u10d4\u10e0\u10d4\u10d1\u10d0\u10db\u10d3\u10d4 \u2014 \u10e7\u10dd\u10d5\u10d4\u10da\u10d8 \u10e8\u10dd\u10e3 \u10d3\u10d0\u10e3\u10d5\u10d8\u10ec\u10e7\u10d0\u10e0\u10d8\u10d0.',
    'hero.cta': '\u10d3\u10d0\u10ef\u10d0\u10d5\u10e8\u10dc\u10d0',
    'about.tag': '\u10d5\u10d8\u10dc \u10d5\u10d0\u10e0\u10d7',
    'about.title': '\u10d7\u10e5\u10d5\u10d4\u10dc\u10d8 \u10e6\u10dd\u10dc\u10d8\u10e1\u10eb\u10d8\u10d4\u10d1\u10d0 \u2014 \u10e9\u10d5\u10d4\u10dc\u10d8 \u10e8\u10dd\u10e3',
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

  // Armenian — auto-translated via Google Translate, may need review
  hy: {
    'page.title': 'Hit Factory — Premium Cover Band',
    'nav.home': '\u0533\u056c\u056d\u0561\u057e\u0578\u0580',
    'nav.about': '\u0544\u0565\u0580 \u0574\u0561\u057d\u056b\u0576',
    'nav.gallery': '\u054a\u0561\u057f\u056f\u0565\u0580\u0561\u057d\u0580\u0561\u0570',
    'nav.video': '\u054f\u0565\u057d\u0561\u0576\u0575\u0578\u0582\u0569',
    'nav.contact': '\u053f\u0561\u057a',
    'hero.subtitle': '\u054a\u0580\u0578\u0586\u0565\u057d\u056b\u0578\u0576\u0561\u056c Cover Band',
    'hero.description': '\u0544\u0565\u0576\u0584 \u0571\u0565\u0580 \u0574\u056b\u057b\u0578\u0581\u0561\u057c\u0574\u0561\u0576\u0568 \u0562\u0565\u0580\u0578\u0582\u0574 \u0565\u0576\u0584 \u056f\u0565\u0576\u0564\u0561\u0576\u056b \u0565\u0580\u0561\u056a\u0577\u057f\u0578\u0582\u0569\u0575\u0561\u0576 \u0567\u0576\u0565\u0580\u0563\u056b\u0561\u0589 \u0534\u0561\u057d\u0561\u056f\u0561\u0576 \u0570\u056b\u0569\u0565\u0580\u056b\u0581 \u0574\u056b\u0576\u0579\u0587 \u056a\u0561\u0574\u0561\u0576\u0561\u056f\u0561\u056f\u056b\u0581 \u0579\u0561\u0580\u0569\u0565\u0580\u056b \u0561\u057c\u0561\u057b\u0561\u057f\u0561\u0580\u0576\u0565\u0580\u055d \u0575\u0578\u0582\u0580\u0561\u0584\u0561\u0576\u0579\u0575\u0578\u0582\u0580 \u056f\u0561\u057f\u0561\u0580\u0578\u0582\u0574 \u0561\u0576\u0574\u0578\u057c\u0561\u0576\u0561\u056c\u056b \u0567\u0589',
    'hero.cta': '\u0531\u0574\u0580\u0561\u0563\u0580\u0565\u0584 \u0570\u056b\u0574\u0561',
    'about.tag': '\u0555\u057e \u0565\u0576\u0584 \u0574\u0565\u0576\u0584',
    'about.title': '\u0541\u0565\u0580 \u056b\u0580\u0561\u0564\u0561\u0580\u0571\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0568 \u2014 \u0544\u0565\u0580 \u0577\u0578\u0582\u0576',
    'about.quote': '\u0535\u0580\u0561\u056a\u0577\u057f\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0576 \u0561\u0575\u0576 \u0567, \u056b\u0576\u0579 \u0566\u0563\u0561\u0581\u0578\u0572\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0576\u0565\u0580 \u0565\u0576 \u0570\u0576\u0579\u0578\u0582\u0574',
    'about.heading1': '\u0531\u0574\u0565\u0576 \u057d\u0565\u0580\u0576\u0564\u056b \u0571\u0561\u0575\u0576\u0568',
    'about.text1': 'Hit Factory-\u0576 \u057a\u0580\u0578\u0586\u0565\u057d\u056b\u0578\u0576\u0561\u056c \u0584\u0561\u057e\u0565\u0580 \u056d\u0578\u0582\u0574\u0562 \u0567, \u0578\u0580\u0568 \u0581\u0561\u0576\u056f\u0561\u0581\u0561\u056e \u056b\u0580\u0561\u0564\u0561\u0580\u0571\u0578\u0582\u0569\u0575\u0578\u0582\u0576 \u057e\u0565\u0580\u0561\u056e\u0578\u0582\u0574 \u0567 \u0561\u0576\u0574\u0578\u057c\u0561\u0576\u0561\u056c\u056b \u0583\u0578\u0580\u0571\u056b\u0589 \u0544\u0565\u0580 \u0565\u0580\u0563\u0561\u0581\u0561\u0576\u056f\u0568 \u057f\u0587\u0578\u0582\u0574 \u0567 \u057f\u0561\u057d\u0576\u0561\u0574\u0575\u0561\u056f\u0576\u0565\u0580\u055d \u0570\u0561\u057e\u0565\u0580\u056a\u0561\u056f\u0561\u0576 \u0564\u0561\u057d\u0561\u056f\u0561\u0576\u0576\u0565\u0580\u056b\u0581 \u0574\u056b\u0576\u0579\u0587 \u0561\u0575\u057d\u0585\u0580\u057e\u0561 \u0561\u0574\u0565\u0576\u0561\u0574\u0565\u056e \u0570\u056b\u0569\u0565\u0580\u0568\u0589',
    'about.heading2': '\u0540\u0561\u0574\u0565\u0580\u0563\u0561\u0575\u056b\u0576 \u0574\u0561\u056f\u0561\u0580\u0564\u0561\u056f\u056b \u0577\u0578\u0582',
    'about.text2': '\u0540\u056b\u0576\u0563 \u057f\u0561\u0572\u0561\u0576\u0564\u0561\u057e\u0578\u0580 \u0565\u0580\u0561\u056a\u056b\u0577\u057f\u0576\u0565\u0580, \u0563\u0565\u0580\u056a\u0561\u0574\u0561\u0576\u0561\u056f\u0561\u056f\u056b\u0581 \u0571\u0561\u0575\u0576 \u0587 \u057f\u057a\u0561\u057e\u0578\u0580\u056b\u0579 \u056c\u0578\u0582\u057d\u0561\u0575\u056b\u0576 \u0577\u0578\u0582. \u0574\u0565\u0576\u0584 \u056f\u0561\u057f\u0561\u0580\u0578\u0582\u0574 \u0565\u0576\u0584 \u0570\u0561\u0574\u0565\u0580\u0563\u0561\u0575\u056b\u0576 \u0574\u0561\u056f\u0561\u0580\u0564\u0561\u056f \u0575\u0578\u0582\u0580\u0561\u0584\u0561\u0576\u0579\u0575\u0578\u0582\u0580 \u0574\u056b\u057b\u0578\u0581\u0561\u057c\u0574\u0561\u0576, \u056c\u056b\u0576\u056b \u0564\u0561 \u056f\u0578\u0580\u057a\u0578\u0580\u0561\u057f\u056b\u057e \u0565\u0580\u0565\u056f\u0578\u0582\u0575\u0569, \u0570\u0561\u0580\u057d\u0561\u0576\u056b\u0584 \u056f\u0561\u0574 \u0574\u0561\u057d\u0576\u0561\u057e\u0578\u0580 \u057f\u0578\u0576\u0561\u056f\u0561\u057f\u0561\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0589',
    'about.musicians': '\u0535\u0580\u0561\u056a\u056b\u0577\u057f\u0576\u0565\u0580',
    'about.songs': '\u0535\u0580\u0563\u0565\u0580 \u0565\u0580\u0563\u0561\u0581\u0561\u0576\u056f\u0578\u0582\u0574',
    'about.events': '\u053b\u0580\u0561\u056f\u0561\u0576\u0561\u0581\u057e\u0561\u056e \u056b\u0580\u0561\u0564\u0561\u0580\u0571\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0576\u0565\u0580',
    'about.years': '\u054f\u0561\u0580\u056b\u0576\u0565\u0580 \u0574\u056b\u0561\u057d\u056b\u0576',
    'about.guitar': '\u053f\u056b\u0569\u0561\u057c \u0587 \u057e\u0578\u056f\u0561\u056c',
    'about.vocals': '\u0531\u057c\u0561\u057b\u0561\u057f\u0561\u0580 \u057e\u0578\u056f\u0561\u056c',
    'about.bass': '\u0532\u0561\u057d',
    'about.drums': '\u0539\u0574\u0562\u0578\u0582\u056f\u0576\u0565\u0580',
    'about.keys': '\u054d\u057f\u0565\u0572\u0576\u0561\u0577\u0561\u0580',
    'gallery.tag': '\u054a\u0561\u057f\u056f\u0565\u0580\u0561\u057d\u0580\u0561\u0570',
    'gallery.title': '\u053f\u0565\u0576\u0564\u0561\u0576\u056b \u057a\u0561\u0570\u0565\u0580',
    'video.tag': '\u054a\u0580\u0578\u0574\u0578',
    'video.title': '\u054f\u0565\u057d\u0565\u0584 \u0574\u0565\u0566 \u0578\u0582\u0572\u056b\u0572 \u0565\u0569\u0565\u0580\u0578\u0582\u0574',
    'video.subtitle': '\u0534\u056b\u057f\u0565\u0584 \u0574\u0565\u0580 \u057e\u0565\u0580\u057b\u056b\u0576 \u057a\u0580\u0578\u0574\u0578 \u057f\u0565\u057d\u0561\u0576\u0575\u0578\u0582\u0569\u0568',
    'contact.tag': '\u053f\u0561\u057a\u057e\u0565\u0584',
    'contact.title': '\u0531\u0574\u0580\u0561\u0563\u0580\u0565\u0584 Hit Factory',
    'contact.description': '\u054a\u0561\u057f\u0580\u0561\u057d\u057f \u0565\u0584 \u0571\u0565\u0580 \u0574\u056b\u057b\u0578\u0581\u0561\u057c\u0578\u0582\u0574\u0576 \u0561\u0576\u0574\u0578\u057c\u0561\u0576\u0561\u056c\u056b \u0564\u0561\u0580\u0571\u0576\u0565\u056c\u0589 \u0534\u056b\u0574\u0565\u0584 \u0574\u0565\u0566 \u057d\u057f\u0578\u0580\u0587 \u0576\u0577\u057e\u0561\u056e \u0561\u056c\u056b\u0584\u0576\u0565\u0580\u056b\u0581 \u0578\u0580\u0587\u0567 \u0574\u0565\u056f\u056b \u0574\u056b\u057b\u0578\u0581\u0578\u057e\u0589',
    'contact.phone': '\u0540\u0565\u057c\u0561\u056d\u0578\u057d',
    'contact.email': '\u0537\u056c. \u0583\u0578\u057d\u057f',
    'footer.rights': '\u0532\u0578\u056c\u0578\u0580 \u056b\u0580\u0561\u057e\u0578\u0582\u0576\u0584\u0576\u0565\u0580\u0568 \u057a\u0561\u0577\u057f\u057a\u0561\u0576\u057e\u0561\u056e \u0565\u0576\u0589'
  },

  kk: {
    'page.title': 'Hit Factory — Кәсіби Кавер Бенд | Тірі музыка',
    'nav.home': 'Басты',
    'nav.about': 'Біз туралы',
    'nav.gallery': 'Галерея',
    'nav.video': 'Бейне',
    'nav.contact': 'Байланыс',
    'hero.subtitle': 'Кәсіби Кавер Бенд',
    'hero.description': 'Біз сіздің іс-шараңызға тірі музыканың энергиясын әкелеміз. Классикалық хиттерден бастап заманауи чарт-топтерге дейін \u2014 әр шоу ұмытылмас.',
    'hero.cta': 'Брондау',
    'about.tag': 'Біз кімбіз',
    'about.title': 'С\u0456зд\u0456\u04a3 \u0456с-шара \u2014 Б\u0456зд\u0456\u04a3 шоу',
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

  // Update page title
  const pageTitle = translations[lang]?.['page.title'];
  if (pageTitle) document.title = pageTitle;

  // Update OG locale meta
  const localeMap = { en: 'en_US', ru: 'ru_RU', uk: 'uk_UA', ka: 'ka_GE', hy: 'hy_AM', kk: 'kk_KZ' };
  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (ogLocale) ogLocale.setAttribute('content', localeMap[lang] || 'en_US');
}

// Detect best language from browser settings
function detectLanguage() {
  const supported = Object.keys(translations);
  const browserLangs = navigator.languages || [navigator.language || 'en'];
  for (const bl of browserLangs) {
    const code = bl.toLowerCase().split('-')[0];
    if (supported.includes(code)) return code;
  }
  return 'en';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Priority: 1) user's saved choice, 2) browser language, 3) English
  const saved = localStorage.getItem('hf-lang');
  const lang = saved || detectLanguage();
  setLanguage(lang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  // Auto-generate footer year
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
