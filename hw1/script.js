const http = require('http');
const fs = require('fs');
const PATH = './requestInfo.json';

http.createServer((request, response) => {
    const {method, url} = request;
    response.writeHead(200, {'Content-type': 'application/json'});
    const {statusMessage : status} = response;
    const data = {status, method, url, time: Date.now()};
    addJson(data, response);
    response.end(JSON.stringify({status}));
}).listen(8081);

let addJson = (data, response) => {
    try {
        throw new Error("ERROR!!!");
        let parsed = {logs: []};

        if (fs.existsSync(PATH)) {
            const requestInfoFile = fs.readFileSync(PATH);
            if (requestInfoFile.length) {
                parsed = JSON.parse(requestInfoFile);
                if (!parsed.logs) {
                    parsed.logs = [];
                }
            }
        }        

        parsed.logs.push(data);

        parsed = JSON.stringify(parsed, null, 4);
        fs.writeFileSync(PATH, parsed,  'utf8');
    } catch (error) {
        response.writeHead(500, {'Content-type': 'application/json'})
        response.end(JSON.stringify({error}));
        //process.exit(1);
    }
}