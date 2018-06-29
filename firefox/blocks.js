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
  if (!user || user.length > 39 || !/^[a-z0-9](?:-?[a-z0-9])*$/i.test(user)) return;
  if (!/^([0-9]+|[0-9a-f]{20,})$/.test(id)) id = null;
  if (!/^[0-9a-f]{40}$/.test(sha)) sha = null;

  var anchor = container.querySelector(".bl-ocks-button"),
      href = "http://bl.ocks.org/" + user + (id ? "/" + id + (sha ? "/" + sha : "") : "");

  if (!anchor) {
    var div = document.createElement("div");
    div.className = "file-navigation-option";
    anchor = div.appendChild(document.createElement("a"));
    anchor.className = "btn btn-sm bl-ocks-button";
    var svg = anchor.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "svg"));
    svg.setAttribute("class", "octicon octicon-link-external");
    svg.setAttribute("height", 16);
    svg.setAttribute("width", 12);
    var path = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "path"));
    path.setAttribute("d", "M11 10h1v3c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V3c0-0.55 0.45-1 1-1h3v1H1v10h10V10zM6 2l2.25 2.25-3.25 3.25 1.5 1.5 3.25-3.25 2.25 2.25V2H6z");
    anchor.appendChild(document.createTextNode(" bl.ocks"));

    // Disconnect to avoid observing our own mutations.
    observer.disconnect();
    container.appendChild(div);
    observer.observe(document.documentElement, {childList: true, subtree: true});
  }

  if (anchor.href !== href) {
    anchor.href = href;
  }
}
