// Service worker v1.11: apre subito la versione salvata e controlla gli aggiornamenti in background.
// Il banner "Nuova versione" compare confrontando version.json (mai in cache) con la versione in uso.
const C='osm';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
if(r.method!=='GET'||u.origin!==location.origin||u.pathname.endsWith('version.json'))return;
e.respondWith((async()=>{const c=await caches.open(C),hit=await c.match(r);
const net=fetch(r,{cache:'no-cache'}).then(x=>{if(x.ok)c.put(r,x.clone());return x}).catch(()=>hit);
e.waitUntil(net);return hit||net})())});
