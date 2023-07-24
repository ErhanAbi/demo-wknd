import { loadBlock, decorateBlock } from '../../scripts/lib-franklin.js';

/**
 * @param {HTMLDivElement} block
 */
async function reloadBlock(block) {
  block.classList.add('tabs');
  block.dataset.originalBlockName = block.dataset.blockName;
  block.dataset.blockName = 'tabs';
  delete block.dataset.blockStatus;
  await loadBlock(block);
  decorateBlock(block);
}

function createAllArticlesSection() {
  const section = document.querySelector('div.section[data-tab]');
  const copy = section.cloneNode(true);
  const copiedNodeArticleList = copy.querySelector('.article-list');

  copiedNodeArticleList.replaceChildren();
  document.querySelectorAll('div.section[data-tab] .article-list.block > div').forEach(article => {
    const articleCopy = article.cloneNode(true);
    copiedNodeArticleList.append(articleCopy);
  });
  copy.dataset.tab = 'All';
  document.querySelector('main').insertBefore(copy, section);
}

/**
 * @param {Element} block
 */
export default async function decorate(block) {
  createAllArticlesSection();
  await reloadBlock(block);
}
