
(function(){
  const USER_TOKEN='scUserSessionToken';
  const USER_PROFILE='scUserProfile';
  const ADMIN_TOKEN='scAdminSessionToken';
  const ADMIN_EXP='scAdminSessionExpiresAt';

  function readJSON(k){try{const v=localStorage.getItem(k);return v?JSON.parse(v):null}catch(e){return null}}
  function adminActive(){
    const t=localStorage.getItem(ADMIN_TOKEN)||'';
    const e=Number(localStorage.getItem(ADMIN_EXP)||0);
    if(!t)return false;
    if(e&&Date.now()>e){localStorage.removeItem(ADMIN_TOKEN);localStorage.removeItem(ADMIN_EXP);return false}
    return true;
  }
  function userActive(){return !!localStorage.getItem(USER_TOKEN)}
  function profile(){return readJSON(USER_PROFILE)}
  function prefix(){return location.pathname.includes('/p/')?'':'p/'}
  function initials(n){const p=String(n||'').trim().split(/\s+/).filter(Boolean);return p.length?p.slice(0,2).map(x=>x[0]).join('').toUpperCase():'👤'}

  function headerButton(){
    const box=document.querySelector('.sc-appbar-actions,.sc-actions,.bar .sc-actions');
    if(!box)return;
    const old=document.getElementById('scHeaderAccount');if(old)old.remove();
    const a=document.createElement('a');a.id='scHeaderAccount';
    a.style.cssText='min-width:38px;height:38px;padding:0 9px;border-radius:14px;border:1px solid #f2d1ac;background:linear-gradient(145deg,#fffaf5,#fff0dd);color:#c86508;display:flex;align-items:center;justify-content:center;text-decoration:none;font-weight:900;font-size:10px;box-shadow:0 5px 14px rgba(200,101,8,.12);white-space:nowrap';
    if(adminActive()){
      a.href=prefix()+'admin.html';a.textContent='🛡️';a.title='Admin Profile';
      a.style.cssText+=';width:38px;min-width:38px;padding:0;border-radius:50%;background:linear-gradient(145deg,#334155,#111827);color:#fff;border:2px solid #fff';
    }else if(userActive()){
      const p=profile();a.href=prefix()+'account.html';a.textContent=initials(p&&p.name);a.title='My Profile';
      a.style.cssText+=';width:38px;min-width:38px;padding:0;border-radius:50%;background:linear-gradient(145deg,#238b45,#176b35);color:#fff;border:2px solid #fff';
    }else{
      a.href=prefix()+'account.html';a.textContent='Login';a.title='Login / Sign Up';
    }
    const back=box.querySelector('.sc-back,.sc-pretty-back,button[aria-label="Back"]');
    if(back)box.insertBefore(a,back);else box.appendChild(a);
  }

  function adminMenu(){
    const grid=document.querySelector('.menu-grid');if(!grid)return;
    let a=document.getElementById('scAdminMenuCard');
    if(!adminActive()){if(a)a.remove();return}
    if(a)return;
    a=document.createElement('a');a.id='scAdminMenuCard';a.className='menu-card';a.href='p/admin.html';
    a.innerHTML='<span>🛡️</span><i style="font-style:normal">Admin Panel</i>';
    grid.insertBefore(a,grid.firstChild);
  }

  function normWard(v){return String(v||'').replace(/\D/g,'')}
  function setIfBlank(el,v){
    if(!el||v===undefined||v===null||String(v).trim()===''||String(el.value||'').trim()!=='')return;
    if(el.tagName==='SELECT'){
      const w=normWard(v),wanted=String(v).trim().toLowerCase();
      const opt=[...el.options].find(o=>String(o.value).trim().toLowerCase()===wanted)||[...el.options].find(o=>w&&normWard(o.value||o.textContent)===w);
      if(opt){el.value=opt.value;el.dispatchEvent(new Event('change',{bubbles:true}))}
    }else{el.value=String(v);el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}))}
  }
  function meta(el){
    let label='';if(el.id){try{const l=document.querySelector('label[for="'+CSS.escape(el.id)+'"]');if(l)label=l.textContent}catch(e){}}
    if(!label){const p=el.closest('.field,.sc-cm-field,.sc-svc-field,.sc-br-field,.sc-health-field,.sc-contact-field,.sc-charity-field');const l=p&&p.querySelector('label');if(l)label=l.textContent}
    return [el.id,el.name,el.placeholder,label].map(x=>String(x||'').toLowerCase()).join(' ');
  }
  function autofill(root=document){
    if(!userActive()||adminActive())return;const p=profile();if(!p)return;
    (root.querySelectorAll?root.querySelectorAll('input,select,textarea'):[]).forEach(el=>{
      if(['password','file','hidden','checkbox','radio','submit','button'].includes(String(el.type||'').toLowerCase()))return;
      const m=meta(el);
      if(/\b(full ?name|your ?name|customer ?name|donor ?name|citizen name|contact person|owner)\b/.test(m)){setIfBlank(el,p.name);return}
      if(/\b(mobile|phone|contact number|whatsapp number)\b/.test(m)){setIfBlank(el,p.mobile);return}
      if(/\bemail\b/.test(m)){setIfBlank(el,p.email);return}
      if(/\bward\b/.test(m)){setIfBlank(el,p.ward);return}
      if(/\b(address|pickup address|delivery address|sample collection address)\b/.test(m)){setIfBlank(el,p.address);return}
      if(/\blandmark\b/.test(m)){setIfBlank(el,p.landmark)}
    });
  }
  function init(){headerButton();adminMenu();autofill(document);new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1)autofill(n)}))).observe(document.body,{childList:true,subtree:true})}
  window.SCAccountUI={refresh:init,autofill,profile,isAdmin:adminActive,setAdminSession:(t,s)=>{localStorage.setItem(ADMIN_TOKEN,t);localStorage.setItem(ADMIN_EXP,String(Date.now()+Number(s||21600)*1000));init()},clearAdmin:()=>{localStorage.removeItem(ADMIN_TOKEN);localStorage.removeItem(ADMIN_EXP);init()}};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
