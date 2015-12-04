var observer = new MutationObserver(redraw);

observer.observe(document.documentElement, {childList: true, subtree: true});

redraw();

function redraw() {
  var container = document.querySelector(".file-navigation-options");
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
    var div = document.createElement("div");
    div.className = "file-navigation-option";
    anchor = div.appendChild(document.createElement("a"));
    anchor.className = "btn btn-sm bl-ocks-button";
    anchor.innerHTML = '<span class="octicon octicon-link-external"></span> bl.ocks';

    // Disconnect to avoid observing our own mutations.
    observer.disconnect();
    container.appendChild(div);
    observer.observe(document.documentElement, {childList: true, subtree: true});
  }

  if (anchor.href !== href) {
    anchor.href = href;
  }
}
