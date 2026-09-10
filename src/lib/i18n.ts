export const LOCALES = ['en', 'uk'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

/** Any string that exists in both languages. */
export type Localized = Record<Locale, string>;

export const LOCALE_META: Record<Locale, { label: string; htmlLang: string; name: string }> = {
  en: { label: 'EN', htmlLang: 'en', name: 'English' },
  uk: { label: 'UA', htmlLang: 'uk', name: 'Українська' },
};

/** Prefixes a path with the locale. The default locale stays unprefixed. */
export function localizePath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean === '/' ? '/' : clean.replace(/\/$/, '');
  return clean === '/' ? `/${locale}` : `/${locale}${clean.replace(/\/$/, '')}`;
}

/** Reads the locale out of a URL pathname. */
export function localeFromPath(pathname: string): Locale {
  const segment = pathname.split('/').filter(Boolean)[0];
  return LOCALES.includes(segment as Locale) ? (segment as Locale) : DEFAULT_LOCALE;
}

/** Strips the locale prefix, so the same page can link to its translation. */
export function stripLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (LOCALES.includes(segments[0] as Locale)) segments.shift();
  return `/${segments.join('/')}`;
}

export const t = {
  // Short rail labels. They name the section; the heading beside them makes the
  // statement. Repeating the heading verbatim in the margin would waste both.
  railManifest: { en: 'Manifest', uk: 'Реєстр' },
  railDecisions: { en: 'Decisions', uk: 'Рішення' },
  railStack: { en: 'Stack', uk: 'Стек' },
  railFit: { en: 'Fit', uk: 'Формат' },
  railConstraint: { en: 'Constraint', uk: 'Обмеження' },
  railNumbers: { en: 'Numbers', uk: 'Цифри' },
  railRetro: { en: 'Retro', uk: 'Ретро' },
  railSource: { en: 'Source', uk: 'Код' },
  railMethod: { en: 'Method', uk: 'Метод' },
  railProof: { en: 'Proof', uk: 'Доказ' },
  proofTitle: { en: 'Open it yourself', uk: 'Відкрийте самі' },

  // Live probe next to a "Running" label
  pingFail: { en: 'unreachable', uk: 'недоступно' },
  pingTitle: { en: 'Measured from your browser just now', uk: 'Виміряно з вашого браузера щойно' },

  // The pipeline figure under the hero
  pipelineCaption: {
    en: 'Every box on this line is mine to build and mine to keep up.',
    uk: 'Кожен блок на цій лінії - мій: і збудувати, і тримати живим.',
  },
  pipelineAria: {
    en: 'Diagram: schema, service, systemd unit, nginx edge, user. One engineer owns every stage.',
    uk: 'Схема: база даних, сервіс, systemd-юніт, nginx, користувач. Кожен етап тримає один інженер.',
  },

  notFoundStatus: { en: 'Active: failed (Result: not-found)', uk: 'Active: failed (Result: not-found)' },

  // Navigation and chrome
  navWork: { en: 'Work', uk: 'Роботи' },
  navServices: { en: 'Hire me', uk: 'Співпраця' },
  navContact: { en: 'Contact', uk: 'Контакти' },
  skipToContent: { en: 'Skip to content', uk: 'Перейти до вмісту' },
  toggleTheme: { en: 'Switch colour scheme', uk: 'Змінити колірну схему' },
  menu: { en: 'Menu', uk: 'Меню' },
  backToWork: { en: 'All work', uk: 'Усі роботи' },

  // Status vocabulary - the palette maps onto these four words.
  statusLive: { en: 'Running', uk: 'Онлайн' },
  statusBuilding: { en: 'In development', uk: 'У розробці' },
  statusHandedOver: { en: 'Handed over', uk: 'Передано' },
  statusPrototype: { en: 'Playable build', uk: 'Ігровий білд' },

  // Home
  heroEyebrow: { en: 'Full-cycle engineer · Ukraine · remote', uk: 'Інженер повного циклу · Україна · віддалено' },
  heroTitle: { en: 'From the schema to the systemd unit.', uk: 'Від схеми БД до systemd-юніта.' },
  heroLede: {
    en: "I'm Dmytro Stasiuk. I design, write, deploy and then operate complete products on my own: a multi-tenant Python SaaS, a Telegram storefront trading for a real business, a Unity co-op shooter, a realtime browser game. Everything below is either running right now or honestly labelled as unfinished.",
    uk: 'Я Дмитро Стасюк. Проєктую, пишу, розгортаю і далі супроводжую готові продукти самостійно: мультитенантний SaaS на Python, магазин у Telegram, який торгує для реального бізнесу, кооперативний шутер на Unity, реалтайм-гру в браузері. Усе нижче або працює просто зараз, або чесно позначене як незавершене.',
  },
  manifestTitle: { en: 'Current manifest', uk: 'Поточний реєстр' },
  manifestNote: {
    en: 'What exists, what it runs on, and what state it is actually in. No rounded-up counters.',
    uk: 'Що існує, на чому працює і в якому стані насправді. Без округлених лічильників.',
  },
  colProject: { en: 'Project', uk: 'Проєкт' },
  colWhat: { en: 'What it is', uk: 'Що це' },
  colRuntime: { en: 'Runtime', uk: 'Стек' },
  colStatus: { en: 'Status', uk: 'Стан' },

  decisionsTitle: { en: 'Decisions worth defending', uk: 'Рішення, які варто захищати' },
  decisionsNote: {
    en: 'A portfolio of screenshots proves very little. These are the calls behind the screenshots, including what each one costs.',
    uk: 'Портфоліо зі скриншотів доводить мало. Ось рішення, що стоять за скриншотами, разом із ціною кожного.',
  },
  labelChose: { en: 'Chose', uk: 'Обрано' },
  labelInstead: { en: 'Instead of', uk: 'Замість' },
  labelBecause: { en: 'Because', uk: 'Тому що' },
  labelCost: { en: 'Costs me', uk: 'Ціна рішення' },

  stackTitle: { en: 'What I actually reach for', uk: 'Чим справді працюю' },
  stackNote: {
    en: 'Split by how often I ship with it, not by how it looks on a CV.',
    uk: 'Поділено за тим, як часто я на цьому релізю, а не за виглядом у резюме.',
  },
  stackDaily: { en: 'Ship with it regularly', uk: 'Релізю регулярно' },
  stackWorking: { en: 'Comfortable, used in production', uk: 'Впевнено, є в проді' },
  stackTried: { en: 'Touched, would not claim depth', uk: 'Пробував, глибини не заявляю' },

  // Case study
  caseConstraint: { en: 'The constraint', uk: 'Обмеження' },
  caseDecisions: { en: 'Decision record', uk: 'Журнал рішень' },
  caseNumbers: { en: 'Size of the thing', uk: 'Масштаб' },
  caseStack: { en: 'Stack', uk: 'Стек' },
  caseRetro: { en: 'What I would change', uk: 'Що змінив би' },
  caseSource: { en: 'From the source', uk: 'З вихідного коду' },
  lightboxOpen: { en: 'Open full size', uk: 'Відкрити на весь екран' },
  lightboxClose: { en: 'Close', uk: 'Закрити' },
  caseVisit: { en: 'Open it', uk: 'Відкрити' },
  caseNext: { en: 'Next', uk: 'Далі' },
  caseNoLinkAccount: {
    en: 'No public link yet: it needs an account of its own to show anything.',
    uk: 'Публічного посилання поки немає: щоб щось показати, потрібен власний акаунт.',
  },
  caseNoLinkBuild: {
    en: 'No public build yet. It runs on my machine, which is exactly as much as I claim.',
    uk: 'Публічного білда поки немає. Запускається на моїй машині - рівно стільки я і заявляю.',
  },

  // Work index
  workTitle: { en: 'Work', uk: 'Роботи' },
  workLede: {
    en: 'Each system here has its reasoning kept in. Read the decision record if you want to know how I think; read the retro if you want to know whether I am honest about it.',
    uk: 'У кожної системи тут збережено хід міркувань. Журнал рішень покаже, як я думаю; ретроспектива - чи чесний я щодо цього.',
  },

  // Services
  servicesTitle: { en: 'Working together', uk: 'Співпраця' },
  servicesLede: {
    en: 'Two ways this usually goes: you need a product built end to end, or you need an extra engineer who does not need supervision. Both start with the same conversation.',
    uk: 'Зазвичай це виглядає так: або потрібно зібрати продукт від початку до кінця, або потрібен інженер, за яким не треба наглядати. Обидва варіанти починаються з однієї розмови.',
  },

  // Contact
  contactTitle: { en: 'Start a conversation', uk: 'Почнімо розмову' },
  contactLede: {
    en: 'Tell me what you are building and what is in the way. I answer personally, usually the same day.',
    uk: 'Напишіть, що ви будуєте і що заважає. Відповідаю особисто, зазвичай того ж дня.',
  },
  copyEmail: { en: 'Copy address', uk: 'Скопіювати адресу' },
  copied: { en: 'Copied', uk: 'Скопійовано' },

  footerNote: {
    en: 'Built with Astro. No trackers, no cookie banner, no third-party requests.',
    uk: 'Зроблено на Astro. Без трекерів, банера про cookie та сторонніх запитів.',
  },
  sourceNote: { en: 'Source of this site', uk: 'Вихідний код сайту' },

  notFoundTitle: { en: 'No such page', uk: 'Такої сторінки немає' },
  notFoundLede: {
    en: 'The address does not match anything here. The work index is probably what you wanted.',
    uk: 'Адреса ні з чим не збігається. Найімовірніше, вам потрібен перелік робіт.',
  },
} as const satisfies Record<string, Localized>;

export type UiKey = keyof typeof t;
