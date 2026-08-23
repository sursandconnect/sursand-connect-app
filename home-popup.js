
(function(){
 const API='https://script.google.com/macros/s/AKfycbzrDLNOj56LEjyLuf4PJiBsH5s36RgRi6y55NjjVJtxvRjFPUMdcXLsOK4ojNUssdNX/exec';
 const SEEN_PREFIX='scSeenUpdate:';

 function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
 function first(o,keys){for(const k of keys){if(o&&o[k]!=null&&String(o[k]).trim())return String(o[k]).trim()}return''}
 function stamp(o){const v=first(o,['Date','Event Date','Created At','Timestamp','Start Date']);const t=Date.parse(v);return isNaN(t)?0:t}
 function idFor(o,type){return type+':'+first(o,['ID','Id','id','Title','Event Title','Notification Title','Name'])+':'+stamp(o)}

 function modal(item,type){
   const wrap=document.createElement('div');wrap.id='scHomePopup';
   wrap.style.cssText='position:fixed;inset:0;background:rgba(15,23,42,.58);z-index:2000000;display:flex;align-items:center;justify-content:center;padding:18px';
   const title=first(item,['Title','Event Title','Notification Title','Ad Title','Name'])||(type==='ad'?'Local Advertisement':'Latest Update');
   const desc=first(item,['Description','Details','Message','Content','Summary','Ad Description']);
   const image=first(item,['Image URL','Image','Event Image','Ad Image','imageUrl']);
   const link=first(item,['Link URL','URL','Website','Facebook URL']);
   const badge=type==='ad'?'Advertisement':(type==='announcement'?'Announcement':'Event');
   wrap.innerHTML=`<div style="width:min(92vw,440px);background:#fff;border-radius:22px;overflow:hidden;box-shadow:0 25px 70px rgba(0,0,0,.3);position:relative;border:2px solid #fff">
    <button id="scPopupClose" style="position:absolute;right:10px;top:10px;z-index:3;width:34px;height:34px;border:0;border-radius:50%;background:rgba(15,23,42,.78);color:#fff;font-size:20px;line-height:1">×</button>
    ${image?`<img src="${esc(image)}" alt="" style="width:100%;height:190px;object-fit:cover;display:block">`:''}
    <div style="padding:16px">
      <span style="display:inline-block;background:#fff0dd;color:#c86508;padding:5px 8px;border-radius:999px;font-size:9px;font-weight:900">${badge}</span>
      <h3 style="margin:9px 0 6px;font-size:17px;color:#263238">${esc(title)}</h3>
      ${desc?`<p style="margin:0;color:#667085;font-size:10px;line-height:1.55">${esc(desc)}</p>`:''}
      ${link?`<a href="${esc(link)}" target="_blank" rel="noopener" style="margin-top:11px;display:inline-flex;text-decoration:none;background:#238b45;color:#fff;padding:9px 12px;border-radius:10px;font-size:9px;font-weight:900">View Details</a>`:''}
    </div></div>`;
   document.body.appendChild(wrap);
   function close(){wrap.remove()}
   wrap.querySelector('#scPopupClose').onclick=close;
   wrap.addEventListener('click',e=>{if(e.target===wrap)close()});
   setTimeout(close,5000);
 }

 async function run(){
   try{
     const r=await fetch(API+'?action=all');const j=await r.json();if(!j||!j.success)return;
     const d=j.data||{};
     const announcements=(Array.isArray(d.announcements)?d.announcements:[]).map(x=>({x,type:'announcement'}));
     const events=(Array.isArray(d.events)?d.events:[]).map(x=>({x,type:'event'}));
     const updates=announcements.concat(events).sort((a,b)=>stamp(b.x)-stamp(a.x));
     const unseen=updates.find(u=>!localStorage.getItem(SEEN_PREFIX+idFor(u.x,u.type)));
     if(unseen){
       localStorage.setItem(SEEN_PREFIX+idFor(unseen.x,unseen.type),'1');
       modal(unseen.x,unseen.type);return;
     }
     const ads=(Array.isArray(d.localAds)?d.localAds:[]).filter(a=>{
       const active=String(first(a,['Active','Status'])||'yes').toLowerCase();
       return !['no','false','inactive','disabled','rejected'].includes(active);
     });
     if(ads.length)modal(ads[Math.floor(Math.random()*ads.length)],'ad');
   }catch(e){}
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(run,500));else setTimeout(run,500);
})();
