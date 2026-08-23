window.SC_ACCOUNT_TRANSLATIONS={"My Account": "मेरा खाता", "Admin Panel": "एडमिन पैनल", "Login": "लॉग इन", "Sign Up": "साइन अप", "Create Account": "खाता बनाएं", "Full Name *": "पूरा नाम *", "Mobile Number or Email *": "मोबाइल नंबर या ईमेल *", "Password *": "पासवर्ड *", "Confirm Password *": "पासवर्ड की पुष्टि *", "Logout": "लॉग आउट", "Member Since": "सदस्यता तिथि", "Account & Administration": "खाता एवं प्रशासन", "Administrator Control Centre": "प्रशासक नियंत्रण केंद्र", "Admin Login": "एडमिन लॉग इन", "Admin ID": "एडमिन आईडी", "Login to Admin Panel": "एडमिन पैनल में लॉग इन करें", "Management": "प्रबंधन", "Business Registrations": "व्यवसाय पंजीकरण", "Local Services": "स्थानीय सेवाएं", "Change Makers": "चेंज मेकर्स", "Contact Messages": "संपर्क संदेश", "Review and approve businesses": "व्यवसायों की समीक्षा और स्वीकृति", "Manage service providers": "सेवा प्रदाताओं का प्रबंधन", "Manage events and updates": "कार्यक्रम और अपडेट प्रबंधित करें", "Manage representatives": "प्रतिनिधियों का प्रबंधन", "Review registrations": "पंजीकरण की समीक्षा", "Read contact messages": "संपर्क संदेश पढ़ें", "Actions": "कार्रवाई", "Approve": "स्वीकृत करें", "Reject": "अस्वीकृत करें", "No records found.": "कोई रिकॉर्ड नहीं मिला।", "Checking login...": "लॉग इन जांचा जा रहा है...", "Creating account...": "खाता बनाया जा रहा है..."};
(function(){
 const M=window.SC_ACCOUNT_TRANSLATIONS||{};
 function tr(root){
  if((localStorage.getItem('scLanguage')||'en')!=='hi'||!root)return;
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  while(w.nextNode()){const n=w.currentNode,p=n.parentElement;if(!p||['SCRIPT','STYLE'].includes(p.tagName))continue;const x=(n.nodeValue||'').trim();if(M[x])n.nodeValue=(n.nodeValue||'').replace(x,M[x]);}
  root.querySelectorAll&&root.querySelectorAll('[placeholder]').forEach(e=>{if(M[e.placeholder])e.placeholder=M[e.placeholder]});
 }
 function start(){tr(document.body);new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1)tr(n)}))).observe(document.body,{childList:true,subtree:true})}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
