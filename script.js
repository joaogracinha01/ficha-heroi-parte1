'use strict';

// O HTML continua navegável e mostra todo o inventário sem JavaScript.
(() => {
  const header = document.querySelector('.cabecalho');
  const menuLinks = [...document.querySelectorAll('.menu a[href^="#"]')];
  const sections = menuLinks.map(link => document.querySelector(link.hash)).filter(Boolean);
  let headerHeight = header ? header.getBoundingClientRect().height : 0;
  let scheduled = false;

  function updateCurrentSection() {
    scheduled = false;
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= headerHeight + 32) current = section;
    }
    // A última seção pode ser menor que a janela.
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      current = sections[sections.length - 1];
    }
    for (const link of menuLinks) {
      if (current && link.hash === '#' + current.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }

  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(updateCurrentSection);
  }

  function measureHeader() {
    if (header) {
      headerHeight = Math.ceil(header.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--altura-cabecalho', headerHeight + 'px');
    }
    scheduleUpdate();
  }

  if (header && 'ResizeObserver' in window) {
    new ResizeObserver(measureHeader).observe(header);
  }
  window.addEventListener('resize', measureHeader, { passive: true });
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('pageshow', measureHeader);
  measureHeader();

  const grid = document.querySelector('.grade-inventario');
  if (!grid) return;
  const items = [...grid.querySelectorAll('.card-item')];
  const filters = document.createElement('fieldset');
  filters.className = 'filtros-inventario';
  const legend = document.createElement('legend');
  legend.textContent = 'Filtrar inventário por raridade';
  filters.append(legend);
  const status = document.createElement('p');
  status.className = 'resultado-inventario';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-atomic', 'true');

  for (const [value, label] of [['todos', 'Todos'], ['lendario', 'Lendários'], ['raro', 'Raros']]) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'filtro';
    button.textContent = label;
    button.setAttribute('aria-pressed', String(value === 'todos'));
    button.addEventListener('click', () => {
      for (const control of filters.querySelectorAll('button')) {
        control.setAttribute('aria-pressed', String(control === button));
      }
      let count = 0;
      for (const item of items) {
        const matches = value === 'todos' || Boolean(item.querySelector('.raridade.' + value));
        item.hidden = !matches;
        if (matches) count++;
      }
      status.textContent = count + (count === 1 ? ' relíquia exibida.' : ' relíquias exibidas.');
    });
    filters.append(button);
  }
  status.textContent = items.length + ' relíquias exibidas.';
  grid.before(filters, status);
})();
