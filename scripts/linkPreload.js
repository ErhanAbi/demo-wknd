import { stringToHTML } from './template.js';

function prefetchDoc(anchor) {
  const link = stringToHTML(` <link rel="prefetch" as="document" href="${anchor.href}">`);
  const existing = [...document.head.querySelectorAll('link[rel=prefetch]')].find(l => l.href === link.href);

  if (existing) {
    return;
  }

  document.head.append(link);
}

export function prerenderPages() {
  const anchors = [...document.querySelectorAll('a')]
    .filter(anchor => anchor.href.includes(document.location.origin))
    .filter(anchor => anchor.href !== document.location.href);

  anchors.forEach(link => {
    if (!link.href.includes(document.location.origin)) {
      return;
    }
    let linkTimer = null;
    link.addEventListener(
      'mouseover',
      () => {
        if (window.matchMedia('(max-width: 768px)').matches) {
          return;
        }
        linkTimer = setTimeout(() => prefetchDoc(link), 80);
      },
      { passive: true },
    );
    link.addEventListener('mouseout', () => {
      clearTimeout(linkTimer);
    });

    link.addEventListener(
      'touchstart',
      () => {
        prefetchDoc(link);
      },
      { passive: true },
    );
  });
}
