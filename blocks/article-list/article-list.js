/**
 * @param {Element} block
 */
export default async function decorate(block) {
  const articleList = [...block.querySelectorAll(":scope > div")];
  const isDisabled = block.classList.contains("locked");

  articleList.forEach((articleBlock) => {
    const pic = articleBlock.querySelector("picture");
    const anchor = articleBlock.querySelector("a");

    if (isDisabled) {
      articleBlock
        .querySelectorAll("a")
        .forEach((a) => a.removeAttribute("href"));
    }

    const dupe = anchor.cloneNode();
    dupe.className = "link-container";
    dupe.appendChild(pic.cloneNode(true));
    pic.replaceWith(dupe);
  });
}
