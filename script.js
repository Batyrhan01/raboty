// Фильтр и счётчик
const cards = [...document.querySelectorAll('.card')], btns = [...document.querySelectorAll('.filter button')];
const word = n => n % 10 === 1 && n % 100 !== 11 ? 'сайт' : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? 'сайта' : 'сайтов';
btns.forEach(b => b.addEventListener('click', () => {
  btns.forEach(x => x.setAttribute('aria-pressed', x === b));
  cards.forEach(c => { c.hidden = b.dataset.f !== 'all' && c.dataset.kind !== b.dataset.f; });
  const n = cards.filter(c => !c.hidden).length;
  document.getElementById('count').textContent = n;
  document.getElementById('word').textContent = word(n);
  document.getElementById('live').textContent = `Показано: ${n} ${word(n)}`;
}));
// Наведение мышью: длинный снимок грузится и медленно прокручивается
if (matchMedia('(hover:hover) and (prefers-reduced-motion:no-preference)').matches) cards.forEach(c => {
  const s = c.querySelector('.shot'); let img, over = false;
  const go = () => { if (over) { img.classList.add('on'); img.style.transform = `translateY(-${Math.max(0, img.offsetHeight - s.offsetHeight)}px)`; } };
  c.addEventListener('mouseenter', () => {
    over = true;
    if (!img) { img = new Image(); img.className = 'long'; img.alt = ''; img.onload = () => requestAnimationFrame(go); s.append(img); img.src = s.dataset.long; } else if (img.complete) go();
  });
  c.addEventListener('mouseleave', () => { over = false; if (img) { img.classList.remove('on'); img.style.transform = 'none'; } });
});
