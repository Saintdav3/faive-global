import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';

const mountSharedShell = () => {
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');

  if (header) header.innerHTML = renderHeader();
  if (footer) footer.innerHTML = renderFooter();

  const toggler = document.querySelector('.navbar-toggler');
  const nav = document.getElementById('siteNav');

  if (toggler && nav) {
    toggler.addEventListener('click', () => {
      nav.classList.toggle('show');
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountSharedShell);
} else {
  mountSharedShell();
}
