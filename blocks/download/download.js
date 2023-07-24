import { stringToHTML } from '../../scripts/template.js';

function formatBytes(bytes, decimals = 1) {
  const numBytes = typeof bytes === 'number' ? bytes : parseFloat(bytes);
  if (Number.isNaN(numBytes)) {
    return '0 B';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(numBytes) / Math.log(k));

  return `${(numBytes / k ** i).toFixed(dm)} ${sizes[i]}`;
}

/**
 * @param {string} filePath
 */
async function getFileMetadata(filePath, fileNameMaxLen = 30) {
  const req = await fetch(filePath, { method: 'HEAD' });
  const { headers } = req;
  let fileName = new URL(filePath).pathname.split('/').pop().replaceAll('_', ' ').replaceAll('-', ' ');

  if (fileName.length > fileNameMaxLen) {
    const letters = fileName.split('');
    fileName = letters
      .slice(0, fileNameMaxLen - 10)
      .concat('...')
      .concat(letters.slice(letters.length - (10 - 3)))
      .join('');
  }

  return {
    fileType: typeof headers.get('content-type') === 'string' ? headers.get('content-type') : '',
    fileSize: formatBytes(headers.get('content-length')),
    fileName,
  };
}

/**
 * @param {Element} block
 */
export default async function decorate(block) {
  const contents = block.querySelector(':scope > div > div');
  const link = contents.querySelector('a');
  const fileMetadata = await getFileMetadata(link.href);

  const blockMarkup = stringToHTML(
    `<div class="download-component">
        <a class="download-link" href="${link.href}" download>${link.title}</a>
        <div class="download-emphasized">GET THE FULL STORY</div>
        <div class="file-details">
            <div class="file-name">${fileMetadata.fileName}</div>
            <div class="file-size">${fileMetadata.fileSize}</div>
            <div class="file-type">${fileMetadata.fileType}</div>
        </div>
        <a class="download-cta" href="${link.href}" download><span class="icon icon-lg">↓</span> DOWNLOAD PDF</a>
    </div>`,
  );

  contents.replaceWith(blockMarkup);
}
