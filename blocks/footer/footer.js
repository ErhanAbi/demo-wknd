import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

/**
 * @param {Element} block
 */
function decorateCopy(block) {
  const copyBlock = block.querySelector('.copy');
  const [startYear, copyText] = [...copyBlock.querySelectorAll(':scope > div > div')];
  startYear.textContent = `© ${startYear.textContent}-${new Date().getFullYear()}, ${copyText.textContent}`;
  copyText.remove();
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  // fetch footer content
  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(
    `${footerPath}.plain.html`,
    window.location.pathname.endsWith('/footer') ? { cache: 'reload' } : {},
  );

  if (resp.ok) {
    const html = await resp.text();

    // decorate footer DOM
    const footer = document.createElement('div');
    footer.innerHTML = html;

    decorateIcons(footer);
    decorateCopy(footer);
    block.append(footer);
  }

  const pic = block.querySelector('picture');
  const container = pic?.closest('a');

  if (container) {
    container.ariaLabel = 'Link to homepage';
  }
}
