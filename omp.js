function ompload(url) {
	var enc_url = encodeURIComponent(url);
	//console.log("omp url: " + enc_url);
	chrome.tabs.create({ url: "http://ompldr.org/upload?url1=" + enc_url, selected: false });
}

// Called when the user clicks on the browser action icon.
chrome.browserAction.onClicked.addListener(function(tab) {
	// We can only inject scripts to find the title on pages loaded with http
	// and https so for all other pages, we don't ask for the title.
	if (tab.url.indexOf("http:") == 0 || tab.url.indexOf("https:") == 0) {
		ompload(tab.url);
	}
});

// A generic onclick callback function.
function genericOnClick(info, tab) {
	if (info["mediaType"] == "image") {
		ompload(info["srcUrl"]);
	} else {
		ompload(tab["url"]);
	}
/*	console.log("item " + info.menuItemId + " was clicked");
	console.log("info: " + JSON.stringify(info));
	console.log("tab: " + JSON.stringify(tab));*/
}

// Create one test item for each context type.
/*var contexts = ["page","selection","link","editable","image","video",
	"audio"];*/
// only do pages/images for now
var contexts = ["page", "image"];
for (var i = 0; i < contexts.length; i++) {
	var context = contexts[i];
	var title = "Ompload " + context + "!";
	var id = chrome.contextMenus.create({"title": title, "contexts":[context],
		"onclick": genericOnClick});
	/*console.log("'" + context + "' item:" + id);*/
}

