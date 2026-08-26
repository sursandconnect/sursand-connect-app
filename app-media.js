(function(){
  "use strict";

  function driveId(url){
    const s=String(url||"").trim();
    let m=s.match(/\/d\/([A-Za-z0-9_-]{10,})/)
      || s.match(/[?&]id=([A-Za-z0-9_-]{10,})/)
      || s.match(/thumbnail\?id=([A-Za-z0-9_-]{10,})/);
    return m ? m[1] : "";
  }

  function publicImage(url){
    const s=String(url||"").trim();
    if(!s) return "";
    const id=driveId(s);
    if(id) return "https://drive.google.com/thumbnail?id="+encodeURIComponent(id)+"&sz=w1600";
    return s;
  }

  window.scPublicImage = publicImage;

  window.scRecordImage = function(record){
    if(!record) return "";
    const keys=[
      "Image URL","Image","imageUrl","image",
      "Photo URL","Photo","photoUrl",
      "Business Image","Business Image URL",
      "Profile Image","Profile Image URL",
      "School Image","Place Image","Event Image",
      "Notification Image","Ad Image","News Image"
    ];
    for(const k of keys){
      const v=record[k];
      if(v!=null && String(v).trim()) return publicImage(v);
    }
    return "";
  };

  function repair(root){
    (root||document).querySelectorAll("img").forEach(function(img){
      const src=img.getAttribute("src");
      if(!src) return;
      const fixed=publicImage(src);
      if(fixed && fixed!==src) img.src=fixed;
      img.referrerPolicy="no-referrer";
      img.style.visibility="visible";
    });
  }

  document.addEventListener("DOMContentLoaded",function(){repair(document)});
  new MutationObserver(function(mutations){
    mutations.forEach(function(m){
      m.addedNodes.forEach(function(n){
        if(n.nodeType===1) repair(n);
      });
    });
  }).observe(document.documentElement,{childList:true,subtree:true});
})();