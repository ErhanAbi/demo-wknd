import { loadContentAI } from 'https://experience-qa.adobe.com/solutions/experience-platform-asgd-content-ai-web-components/static-assets/platforms/web/init.mjs';
import { handleSubmit } from '../../scripts/spire-ui.js';

/**
 * @param {Element} block
 */
export default async function decorate(block) {
  await loadContentAI({ namespace: 'spire' });

  const aiResp = document.createElement('spire-ai-response');
  aiResp.setProps(() => ({ onSubmit: handleSubmit }));

  block.appendChild(aiResp);
}
