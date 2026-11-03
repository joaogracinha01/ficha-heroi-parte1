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

  setupMobileMenu();
  setupAttributes();
  setupAbilities();

  function makeButton(label, action) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'filtro';
    button.textContent = label;
    button.addEventListener('click', action);
    return button;
  }

  function setupMobileMenu() {
    const menu = document.querySelector('.menu');
    if (!header || !menu) return;
    menu.id = 'menu-principal';
    const toggle = makeButton('Menu', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    toggle.classList.add('alternar-menu');
    toggle.setAttribute('aria-controls', menu.id);
    menu.before(toggle);
    header.classList.add('menu-interativo');
    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      header.classList.toggle('menu-aberto', open);
      measureHeader();
    }
    setOpen(false);
    menuLinks.forEach(link => link.addEventListener('click', () => setOpen(false)));
    header.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    window.matchMedia('(min-width: 640px)').addEventListener('change', () => setOpen(false));
  }

  function setupAttributes() {
    const panel = document.querySelector('.atributos');
    if (!panel) return;
    const rows = [...panel.querySelectorAll('.atributo')];
    const controls = [];
    const storageKey = 'nero-vael-atributos-v1';
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem(storageKey)); } catch { /* Armazenamento opcional. */ }
    const description = document.createElement('p');
    description.className = 'ajuda-interacao';
    description.textContent = 'Modo de treino: ajuste os atributos para simular sua versão do guardião. Os valores ficam salvos neste navegador.';
    panel.querySelector('h3').after(description);
    const summary = document.createElement('p');
    summary.className = 'resumo-treino';
    summary.setAttribute('role', 'status');
    function summarize() {
      const total = controls.reduce((sum, control) => sum + Number(control.input.value), 0);
      summary.textContent = 'Potencial total: ' + total + ' / ' + controls.length * 100;
    }
    function save() {
      try { localStorage.setItem(storageKey, JSON.stringify(controls.map(control => Number(control.input.value)))); } catch { /* Navegação privada continua funcionando. */ }
    }
    rows.forEach((row, index) => {
      const meter = row.querySelector('[role="meter"]');
      const number = row.querySelector('strong');
      const fill = row.querySelector('.preenchimento');
      if (!meter || !number || !fill) return;
      const initial = Number(meter.getAttribute('aria-valuenow'));
      const name = meter.getAttribute('aria-label');
      const label = document.createElement('label');
      label.className = 'controle-atributo';
      const caption = document.createElement('span');
      caption.textContent = 'Ajustar ' + name;
      const input = document.createElement('input');
      input.type = 'range';
      input.min = '0'; input.max = '100'; input.step = '1';
      input.value = Array.isArray(saved) && Number.isInteger(saved[index]) && saved[index] >= 0 && saved[index] <= 100 ? saved[index] : initial;
      function render() {
        const value = Number(input.value);
        number.textContent = value;
        meter.setAttribute('aria-valuenow', value);
        fill.style.width = value + '%';
        input.setAttribute('aria-valuetext', value + ' de 100');
      }
      input.addEventListener('input', render);
      input.addEventListener('change', () => { summarize(); save(); });
      label.append(caption, input);
      row.append(label);
      controls.push({input, initial, render});
      render();
    });
    const reset = makeButton('Restaurar atributos originais', () => {
      controls.forEach(control => { control.input.value = control.initial; control.render(); });
      summarize(); save();
    });
    reset.classList.add('restaurar-atributos');
    panel.append(summary, reset);
    summarize();
  }

  function setupAbilities() {
    const panel = document.querySelector('.habilidades');
    if (!panel) return;
    const training = document.createElement('div');
    training.className = 'treino-mana';
    const title = document.createElement('p');
    title.textContent = 'Treino da chama · reserva de mana';
    const meter = document.createElement('meter');
    meter.min = 0; meter.max = 100; meter.value = 100;
    meter.setAttribute('aria-label', 'Mana disponível');
    const output = document.createElement('p');
    output.setAttribute('role', 'status');
    output.setAttribute('aria-atomic', 'true');
    let mana = 100;
    const spells = [];
    function render(message) {
      meter.value = mana;
      output.textContent = message + ' Mana: ' + mana + ' / 100.';
      spells.forEach(({button, cost}) => { button.disabled = mana < cost; });
    }
    panel.querySelectorAll('.lista-habilidades li').forEach(item => {
      const cost = Number(item.querySelector('.categoria')?.textContent.match(/(\d+) DE MANA/)?.[1]);
      const name = item.querySelector('h4')?.textContent;
      if (!cost || !name) return;
      const button = makeButton('Usar habilidade · ' + cost + ' mana', () => {
        if (mana < cost) return;
        mana -= cost;
        render(name + ' ativado no treino.');
      });
      button.setAttribute('aria-label', 'Usar ' + name + ', custo de ' + cost + ' de mana');
      button.classList.add('usar-habilidade');
      item.lastElementChild.append(button);
      spells.push({button, cost});
    });
    const recharge = makeButton('Recuperar mana', () => { mana = 100; render('Reserva restaurada.'); });
    training.append(title, meter, output, recharge);
    panel.append(training);
    render('Escolha uma habilidade para experimentar.');
  }

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

  const searchLabel = document.createElement('label');
  searchLabel.className = 'busca-inventario';
  searchLabel.textContent = 'Buscar relíquia';
  const search = document.createElement('input');
  search.type = 'search';
  search.placeholder = 'Nome ou descrição…';
  searchLabel.append(search);
  let rarity = 'todos';
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
  function filterItems() {
    const query = normalize(search.value.trim());
    let count = 0;
    items.forEach(item => {
      const matches = (rarity === 'todos' || Boolean(item.querySelector('.raridade.' + rarity))) && normalize(item.textContent).includes(query);
      item.hidden = !matches;
      if (matches) count++;
    });
    status.textContent = count === 0 ? 'Nenhuma relíquia encontrada. Tente outro termo ou raridade.' : count + (count === 1 ? ' relíquia exibida.' : ' relíquias exibidas.');
  }
  search.addEventListener('input', filterItems);

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
      rarity = value;
      filterItems();
    });
    filters.append(button);
  }
  status.textContent = items.length + ' relíquias exibidas.';
  grid.before(searchLabel, filters, status);
})();
