
(function(){
  const SC_LANG_KEY='scLanguage';
  const SC_THEME_KEY='scTheme';

  const exact = {
    'Your Local Digital Community':'आपका स्थानीय डिजिटल समुदाय',
    'Home':'होम',
    'Shop':'दुकान',
    'Services':'सेवाएं',
    'Events':'कार्यक्रम',
    'Menu':'मेनू',
    'Search':'खोजें',
    'Back':'वापस',
    'Call':'कॉल',
    'Message':'संदेश',
    'WhatsApp':'व्हाट्सऐप',
    'Get Directions':'दिशा प्राप्त करें',
    'Directions':'दिशा',
    'Know More':'और जानें',
    'View Info':'जानकारी देखें',
    'View All':'सभी देखें',
    'Loading...':'लोड हो रहा है...',
    'Loading local businesses...':'स्थानीय व्यवसाय लोड हो रहे हैं...',
    'Loading local service persons...':'स्थानीय सेवा प्रदाता लोड हो रहे हैं...',
    'Loading events and announcements...':'कार्यक्रम और घोषणाएं लोड हो रही हैं...',
    'Unable to load data.':'डेटा लोड नहीं हो सका।',
    'No results found.':'कोई परिणाम नहीं मिला।',
    'No matching result found.':'कोई मिलान परिणाम नहीं मिला।',
    'All':'सभी',
    'Category':'श्रेणी',
    'Description':'विवरण',
    'Address':'पता',
    'Location':'स्थान',
    'Phone':'फोन',
    'Mobile':'मोबाइल',
    'Email':'ईमेल',
    'Name':'नाम',
    'Ward':'वार्ड',
    'Date':'तारीख',
    'Time':'समय',
    'Type':'प्रकार',
    'Area':'क्षेत्र',
    'Experience':'अनुभव',
    'Availability':'उपलब्धता',
    'Website':'वेबसाइट',
    'Open Website':'वेबसाइट खोलें',
    'Visit Website':'वेबसाइट देखें',
    'Register':'पंजीकरण',
    'Submit':'जमा करें',
    'Send':'भेजें',
    'Close':'बंद करें',
    'Cancel':'रद्द करें',
    'Save':'सहेजें',
    'Share':'साझा करें',
    'About':'हमारे बारे में',
    'Contact Us':'संपर्क करें',
    'Notifications':'सूचनाएं',
    'Settings':'सेटिंग्स',
    'Language':'भाषा',
    'Theme':'थीम',
    'Light':'लाइट',
    'Dark':'डार्क',
    'English':'English',
    'Hindi':'हिन्दी',
    'Join Community':'समुदाय से जुड़ें',
    'Add Business':'व्यवसाय जोड़ें',
    'Businesses':'व्यवसाय',
    'Healthcare':'स्वास्थ्य सेवा',
    'Education':'शिक्षा',
    'Representatives':'प्रतिनिधि',
    'Important Places':'महत्वपूर्ण स्थान',
    'Transport':'परिवहन',
    'Government Offices':'सरकारी कार्यालय',
    'Useful Websites':'उपयोगी वेबसाइटें',
    'Jobs':'नौकरियां',
    'Weather & Forecast':'मौसम व पूर्वानुमान',
    'Emergency':'आपातकाल',
    'Charity':'चैरिटी',
    'Book Services':'सेवा बुक करें',
    'Shop Now':'खरीदारी करें',
    'Complaints':'शिकायतें',
    'Complaint':'शिकायत',
    'Book Complaint':'शिकायत दर्ज करें',
    'Citizen Complaint':'नागरिक शिकायत',
    'Issue Category':'समस्या श्रेणी',
    'Issue / Subject':'समस्या / विषय',
    'Priority':'प्राथमिकता',
    'Landmark':'नजदीकी पहचान',
    'Use Current Location':'वर्तमान स्थान लें',
    'Open Maps':'मैप खोलें',
    'Upload Issue Image':'समस्या की तस्वीर अपलोड करें',
    'Complaint Prepared':'शिकायत तैयार है',
    'Chairman':'चेयरमैन',
    'Vice Chairman':'वाइस चेयरमैन',
    'Ward Councillor':'वार्ड पार्षद',
    'Donate Us':'दान करें',
    'Donate Goods':'सामान दान करें',
    'Goods Donation':'सामान दान',
    'Doorstep Goods Collection':'घर से सामान संग्रह',
    'Upload Goods Image':'सामान की तस्वीर अपलोड करें',
    'Preferred Pickup Date':'पसंदीदा पिकअप तारीख',
    'Preferred Pickup Time':'पसंदीदा पिकअप समय',
    'About Sursand Connect':'सुरसंड कनेक्ट के बारे में',
    'Local Business Directory':'स्थानीय व्यवसाय निर्देशिका',
    'Book Local Services':'स्थानीय सेवाएं बुक करें',
    'Schools & Education':'स्कूल एवं शिक्षा',
    'Healthcare Services':'स्वास्थ्य सेवाएं',
    'Transport Information':'परिवहन जानकारी',
    'Government Services':'सरकारी सेवाएं',
    'Ward Representatives':'वार्ड प्रतिनिधि',
    'City Connect WhatsApp Community':'सिटी कनेक्ट व्हाट्सऐप कम्युनिटी',
    'Events & Announcements':'कार्यक्रम एवं घोषणाएं',
    'Agriculture & Farmers':'कृषि एवं किसान',
    'Important Contacts':'महत्वपूर्ण संपर्क',
    'Weather & Local Information':'मौसम एवं स्थानीय जानकारी',
    'Notifications & Updates':'सूचनाएं एवं अपडेट',
    'Jobs & Employment':'नौकरियां एवं रोजगार',
    'Emergency Services':'आपातकालीन सेवाएं'
  };

  const phrases = [
    ['Search shop, business, category or location...','दुकान, व्यवसाय, श्रेणी या स्थान खोजें...'],
    ['Search plumber, milkman, cleaner, mechanic...','प्लम्बर, दूधवाला, सफाईकर्मी, मैकेनिक खोजें...'],
    ['Search mason, plumber, carpenter, electrician...','मिस्त्री, प्लम्बर, बढ़ई, इलेक्ट्रीशियन खोजें...'],
    ['Search businesses, services, events...','व्यवसाय, सेवाएं और कार्यक्रम खोजें...'],
    ['Select the service you need and view only the available service providers for that service.','अपनी आवश्यक सेवा चुनें और उसी सेवा के उपलब्ध प्रदाता देखें।'],
    ['Discover shops and businesses in Sursand.','सुरसंड की दुकानों और व्यवसायों को खोजें।'],
    ['Call directly, shop through WhatsApp Catalogue and find the shop location.','सीधे कॉल करें, व्हाट्सऐप कैटलॉग से खरीदारी करें और दुकान का स्थान देखें।'],
    ['Important emergency and public-help contacts for residents of Sursand. Tap a button to call directly.','सुरसंड के निवासियों के लिए महत्वपूर्ण आपातकालीन और सार्वजनिक सहायता संपर्क। सीधे कॉल करने के लिए बटन दबाएं।'],
    ['Find local service persons in Sursand','सुरसंड में स्थानीय सेवा प्रदाता खोजें'],
    ['Event information may change.','कार्यक्रम की जानकारी बदल सकती है।'],
    ['Please verify important dates, timings, venue and organiser details before attending.','शामिल होने से पहले तारीख, समय, स्थान और आयोजक की जानकारी सत्यापित करें।'],
    ['Sursand Connect only provides local contact information.','सुरसंड कनेक्ट केवल स्थानीय संपर्क जानकारी उपलब्ध कराता है।'],
    ['Please discuss charges, work details, availability and responsibility directly with the service person before hiring.','सेवा लेने से पहले शुल्क, काम, उपलब्धता और जिम्मेदारी सीधे सेवा प्रदाता से तय करें।'],
    ['Your local digital community for Sursand.','सुरसंड के लिए आपका स्थानीय डिजिटल समुदाय।'],
    ['Connecting Sursand','सुरसंड को जोड़ता डिजिटल मंच']
  ];

  function translateText(t){
    const raw=t.trim();
    if(!raw) return t;
    if(exact[raw]) return t.replace(raw, exact[raw]);
    let out=t;
    phrases.forEach(([en,hi])=>{ if(out.includes(en)) out=out.replace(en,hi); });
    return out;
  }

  function applyLang(){
    const lang=localStorage.getItem(SC_LANG_KEY)||'en';
    document.documentElement.lang=lang;
    document.querySelectorAll('[data-en][data-hi]').forEach(el=>{
      const val=lang==='hi'?el.getAttribute('data-hi'):el.getAttribute('data-en');
      if(el.tagName==='INPUT'||el.tagName==='TEXTAREA') el.placeholder=val;
      else el.textContent=val;
    });
    document.querySelectorAll('[data-k]').forEach(el=>{
      // homepage may manage its own translations
    });
    if(lang==='hi'){
      const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
      const nodes=[];
      while(walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(n=>{
        if(n.parentElement && ['SCRIPT','STYLE'].includes(n.parentElement.tagName)) return;
        n.nodeValue=translateText(n.nodeValue);
      });
      document.querySelectorAll('input[placeholder],textarea[placeholder]').forEach(el=>{
        el.placeholder=translateText(el.placeholder);
      });
      document.querySelectorAll('option').forEach(el=>{
        el.textContent=translateText(el.textContent);
      });
      document.querySelectorAll('button,a,label,h1,h2,h3,h4,p,span,small,strong,b').forEach(el=>{
        if(el.children.length===0) el.textContent=translateText(el.textContent);
      });
    }
    const ls=document.getElementById('scLanguageSelect')||document.getElementById('lang');
    if(ls) ls.value=lang;
  }

  function applyTheme(){
    const th=localStorage.getItem(SC_THEME_KEY)||'light';
    document.documentElement.classList.toggle('sc-dark',th==='dark');
    document.documentElement.classList.toggle('dark',th==='dark');
    const ts=document.getElementById('scThemeSelect')||document.getElementById('theme');
    if(ts) ts.value=th;
  }

  window.scSetLanguage=function(v){localStorage.setItem(SC_LANG_KEY,v);location.reload();}
  window.scSetTheme=function(v){localStorage.setItem(SC_THEME_KEY,v);applyTheme();}
  window.scApplyAllPrefs=function(){applyTheme();applyLang();}

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>window.scApplyAllPrefs());
  else window.scApplyAllPrefs();
})();
