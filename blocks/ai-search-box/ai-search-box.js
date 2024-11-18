import loadComponents from '../../scripts/spire-ui.js';

/**
 * @param {Element} block
 */
export default async function decorate(block) {
  await loadComponents();

  const aiSearchBox = document.createElement('spire-search-box');

  aiSearchBox.setProps(() => ({
    colorScheme: 'light',
    submittedQuery: new URL(document.location).searchParams.get('q'),
    onSubmit: (query) => {
      const searchURL = new URL('/search', document.location.origin);
      searchURL.searchParams.set('q', query);

      if (document.location.pathname === '/search') {
        window.history.replaceState(null, null, searchURL);
      } else {
        window.location = searchURL;
      }
    },
  }));

  block.appendChild(aiSearchBox);
}
