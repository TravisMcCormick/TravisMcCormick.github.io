// Rewrites the path to a query string that index.html decodes on load, so a
// hard refresh on a deep link still lands on the right route.
(function () {
  var pathSegmentsToKeep = 0;
  var l = window.location;
  l.replace(
    l.protocol +
      "//" +
      l.hostname +
      (l.port ? ":" + l.port : "") +
      l.pathname
        .split("/")
        .slice(0, 1 + pathSegmentsToKeep)
        .join("/") +
      "/?/" +
      l.pathname
        .slice(1)
        .split("/")
        .slice(pathSegmentsToKeep)
        .join("/")
        .replace(/&/g, "~and~") +
      (l.search ? "&" + l.search.slice(1).replace(/&/g, "~and~") : "") +
      l.hash,
  );
})();
