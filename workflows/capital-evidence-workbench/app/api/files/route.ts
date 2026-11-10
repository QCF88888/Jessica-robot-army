import {env} from 'cloudflare:workers';
import {getDb} from '../../../db';
import {attachments} from '../../../db/schema';
export async function GET(){return Response.json(await getDb().select().from(attachments));}
export async function POST(req:Request){
 const form=await req.formData(); const file=form.get('file'); if(!(file instanceof File)||!file.size||file.size>20*1024*1024)return Response.json({error:'File must be 1 byte–20 MB'},{status:400});
 const allowed=['application/pdf','video/mp4','image/png','image/jpeg','text/plain','application/vnd.openxmlformats-officedocument.wordprocessingml.document'];if(!allowed.includes(file.type))return Response.json({error:'Supported: PDF, MP4, PNG, JPG, TXT, DOCX'},{status:400});
 const bytes=await file.arrayBuffer();const sha=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))).map(x=>x.toString(16).padStart(2,'0')).join('');const id=crypto.randomUUID();const name=file.name.replace(/[\r\n"\\/]/g,'_').slice(0,180);const item={id,name,mime:file.type,size:file.size,sha,source:String(form.get('source')||'User upload · submission equivalence unverified').slice(0,1500),created:new Date().toISOString(),version:String(form.get('version')||'unverified').slice(0,100)};
 await env.BUCKET.put(id,bytes,{httpMetadata:{contentType:file.type}});try{await getDb().insert(attachments).values(item)}catch(e){await env.BUCKET.delete(id);throw e}return Response.json(item);
}
