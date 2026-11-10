import { getDb } from '../../../db';
import { workspace } from '../../../db/schema';
import { eq, and } from 'drizzle-orm';
export async function GET(){ const rows=await getDb().select().from(workspace).where(eq(workspace.id,'yc')); return Response.json(rows[0]||{data:null,revision:0}); }
export async function PUT(req:Request){ const body=await req.json(); if(!body.data||JSON.stringify(body.data).length>1500000)return Response.json({error:'记录无效或过大'},{status:400}); const db=getDb(); const json=JSON.stringify(body.data); if(body.revision===0){try{await db.insert(workspace).values({id:'yc',data:json,revision:1});}catch{return Response.json({error:'记录已更新，请刷新后重试'},{status:409});}}else{const out=await db.update(workspace).set({data:json,revision:body.revision+1}).where(and(eq(workspace.id,'yc'),eq(workspace.revision,body.revision))).returning();if(!out.length)return Response.json({error:'记录已更新，请刷新后重试'},{status:409});}return Response.json({revision:body.revision+1}); }
