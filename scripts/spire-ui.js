const locations = {
  local: () => (asset) => new URL(asset, 'http://localhost:4173/').href,
  remote:
    (origin) =>
    (asset, isImmutableAsset = true) => {
      const originURL = new URL(origin);
      return new URL(
        asset,
        `${originURL.origin}/solutions/software-distribution-spire-ui/${
          isImmutableAsset ? 'assets' : 'static-assets'
        }/platforms/web/`,
      ).href;
    },
};

/**
 * loads web components from spire-ui
 */
export async function loadComponents() {
  const webComponentsPath =
    document.location.hostname === 'localhost'
      ? locations.local()
      : locations.remote('https://experience-qa.adobe.com/');

  const manifest = await (await fetch(webComponentsPath('manifest.json', false))).json();

  const { loader } = await import(webComponentsPath(manifest['index.mjs']));
  await loader.setNamespace('spire').loadStyles().registerComponents().load();

  return loader;
}
