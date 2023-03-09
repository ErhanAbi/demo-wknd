import { stringToHTML } from "../../scripts/template.js";

function generateBreadcrumbs(block) {
  let builtPath = "";
  const pathSegments = document.location.pathname
    .split("/")
    .filter((segment) => segment !== "")
    .map((segment) => ({
      path: segment,
      label: segment.replaceAll("-", " ").replaceAll("_", " "),
    }))
    .map((segment, idx, arr) => {
      builtPath += segment.path;
      const isLast = arr.length - 1 === idx;
      return stringToHTML(
        `<div class="breadcrumb">${
          isLast
            ? segment.label
            : `<a href="/${builtPath}">${segment.label}</a>`
        }</div>`
      );
    })
    .forEach((breadCrumbElement) => block.append(breadCrumbElement));

  //   const section = document.createElement("div");
  //   section.append(buildBlock("breadcrumbs", { elems: pathSegments }));
  //   main.querySelector(":scope > div").insertAdjacentElement("afterend", section);
}

/**
 *
 * @param {Element} block
 * @returns
 */
export default function decorateBreadCrumbs(block) {
  generateBreadcrumbs(block);
  //   const breadCrumbsContainer = block.querySelector(":scope > div > div");
  //   breadCrumbsContainer.classList.add("breadcrumbs-list");
}
