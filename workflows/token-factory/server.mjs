import http from 'node:http';
import {mkdir,readFile} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {timingSafeEqual} from 'node:crypto';
import {Store,dayKey} from './store.mjs';
import {startRunner} from './runner.mjs';
import {strategy} from './strategy.mjs';
const here=dirname(fileURLToPath(import.meta.url)),mode=process.env.JRA_MODE||'demo';
if(!['demo','measured'].includes(mode))throw Error('JRA_MODE must be demo or measured');
const port=Number(process.env.PORT||8789),host=process.env.JRA_BIND||'127.0.0.1';
const data=resolve(process.env.JRA_DATA_DIR||resolve(here,'data'));await mkdir(data,{recursive:true});const store=new Store(resolve(data,mode+'-meters.sqlite'));
const token=process.env.JRA_INGEST_TOKEN||'';
if(mode==='measured'&&token.length<24)throw Error('Set JRA_INGEST_TOKEN to at least 24 characters before measured mode');
const adapter=process.env.JRA_ADAPTER?(await import(pathToFileURL(resolve(process.env.JRA_ADAPTER)).href)).execute:null;
const options=process.env.JRA_CONFIG?JSON.parse(await readFile(process.env.JRA_CONFIG,'utf8')):{};
strategy(options.config||{},options.benchmarks||[]);
const runner=startRunner(store,{mode,adapter,config:options.config||{},benchmarks:options.benchmarks||[],autoDirectives:process.env.JRA_DAILY_DIRECTIVES==='1',maxTaskCHF:Number(process.env.JRA_MAX_TASK_CHF||1),maxDayCHF:Number(process.env.JRA_MAX_DAY_CHF||20)});
const allowed=new Map([['/','index.html'],['/index.html','index.html'],['/app.mjs','app.mjs'],['/model.mjs','model.mjs'],['/i18n.mjs','i18n.mjs'],['/style.css','style.css']]);
const mime={html:'text/html; charset=utf-8',mjs:'text/javascript; charset=utf-8',css:'text/css; charset=utf-8'};
function auth(req){const a=Buffer.from(req.headers.authorization||''),b=Buffer.from('Bearer '+token);return token.length>=24&&a.length===b.length&&timingSafeEqual(a,b);}
const server=http.createServer(async(req,res)=>{
  res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Cache-Control','no-store');res.setHeader('Content-Security-Policy',"default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'self'; connect-src 'self'; img-src 'self' data:; frame-ancestors 'none'");
  const send=(code,obj)=>{res.writeHead(code,{'Content-Type':'application/json'});res.end(JSON.stringify(obj));};
  // Local-only UI, including Docker port published on 127.0.0.1. No CORS wildcard.
  if(!['127.0.0.1','localhost','[::1]'].some(h=>req.headers.host===h+':'+port))return send(403,{error:'Local host only'});
  const path=new URL(req.url,'http://localhost').pathname;
  try{
    if(req.method==='GET'&&path==='/api/events')return send(200,{mode,events:store.events(),window:'latest 2000 completed events'});
    if(req.method==='GET'&&path==='/api/reports')return send(200,store.db.prepare('SELECT data FROM reports ORDER BY day DESC LIMIT 30').all().map(r=>JSON.parse(r.data)));
    if(req.method==='GET'&&path==='/api/report')return send(200,{...store.daily(dayKey()),strategy:strategy(options.config||{},options.benchmarks||[])});
    if(req.method==='POST'&&['/api/events','/api/tasks'].includes(path)){
      if(mode!=='measured'||!auth(req))return send(401,{error:'Authenticated measured mode required'});
      let body='',size=0;for await(const chunk of req){size+=chunk.length;if(size>65536)return send(413,{error:'Maximum 64 KiB'});body+=chunk.toString();}
      const value=JSON.parse(body);const created=path==='/api/events'?store.addEvent(value):store.enqueue(value);return send(created?201:200,{created});
    }
    if(req.method==='GET'&&allowed.has(path)){const file=allowed.get(path);res.setHeader('Content-Type',mime[file.split('.').at(-1)]);res.end(await readFile(resolve(here,'web',file)));return;}
    send(404,{error:'Not found'});
  }catch(e){send(400,{error:e.message});}
});
server.listen(port,host,()=>console.log(`JRA Token Factory (${mode}): http://localhost:${port}`));
async function stop(){runner.stop();server.close();while(runner.busy)await new Promise(r=>setTimeout(r,20));store.saveReport(dayKey());store.close();process.exit(0);}
process.once('SIGINT',stop);process.once('SIGTERM',stop);
