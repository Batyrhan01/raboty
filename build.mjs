// Собирает index.html из works.json: node build.mjs
// Новая работа: запись в works.json и три снимка в img (id-d.webp, id-m.webp, id-l.webp).
import fs from 'node:fs';
const W = JSON.parse(fs.readFileSync('works.json', 'utf8'));
const big = W.filter(w => w.big).sort((a, b) => a.big - b.big), rest = W.filter(w => !w.big);
const url = w => `https://batyrhan01.github.io/${w.id}/`;
const n = W.length, dent = rest.filter(w => w.niche === 'Стоматология').length;
const word = k => k % 10 === 1 && k % 100 !== 11 ? 'сайт' : [2,3,4].includes(k % 10) && ![12,13,14].includes(k % 100) ? 'сайта' : 'сайтов';
const tag = '<span class="tag">Инициативный проект</span>';
const meta = w => `<p class="meta">${w.niche}, <time datetime="${w.date.split('.').reverse().join('-')}">${w.date}</time></p>`;
const arrow = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
const link = w => `<a class="open" href="${url(w)}" target="_blank" rel="noopener" aria-label="Открыть сайт ${w.name} в новой вкладке">Открыть сайт ${arrow}</a>`;
const bigHtml = big.map(w => `
<article class="big" style="--c:${w.color}">
  <div class="big-text">${tag}<h3>${w.name}</h3>${meta(w)}<p class="what">${w.text}</p>${link(w)}</div>
  <div class="big-pic"><img class="desk" src="img/${w.id}-d.webp" width="1440" height="900" loading="lazy" alt="Сайт ${w.name} на компьютере"><img class="phone" src="img/${w.id}-m.webp" width="390" height="844" loading="lazy" alt="Сайт ${w.name} на телефоне"></div>
</article>`).join('');
const card = w => `
<li class="card" data-kind="${w.niche === 'Стоматология' ? 'dent' : 'other'}" style="--c:${w.color}">
  <div class="card-top">${tag}<h3>${w.name}</h3>${meta(w)}</div>
  <div class="shot" data-long="img/${w.id}-l.webp"><img src="img/${w.id}-d.webp" width="1440" height="900" loading="lazy" alt="Главный экран сайта ${w.name}"></div>
  ${link(w)}
</li>`;
const stack = ['ramus-dental', 'konfeta-astana', 'janym-stom', 'navi-dent', 'cristall-dent'];
fs.writeFileSync('index.html', `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${n} ${word(n)} для бизнеса в Астане. Работы Батархана</title>
<meta name="description" content="Сайты для стоматологий, салона, клининга и натяжных потолков в Астане. Все можно открыть и посмотреть.">
<meta property="og:title" content="${n} ${word(n)} для бизнеса в Астане">
<meta property="og:description" content="Работы Батархана: стоматологии, салон, клининг, потолки.">
<meta property="og:image" content="https://batyrhan01.github.io/raboty/share.jpg">
<meta property="og:type" content="website">
<meta name="theme-color" content="#0E0F11">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preload" href="fonts/unbounded-cyrillic.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="style.css">
</head>
<body>
<a class="skip" href="#raboty">К работам</a>
<header class="head wrap"><a class="logo" href="#top">Батархан</a><nav aria-label="Меню"><a href="#raboty">Работы</a><a href="#kontakty">Контакты</a></nav></header>
<main id="top">
<section class="hero wrap">
  <div class="hero-text">
    <h1>${n} ${word(n)} для бизнеса в&nbsp;Астане</h1>
    <p>Меня зовут Батархан, я делаю сайты. Здесь стоматологии, салон красоты, клининг и натяжные потолки. Каждый сайт работает, его можно открыть.</p>
    <div class="btns"><a class="btn" href="#raboty">Смотреть работы</a><a class="btn ghost" href="https://t.me/mew_maw01" target="_blank" rel="noopener">Написать в Telegram</a></div>
  </div>
  <div class="stack" aria-hidden="true">${stack.map((id, i) => `<img style="--i:${i}" src="img/${id}-d.webp" width="1440" height="900" alt="">`).join('')}</div>
</section>
<section class="wrap" id="raboty" tabindex="-1"><h2>С чего начать</h2>${bigHtml}</section>
<section class="wrap" aria-labelledby="more">
  <div class="bar"><h2 id="more">Ещё <span id="count">${rest.length}</span> <span id="word">${word(rest.length)}</span></h2>
  <div class="filter" role="group" aria-label="Фильтр работ"><button type="button" data-f="all" aria-pressed="true">Все</button><button type="button" data-f="dent" aria-pressed="false">Стоматологии</button><button type="button" data-f="other" aria-pressed="false">Другое</button></div></div>
  <p class="sr" id="live" aria-live="polite"></p>
  <ul class="grid">${rest.map(card).join('')}</ul>
</section>
</main>
<footer class="foot wrap" id="kontakty">
  <h2>Нужен сайт? Напишите мне</h2>
  <a class="btn" href="https://t.me/mew_maw01" target="_blank" rel="noopener">Telegram @mew_maw01</a>
  <p class="links"><a href="https://github.com/Batyrhan01" target="_blank" rel="noopener">GitHub Batyrhan01</a><a href="https://batyrhan01.github.io/portfolio-ru/" target="_blank" rel="noopener">Моё портфолио</a></p>
</footer>
<script src="script.js"></script>
</body>
</html>
`);
console.log(n, 'работ; крупных', big.length, '; в сетке', rest.length, '; стоматологий в сетке', dent);
