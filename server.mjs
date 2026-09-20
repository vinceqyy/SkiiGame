import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.txt':'text/plain','.mp3':'audio/mpeg','.png':'image/png'};
http.createServer((req,res)=>{let p;try{p=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));}catch{res.writeHead(400).end();return;}if(p===root)p=path.join(root,'index.html');if(!p.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(p,(e,b)=>{if(e){res.writeHead(404).end('Not found');return;}res.writeHead(200,{'Content-Type':types[path.extname(p)]||'application/octet-stream'});res.end(b);});}).listen(5173,'127.0.0.1',()=>console.log('Powder Ridge: http://127.0.0.1:5173'));
