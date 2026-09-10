import type { Localized } from '~/lib/i18n';

export const site = {
  url: 'https://sp1le.tech',
  name: 'sp1le',
  person: 'Dmytro Stasiuk',
  email: 'stasyukdmitriy2602@gmail.com',
  github: 'https://github.com/sp1le',
  githubLabel: 'github.com/sp1le',
  telegram: 'https://t.me/decimal128',
  telegramLabel: '@decimal128',
  linkedin: 'https://www.linkedin.com/in/dmitry-stasyuk-996aba424/',
  linkedinLabel: 'LinkedIn',
  /** Ordered: the first entry is the one I want people to use. */
  role: {
    en: 'Full-cycle software engineer',
    uk: 'Інженер-програміст повного циклу',
  },
} as const;

export interface StackGroup {
  key: 'daily' | 'working' | 'tried';
  items: string[];
  note: Localized;
}

/**
 * Grouped by honesty rather than by category. The third group exists on purpose:
 * a list that claims everything claims nothing.
 */
export const stack: StackGroup[] = [
  {
    key: 'daily',
    items: ['Python', 'FastAPI', 'PostgreSQL', 'SQLite', 'aiogram', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'Linux', 'systemd', 'nginx'],
    note: {
      en: 'Everything here is behind something currently serving requests.',
      uk: 'Усе тут стоїть за чимось, що просто зараз обслуговує запити.',
    },
  },
  {
    key: 'working',
    items: ['C#', 'Unity', 'Photon Fusion', 'SQLAlchemy', 'Alembic', 'Docker', 'Astro', 'Tailwind', 'Vertex AI', 'S3 / object storage', 'Telegram Bot API', 'Web Speech API'],
    note: {
      en: 'Shipped with each of these at least once, and I know where they hurt.',
      uk: 'З кожним із цього хоча б раз доводив до релізу і знаю, де воно болить.',
    },
  },
  {
    key: 'tried',
    items: ['Unreal Engine 5', 'C++', 'Blender'],
    note: {
      en: 'Opened, built something small, decided it was not my tool. Ask me about UE5 and you will get an honest shrug, not a rehearsed answer.',
      uk: 'Відкрив, зібрав щось невелике, вирішив, що це не мій інструмент. Спитаєте про UE5 - отримаєте чесне знизування плечима, а не завчену відповідь.',
    },
  },
];

export interface ServiceOffer {
  /** Short noun for the margin; the heading beside it carries the full phrase. */
  rail: Localized;
  title: Localized;
  body: Localized;
  suits: Localized;
  notFor: Localized;
}

export const services: ServiceOffer[] = [
  {
    rail: { en: 'Product', uk: 'Продукт' },
    title: { en: 'Build the product', uk: 'Зібрати продукт' },
    body: {
      en: 'You have a thing that needs to exist and reach real users. I take it from schema and API design through the interface to a server that runs it, and I stay on for the part everyone forgets: deploys, backups, the runbook and the first month of things going wrong.',
      uk: 'Є річ, яка має існувати й дійти до реальних користувачів. Я веду її від схеми даних і дизайну API через інтерфейс до сервера, що це крутить, і лишаюся на тій частині, про яку всі забувають: деплої, бекапи, ранбук і перший місяць, коли все йде не так.',
    },
    suits: {
      en: 'Founders and small teams without an engineering department; internal tools nobody has time to build.',
      uk: 'Засновники й невеликі команди без власної розробки; внутрішні інструменти, на які ні в кого немає часу.',
    },
    notFor: {
      en: 'Work that needs five engineers in parallel. I would be the bottleneck and I would rather say so now.',
      uk: 'Роботи, де потрібні пʼятеро інженерів паралельно. Я став би вузьким місцем, і краще скажу це зараз.',
    },
  },
  {
    rail: { en: 'Team', uk: 'Команда' },
    title: { en: 'Join as an engineer', uk: 'Долучитися як інженер' },
    body: {
      en: 'An extra pair of hands that does not need supervision: picks up a service, reads the code, asks the two questions that matter and then ships. Comfortable owning the unglamorous half - migrations, deployment, the on-call document nobody wrote.',
      uk: 'Додаткові руки, за якими не треба наглядати: беру сервіс, читаю код, ставлю два питання, які справді мають значення, і релізю. Спокійно тримаю неефектну половину - міграції, розгортання, документ для чергового, який ніхто не написав.',
    },
    suits: {
      en: 'Teams that need Python or full-stack capacity, remote, with overlap on European hours.',
      uk: 'Команди, яким потрібна потужність на Python чи фулстек, віддалено, з перетином по європейському часу.',
    },
    notFor: {
      en: 'Roles where the work is mostly meetings about work.',
      uk: 'Ролі, де робота - це переважно наради про роботу.',
    },
  },
];

export interface Principle {
  title: Localized;
  body: Localized;
}

export const principles: Principle[] = [
  {
    title: { en: 'Status is reported, not implied', uk: 'Стан повідомляється, а не мається на увазі' },
    body: {
      en: 'Not everything on this site is finished, and the labels say so. A portfolio that grades everything "complete" is telling you about its author, just not the thing it meant to.',
      uk: 'Не все на цьому сайті завершене, і позначки так і кажуть. Портфоліо, де все «готово», теж дещо розповідає про автора - просто не те, що збиралося.',
    },
  },
  {
    title: { en: 'Every choice has a bill', uk: 'У кожного вибору є рахунок' },
    body: {
      en: 'SQLite instead of Postgres, one raycast instead of acoustics, generated levels instead of authored ones. Each of those bought something and cost something, and the cost is written down next to the choice.',
      uk: 'SQLite замість Postgres, один промінь замість акустики, згенеровані рівні замість зібраних руками. Кожне з цього щось купило і щось коштувало, і ціна записана поруч із вибором.',
    },
  },
  {
    title: { en: 'Operations are part of the job', uk: 'Експлуатація - частина роботи' },
    body: {
      en: 'Backups on a timer, health endpoints, a runbook that a stranger could follow at 3am. Code that nobody can operate is a prototype no matter how well it is written.',
      uk: 'Бекапи за таймером, health-ендпоїнти, ранбук, за яким о третій ночі впорається сторонній. Код, який ніхто не може експлуатувати, лишається прототипом, хоч би як добре був написаний.',
    },
  },
];
