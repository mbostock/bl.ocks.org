browser.browserAction.onClicked.addListener(function() {
  browser.tabs.query({currentWindow: true, active: true}, function(tabs){
    var parts = tabs[0].url.split("/"),
          hostname = parts[2],
          user = parts[3],
          id = parts[4];
    if (hostname !== "gist.github.com") return;
    browser.tabs.create({'url': "http://bl.ocks.org/" + user + (id ? "/" + id : ""), 'active': true});
  });
});
