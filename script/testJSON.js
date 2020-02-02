var http = require('http');

const PORT=8081;

function handleRequest(request, response){
    var body = [];
    request.on('error', function(err) {
        console.error(err);
    }).on('data', function(chunk) {
        body.push(chunk);
    }).on('end', function() {
        body = Buffer.concat(body).toString();
        try {
            var jsonObj = JSON.parse(body);
            console.log(jsonObj.var1);
            console.log(jsonObj.var2);
        } catch (e) {
            console.error(e);
        }

        response.on('error', function(err) {
            console.error(err);
        });

        response.writeHead(200);
        response.end();
    });
}

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});