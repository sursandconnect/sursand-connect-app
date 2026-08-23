
(function(){
  const TOKEN_KEY='scUserSessionToken';
  const PROFILE_KEY='scUserProfile';

  function getProfile(){
    try{
      const raw=localStorage.getItem(PROFILE_KEY);
      return raw?JSON.parse(raw):null;
    }catch(e){
      return null;
    }
  }

  function isLoggedIn(){
    return !!localStorage.getItem(TOKEN_KEY);
  }

  function initials(name){
    const parts=String(name||'').trim().split(/\s+/).filter(Boolean);
    if(!parts.length)return '👤';
    return parts.slice(0,2).map(x=>x[0]).join('').toUpperCase();
  }

  function createAccountButton(){
    const containers=[
      document.querySelector('.sc-appbar-actions'),
      document.querySelector('.sc-actions'),
      document.querySelector('.bar .sc-actions')
    ].filter(Boolean);

    const box=containers[0];
    if(!box || document.getElementById('scHeaderAccount')) return;

    const logged=isLoggedIn();
    const profile=getProfile();

    const a=document.createElement('a');
    a.id='scHeaderAccount';
    a.href=(location.pathname.includes('/p/')?'account.html':'p/account.html');
    a.title=logged?'My Profile':'Login / Sign Up';
    a.setAttribute('aria-label',logged?'My Profile':'Login / Sign Up');

    a.style.cssText=[
      'min-width:38px',
      'height:38px',
      'padding:0 9px',
      'border-radius:14px',
      'border:1px solid #f2d1ac',
      'background:linear-gradient(145deg,#fffaf5,#fff0dd)',
      'color:#c86508',
      'display:flex',
      'align-items:center',
      'justify-content:center',
      'text-decoration:none',
      'font-weight:900',
      'font-size:10px',
      'box-shadow:0 5px 14px rgba(200,101,8,.12)',
      'white-space:nowrap'
    ].join(';');

    if(logged){
      a.textContent=initials(profile&&profile.name);
      a.style.width='38px';
      a.style.padding='0';
      a.style.borderRadius='50%';
      a.style.background='linear-gradient(145deg,#238b45,#176b35)';
      a.style.color='#fff';
      a.style.border='2px solid #fff';
      a.style.boxShadow='0 0 0 1px #238b45,0 5px 14px rgba(35,139,69,.22)';
    }else{
      a.textContent='Login';
    }

    const back=box.querySelector('.sc-back,.sc-pretty-back,button[aria-label="Back"]');
    if(back) box.insertBefore(a,back);
    else box.appendChild(a);
  }

  function normalizeWard(v){
    return String(v||'').replace(/\D/g,'');
  }

  function trySet(el,value){
    if(!el || value===undefined || value===null || String(value)==='') return;
    if(el.value && String(el.value).trim()!=='') return;

    const tag=el.tagName;
    if(tag==='SELECT'){
      const wanted=String(value).trim().toLowerCase();
      const wardWanted=normalizeWard(value);
      const options=[...el.options];
      let opt=options.find(o=>String(o.value).trim().toLowerCase()===wanted);
      if(!opt && wardWanted){
        opt=options.find(o=>normalizeWard(o.value||o.textContent)===wardWanted);
      }
      if(opt){
        el.value=opt.value;
        el.dispatchEvent(new Event('change',{bubbles:true}));
      }
      return;
    }

    el.value=String(value);
    el.dispatchEvent(new Event('input',{bubbles:true}));
    el.dispatchEvent(new Event('change',{bubbles:true}));
  }

  function identifyField(el){
    const id=String(el.id||'').toLowerCase();
    const name=String(el.name||'').toLowerCase();
    const ph=String(el.placeholder||'').toLowerCase();
    let label='';
    if(el.id){
      const l=document.querySelector('label[for="'+CSS.escape(el.id)+'"]');
      if(l)label=String(l.textContent||'').toLowerCase();
    }
    if(!label){
      const parent=el.closest('.field,.sc-cm-field,.sc-svc-field,.sc-br-field,.sc-health-field,.sc-contact-field,.sc-charity-field');
      const l=parent&&parent.querySelector('label');
      if(l)label=String(l.textContent||'').toLowerCase();
    }
    return [id,name,ph,label].join(' ');
  }

  function autofill(root=document){
    const profile=getProfile();
    if(!profile || !isLoggedIn()) return;

    const fields=root.querySelectorAll ? root.querySelectorAll('input,select,textarea') : [];

    fields.forEach(el=>{
      if(['password','file','hidden','checkbox','radio','submit','button'].includes(String(el.type||'').toLowerCase())) return;

      const meta=identifyField(el);

      if(/\b(full ?name|your ?name|customer ?name|donor ?name|contact person|citizen name|name)\b/.test(meta)){
        trySet(el,profile.name);
        return;
      }

      if(/\b(mobile|phone|contact number|whatsapp number)\b/.test(meta)){
        trySet(el,profile.mobile);
        return;
      }

      if(/\bemail\b/.test(meta)){
        trySet(el,profile.email);
        return;
      }

      if(/\bward\b/.test(meta)){
        trySet(el,profile.ward);
        return;
      }

      if(/\b(address|pickup address|your address)\b/.test(meta)){
        trySet(el,profile.address);
        return;
      }

      if(/\blandmark\b/.test(meta)){
        trySet(el,profile.landmark);
      }
    });
  }

  function init(){
    createAccountButton();
    autofill(document);

    const observer=new MutationObserver(ms=>{
      ms.forEach(m=>m.addedNodes.forEach(n=>{
        if(n.nodeType===1)autofill(n);
      }));
    });
    observer.observe(document.body,{childList:true,subtree:true});
  }

  window.SCAccountUI={
    refresh:function(){
      const old=document.getElementById('scHeaderAccount');
      if(old)old.remove();
      createAccountButton();
      autofill(document);
    },
    autofill:autofill,
    getProfile:getProfile
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();
})();
