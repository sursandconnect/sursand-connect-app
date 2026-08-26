(function(){
  const API="https://script.google.com/macros/s/AKfycbzrDLNOj56LEjyLuf4PJiBsH5s36RgRi6y55NjjVJtxvRjFPUMdcXLsOK4ojNUssdNX/exec";
  const SEEN="scPopupSeen:";
  const AD_INDEX="scAdRotationIndex";

  const val=(o,keys)=>{
    for(const k of keys){
      if(o&&o[k]!=null&&String(o[k]).trim()) return String(o[k]).trim();
    }
    return "";
  };
  const esc=s=>String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const image=o=>window.scRecordImage?window.scRecordImage(o):val(o,["Image URL","Image","Event Image","Ad Image","Photo URL","Photo"]);
  const stamp=o=>{const n=Date.parse(val(o,["Created At","Start Date","Event Date","Date","Timestamp"]));return isNaN(n)?0:n};
  const id=(o,type)=>SEEN+type+":"+val(o,["ID","Id","id","Notification Title","Event Title","Title","Name"])+":"+stamp(o);

  function active(o){
    const end=val(o,["End Date"]);
    if(!end)return true;
    const d=new Date(end);
    if(isNaN(d))return true;
    d.setHours(23,59,59,999);
    return d>=new Date();
  }

  function destination(o,type){
    const direct=val(o,["Related Page","Target URL","Related URL","More Info Link","Link URL","Link","URL","Registration Link"]);
    if(direct)return direct;
    if(type==="welcome")return "p/change-makers.html";
    if(type==="event"||type==="announcement")return "p/events.html";
    return "p/notifications.html";
  }

  function removePopup(){
    document.getElementById("scV12Popup")?.remove();
  }

  function show(o,type,autoClose){
    if(!o||!active(o))return;
    removePopup();

    const title=val(o,["Notification Title","Event Title","Title","Ad Title","Name"])||(type==="welcome"?"Welcome to Change Makers":"Sursand Connect");
    const desc=val(o,["Description","Details","Message","Content","Summary","Ad Description"]);
    const img=image(o);
    const link=destination(o,type);
    const sd=val(o,["Start Date","Event Date","Date"]);
    const ed=val(o,["End Date"]);
    const st=val(o,["Start Time","Event Time","Time"]);
    const et=val(o,["End Time"]);

    let meta=[];
    if(sd)meta.push("📅 <b>Start:</b> "+esc(sd)+(st?" • "+esc(st):""));
    if(ed)meta.push("🏁 <b>End:</b> "+esc(ed)+(et?" • "+esc(et):""));

    const wrap=document.createElement("div");
    wrap.id="scV12Popup";
    wrap.innerHTML=
      '<div class="sc-v12-pop-card">'+
        '<button class="sc-v12-pop-close" aria-label="Close">×</button>'+
        (img?'<img class="sc-v12-pop-image" src="'+esc(img)+'" alt="">':'')+
        '<div class="sc-v12-pop-body">'+
          '<span class="sc-v12-pop-kind">'+esc(type==="welcome"?"Community Welcome":type==="event"?"Event":type==="announcement"?"Announcement":type==="ad"?"Advertisement":"Update")+'</span>'+
          '<h2>'+esc(title)+'</h2>'+
          (meta.length?'<div class="sc-v12-pop-meta">'+meta.join("<br>")+'</div>':'')+
          (desc?'<div class="sc-v12-pop-desc">'+esc(desc).replace(/\\n/g,"<br>")+'</div>':'')+
          (link?'<a class="sc-v12-pop-view" href="'+esc(link)+'">View Full Details</a>':'')+
        '</div>'+
      '</div>';

    document.body.appendChild(wrap);
    wrap.querySelector(".sc-v12-pop-close").onclick=removePopup;
    if(autoClose)setTimeout(removePopup,6000);
  }

  const style=document.createElement("style");
  style.textContent=`
    #scV12Popup{position:fixed;inset:0;z-index:2200000;background:rgba(15,23,42,.60);display:flex;align-items:center;justify-content:center;padding:16px}
    .sc-v12-pop-card{width:min(92vw,520px);max-height:78vh;overflow:auto;background:#fff;border-radius:23px;box-shadow:0 28px 80px rgba(0,0,0,.34);position:relative}
    .sc-v12-pop-close{position:absolute;right:9px;top:9px;z-index:3;width:34px;height:34px;border:0;border-radius:50%;background:rgba(15,23,42,.82);color:#fff;font-size:21px}
    .sc-v12-pop-image{width:100%;height:230px;object-fit:cover;display:block}
    .sc-v12-pop-body{padding:16px}
    .sc-v12-pop-kind{display:inline-block;background:#fff0dd;color:#b45309;border-radius:999px;padding:5px 8px;font-size:8px;font-weight:900}
    .sc-v12-pop-body h2{font-size:19px;margin:9px 0 7px}
    .sc-v12-pop-meta{padding:9px;background:#f8fafc;border-radius:11px;font-size:9px;line-height:1.6;margin-bottom:9px}
    .sc-v12-pop-desc{font-size:10px;line-height:1.65;color:#475569}
    .sc-v12-pop-view{display:inline-flex;margin-top:12px;padding:10px 13px;border-radius:11px;background:#238b45;color:#fff;text-decoration:none;font-size:9px;font-weight:900}
  `;
  document.head.appendChild(style);

  async function run(){
    try{
      const res=await fetch(API+"?action=all&_="+Date.now(),{cache:"no-store"});
      const json=await res.json();
      if(!json||!json.success)return;
      const d=json.data||{};

      const welcomes=(d.notifications||[])
        .filter(x=>/change maker welcome/i.test(val(x,["Category","Notification Type","Type"]))&&active(x))
        .sort((a,b)=>stamp(b)-stamp(a));
      let one=welcomes.find(o=>!localStorage.getItem(id(o,"welcome")));
      if(one){
        localStorage.setItem(id(one,"welcome"),"1");
        show(one,"welcome",true);
        return;
      }

      const updates=[
        ...(d.events||[]).map(x=>({x,t:"event"})),
        ...(d.announcements||[]).map(x=>({x,t:"announcement"}))
      ].filter(v=>active(v.x)).sort((a,b)=>stamp(b.x)-stamp(a.x));
      const u=updates.find(v=>!localStorage.getItem(id(v.x,v.t)));
      if(u){
        localStorage.setItem(id(u.x,u.t),"1");
        show(u.x,u.t,false);
        return;
      }

      const notices=(d.notifications||[])
        .filter(x=>active(x)&&!/change maker welcome/i.test(val(x,["Category","Notification Type","Type"])))
        .sort((a,b)=>stamp(b)-stamp(a));
      one=notices.find(o=>!localStorage.getItem(id(o,"notification")));
      if(one){
        localStorage.setItem(id(one,"notification"),"1");
        show(one,"notification",false);
        return;
      }

      const ads=(d.localAds||[]).filter(active);
      if(ads.length){
        let i=Number(localStorage.getItem(AD_INDEX)||0);
        show(ads[i%ads.length],"ad",true);
        localStorage.setItem(AD_INDEX,String((i+1)%ads.length));
      }
    }catch(e){}
  }

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>setTimeout(run,400));
  else setTimeout(run,400);
})();