import { stringToHTML } from '../../scripts/template.js';

/**
 * @param {Element} block
 */
export default function decorate(block) {
  const authors = [...block.querySelectorAll(':scope > div > div')];
  authors.forEach((authorDiv) => {
    authorDiv.append(
      stringToHTML(`
        <div class="social-share-group">
            <a href="https://facebook.com/" class="social-share" aria-label="facebook" target="_blank" rel="noopen nofollow">fb</a>
            <a href="https://twitter.com/" class="social-share" aria-label="twitter" target="_blank" rel="noopen nofollow">tw</a>
            <a href="https://instagram.com/" class="social-share" aria-label="instagram" target="_blank" rel="noopen nofollow">insta</a>
        </div>
        `),
    );
  });
}
