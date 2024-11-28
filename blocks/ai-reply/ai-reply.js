import loadComponents from '../../scripts/spire-ui.js';

/**
 * @param {Element} block
 */
export default async function decorate(block) {
  await loadComponents();

  const handleSubmit = (query) => {
    const searchURL = new URL('/search', document.location.origin);
    searchURL.searchParams.set('q', query);

    if (document.location.pathname === '/search') {
      window.history.replaceState(null, null, searchURL);
    } else {
      window.location = searchURL;
    }
  };

  const aiResp = document.createElement('demo-ai-response');
  aiResp.setProps(() => ({
    queryIndex: 'inside-2',
    submittedQuery: new URL(document.location).searchParams.get('q'),
    onSubmit: handleSubmit
  }));

  block.appendChild(aiResp);
}
