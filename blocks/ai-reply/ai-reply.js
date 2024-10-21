import { loadComponents } from '../../scripts/spire-ui.js';

/**
 * @param {Element} block
 */
export default async function decorate(block) {
  await loadComponents();

  console.log('the block', block);

  const aiResp = document.createElement('spire-ai-response');

  block.appendChild(aiResp);
}
