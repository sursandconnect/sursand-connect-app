(function(){
 function clean(m){m=String(m==null?'':m);if(/github(?:\.io)?/i.test(m)||/app\.sursandconnect\.in/i.test(m))return 'Sursand Connect is temporarily unavailable. Please try again.';return m}
 function ensure(){let x=document.getElementById('scGlobalMessage');if(x)return x;x=document.createElement('div');x.id='scGlobalMessage';x.innerHTML='<div class="scgm-card"><div id="scgmText"></div><button id="scgmOk">OK</button></div>';document.body.appendChild(x);document.getElementById('scgmOk').onclick=()=>x.classList.remove('show');return x}
 window.scMessage=function(m,ok){let x=ensure();document.getElementById('scgmText').textContent=clean(m)||'Done.';x.classList.add('show');clearTimeout(window.__scgm);if(ok)window.__scgm=setTimeout(()=>{x.classList.remove('show');ok()},850)};
 window.alert=function(m){window.scMessage(m)};
 window.scConfirm=function(m){return new Promise(resolve=>{let old=document.getElementById('scGlobalConfirm');if(old)old.remove();let x=document.createElement('div');x.id='scGlobalConfirm';x.innerHTML='<div class="scgm-card"><div>'+clean(m)+'</div><div style="display:flex;justify-content:center;gap:8px;margin-top:16px"><button id="scgcNo" style="background:#eef2f0;color:#263238;margin:0">Cancel</button><button id="scgcYes" style="margin:0">Confirm</button></div></div>';x.style.cssText='display:flex;position:fixed;inset:0;z-index:2147483647;background:rgba(15,23,42,.55);align-items:center;justify-content:center;padding:18px';document.body.appendChild(x);x.querySelector('#scgcNo').onclick=()=>{x.remove();resolve(false)};x.querySelector('#scgcYes').onclick=()=>{x.remove();resolve(true)}})};
 document.addEventListener('reset',e=>{if(e.target&&e.target.tagName==='FORM'&&location.pathname.includes('/p/')&&!/account|admin/i.test(location.pathname))setTimeout(()=>window.scSuccessHome('Submitted successfully.'),180)});

 window.scSuccessHome=function(m){window.scMessage(m||'Saved successfully.',()=>{location.href=location.pathname.includes('/p/')?'../index.html':'index.html'})};
 const st=document.createElement('style');st.textContent='#scGlobalMessage{display:none;position:fixed;inset:0;z-index:2147483647;background:rgba(15,23,42,.55);align-items:center;justify-content:center;padding:18px}#scGlobalMessage.show{display:flex}.scgm-card{width:min(90vw,420px);background:#fff;color:#1f2937;border-radius:20px;padding:22px;text-align:center;box-shadow:0 25px 70px rgba(0,0,0,.3);font:800 14px/1.55 Arial,sans-serif}.scgm-card button{display:block;margin:17px auto 0;border:0;border-radius:12px;background:#238b45;color:#fff;padding:10px 24px;font-weight:900}';document.head.appendChild(st);
})();

(function(){
  function scSanitizeMessage(m){
    m=String(m==null?'':m);
    if(/github(?:\.io)?|app\.sursandconnect\.in/i.test(m)) return 'Sursand Connect is temporarily unavailable. Please try again.';
    return m;
  }
  function scEnsureDialog(){
    let el=document.getElementById('scV17Message');
    if(el)return el;
    el=document.createElement('div');
    el.id='scV17Message';
    el.innerHTML='<div class="sc-v17-msg-card"><div id="scV17MessageText"></div><button id="scV17MessageOk">OK</button></div>';
    document.body.appendChild(el);
    document.getElementById('scV17MessageOk').onclick=()=>el.classList.remove('show');
    return el;
  }
  window.scMessage=function(m,after){
    const el=scEnsureDialog();
    document.getElementById('scV17MessageText').textContent=scSanitizeMessage(m)||'Done.';
    el.classList.add('show');
    if(after){clearTimeout(window.__scV17MsgTimer);window.__scV17MsgTimer=setTimeout(()=>{el.classList.remove('show');after()},900)}
  };
  window.alert=function(m){window.scMessage(m)};
  // Prevent browser-native prompt/confirm boxes from exposing the hosting origin.
  window.confirm=function(m){window.scMessage(m);return false};
  window.prompt=function(){window.scMessage('Please use the in-app selection controls.');return null};
  const st=document.createElement('style');
  st.textContent='#scV17Message{display:none;position:fixed;inset:0;z-index:2147483647;background:rgba(15,23,42,.55);align-items:center;justify-content:center;padding:18px}#scV17Message.show{display:flex}.sc-v17-msg-card{width:min(90vw,430px);background:#fff;color:#18212b;border-radius:22px;padding:24px 20px;text-align:center;box-shadow:0 28px 75px rgba(0,0,0,.3);font:900 15px/1.55 Arial,sans-serif}.sc-v17-msg-card button{display:block;margin:18px auto 0;border:0;border-radius:12px;background:#238b45;color:white;padding:11px 25px;font-weight:900}';
  document.head.appendChild(st);
})();
