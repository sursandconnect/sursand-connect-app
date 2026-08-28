(function(){
const API='https://script.google.com/macros/s/AKfycbzrDLNOj56LEjyLuf4PJiBsH5s36RgRi6y55NjjVJtxvRjFPUMdcXLsOK4ojNUssdNX/exec',KEY='scAllDataCacheV17',AGE=45000;let mem=null,promise=null;
function read(){if(mem)return mem;try{const x=JSON.parse(localStorage.getItem(KEY)||'null');if(x&&x.data){mem=x.data;return mem}}catch(e){}return null}
function meta(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){return null}}
function store(d){mem=d||{};try{localStorage.setItem(KEY,JSON.stringify({at:Date.now(),data:mem}))}catch(e){}return mem}
window.SCReadAllDataCache=read;
window.SCGetAllData=function(force){if(promise)return promise;const c=read(),x=meta();if(!force&&c&&x&&Date.now()-x.at<AGE)return Promise.resolve(c);promise=fetch(API+'?action=all&_='+Date.now(),{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('Data unavailable');return r.json()}).then(j=>{if(!j||!j.success)throw Error('Data unavailable');return store(j.data||{})}).finally(()=>{promise=null});return promise};
window.SCRefreshAllData=function(){return window.SCGetAllData(true)};
})();