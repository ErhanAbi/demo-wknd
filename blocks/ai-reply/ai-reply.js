import loadComponents from '../../scripts/spire-ui.js';

/**
 * @param {Element} block
 */
export default async function decorate(block) {
  await loadComponents();

  const aiResp = document.createElement('spire-ai-response');

  aiResp.setProps(() => ({ queryIndex: 'wkndcf', colorScheme: 'light' }));

  block.appendChild(aiResp);
}
