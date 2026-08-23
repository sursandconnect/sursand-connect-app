
(function(){
 const API='https://script.google.com/macros/s/AKfycbzrDLNOj56LEjyLuf4PJiBsH5s36RgRi6y55NjjVJtxvRjFPUMdcXLsOK4ojNUssdNX/exec',SEEN='scSeenUpdate:',PUSHED='scPhoneNotified:';
 let latest=[];

 function first(o,ks){for(const k of ks){if(o&&o[k]!=null&&String(o[k]).trim())return String(o[k]).trim()}return''}
 function stamp(o){const t=Date.parse(first(o,['Date','Event Date','Created At','Timestamp','Start Date']));return isNaN(t)?0:t}
 function id(o,type){return type+':'+first(o,['ID','Id','id','Title','Event Title','Name'])+':'+stamp(o)}
 function bellDots(show){document.querySelectorAll('.sc-bell-dot').forEach(d=>d.style.display=show?'block':'none')}
 function markSeen(){latest.forEach(u=>localStorage.setItem(SEEN+id(u.x,u.type),'1'));bellDots(false)}
 async function sendPhone(u){
   const key=PUSHED+id(u.x,u.type);if(localStorage.getItem(key)||Notification.permission!=='granted')return;
   localStorage.setItem(key,'1');
   const title=first(u.x,['Title','Event Title','Notification Title','Name'])||(u.type==='event'?'New Event':'New Announcement');
   const body=first(u.x,['Description','Details','Message','Summary','Content']).slice(0,160);
   try{
     const reg=await navigator.serviceWorker.ready;
     await reg.showNotification(title,{body,icon:'../icon-192.png',badge:'../icon-192.png',tag:key,data:{url:location.pathname.includes('/p/')?'events.html':'p/events.html'}});
   }catch(e){try{new Notification(title,{body,tag:key})}catch(_e){}}
 }
 async function check(){
   try{
     const r=await fetch(API+'?action=all');const j=await r.json();if(!j||!j.success)return;
     const d=j.data||{};
     latest=[...(Array.isArray(d.events)?d.events:[]).map(x=>({x,type:'event'})),...(Array.isArray(d.announcements)?d.announcements:[]).map(x=>({x,type:'announcement'}))].sort((a,b)=>stamp(b.x)-stamp(a.x));
     const unseen=latest.filter(u=>!localStorage.getItem(SEEN+id(u.x,u.type)));
     bellDots(unseen.length>0);
     if(unseen.length)sendPhone(unseen[0]);
   }catch(e){bellDots(false)}
 }
 function hookBell(){
   document.querySelectorAll('a[href$="notifications.html"]').forEach(a=>a.addEventListener('click',async()=>{
     if('Notification'in window&&Notification.permission==='default'){try{await Notification.requestPermission()}catch(e){}}
     markSeen();
   }));
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{hookBell();check()});else{hookBell();check()}
 window.addEventListener('online',check);
 window.SCNotificationCheck=check;
})();
