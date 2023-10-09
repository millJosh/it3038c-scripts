var http = require("http");
var fs = require("fs");
var os = require("os");
var ip = require('ip');

http.createServer(function(req, res){

    if (req.url === "/") {
        fs.readFile("./public/index.html", "UTF-8", function(err, body){
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(body);
    });
}
    else if(req.url.match("/sysinfo")) {
        myHostName=os.hostname();
	serverUptime = formatUptime(os.uptime());
	totalMemory = formatBytes(os.totalmem());
	freeMemory = formatBytes(os.freemem());
	numCPUs = os.cpus().length;

        html=`    
        <!DOCTYPE html>
        <html>
          <head>
            <title>Node JS Response</title>
          </head>
          <body>
            <p>Hostname: ${myHostName}</p>
            <p>IP: ${ip.address()}</p>
            <p>Server Uptime: ${serverUptime}</p>
            <p>Total Memory: ${totalMemory}</p>
            <p>Free Memory: ${freeMemory}</p>
            <p>CPUs: ${numCPUs}</p>            
          </body>
        </html>` 
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(html);
    }
    else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end(`404 File Not Found at ${req.url}`);
    }
}).listen(3000);

console.log("Server listening on port 3000");

function formatUptime(uptime){
	days = Math.floor(uptime / 86400);
	hours = Math.floor(uptime / 3600);
	minutes = Math.floor((uptime % 3600) / 60);
	seconds = Math.floor(uptime % 60);
	return `Days: ${days}, Hours: ${hours}, Minutes: ${minutes}, Seconds: ${seconds}`;
}

function formatBytes(bytes) {
	size = ["MB"];
	megabytes = (bytes / (1024 * 1024)).toFixed(2);
	return megabytes + " " + size;	
}
