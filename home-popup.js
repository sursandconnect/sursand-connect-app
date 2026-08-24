
(function(){
 const API='https://script.google.com/macros/s/AKfycbzrDLNOj56LEjyLuf4PJiBsH5s36RgRi6y55NjjVJtxvRjFPUMdcXLsOK4ojNUssdNX/exec';
 const SEEN='scHomeSeen:';
 const AD_INDEX='scHomeAdIndex';

 function first(o,keys){
   for(const k of keys){
     if(o&&o[k]!=null&&String(o[k]).trim())return String(o[k]).trim();
   }
   return '';
 }
 function esc(v){
   return String(v??'').replace(/[&<>"']/g,m=>({
     '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
   }[m]));
 }
 function stamp(o){
   const v=first(o,['Created At','Date','Event Date','Timestamp','Start Date','Published Date']);
   const t=Date.parse(v);
   return isNaN(t)?0:t;
 }
 function key(o,type){
   return SEEN+type+':'+first(o,['ID','Id','id','Title','Event Title','Notification Title','Name'])+':'+stamp(o);
 }
 function closePopup(){
   const x=document.getElementById('scCenterPopup');
   if(x)x.remove();
 }

 function relatedUrl(item,type){
   const direct=first(item,['Target URL','Related URL','More Info Link','Link URL','Link','URL','Registration Link']);
   if(direct)return direct;
   if(type==='welcome')return 'p/change-makers.html';
   if(type==='event'||type==='announcement')return 'p/events.html';
   if(type==='notification')return 'p/notifications.html';
   return '';
 }

 function showPopup(item,type,autoClose){
   closePopup();

   const isWelcome=type==='welcome';
   const isAd=type==='ad';
   const title=first(item,['Title','Event Title','Notification Title','Ad Title','Name'])||
     (isWelcome?'Welcome to Change Makers':'Sursand Connect');
   const desc=first(item,['Description','Details','Message','Content','Summary','Ad Description']);
   const image=first(item,['Image URL','Image','Event Image','Ad Image','Photo URL','Photo']);
   const link=relatedUrl(item,type);

   const wrap=document.createElement('div');
   wrap.id='scCenterPopup';
   wrap.style.cssText=[
     'position:fixed','inset:0','z-index:2100000','display:flex','align-items:center','justify-content:center',
     'padding:16px','background:rgba(15,23,42,.58)'
   ].join(';');

   const height='min(54vh,470px)';
   const width='min(88vw,500px)';

   let content='';
   if(isWelcome){
     content=`<div style="height:100%;display:flex;flex-direction:column;text-align:center">
       <div style="height:32%;min-height:105px;background:linear-gradient(135deg,#ff9d42,#f28c28,#e8740e)"></div>
       <div style="padding:0 20px 18px;flex:1">
        ${image
          ? `<img src="${esc(image)}" alt="" style="width:112px;height:112px;object-fit:cover;border-radius:30px;border:5px solid #fff;box-shadow:0 8px 22px rgba(15,23,42,.18);margin-top:-58px;background:#fff">`
          : `<div style="width:104px;height:104px;border-radius:30px;background:#fff;margin:-54px auto 0;display:flex;align-items:center;justify-content:center;font-size:42px;box-shadow:0 8px 22px rgba(15,23,42,.18)">🌟</div>`}
        <div style="font-size:9px;font-weight:900;color:#238b45;margin-top:10px;letter-spacing:.45px">CHANGE MAKERS COMMUNITY</div>
        <h2 style="margin:7px 0;font-size:20px;color:#263238">${esc(title)}</h2>
        <p style="margin:0;color:#667085;font-size:10px;line-height:1.55">${esc(desc)}</p>
        ${link?`<a href="${esc(link)}" style="margin-top:12px;display:inline-flex;text-decoration:none;background:#238b45;color:#fff;padding:9px 14px;border-radius:11px;font-size:9px;font-weight:900">View Profile</a>`:''}
       </div>
     </div>`;
   }else{
     content=`<div style="height:100%;display:flex;flex-direction:column">
       ${image?`<img src="${esc(image)}" alt="" style="width:100%;height:48%;min-height:130px;object-fit:cover">`:''}
       <div style="padding:16px;overflow:auto;flex:1">
        <h3 style="margin:0 0 7px;font-size:18px;color:#263238">${esc(title)}</h3>
        ${desc?`<p style="margin:0;color:#667085;font-size:10px;line-height:1.6">${esc(desc)}</p>`:''}
        ${link?`<a href="${esc(link)}" style="margin-top:12px;display:inline-flex;text-decoration:none;background:#238b45;color:#fff;padding:9px 13px;border-radius:10px;font-size:9px;font-weight:900">View Details</a>`:''}
       </div>
     </div>`;
   }

   wrap.innerHTML=`<div style="width:${width};height:${height};max-height:75vh;background:#fff;border-radius:24px;overflow:hidden;box-shadow:0 28px 80px rgba(0,0,0,.34);position:relative;border:2px solid #fff">
     <button id="scCenterPopupClose" type="button" aria-label="Close" style="position:absolute;right:10px;top:10px;z-index:5;width:34px;height:34px;border:0;border-radius:50%;background:rgba(15,23,42,.80);color:#fff;font-size:20px;line-height:1">×</button>
     ${content}
   </div>`;

   document.body.appendChild(wrap);
   wrap.querySelector('#scCenterPopupClose').onclick=closePopup;

   // Only ads and welcome banners disappear automatically.
   if(autoClose){
     setTimeout(closePopup,6000);
   }
 }

 async function run(){
   try{
     const r=await fetch(API+'?action=all',{cache:'no-store'});
     const j=await r.json();
     if(!j||!j.success)return;
     const d=j.data||{};

     // 1) Welcome banner — once per published welcome.
     const welcomes=(Array.isArray(d.notifications)?d.notifications:[])
       .filter(n=>String(first(n,['Category','Notification Type','Type'])).toLowerCase()==='change maker welcome')
       .sort((a,b)=>stamp(b)-stamp(a));
     const unseenWelcome=welcomes.find(n=>!localStorage.getItem(key(n,'welcome')));
     if(unseenWelcome){
       localStorage.setItem(key(unseenWelcome,'welcome'),'1');
       showPopup(unseenWelcome,'welcome',true);
       return;
     }

     // 2) Event / Announcement — latest unseen. Does NOT auto-close.
     const events=(Array.isArray(d.events)?d.events:[]).map(x=>({x,type:'event'}));
     const announcements=(Array.isArray(d.announcements)?d.announcements:[]).map(x=>({x,type:'announcement'}));
     const updates=events.concat(announcements).sort((a,b)=>stamp(b.x)-stamp(a.x));
     const unseenUpdate=updates.find(u=>!localStorage.getItem(key(u.x,u.type)));
     if(unseenUpdate){
       localStorage.setItem(key(unseenUpdate.x,unseenUpdate.type),'1');
       showPopup(unseenUpdate.x,unseenUpdate.type,false);
       return;
     }

     // 3) Other active public notifications — only when actually available.
     const notices=(Array.isArray(d.notifications)?d.notifications:[])
       .filter(n=>{
         const cat=String(first(n,['Category','Notification Type','Type'])).toLowerCase();
         return cat!=='change maker welcome' &&
           !['no','false','inactive','disabled','rejected'].includes(String(first(n,['Active','Status'])||'active').toLowerCase());
       })
       .sort((a,b)=>stamp(b)-stamp(a));
     const unseenNotice=notices.find(n=>!localStorage.getItem(key(n,'notification')));
     if(unseenNotice){
       localStorage.setItem(key(unseenNotice,'notification'),'1');
       showPopup(unseenNotice,'notification',false);
       return;
     }

     // 4) Advertisement — rotate one at a time between visits/reloads.
     const ads=(Array.isArray(d.localAds)?d.localAds:[])
       .filter(a=>!['no','false','inactive','disabled','rejected'].includes(String(first(a,['Active','Status'])||'yes').toLowerCase()));
     if(ads.length){
       let i=Number(localStorage.getItem(AD_INDEX)||0);
       if(!Number.isFinite(i)||i<0)i=0;
       const ad=ads[i%ads.length];
       localStorage.setItem(AD_INDEX,String((i+1)%ads.length));
       showPopup(ad,'ad',true);
     }
   }catch(e){}
 }

 if(document.readyState==='loading'){
   document.addEventListener('DOMContentLoaded',()=>setTimeout(run,450));
 }else{
   setTimeout(run,450);
 }
})();
