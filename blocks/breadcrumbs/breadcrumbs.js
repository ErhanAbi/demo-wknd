import { stringToHTML } from '../../scripts/template.js';

function generateBreadcrumbs(block) {
  let builtPath = '';
  const pathSegments = document.location.pathname
    .split('/')
    .filter(segment => segment !== '')
    .map(segment => ({
      path: segment,
      label: segment.replaceAll('-', ' ').replaceAll('_', ' '),
    }))
    .map((segment, idx, arr) => {
      builtPath += segment.path;
      const isLast = arr.length - 1 === idx;
      return stringToHTML(
        `<div class="breadcrumb">${isLast ? segment.label : `<a href="/${builtPath}">${segment.label}</a>`}</div>`,
      );
    })
    .forEach(breadCrumbElement => block.append(breadCrumbElement));
}

/**
 *
 * @param {Element} block
 * @returns
 */
export default function decorateBreadCrumbs(block) {
  generateBreadcrumbs(block);
}
