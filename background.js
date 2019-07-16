/*
// On refresh
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if(tab.url !== undefined && changeInfo.status == "complete")
    // Trigger just once when the reload is complete
    console.log(tabId);
});
// On Tab Shift
chrome.tabs.onActivated.addListener(function(activeInfo){
  console.log(activeInfo.tabId);
});
*/
var file;
function reader(){
    file = this.response;
    console.log(file);
}
var req = new XMLHttpRequest();
req.addEventListener("load", reader, false);
req.open("GET", '/data.txt', true);
req.send();

var tabs_data = {}
var interval = 1000 // The interval
// Use ID of each tab as the key
// The element contain the running time of each id

function set_time(){
    var current = new Date();
    var hour = current.getHours();
    var min = current.getMinutes();
    var sec = current.getSeconds();
    return [hour, min, sec];
}

// Get the domain name from url
function getDomain(url){
	var arr = url.split("/");
	// arr[0] is https:
	// arr[2] is domain name

	return arr[2];
}


// Update the tabs data after each inteval time
function update_info(){
    chrome.tabs.query({}, function(tabs){
		var current_tabs = [];
		// This list is used to check if multiple tabs of same domain are open
        for (var i=0; i < tabs.length; i++){
			domain = getDomain(tabs[i].url);
            if (tabs_data[domain] === undefined){
                tabs_data[domain] = 0; // Just started
            }
            else if (!(current_tabs.includes(domain))){
                tabs_data[domain] += interval; // Add the interval time
            }
			current_tabs.push(domain);
        }

    });
}



// After every fixed interval, update the data of the open tabs
setInterval(update_info, interval);

chrome.extension.onConnect.addListener(function(port){
	//console.log("Connected with pop");
	port.onMessage.addListener(function(msg){
		if (msg === "Connected")
			port.postMessage(tabs_data);
	});
});
