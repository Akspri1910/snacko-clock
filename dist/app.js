document.querySelector('#year').textContent = new Date().getFullYear();
const browser = document.querySelector('.menu-browser');
const categories = [...document.querySelectorAll('.menu-category')];
const links = [...document.querySelectorAll('.category-nav a')];
function selectMenu(id) {
  const selected = categories.find(category => category.id === id);
  categories.forEach(category => { category.hidden = Boolean(selected) && category !== selected; });
  links.forEach(link => link.setAttribute('aria-current', String(link.hash === '#' + (selected ? id : 'all-menu'))));
  browser.classList.toggle('is-filtered', Boolean(selected));
  document.querySelector('#menu-status').textContent = selected ? selected.getAttribute('aria-label') + ' · Select another category to explore more.' : 'All categories shown';
}
function syncMenu() {
  const id = window.location.hash.slice(1);
  if (id.startsWith('cat-') || id === 'all-menu') selectMenu(id);
  else if (!id || id === 'full-menu') selectMenu('cat-chaat');
}
document.querySelectorAll('a[href^="#cat-"], a[href="#all-menu"], a[href="#full-menu"]').forEach(link => {
  link.addEventListener('click', () => selectMenu(link.hash === '#full-menu' ? 'cat-chaat' : link.hash.slice(1)));
});
window.addEventListener('hashchange', syncMenu);
syncMenu();
