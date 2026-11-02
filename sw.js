const V="t2t-202611022054";const CORE=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-180.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;
 const net=r.mode==="navigate"||/index\.html$|\/$/.test(new URL(r.url).pathname)?fetch(r,{cache:"no-store"}):fetch(r);
 e.respondWith(net.then(res=>{if(res.ok||res.type==="opaque"){const c=res.clone();caches.open(V).then(ca=>ca.put(r,c))}return res}).catch(()=>caches.match(r).then(m=>m||caches.match("index.html"))))});
