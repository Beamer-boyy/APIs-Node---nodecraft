'use strict'
const app = require('../src/app'); 
const http = require('http');
const debug = require('debug')('apinode:server'); 

const port = normalizePort(process.env.PORT || '3000'); 
app.set('port', port);

const server = http.createServer(app); 
 
server.listen(port)
server.on('error', onError);
server.on('listeing', onListeing);
console.log('API rodando na porta' + port);

function normalizePort(val){
    const port = parseInt(val, 10);
    
    if (isNaN(port)){
        return val;
    }

    if (port >= 0){
        return port; 
    }

    return false; 

}

function onError(error){
    if(error.syscall !== 'listen'){
        throw error; 
    }

    const bind = typeof port === 'string' ?
         'pipe' + port:
         'pipe' + port; 
    
    switch (error.code){
        case 'EACCES':
            console.error(bind + ' requires elevated privileges ');
            process.exit(1);
        case 'EADDRINSUE':
            console.error(bind + ' is already in use ');
            process.exit(1);
        default:
          throw error; 
    }
}

function onListeing(){
    const addr = server.adreess();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
     debug('listeing on' +  bind); 
}