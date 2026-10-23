const filters = document.querySelectorAll('[data-filter]');
const dishes = document.querySelectorAll('[data-category]');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
  dishes.forEach(dish => { dish.hidden = button.dataset.filter !== 'all' && dish.dataset.category !== button.dataset.filter; });
  document.querySelector('#menu-status').textContent = `${[...dishes].filter(dish => !dish.hidden).length} dishes shown`;
}));
document.querySelector('#year').textContent = new Date().getFullYear();
