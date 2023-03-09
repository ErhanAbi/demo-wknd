/**
 * Convert string -> html
 * @param {string} string
 * @returns Element | HTMLCollection
 */
export function stringToHTML(htmlString) {
  const div = document.createElement("div");
  div.innerHTML = htmlString;
  if (div.childElementCount > 1) {
    return div.children;
  }
  return div.children[0];
}
