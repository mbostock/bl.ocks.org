redraw();
document.addEventListener("DOMSubtreeModified", redraw);

function redraw() {
  var root = document.querySelector(".root-pane");
  if (!root) return;

  var ul = document.querySelector(".export-references");
  if (!ul) {
    ul = document.createElement("ul");
    ul.className = "export-references";
    root.appendChild(ul);
  }

  var a = document.querySelector("#bl-ocks-org");
  if (!a) {
    var li = document.createElement("li");
    li.innerHTML = '<a class="minibutton" id="bl-ocks-org"><span class="octicon octicon-link-external" style="width:16px;text-align:center;"></span>bl.ocks.org</a>';
    a = li.firstChild;
    ul.insertBefore(li, ul.firstChild);
  }

  var parts = location.pathname.substring(1).split("/"), user = parts[0], id = parts[1], sha = parts[2];
  if (!user || !/^[a-z0-9][a-z0-9]*$/i.test(user)) return;
  if (!/^([0-9]+|[0-9a-f]{20})$/.test(id)) id = null;
  if (!/^[0-9a-f]{40}$/.test(sha)) sha = null;
  a.href = "http://bl.ocks.org/" + user + (id ? "/" + id + (sha ? "/" + sha : "") : "");
}
