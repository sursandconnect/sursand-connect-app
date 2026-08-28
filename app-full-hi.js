(function(){
  /* V18: meaningful Hindi only. No automatic person/name transliteration. */
  const MAP={
    'Chairman':'मुख्य पार्षद',
    'Vice Chairman':'उपमुख्य पार्षद',
    'Ward Councillor':'वार्ड पार्षद',
    'Ward Councillors':'वार्ड पार्षद',
    'Chairman & Vice Chairman':'मुख्य पार्षद एवं उपमुख्य पार्षद',
    'Municipal Leadership':'नगर नेतृत्व',
    'Representative':'प्रतिनिधि',
    'Representatives':'प्रतिनिधि',
    'Representative Name':'प्रतिनिधि का नाम',
    'Representative Role':'पद',
    'Name in Hindi':'हिंदी में नाम',
    'Ward':'वार्ड',
    'Ward Number':'वार्ड संख्या',
    'Contact Number':'संपर्क नंबर',
    'WhatsApp Number':'व्हाट्सऐप नंबर',
    'Address':'पता',
    'Status':'स्थिति',
    'Active':'सक्रिय',
    'Home':'होम',
    'Menu':'मेनू',
    'Search':'खोजें',
    'News':'समाचार',
    'News & Updates':'समाचार व अपडेट',
    'Jobs':'नौकरियां',
    'Transport':'परिवहन',
    'Government Offices':'सरकारी कार्यालय',
    'Important Places':'महत्वपूर्ण स्थान',
    'Weather & Forecast':'मौसम व पूर्वानुमान',
    'Events & Announcements':'कार्यक्रम एवं घोषणाएं',
    'Notifications':'सूचनाएं',
    'View Full Details':'पूरा विवरण देखें',
    'Call':'कॉल करें',
    'Message':'संदेश',
    'Directions':'दिशा',
    'Other':'अन्य',
    'All':'सभी',
    'Description':'विवरण',
    'Details':'विवरण',
    'Category':'श्रेणी',
    'Time':'समय',
    'Departure from Sursand':'सुरसंड से प्रस्थान'
  };
  function lang(){return (localStorage.getItem('scLanguage')||localStorage.getItem('scLang')||'en').toLowerCase()}
  function translateText(t){
    let s=String(t||'');
    if(!s.trim()||lang()!=='hi')return s;
    // Brand must always remain exactly Sursand Connect.
    const BRAND='__SC_BRAND__';
    s=s.replace(/Sursand Connect/gi,BRAND).replace(/सुरसंड\s*कनेक्ट/g,BRAND);
    Object.keys(MAP).sort((a,b)=>b.length-a.length).forEach(k=>{
      const re=new RegExp('\\b'+k.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&')+'\\b','g');
      s=s.replace(re,MAP[k]);
    });
    return s.replace(new RegExp(BRAND,'g'),'Sursand Connect');
  }
  function apply(){
    if(lang()!=='hi')return;
    const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
    while(n=w.nextNode()){
      if(!n.parentElement||/^(SCRIPT|STYLE|TEXTAREA|INPUT)$/i.test(n.parentElement.tagName)||n.parentElement.closest('code,pre'))continue;
      const x=translateText(n.nodeValue);if(x!==n.nodeValue)n.nodeValue=x;
    }
    document.querySelectorAll('input[placeholder],textarea[placeholder]').forEach(x=>{x.placeholder=translateText(x.placeholder)});
    document.querySelectorAll('option').forEach(x=>{x.textContent=translateText(x.textContent)});
  }
  window.scMeaningfulHindi=translateText;
  window.scHindiName=function(name,hindiName){return lang()==='hi'&&String(hindiName||'').trim()?String(hindiName).trim():String(name||'')};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,200));else setTimeout(apply,200);
  new MutationObserver(()=>setTimeout(apply,80)).observe(document.documentElement,{childList:true,subtree:true});
})();