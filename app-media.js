(function(){"use strict";
function driveId(u){const s=String(u||"").trim(),m=s.match(/\/d\/([A-Za-z0-9_-]{10,})/)||s.match(/[?&]id=([A-Za-z0-9_-]{10,})/)||s.match(/thumbnail\?id=([A-Za-z0-9_-]{10,})/);return m?m[1]:""}
function mediaUrl(u){const s=String(u||"").trim(),id=driveId(s);return id?"https://drive.google.com/thumbnail?id="+encodeURIComponent(id)+"&sz=w1600":s}
window.scMediaUrl=mediaUrl;
window.scMediaFirst=function(o){if(!o)return"";for(const k of["Image URL","Image","Photo URL","Photo","Business Image","Business Image URL","Profile Image","Profile Image URL","Event Image","Ad Image","News Image","imageUrl","image","photoUrl"]){if(o[k]!=null&&String(o[k]).trim())return mediaUrl(o[k])}return""};
function fix(root){(root||document).querySelectorAll("img").forEach(img=>{const src=img.getAttribute("src");if(!src)return;const fixed=mediaUrl(src);if(fixed&&fixed!==src)img.src=fixed;img.referrerPolicy="no-referrer";img.style.visibility="visible"})}
document.addEventListener("DOMContentLoaded",()=>fix(document));
new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1)fix(n)}))).observe(document.documentElement,{childList:true,subtree:true});
})();