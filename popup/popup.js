//document.getElementById("time").innerHTML = "Hello!";
//document.write("HELLO!");
var port = chrome.extension.connect({
    name: "Communicate"
});

function print_info(tabs_data){
    var initial = "<tr><th>Website</th><th>Time Spent</th></tr>";
    document.getElementById("table").style.width = "100%";
    document.getElementById("table").style.fontSize = "15px";
    document.getElementById("table").insertAdjacentHTML('afterbegin', initial);
    for (id in tabs_data){
        var time = tabs_data[id] / 1000;
        var sec = time%60;
        var min = time/60;
        var hour = time/3600;
        //var content = "<strong>" + id + "</strong>: " + + hour.toFixed(0) + " hours : " + min.toFixed(0) + " mins : " + sec + " secs<br />";

        var content = "<tr><td><strong>" + id + "</strong></td><td>" + hour.toFixed(0) + " hours : " + min.toFixed(0) + " mins : " + sec + " secs" + "</td></tr>";
        document.getElementById("table").insertAdjacentHTML('beforeend', content);
    }
}

port.postMessage("Connected");
port.onMessage.addListener(function(tabs_data){
    print_info(tabs_data);
});
