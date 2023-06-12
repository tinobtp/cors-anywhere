var fs = require('fs');

var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 8443;

var cors_proxy = require('./lib/cors-anywhere');
cors_proxy.createServer({
    httpsOptions: {
        key: fs.readFileSync('/etc/letsencrypt/live/connectwithbao.io/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/connectwithbao.io/fullchain.pem')
    },
    originWhitelist: ["https://www.somesite.com", "https://www.google.com"], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2'],
    checkRateLimit: "1 100 www.somesite.com"
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});
