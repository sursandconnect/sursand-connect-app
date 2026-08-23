
(function(){
  const USER_TOKEN='scUserSessionToken';
  const USER_PROFILE='scUserProfile';
  const ADMIN_TOKEN='scAdminSessionToken';
  const ADMIN_EXP='scAdminSessionExpiresAt';

  function jsonGet(key){
    try{const v=localStorage.getItem(key);return v?JSON.parse(v):null}catch(e){return null}
  }
  function adminActive(){
    const token=localStorage.getItem(ADMIN_TOKEN)||'';
    const exp=Number(localStorage.getItem(ADMIN_EXP)||0);
    if(!token)return false;
    if(exp && Date.now()>exp){
      localStorage.removeItem(ADMIN_TOKEN);
      localStorage.removeItem(ADMIN_EXP);
      return false;
    }
    return true;
  }
  function userActive(){return !!localStorage.getItem(USER_TOKEN)}
  function profile(){return jsonGet(USER_PROFILE)}
  function initials(name){
    const p=String(name||'').trim().split(/\s+/).filter(Boolean);
    return p.length?p.slice(0,2).map(x=>x[0]).join('').toUpperCase():'👤';
  }
  function pagePrefix(){return location.pathname.includes('/p/')?'':'p/'}

  function styleHeaderButton(a){
    a.style.cssText='min-width:38px;height:38px;padding:0 9px;border-radius:14px;border:1px solid #f2d1ac;background:linear-gradient(145deg,#fffaf5,#fff0dd);color:#c86508;display:flex;align-items:center;justify-content:center;text-decoration:none;font-weight:900;font-size:10px;box-shadow:0 5px 14px rgba(200,101,8,.12);white-space:nowrap';
  }

  function renderHeaderAccount(){
    const box=document.querySelector('.sc-appbar-actions,.sc-actions,.bar .sc-actions');
    if(!box)return;
    const old=document.getElementById('scHeaderAccount');if(old)old.remove();

    const a=document.createElement('a');
    a.id='scHeaderAccount';
    styleHeaderButton(a);

    if(adminActive()){
      a.href=pagePrefix()+'admin.html';
      a.title='Admin Profile';
      a.setAttribute('aria-label','Admin Profile');
      a.textContent='🛡️';
      a.style.width='38px';a.style.minWidth='38px';a.style.padding='0';
      a.style.borderRadius='50%';a.style.background='linear-gradient(145deg,#334155,#111827)';
      a.style.color='#fff';a.style.border='2px solid #fff';a.style.boxShadow='0 0 0 1px #334155,0 5px 14px rgba(15,23,42,.24)';
    } else if(userActive()){
      const p=profile();
      a.href=pagePrefix()+'account.html';
      a.title='My Profile';a.setAttribute('aria-label','My Profile');
      a.textContent=initials(p&&p.name);
      a.style.width='38px';a.style.minWidth='38px';a.style.padding='0';
      a.style.borderRadius='50%';a.style.background='linear-gradient(145deg,#238b45,#176b35)';
      a.style.color='#fff';a.style.border='2px solid #fff';a.style.boxShadow='0 0 0 1px #238b45,0 5px 14px rgba(35,139,69,.22)';
    } else {
      a.href=pagePrefix()+'account.html';
      a.title='Login / Sign Up';a.setAttribute('aria-label','Login / Sign Up');
      a.textContent='Login';
    }

    const back=box.querySelector('.sc-back,.sc-pretty-back,button[aria-label="Back"]');
    if(back)box.insertBefore(a,back);else box.appendChild(a);
  }

  function renderAdminMenu(){
    const menuGrid=document.querySelector('.menu-grid');
    if(!menuGrid)return;
    let item=document.getElementById('scAdminMenuCard');
    if(!adminActive()){
      if(item)item.remove();
      return;
    }
    if(item)return;
    item=document.createElement('a');
    item.id='scAdminMenuCard';
    item.className='menu-card';
    item.href='p/admin.html';
    item.innerHTML='<span>🛡️</span><i style="font-style:normal">Admin Panel</i>';
    menuGrid.insertBefore(item,menuGrid.firstChild);
  }

  function normalizeWard(v){return String(v||'').replace(/\D/g,'')}
  function trySet(el,value){
    if(!el||value===undefined||value===null||String(value).trim()==='')return;
    if(String(el.value||'').trim()!=='')return;
    if(el.tagName==='SELECT'){
      const wanted=String(value).trim().toLowerCase(), w=normalizeWard(value);
      const opt=[...el.options].find(o=>String(o.value).trim().toLowerCase()===wanted)||[...el.options].find(o=>w&&normalizeWard(o.value||o.textContent)===w);
      if(opt){el.value=opt.value;el.dispatchEvent(new Event('change',{bubbles:true}))}
    } else {
      el.value=String(value);
      el.dispatchEvent(new Event('input',{bubbles:true}));
      el.dispatchEvent(new Event('change',{bubbles:true}));
    }
  }
  function fieldMeta(el){
    const parts=[el.id,el.name,el.placeholder].map(v=>String(v||'').toLowerCase());
    let label='';
    if(el.id){try{const l=document.querySelector('label[for="'+CSS.escape(el.id)+'"]');if(l)label=l.textContent}catch(e){}}
    if(!label){
      const p=el.closest('.field,.sc-cm-field,.sc-svc-field,.sc-br-field,.sc-health-field,.sc-contact-field,.sc-charity-field,.sc-form-field');
      const l=p&&p.querySelector('label');if(l)label=l.textContent;
    }
    parts.push(String(label||'').toLowerCase());
    return parts.join(' ');
  }
  function autofill(root=document){
    if(!userActive()||adminActive())return;
    const p=profile();if(!p)return;
    const fields=root.querySelectorAll?root.querySelectorAll('input,select,textarea'):[];
    fields.forEach(el=>{
      const type=String(el.type||'').toLowerCase();
      if(['password','file','hidden','checkbox','radio','submit','button'].includes(type))return;
      const m=fieldMeta(el);
      if(/\b(full ?name|your ?name|customer ?name|donor ?name|citizen name|contact person|name)\b/.test(m)){trySet(el,p.name);return}
      if(/\b(mobile|phone|contact number|whatsapp number)\b/.test(m)){trySet(el,p.mobile);return}
      if(/\bemail\b/.test(m)){trySet(el,p.email);return}
      if(/\bward\b/.test(m)){trySet(el,p.ward);return}
      if(/\b(address|pickup address|your address)\b/.test(m)){trySet(el,p.address);return}
      if(/\blandmark\b/.test(m)){trySet(el,p.landmark)}
    });
  }

  function init(){
    renderHeaderAccount();
    renderAdminMenu();
    autofill(document);
    new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1)autofill(n)}))).observe(document.body,{childList:true,subtree:true});
  }

  window.SCAccountUI={
    refresh:init,
    autofill,
    profile,
    isAdmin:adminActive,
    setAdminSession:function(token,seconds){
      localStorage.setItem(ADMIN_TOKEN,token);
      localStorage.setItem(ADMIN_EXP,String(Date.now()+Number(seconds||21600)*1000));
      renderHeaderAccount();renderAdminMenu();
    },
    clearAdmin:function(){
      localStorage.removeItem(ADMIN_TOKEN);localStorage.removeItem(ADMIN_EXP);renderHeaderAccount();renderAdminMenu();
    }
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
