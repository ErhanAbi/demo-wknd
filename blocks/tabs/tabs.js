import {
  decorateBlock,
  loadBlocks,
  updateSectionsStatus,
} from "../../scripts/lib-franklin.js";
import { stringToHTML } from "../../scripts/template.js";

/**
 * @param {Element} block
 */
function initEvents(block) {
  block.addEventListener("click", (ev) => {
    if (!ev.target.dataset.tab) {
      return;
    }
    const tab = ev.target.dataset.tab;
    const sections = [...document.querySelectorAll("div.section[data-tab]")];
    const buttons = [...block.querySelectorAll("button")];

    sections.forEach((section) =>
      section.dataset.tab === tab
        ? section.classList.remove("hidden")
        : section.classList.add("hidden")
    );
    buttons.forEach((button) =>
      button === ev.target
        ? button.classList.add("tab--active")
        : button.classList.remove("tab--active")
    );
  });
}

/**
 * @param {string[]} tabs
 */
function getTabs(tabs = []) {
  return stringToHTML(
    `<div class="tabs-list">
        ${tabs
          .map(
            (tab, idx) =>
              `<button class="tab ${
                idx === 0 ? "tab--active" : ""
              }" data-tab="${tab}">${tab}</button>`
          )
          .join("")}
    </div>`
  );
}

async function addAllSection() {
  const allArticles = [
    ...document.querySelectorAll(".article-list.block > div"),
  ];
  const markup = stringToHTML(
    `<div class="section" data-tab="All">
      <div>
        <div class="article-list">
          ${allArticles.map((article) => article.outerHTML).join("")}
        </div>
      <div>
    </div>`
  );
  const main = document.querySelector("main");

  main.insertBefore(markup, document.querySelector("div.section[data-tab]"));

  decorateBlock(markup.querySelector(".article-list"));
  await loadBlocks(markup);
  updateSectionsStatus(main);
}

/**
 * @param {Element} block
 */
export default async function decorate(block) {
  const isAdventureTabs = block.classList.contains("adventures");
  if (isAdventureTabs) {
    addAllSection();
  }
  const tabSections = [...document.querySelectorAll("div.section[data-tab]")];

  const tabs = tabSections.map((section) => section.dataset.tab);
  const markup = getTabs(tabs);

  block.append(markup);

  tabSections.forEach((section, idx) =>
    idx === 0
      ? section.classList.remove("hidden")
      : section.classList.add("hidden")
  );

  initEvents(block);
}
