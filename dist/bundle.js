!function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dist/",t(t.s=0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function o(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function r(e){var t=Array.prototype.find.call(e,function(e){return"file"==e.kind&&e.type.match("image")});if(h="pasted-image",t)return console.log("parsing pasted image content"),void a(t.getAsFile());var n=Array.prototype.find.call(e,function(e){return"string"==e.kind});n&&(console.log("parsing url content"),n.getAsString(function(e){return d(e)}))}function i(){function e(n){t.removeEventListener("change",e),h=t.value.split("\\").pop().split(".")[0]||"image",a(n.target.files[0])}var t=v("fileinput");t.addEventListener("change",e)}function a(e){v("readme").innerHTML="<h1>Loading ...</h1>";var t=new FileReader;t.onload=function(){return d(t.result)},t.readAsDataURL(e)}function d(e){if(console.log("trying to load file as image"),w){var t=new Image;t.onload=function(){return c(t)},t.src=e}}function c(e){function t(){D=F.getBoundingClientRect(),A=D.width/F.width}function n(e){S=e,"eraser"==e?(x.globalCompositeOperation="destination-out",B.style.background="",B.classList.add("eraser")):(B.classList.remove("eraser"),x.globalCompositeOperation="source-over",B.style.background=x.strokeStyle=e,localStorage.setItem("color",e),o())}function o(){var e=v("pensizePreviewDot");e.style.border="1px solid "+l(e.style.backgroundColor,v("background").style.backgroundColor)}function r(e){B.style.transform="scale("+e/10+")",x.lineWidth=e/A,z.value=e,localStorage.setItem("pensize",e)}function i(e){return{x:(e.clientX-D.left)/A,y:(e.clientY-D.top)/A}}function a(){O||(O=!0,x.beginPath(),c())}function d(){O=!1}function c(){O&&(window.requestAnimationFrame(c),u())}function u(){console.log("rendering"),x.moveTo(P.x,P.y),x.lineTo(M.x,M.y),x.stroke(),P=M}function s(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:F;F.addEventListener(e,function(e){e.preventDefault();var o=e.touches[0]||{},r=o.clientX,i=o.clientY,a=new MouseEvent(t,{clientX:r,clientY:i});n.dispatchEvent(a)},!1)}function E(e){var t=h+"-minimage-"+R+".png";this.href=f(F,y).toDataURL("image/png",.5),this.download=t,R++}function L(){H++,localStorage.setItem("background",H),b()}function b(){var e=["#FFF","#333"];T.style.backgroundColor=e[H%e.length],o()}w=!1,y=e;var F=v("drawzone");v("drawzoneWrapper").appendChild(e),v("inputForAFile").style.display="none",v("drawAndDownload").style.display="";var C=Math.max(window.innerHeight,window.innerWidth),k=Math.max(e.width/C,e.height/C,1);e.style.maxWidth=F.width=e.width/k,e.style.maxHeight=F.height=e.height/k;var x=F.getContext("2d"),A=void 0,D=void 0;t(),window.addEventListener("resize",t);var I=v("pensizePreview"),B=v("pensizePreviewDot"),z=v("pensize"),S="";n(localStorage.getItem("color")||p),I.addEventListener("click",function(){return g(S,n)}),z.addEventListener("input",function(e){return r(e.target.value)}),r(parseInt(localStorage.getItem("pensize"))||m),x.lineCap="round";var M={x:0,y:0},P=M;F.addEventListener("mousedown",function(e){M=P=i(e),a()},!1),document.addEventListener("mouseup",d,!1),F.addEventListener("mousemove",function(e){M=i(e)},!1);var O=!1;s("touchstart","mousedown"),s("touchend","mouseup",document),s("touchmove","mousemove");var R=0;v("download").addEventListener("click",E,!1);var T=v("background"),H=localStorage.getItem("background")||0;b(),T.addEventListener("click",L)}function u(e){var t=document.createElement("canvas");t.width=t.height=1;var n=t.getContext("2d");return n.clearRect(0,0,1,1),n.fillStyle=e,n.fillRect(0,0,1,1),[].concat(o(n.getImageData(0,0,1,1).data))}function s(e){return u(e).slice(0,3).reduce(function(e,t){return e+t},0)/3}function l(e,t){var n=s(t),o=s(e);return n>125&&o>200?"black":n<125&&o<25?"white":"transparent"}function g(e,t){function n(e){o(),t(e)}function o(){document.body.removeChild(r)}var r=document.createElement("div");r.classList.add("modal"),document.body.appendChild(r),E.forEach(function(t){var o=document.createElement("button");o.classList.add("colorbutton"),t===e&&(o.classList.add("active"),o.innerHTML="Your selected color"),o.style.backgroundColor=t.toLowerCase(),o.addEventListener("click",function(){return n(t)}),r.appendChild(o)});var i=document.createElement("button");i.classList.add("eraser"),i.addEventListener("click",function(){return n("eraser")}),i.innerHTML='<img src="/images/eraser.svg"/>Eraser (reveals photo)',r.appendChild(i)}function f(e,t){var n=document.createElement("canvas");n.width=e.width,n.height=e.height;var o=n.getContext("2d");return o.drawImage(t,0,0,n.width,n.height),o.drawImage(e,0,0),n}n(2),document.addEventListener("DOMContentLoaded",function(){i()}),window.addEventListener("paste",function(e){r(e.clipboardData.items)}),document.body.addEventListener("dragover",function(e){e.preventDefault(),e.stopPropagation()}),document.body.addEventListener("drop",function(e){e.preventDefault(),e.stopPropagation(),r(e.dataTransfer.items)});var v=document.getElementById.bind(document),p="#2b76ce",m=20,h="pasted-image",w=!0,y=void 0,E="#000000,#FFFFFF,#F44336,#E91E63,#9C27B0,#673AB7,#3F51B5,#2196F3,#03A9F4,#00BCD4,#009688,#4CAF50,#8BC34A,#CDDC39,#FFEB3B,#FFC107,#FF9800,#FF5722,#795548,#9E9E9E,#607D8B".split(",")},function(e,t){}]);
//# sourceMappingURL=bundle.js.map