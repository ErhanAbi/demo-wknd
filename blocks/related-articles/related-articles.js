import { stringToHTML } from "../../scripts/template.js";

/**
 * @param {HTMLAnchorElement[]} links
 */
async function getArticlesMetadata(links) {
  const dates = (
    await Promise.all(
      links.map((link) =>
        fetch(link.href, { method: "HEAD" }).catch((err) => {
          console.error(err);
          return null;
        })
      )
    )
  ).map((req) => {
    if (req === null) {
      return null;
    }

    if (req.headers.get("last-modified")) {
      return new Date(req.headers.get("last-modified"));
    } else if (req.headers.get("date")) {
      return new Date(req.headers.get("date"));
    } else {
      return null;
    }
  });

  return links.map((link, idx) => ({
    href: link.href,
    title: link.title,
    lastModified: dates[idx],
  }));
}

/**
 *
 * @param {Element} block
 */
export default async function decorate(block) {
  const container = block.querySelector(":scope > div > div");
  const articleLinks = [...block.querySelectorAll("a")];
  const articlesMetadata = await getArticlesMetadata(articleLinks);
  const intl = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  });

  const markup = stringToHTML(
    `<div class="related-articles-list">
        ${articlesMetadata
          .map(
            (article) =>
              `<a class="related-articles-article" href="${article.href}">
                <div class="related-articles-articleTitle">${
                  article.title
                }</div>
                ${
                  article.lastModified === null
                    ? ``
                    : `<div class="related-articles-articleModified">
                      ${intl.format(article.lastModified)}
                    </div>`
                }
            </a>`
          )
          .join("")}
    </div>`
  );

  container.replaceWith(markup);
}
