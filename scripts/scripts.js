import {
  sampleRUM,
  buildBlock,
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForLCP,
  loadBlocks,
  loadCSS,
  getMetadata,
  createResponsivePicture,
} from './lib-franklin.js';

// preload template.js
import('./template.js');

const LCP_BLOCKS = ['carousel', 'hero']; // add your LCP blocks to the list
window.hlx.RUM_GENERATION = 'project-1'; // add your RUM generation information here

const OMIT_RESPONSIVE_IMAGE_BLOCKS = [];

/**
 * Get preload link for a picture
 *
 * @param {Element} picture
 */
function getPicturePreloadLink(picture) {
  const sources = [...picture.querySelectorAll('source')];
  const img = picture.querySelector('img');
  const webpSources = new Set(['image/webp', 'image/webply']);
  const links = sources
    .filter(source => webpSources.has(source.type))
    .map(source => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      if (source.type) {
        link.type = source.type;
      }
      link.imageSrcset = source.srcset;
      link.href = source.dataset.src;
      if (img.sizes) {
        link.imageSizes = img.sizes;
      }

      return link;
    });

  return links;
}

/**
 * Create optimized pictures in document
 * @param {Element} main
 */
function createResponsivePictures(main) {
  const blocks = [...main.querySelectorAll('.block')].filter(block =>
    OMIT_RESPONSIVE_IMAGE_BLOCKS.reduce((acc, currentClass) => acc && !block.classList.contains(currentClass), true),
  );
  const firstBlock = blocks[0];

  blocks.forEach((block, index) =>
    block.querySelectorAll('img').forEach(img =>
      img.closest('picture').replaceWith(
        createResponsivePicture({
          src: img.src,
          alt: img.alt,
          eager: index === 0,
          width: img.width,
          height: img.height,
        }),
      ),
    ),
  );

  const firstPic = firstBlock.querySelector('picture');
  if (firstPic) {
    const links = getPicturePreloadLink(firstPic);
    links.forEach(link => document.head.appendChild(link));
  }
  main.querySelectorAll('picture').forEach(picture => {
    picture.dataset.status = 'ready';
  });
}

/**
 * move a block from its' section to a separate section
 *
 * @param {Element} main
 * @param {string} className
 */
function extractBlockToSection(main, className) {
  const block = main.querySelector(className);
  const currentBlockSection = block.parentElement;
  const newBlockSection = document.createElement('div');
  newBlockSection.append(block);

  main.insertBefore(newBlockSection, currentBlockSection.nextElementSibling);
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  const template = getMetadata('template');
  try {
    // buildHeroImage(main);
    if (template === 'adventure') {
      extractBlockToSection(main, '.tabs');
      extractBlockToSection(main, '.info');
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
  !window.isErrorPage && createResponsivePictures(main);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    await waitForLCP(LCP_BLOCKS);
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadBlocks(main);
  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  sampleRUM('lazy');
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  sampleRUM.observe(main.querySelectorAll('picture > img'));
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 1000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
