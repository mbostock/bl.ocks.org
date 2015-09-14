var observer = new MutationObserver(redraw);

observer.observe(document.documentElement, {childList: true, subtree: true});

redraw();

function redraw() {
  var container = document.querySelector(".repository-sidebar .only-with-full-nav");
  if (!container) return;

  var parts = location.pathname.substring(1).split("/"),
      user = parts[0],
      id = parts[1],
      sha = parts[2];
  if (!user || !/^[a-z0-9][a-z0-9]*$/i.test(user)) return;
  if (!/^([0-9]+|[0-9a-f]{20})$/.test(id)) id = null;
  if (!/^[0-9a-f]{40}$/.test(sha)) sha = null;

  var anchor = container.querySelector(".bl-ocks-button"),
      href = "http://bl.ocks.org/" + user + (id ? "/" + id + (sha ? "/" + sha : "") : "");

  if (!anchor) {
    anchor = document.createElement("a");
    anchor.className = "btn btn-block bl-ocks-button";
    anchor.innerHTML = '<span class="octicon octicon-link-external"></span> bl.ocks.org';
  }

  // Disconnect to avoid observing our own mutations.
  if (anchor.href !== href || anchor.parentNode !== container) {
    observer.disconnect();
    anchor.href = href;
    container.appendChild(anchor);
    observer.observe(document.documentElement, {childList: true, subtree: true});
  }
}
