import type { Localized } from '~/lib/i18n';

import tandyrCatalog from '~/assets/img/tandyr-catalog.png';
import tandyrCheckout from '~/assets/img/tandyr-checkout.png';
import tandyrBot from '~/assets/img/tandyr-bot.png';
import replydeckLanding from '~/assets/img/replydeck-landing.png';
import replydeckChats from '~/assets/img/replydeck-chats.png';
import replydeckStats from '~/assets/img/replydeck-stats.png';
import voiceduelEntry from '~/assets/img/voiceduel-entry.png';

/**
 * Four states, and the palette maps onto them:
 *   live        -> signal colour, it is serving traffic right now
 *   building    -> flag colour, honest about being unfinished
 *   prototype   -> flag colour, runs but has never met real load
 *   handedOver  -> no colour at all, it is not mine any more
 */
export type Status = 'live' | 'building' | 'prototype' | 'handedOver';

/** One entry of a decision record: the choice, the road not taken, and the bill. */
export interface Decision {
  choice: Localized;
  instead: Localized;
  because: Localized;
  cost: Localized;
}

export interface Metric {
  value: string;
  label: Localized;
}

export interface Shot {
  src: ImageMetadata;
  alt: Localized;
}

/** A verbatim excerpt from the repository, shown when it says more than a screenshot would. */
export interface CodeExcerpt {
  file: string;
  caption: Localized;
  source: string;
}

export interface Project {
  slug: string;
  name: string;
  period: string;
  status: Status;
  kind: Localized;
  runtime: string;
  summary: Localized;
  intro: Localized;
  constraint: Localized;
  decisions: Decision[];
  metrics: Metric[];
  stack: string[];
  retro: Localized;
  href?: string;
  hrefLabel?: string;
  shots?: Shot[];
  code?: CodeExcerpt;
}

export const projects: Project[] = [
  {
    slug: 'replydeck',
    name: 'ReplyDeck',
    period: '2026',
    status: 'building',
    kind: { en: 'Multi-tenant B2B SaaS', uk: 'Мультитенантний B2B SaaS' },
    runtime: 'Python · FastAPI · PostgreSQL',
    summary: {
      en: 'Lead discovery and outreach for teams. In development, not yet public.',
      uk: 'Пошук і опрацювання лідів для команд. У розробці, ще не публічний.',
    },
    intro: {
      en: 'A platform where a customer organisation runs its own fleet of Telegram accounts, watches public chats for the language its buyers actually use, and turns matches into qualified leads with an outreach trail attached. It is in development and has not been opened to anyone yet, which is why there is nothing to click here.',
      uk: 'Платформа, де організація-клієнт тримає власний парк Telegram-акаунтів, стежить за публічними чатами на предмет формулювань, якими говорять її покупці, і перетворює збіги на кваліфіковані ліди з історією комунікації. Вона в розробці й ще нікому не відкрита - тому тут нема на що клікнути.',
    },
    constraint: {
      en: 'Many separate customer organisations, each with its own Telegram accounts and its own secrets, all on one modest VPS - with nothing leaking sideways between them. And I am the only person on call for it.',
      uk: 'Багато окремих організацій-клієнтів, у кожної власні Telegram-акаунти й власні секрети, і все це на одному скромному VPS - без жодного витоку між ними. І черговий по системі теж один: я.',
    },
    decisions: [
      {
        choice: {
          en: 'One Postgres database, with every query path forced through a tenancy guard module',
          uk: 'Одна база Postgres, і кожен шлях до даних проходить через модуль-вартовий тенантності',
        },
        instead: { en: 'A database or a schema per tenant', uk: 'Окрема база чи схема на кожного клієнта' },
        because: {
          en: 'One box, one backup, one migration run. Schema-per-tenant multiplies operational work by the number of customers, and I am the operator.',
          uk: 'Один сервер, один бекап, один прогін міграцій. Схема-на-клієнта множить експлуатацію на кількість клієнтів, а експлуатую я сам.',
        },
        cost: {
          en: 'Isolation is now a property of my code instead of the engine. That is exactly why the tenancy rules have their own test module rather than being trusted by inspection.',
          uk: 'Ізоляція стала властивістю мого коду, а не рушія. Саме тому правила тенантності мають окремий тестовий модуль, а не перевіряються на око.',
        },
      },
      {
        choice: {
          en: 'Tenant session keys encrypted at rest, with a rotation script and a runbook step',
          uk: 'Сесійні ключі клієнтів зашифровані на диску, зі скриптом ротації та пунктом у ранбуці',
        },
        instead: { en: 'Session strings in plaintext columns', uk: 'Сесійні рядки у відкритих колонках' },
        because: {
          en: 'A leaked backup of plaintext sessions does not hand over rows, it hands over live Telegram accounts belonging to somebody else.',
          uk: 'Витік бекапа з відкритими сесіями віддає не рядки в таблиці, а живі Telegram-акаунти чужих людей.',
        },
        cost: {
          en: 'Rotation becomes a real operation with a real failure mode: lose the master key and the sessions are gone with it.',
          uk: 'Ротація стає справжньою операцією зі справжнім сценарієм відмови: втратив майстер-ключ - втратив разом із ним і сесії.',
        },
      },
      {
        choice: { en: 'A hand-written Vertex AI client, roughly a hundred lines', uk: 'Власний клієнт Vertex AI приблизно на сотню рядків' },
        instead: { en: 'The vendor SDK', uk: 'SDK від вендора' },
        because: {
          en: 'The SDK drags in a large dependency tree and its own version pins for what amounts to a handful of authenticated HTTP calls.',
          uk: 'SDK тягне велике дерево залежностей і власні пінування версій заради кількох HTTP-викликів з авторизацією.',
        },
        cost: {
          en: 'Retries, auth refresh and error shapes are mine to maintain, and I read the API changelog myself.',
          uk: 'Ретраї, оновлення токена й формати помилок тепер на мені, і чейнджлог API читаю теж я.',
        },
      },
      {
        choice: {
          en: 'A storage interface with local disk, S3 and Azure Blob implementations, written before it was needed',
          uk: 'Інтерфейс сховища з реалізаціями для диска, S3 та Azure Blob - написаний до того, як знадобився',
        },
        instead: { en: 'Writing files to the VPS and dealing with it later', uk: 'Писати файли на VPS і розібратися потім' },
        because: {
          en: 'The move off a single box is what kills small SaaS products. Defining the seam early cost days; retrofitting it under a running service costs weeks.',
          uk: 'Переїзд з одного сервера - те, на чому вмирають маленькі SaaS. Визначити шов заздалегідь коштувало днів; вбудовувати його під працюючим сервісом коштує тижнів.',
        },
        cost: {
          en: 'Three code paths to keep tested where one would have carried the first year.',
          uk: 'Три гілки коду під тестами там, де перший рік витягнула б одна.',
        },
      },
    ],
    metrics: [
      { value: '13 825', label: { en: 'lines, application', uk: 'рядків застосунку' } },
      { value: '7 697', label: { en: 'lines, tests', uk: 'рядків тестів' } },
      { value: '57', label: { en: 'test modules', uk: 'тестових модулів' } },
      { value: '110', label: { en: 'HTTP routes', uk: 'HTTP-маршрутів' } },
      { value: '29', label: { en: 'data models', uk: 'моделей даних' } },
      { value: '25', label: { en: 'migrations', uk: 'міграцій' } },
    ],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Alembic', 'Telethon', 'aiogram', 'Vertex AI', 'S3 / Azure Blob', 'Sentry', 'systemd', 'nginx', 'Docker'],
    retro: {
      en: 'I named it Sonar and built a landing page, an offer and a domain around that name before opening the trademark register. SonarSource owns SONAR for software, so the product became ReplyDeck before it met a single paying customer. A cheap lesson only because it was learned early: the register comes before the domain. The thing I would keep exactly as it is: the tenancy guard with its own test module, because isolation that lives in application code has to be proven, not assumed.',
      uk: 'Я назвав його Sonar і зібрав навколо цієї назви лендинг, оферту й домен раніше, ніж відкрив реєстр торгових марок. SonarSource володіє маркою SONAR для софту, тож продукт став ReplyDeck до того, як зустрів першого платного клієнта. Урок дешевий лише тому, що вивчений рано: спочатку реєстр, потім домен. Що лишив би точно як є: вартовий тенантності з окремим тестовим модулем, бо ізоляцію, яка живе в коді застосунку, треба доводити, а не припускати.',
    },
    // Local build with seeded demo data (scripts/seed_demo.py): the names and numbers are synthetic, the screens are real.
    shots: [
      {
        src: replydeckLanding,
        alt: {
          en: 'ReplyDeck landing page: "Your customers are already writing about their need. Just not to you."',
          uk: 'Лендинг ReplyDeck: «Клієнти вже пишуть про свою потребу. Просто не вам.»',
        },
      },
      {
        src: replydeckChats,
        alt: {
          en: 'Chats screen: twelve lead dialogues with channel, funnel stage, source chat and last message',
          uk: 'Екран чатів: дванадцять діалогів із лідами, канал, етап воронки, чат-джерело та останнє повідомлення',
        },
      },
      {
        src: replydeckStats,
        alt: {
          en: 'Statistics: scanned messages, funnel from read to hot lead, live monitoring log and scout accounts',
          uk: 'Статистика: відскановані повідомлення, воронка від прочитаного до гарячого ліда, живий лог моніторингу та акаунти-скаути',
        },
      },
    ],
  },

  {
    slug: 'tandyr',
    name: 'Tandyr',
    period: '2026',
    status: 'live',
    kind: { en: 'Telegram commerce, real business', uk: 'Комерція в Telegram, реальний бізнес' },
    runtime: 'FastAPI · aiogram 3 · React · SQLite',
    summary: {
      en: "Storefront, bot and public site for a working kitchen: catalogue, cart, and orders that land straight in the staff's Telegram.",
      uk: 'Вітрина, бот і публічний сайт для діючої кухні: каталог, кошик і замовлення, що прилітають просто в Telegram персоналу.',
    },
    intro: {
      en: 'A food business that takes orders two ways: inside Telegram as a Mini App, and from a plain website for people who will never install a messenger to buy dinner. One catalogue, one order pipeline, one place for staff to work - which happens to be the Telegram they already have open.',
      uk: 'Харчовий бізнес приймає замовлення двома шляхами: усередині Telegram як Mini App і зі звичайного сайту - для тих, хто не ставитиме месенджер заради вечері. Один каталог, один конвеєр замовлень і одне місце роботи для персоналу - той самий Telegram, який у них і так відкритий.',
    },
    constraint: {
      en: 'The customer is a kitchen, not a tech company. Orders must arrive whether the buyer is in Telegram or on a web page, the staff side has to be usable from a phone mid-shift, and nobody there will ever open a terminal.',
      uk: 'Замовник - кухня, а не техкомпанія. Замовлення мають доходити і з Telegram, і зі звичайної сторінки, робоча частина має працювати з телефона посеред зміни, і терміналу там не відкриє ніхто й ніколи.',
    },
    decisions: [
      {
        choice: {
          en: 'One FastAPI backend serving both the Mini App and the public site',
          uk: 'Один бекенд на FastAPI обслуговує і Mini App, і публічний сайт',
        },
        instead: { en: 'A separate website and a separate bot', uk: 'Окремий сайт і окремий бот' },
        because: {
          en: 'Two codebases mean two catalogues drifting apart, and the kitchen would have to edit prices twice. They edit once.',
          uk: 'Дві кодові бази - це два каталоги, що розходяться, і ціни довелося б правити двічі. Правлять один раз.',
        },
        cost: {
          en: 'Web checkout has no Telegram user id, so identity had to become optional throughout the order model instead of assumed.',
          uk: 'У веб-оформленні немає Telegram-id, тож ідентичність довелося зробити необовʼязковою в усій моделі замовлення, а не вважати наявною.',
        },
      },
      {
        choice: { en: 'SQLite with FTS5 for catalogue search', uk: 'SQLite з FTS5 для пошуку по каталогу' },
        instead: { en: 'Postgres, or a dedicated search service', uk: 'Postgres або окремий пошуковий сервіс' },
        because: {
          en: 'One location, a catalogue of tens of items, a handful of concurrent shoppers. FTS5 is already inside the file and answers instantly, with nothing extra to run or back up.',
          uk: 'Одна локація, каталог на десятки позицій, кілька одночасних покупців. FTS5 уже всередині файла й відповідає миттєво, і нічого додаткового не треба ні запускати, ні бекапити.',
        },
        cost: {
          en: 'The day they open a second location and need concurrent writers, this is the first thing I replace. I would rather replace it then than run Postgres for one kitchen now.',
          uk: 'У день, коли відкриють другу точку й знадобиться паралельний запис, це перше, що я заміню. Краще замінити тоді, ніж тримати Postgres заради однієї кухні зараз.',
        },
      },
      {
        choice: {
          en: 'Discounts are scoped rules - one product, a category, or everything - and the most specific rule wins',
          uk: 'Знижки - це правила з областю дії: товар, категорія або все, і перемагає найконкретніше',
        },
        instead: { en: 'Editing prices by hand for every promotion', uk: 'Правити ціни руками заради кожної акції' },
        because: {
          en: 'A kitchen runs promotions constantly and forgets to roll them back. A rule with an on/off flag is reverted by flipping it, not by remembering twenty prices.',
          uk: 'Кухня постійно запускає акції і забуває їх відкотити. Правило з перемикачем відкочується одним кліком, а не памʼяттю про двадцять цін.',
        },
        cost: {
          en: 'Two overlapping rules of the same scope resolve by the larger percentage. That is a policy I chose for them, and it has to be explained every time a 15% and a 20% promotion collide.',
          uk: 'Два правила однієї області дії розвʼязуються більшим відсотком. Цю політику обрав я, і її доводиться пояснювати щоразу, коли стикаються акції на 15% і 20%.',
        },
      },
      {
        choice: { en: 'Staff work through a Telegram FSM dialogue', uk: 'Персонал працює через FSM-діалог у Telegram' },
        instead: { en: 'A web admin panel', uk: 'Веб-панель адміністратора' },
        because: {
          en: 'An admin panel is a new thing to teach, a new login to lose and another screen to keep responsive. Telegram is already open on their phone and already authenticated.',
          uk: 'Адмінка - це нове, чого треба вчити, новий логін, який можна загубити, і ще один екран, який треба тримати адаптивним. Telegram у них уже відкритий і вже авторизований.',
        },
        cost: {
          en: 'Anything table-shaped - a monthly report, a bulk price edit - is genuinely awkward in a chat and has to leave the bot.',
          uk: 'Усе, що має форму таблиці - місячний звіт, масова зміна цін - у чаті справді незручне й мусить жити поза ботом.',
        },
      },
    ],
    metrics: [
      { value: '4 213', label: { en: 'lines, backend', uk: 'рядків бекенду' } },
      { value: '21', label: { en: 'backend modules', uk: 'модулів бекенду' } },
      { value: '15', label: { en: 'Mini App screens', uk: 'екранів Mini App' } },
      { value: '2', label: { en: 'order entry points, one pipeline', uk: 'точки входу замовлень, один конвеєр' } },
    ],
    stack: ['FastAPI', 'aiogram 3', 'React', 'Vite', 'SQLAlchemy', 'SQLite FTS5', 'systemd', 'nginx'],
    retro: {
      en: 'The public site came after the Mini App, and the schema still shows the order in which things happened: orders.telegram_id is nullable and every order carries a source of telegram or web, but users and carts are keyed by a Telegram id. A web buyer can place an order and cannot have a cart or a history. That is a real seam, not a cosmetic one. Starting again, the account model would be identity-agnostic from the first migration instead of Telegram-first with a web exception bolted on.',
      uk: 'Публічний сайт зʼявився після Mini App, і схема досі показує, в якому порядку все відбувалося: orders.telegram_id допускає NULL і кожне замовлення має source зі значенням telegram або web, але користувачі й кошики привʼязані до Telegram-id. Покупець із сайту може замовити, але не може мати кошика чи історії. Це справжній шов, а не косметичний. Починаючи знову, модель акаунта була б незалежною від ідентичності з першої міграції, а не Telegram-first із прикрученим винятком для вебу.',
    },
    href: 'https://tandir.top',
    hrefLabel: 'tandir.top',
    shots: [
      {
        src: tandyrCatalog,
        alt: {
          en: 'Telegram Mini App catalogue with product cards and cart badge',
          uk: 'Каталог Telegram Mini App з картками товарів і лічильником кошика',
        },
      },
      {
        src: tandyrCheckout,
        alt: {
          en: 'Checkout screen: delivery details, preferred time and a comment for the kitchen',
          uk: 'Екран оформлення: дані доставки, бажаний час і коментар для кухні',
        },
      },
      {
        src: tandyrBot,
        alt: {
          en: 'Bot chat: order confirmation and status notification',
          uk: 'Чат бота: підтвердження замовлення та сповіщення про статус',
        },
      },
    ],
  },

  {
    slug: 'getaway',
    name: 'Getaway',
    period: '2026',
    status: 'prototype',
    kind: { en: 'Co-op heist prototype · Photon Fusion + Voice', uk: 'Прототип кооп-пограбування · Photon Fusion + Voice' },
    runtime: 'Unity 6 · C# · Photon Fusion 2',
    summary: {
      en: 'Built to see how Photon Fusion and Photon Voice behave in a real scene; grew into a solo heist that plays end to end.',
      uk: 'Зроблено, щоб побачити, як Photon Fusion і Photon Voice поводяться в реальній сцені; виросло в соло-пограбування, що проходиться повністю.',
    },
    intro: {
      en: 'This started as a test bed: I wanted to see how Photon Fusion 2 and Photon Voice 2 behave inside a real scene with doors, guards and a getaway, not inside a vendor demo. It grew into a playable solo heist - get into the pawn shop, crack the safe, carry the bags out past guards and police, drive away. The level, props, characters and UI are produced by editor code, which is the only reason one person could keep a project this size coherent. The multiplayer it was built to exercise has not been run yet: no Photon App Id, so no second player.',
      uk: 'Це починалося як полігон: я хотів побачити, як Photon Fusion 2 і Photon Voice 2 поводяться в реальній сцені з дверима, охороною і втечею, а не у вендорському демо. Виросло в ігровий соло-режим: зайти в ломбард, розкрити сейф, винести сумки повз охорону й поліцію, поїхати. Рівень, реквізит, персонажі та інтерфейс виробляє код редактора - лише завдяки цьому одна людина тримає проєкт такого розміру в купі. Мультиплеєр, заради якого все й будувалося, ще не запускався: немає Photon App Id, тож немає й другого гравця.',
    },
    constraint: {
      en: 'No art team, no level designer, no budget. Everything the player walks through has to come from free asset packs plus code, and the whole block has to be rebuildable from scratch after any change.',
      uk: 'Ні художників, ні левел-дизайнера, ні бюджету. Усе, чим ходить гравець, має складатися з безкоштовних паків плюс коду, а весь квартал має перезбиратися з нуля після будь-якої зміни.',
    },
    decisions: [
      {
        choice: {
          en: 'The level, prefabs, characters and UI are generated by editor code',
          uk: 'Рівень, префаби, персонажі та інтерфейс генеруються кодом редактора',
        },
        instead: { en: 'Authoring scenes by hand in the Unity editor', uk: 'Збирати сцени руками в редакторі Unity' },
        because: {
          en: 'A hand-built scene is a binary blob that one person can edit and nobody can review. Generated content turns the entire block into a readable diff, and a full rebuild is one menu item or one batchmode command.',
          uk: 'Зібрана руками сцена - це бінарний блоб, який може правити одна людина і не може переглянути ніхто. Згенерований контент перетворює весь квартал на читабельний diff, а повна перезбірка - це один пункт меню або одна команда в batchmode.',
        },
        cost: {
          en: '3 918 of the 10 723 lines are tooling that ships to no player. Moving one wall means editing code, not dragging a handle.',
          uk: '3 918 із 10 723 рядків - це інструментарій, який не побачить жоден гравець. Посунути одну стіну означає правити код, а не тягнути маркер.',
        },
      },
      {
        choice: {
          en: 'Stairs are drawn as steps over a single hidden ramp collider',
          uk: 'Сходи намальовані сходинками поверх одного прихованого пандуса-колайдера',
        },
        instead: { en: 'Collidable step geometry', uk: 'Сходинки з власними колайдерами' },
        because: {
          en: 'The player walks a smooth slope, the NavMesh bakes a clean surface, and the eye still sees stairs. Real step colliders snag character capsules and give agents pathing they have to fight.',
          uk: 'Гравець іде плавним схилом, NavMesh запікає чисту поверхню, а око все одно бачить сходи. Справжні колайдери сходинок чіпляють капсули персонажів і дають агентам шлях, з яким вони борються.',
        },
        cost: {
          en: 'Visual and physical geometry deliberately disagree, which has to stay written down or a future change quietly re-introduces the snag.',
          uk: 'Візуальна й фізична геометрія навмисно не збігаються, і це має лишатися записаним, інакше майбутня правка тихо поверне зачіпку.',
        },
      },
      {
        choice: {
          en: 'Photon Fusion 2 and Photon Voice 2 live behind compile defines',
          uk: 'Photon Fusion 2 і Photon Voice 2 живуть за директивами компіляції',
        },
        instead: { en: 'Depending on the networking SDK everywhere', uk: 'Залежати від мережевого SDK всюди' },
        because: {
          en: 'The project has to open, compile and stay playable without a Photon App Id. Networking is a feature of the game, not a precondition for working on it.',
          uk: 'Проєкт має відкриватися, компілюватися й лишатися ігровим без Photon App Id. Мережа - це функція гри, а не умова роботи над нею.',
        },
        cost: {
          en: 'Two build configurations to keep compiling, and networked code paths that are easy to leave untested precisely because the default build never runs them.',
          uk: 'Дві конфігурації збірки, які треба тримати компільними, і мережеві гілки коду, які легко лишити без тестів саме тому, що дефолтна збірка їх не виконує.',
        },
      },
      {
        choice: {
          en: 'C# is verified by running Unity headless in batchmode',
          uk: 'C# перевіряється запуском Unity у batchmode без графіки',
        },
        instead: { en: 'Opening the editor to check every change', uk: 'Відкривати редактор заради кожної зміни' },
        because: {
          en: 'A headless compile takes a fraction of the time and runs from a terminal, which is the only practical way one person keeps a ten-thousand-line Unity project honest between play sessions.',
          uk: 'Компіляція без графіки займає частку часу й запускається з термінала - єдиний практичний спосіб для однієї людини тримати десятитисячний Unity-проєкт чесним між ігровими сесіями.',
        },
        cost: {
          en: 'Batchmode proves it compiles and that content rebuilds. It proves nothing about how the game feels, so playtesting stays entirely manual.',
          uk: 'Batchmode доводить, що воно компілюється і що контент перезбирається. Про відчуття від гри він не доводить нічого, тож плейтест лишається повністю ручним.',
        },
      },
    ],
    metrics: [
      { value: '10 723', label: { en: 'lines of C#', uk: 'рядків C#' } },
      { value: '3 918', label: { en: 'of those are editor tooling', uk: 'з них - інструментарій редактора' } },
      { value: '83', label: { en: 'game scripts', uk: 'ігрових скриптів' } },
      { value: '91', label: { en: 'materials converted to URP by script', uk: 'матеріалів переведено в URP скриптом' } },
    ],
    stack: ['Unity 6000.3.11f1', 'C#', 'Universal RP 17.3', 'Photon Fusion 2.1.2', 'Photon Voice 2.63', 'Input System', 'AI Navigation', 'Editor tooling'],
    retro: {
      en: 'Networking is integrated and compiles against the real SDKs, but it has never carried four players, because I do not have a Photon App Id yet. I will not call the multiplayer done until I have watched it break under real latency and packet loss - anything else would be a claim I cannot back. Generating everything from code was right for a solo project, and it is the first thing I would reconsider the moment a level designer joined: the tooling that liberates one person becomes a wall for the second.',
      uk: 'Мережа інтегрована й компілюється зі справжніми SDK, але жодного разу не тримала чотирьох гравців, бо в мене поки немає Photon App Id. Я не називатиму мультиплеєр готовим, доки не побачу, як він ламається на реальних затримках і втратах пакетів - усе інше було б заявою, яку я не можу підкріпити. Генерувати все кодом було правильно для соло-проєкту, і це перше, що я переглянув би тієї миті, коли зʼявиться левел-дизайнер: інструмент, який звільняє одного, стає стіною для другого.',
    },
    code: {
      file: 'Assets/_Game/Scripts/Editor/GetawayLevelKit.cs',
      caption: {
        en: 'The stairs decision in code: each step is a cube with its collider stripped, and one hidden, rotated slab underneath is what the player and the NavMesh actually stand on. Two of the three comments are mine for this page; the rest is verbatim.',
        uk: 'Рішення про сходи в коді: кожна сходинка - куб зі знятим колайдером, а під ними одна прихована повернута плита, на якій насправді стоять гравець і NavMesh. Два з трьох коментарів дописані для цієї сторінки, решта - дослівно.',
      },
      source: `public static void Stairs(Transform parent, string name, Vector3 start, Vector3 direction, float run,
    float rise, float width, int steps, Material material)
{
    var root = Empty(name, parent, Vector3.zero).transform;
    Vector3 dir = new Vector3(direction.x, 0f, direction.z).normalized;
    Vector3 side = Vector3.Cross(Vector3.up, dir);

    float stepRun = run / steps;
    float stepRise = rise / steps;

    for (int i = 0; i < steps; i++)
    {
        float top = start.y + stepRise * (i + 1);
        Vector3 centre = start + dir * (stepRun * (i + 0.5f));
        centre.y = top - stepRise * 0.5f;

        var go = GameObject.CreatePrimitive(PrimitiveType.Cube);
        go.name = "Step";
        go.transform.SetParent(root, false);
        go.transform.localPosition = centre;
        go.transform.localRotation = Quaternion.LookRotation(dir, Vector3.up);
        go.transform.localScale = new Vector3(width, stepRise, stepRun);
        go.GetComponent<MeshRenderer>().sharedMaterial = material;
        Object.DestroyImmediate(go.GetComponent<Collider>());   // the eye gets steps
    }

    BuildRamp(root, start, dir, side, run, rise, width);        // the feet get a slope
}

private static void BuildRamp(Transform parent, Vector3 start, Vector3 dir, Vector3 side,
    float run, float rise, float width)
{
    const float thickness = 0.4f;
    float slope = Mathf.Sqrt(run * run + rise * rise);

    Vector3 alongSlope = (dir * run + Vector3.up * rise).normalized;
    Quaternion rotation = Quaternion.LookRotation(alongSlope, Vector3.Cross(alongSlope, side).normalized);

    // Sit the ramp so its top face passes through the step noses.
    Vector3 topMid = start + dir * (run * 0.5f) + Vector3.up * (rise * 0.5f);
    Vector3 centre = topMid - rotation * Vector3.up * (thickness * 0.5f);

    var go = GameObject.CreatePrimitive(PrimitiveType.Cube);
    go.name = "RampCollider";
    go.transform.SetParent(parent, false);
    go.transform.localPosition = centre;
    go.transform.localRotation = rotation;
    go.transform.localScale = new Vector3(width, thickness, slope);
    go.GetComponent<MeshRenderer>().enabled = false;            // never drawn, always walked on
}`,
    },
  },

  {
    slug: 'voice-duel',
    name: 'Voice Duel',
    period: '2026',
    status: 'live',
    kind: { en: 'Realtime browser game', uk: 'Реалтайм-гра в браузері' },
    runtime: 'Node · WebSocket · Web Speech API',
    summary: {
      en: 'Two players race to say the right answer out loud. The first correct voice does the damage.',
      uk: 'Двоє гравців наввипередки промовляють правильну відповідь уголос. Перший правильний голос завдає шкоди.',
    },
    intro: {
      en: 'A question appears; whoever says the correct answer out loud first hits the other one. Health runs out, the duel ends. It has accounts, friends, private rooms with codes, a public lobby and a bot for the very common case of arriving alone. It runs on one Node process with a single runtime dependency.',
      uk: 'Зʼявляється питання; хто першим промовить правильну відповідь уголос, той бʼє суперника. Скінчилося здоровʼя - бій завершено. Тут є акаунти, друзі, приватні кімнати з кодами, публічне лобі та бот для дуже поширеного випадку, коли людина прийшла сама. Усе це - один процес Node з єдиною рантайм-залежністю.',
    },
    constraint: {
      en: 'Speech recognition, matchmaking and an opponent for people who arrive alone - on a hobby budget, with no API key for the player to obtain and no audio leaving their browser.',
      uk: 'Розпізнавання мовлення, підбір суперника і опонент для тих, хто прийшов сам - на бюджеті хобі, без жодного API-ключа з боку гравця і без того, щоб аудіо покидало його браузер.',
    },
    decisions: [
      {
        choice: { en: "Plain web, using the browser's own Web Speech API", uk: 'Звичайний веб і власний Web Speech API браузера' },
        instead: { en: 'Unity WebGL', uk: 'Unity WebGL' },
        because: {
          en: 'Recognition is already in the browser: free, no keys, no audio upload, latency in the hundreds of milliseconds. A WebGL build would reach the same API through a JS bridge and charge a multi-megabyte download for the privilege.',
          uk: 'Розпізнавання вже є в браузері: безкоштовно, без ключів, без завантаження аудіо, затримка в сотні мілісекунд. Збірка WebGL ходила б до того самого API через JS-міст і брала б за цю честь багатомегабайтне завантаження.',
        },
        cost: {
          en: 'Web Speech support differs across browsers, so the client carries its own recovery path for recognition dying in the middle of a round.',
          uk: 'Підтримка Web Speech різна в різних браузерах, тож клієнт несе власний шлях відновлення на випадок, коли розпізнавання вмирає посеред раунду.',
        },
      },
      {
        choice: { en: 'One runtime dependency: ws', uk: 'Одна рантайм-залежність: ws' },
        instead: { en: 'A framework, an ORM, a test runner', uk: 'Фреймворк, ORM, тестраннер' },
        because: {
          en: 'Node already ships an HTTP server, a SQLite driver and a test runner. Every dependency I decline is one I never have to patch at midnight on a box I maintain alone.',
          uk: 'У Node вже є HTTP-сервер, драйвер SQLite і тестраннер. Кожна залежність, від якої я відмовився, - це та, яку не доведеться патчити опівночі на сервері, який я тримаю сам.',
        },
        cost: {
          en: 'Routing, sessions and schema handling are mine to write, and they are plainer than the libraries I skipped.',
          uk: 'Роутинг, сесії та робота зі схемою написані мною і простіші за бібліотеки, від яких я відмовився.',
        },
      },
      {
        choice: {
          en: 'One answer parser, imported by both the client and the server',
          uk: 'Один парсер відповіді, який імпортують і клієнт, і сервер',
        },
        instead: { en: 'Comparing recognised text against the expected string', uk: 'Порівнювати розпізнаний текст з очікуваним рядком' },
        because: {
          en: 'Speech gives you "twenty one", "21" and "twenty-one" for one answer. If the rule for what counts as correct exists twice, players eventually watch the judge disagree with itself - and that ends the game more effectively than any bug.',
          uk: 'Мовлення віддає «двадцять один», «21» і «двадцять-один» як одну відповідь. Якщо правило правильності існує у двох місцях, гравці рано чи пізно побачать, як суддя суперечить сам собі - і це вбиває гру надійніше за будь-який баг.',
        },
        cost: {
          en: 'That file can never diverge, so it lives in shared/ and is the most heavily tested thing in the project.',
          uk: 'Цей файл не має права розійтися, тому лежить у shared/ і покритий тестами щільніше за все інше в проєкті.',
        },
      },
      {
        choice: { en: 'A bot opponent modelled as a reaction-time distribution', uk: 'Бот-суперник як розподіл часу реакції' },
        instead: { en: 'Matchmaking only', uk: 'Тільки підбір живих суперників' },
        because: {
          en: 'Almost everyone who opens a hobby game arrives alone. An empty lobby is not a smaller experience, it is the end of the session.',
          uk: 'Майже кожен, хто відкриває гру-хобі, приходить сам. Порожнє лобі - це не менший досвід, це кінець сесії.',
        },
        cost: {
          en: 'Its difficulty is a hand-tuned opinion rather than something measured against real players.',
          uk: 'Його складність - підкручена вручну думка, а не виміряна на живих гравцях величина.',
        },
      },
    ],
    metrics: [
      { value: '2 401', label: { en: 'lines of JavaScript', uk: 'рядків JavaScript' } },
      { value: '1', label: { en: 'runtime dependency', uk: 'рантайм-залежність' } },
      { value: '4', label: { en: 'test suites, no framework', uk: 'набори тестів, без фреймворку' } },
      { value: '0', label: { en: 'bytes of audio leaving the browser', uk: 'байтів аудіо покидають браузер' } },
    ],
    stack: ['Node.js', 'ws', 'node:sqlite', 'node:test', 'Web Speech API', 'Vertex AI', 'nginx'],
    retro: {
      en: 'The answer parser lives in shared/ because the alternative - two parsers agreeing by luck - is the kind of bug that only shows up in front of players, when it is too late to be quiet about it. The game also lives under a path rather than a subdomain, which means no absolute path may ever appear inside it: a constraint I now carry in my head forever instead of having configured once.',
      uk: 'Парсер відповіді лежить у shared/, бо альтернатива - два парсери, що збігаються випадково, - це той баг, який виявляється тільки перед гравцями, коли мовчати вже пізно. А ще гра живе на підшляху, а не на піддомені, тож усередині не може зʼявитися жодного абсолютного шляху - обмеження, яке тепер треба памʼятати вічно, замість того щоб один раз налаштувати.',
    },
    href: 'https://sp1le.tech/voiceduel',
    hrefLabel: 'sp1le.tech/voiceduel',
    shots: [
      {
        src: voiceduelEntry,
        alt: {
          en: 'Voice Duel entry screen, live: sign in or register, a microphone check, and the one rule of the game',
          uk: 'Вхідний екран Voice Duel наживо: вхід або реєстрація, перевірка мікрофона й єдине правило гри',
        },
      },
    ],
  },

];

export const featured = projects;

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Three decisions pulled onto the home page, chosen for how much they give away about how I think. */
export const highlightedDecisions: { slug: string; index: number }[] = [
  { slug: 'getaway', index: 0 },
  { slug: 'replydeck', index: 0 },
  { slug: 'voice-duel', index: 2 },
];
