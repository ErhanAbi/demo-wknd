import { decorateIcons } from '../../scripts/lib-franklin.js';
import { stringToHTML } from '../../scripts/template.js';

/**
 * @param {Element} block
 */
function initEvents(block) {
  const buttons = [...block.querySelectorAll('button.accordion-btn')];

  buttons.forEach(button =>
    button.addEventListener('click', ev => {
      const row = button.closest('div.accordion-row');
      row.classList.toggle('accordion-row--open');
    }),
  );
}

/**
 * @param {Element} block
 */
export default async function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  rows.forEach(row => {
    const [accordionTitle, accordionContent] = [...row.querySelectorAll(':scope > div')];
    const btn = stringToHTML(`
        <button class="accordion-btn" type="button">
            <span class="accordion-btn-label">${accordionTitle.innerHTML}</span>
            <span class="icon icon-add"></span>
            <span class="icon icon-remove"></span>
        </button>
    `);

    accordionTitle.replaceWith(btn);
    accordionContent.classList.add('accordion-content');

    row.classList.add('accordion-row');
  });

  initEvents(block);

  return decorateIcons(block);
}
