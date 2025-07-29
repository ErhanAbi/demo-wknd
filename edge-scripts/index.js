/**
 * @typedef {"edge" | "client"} Runtime
 */

/**
 * @typedef {object}
 */

/**
 * @param {Runtime} runtime
 */
function initEvents(runtime) {
  if (runtime === 'edge') return;
  console.log('initializing events');
}

/**
 * @param {HTMLDocument} doc
 * @param {URL} url
 * @param {Runtime} runtime
 */
export default function decorateDoc(doc, url, runtime) {
  console.log('running on edge');
  const body = doc.querySelector('body');
  body.style.fontWeight = 700;
  body.classList.add('some-interesting-class');

  initEvents(runtime);

  return { 'a.button.primary': ['mouseover'] };
}
