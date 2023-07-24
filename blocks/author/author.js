import stringToHTML from '../../scripts/template.js';

/**
 *
 * @param {Element} block
 */
function decorateAuthorBlock(block) {
  const [pictureRow, authorMetadataRow] = [...block.querySelectorAll(':scope > div')];
  pictureRow.classList.add('author-avatar');
  const [nameCol, detailsCol] = [...authorMetadataRow.querySelectorAll(':scope > div')];
  authorMetadataRow.classList.add('author-metadata');
  nameCol.classList.add('author-name');
  detailsCol.classList.add('author-details');
}

/**
 *
 * @param {Element} block
 */
function addSocialShare(block) {
  block.append(
    stringToHTML(
      `<div class="social-share-group">
            <a href="#fb" class="social-share" aria-label="facebook">fb</a>
            <a href="#twitter" class="social-share" aria-label="twitter">tw</a>
            <a href="#insta" class="social-share" aria-label="instagram">insta</a>
        </div>`,
    ),
  );
}

/**
 * @param {Element} block
 */
function addSeparator(block) {
  block.parentElement.insertBefore(stringToHTML('<hr class="separator">'), block);
}

/**
 *
 * @param {Element} block
 */
export default function decorate(block) {
  decorateAuthorBlock(block);
  addSocialShare(block);
  addSeparator(block);
}
