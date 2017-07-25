!function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dist/",t(t.s=0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e){function t(e){"eraser"==e?c():u(e)}w=e;var n=h("drawzone");h("drawzoneWrapper").appendChild(e),h("inputForAFile").style.display="none",h("drawAndDownload").style.display="";var o=Math.max(window.innerHeight,window.innerWidth),r=Math.max(e.width/o,e.height/o,1);e.style.maxWidth=n.width=e.width/r,e.style.maxHeight=n.height=e.height/r;var i=(n.getContext("2d"),(0,f.default)(n,{})),u=i.drawWithColor,c=i.drawWithEraser,d=i.setPencilSize,s=h("background"),g=(0,a.default)(h("pensizePreview"),{onColorChange:t,elementToContrastWith:s}),p=g.setColorDotSize,C=g.refreshColorPreviewBorder;(0,l.default)(s,{onChange:C}),(0,m.default)(h("pensize"),{onChange:function(e){p(e),d(e)}}),(0,v.default)(h("download"),{OrginalImage:w,originalFileName:y,canvas:n})}n(2);var i=n(3),a=o(i),u=n(4),c=o(u),d=n(5),l=o(d),s=n(6),f=o(s),g=n(7),v=o(g),p=n(8),m=o(p),h=document.getElementById.bind(document),y=void 0,w=void 0;(0,c.default)({fileinput:h("fileinput"),onImageCreated:function(e,t){y=t,r(e)}})},function(e,t){},function(e,t,n){"use strict";function o(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function r(e){var t=document.createElement("canvas");t.width=t.height=1;var n=t.getContext("2d");return n.clearRect(0,0,1,1),n.fillStyle=e,n.fillRect(0,0,1,1),[].concat(o(n.getImageData(0,0,1,1).data))}function i(e){return r(e).slice(0,3).reduce(function(e,t){return e+t},0)/3}function a(e,t){var n=i(t),o=i(e);return n>125&&o>200?"black":n<125&&o<25?"white":"transparent"}function u(e,t){function n(e){o(),t(e)}function o(){document.body.removeChild(r)}var r=document.createElement("div");r.classList.add("modal"),document.body.appendChild(r),d.forEach(function(t){var o=document.createElement("button");o.classList.add("colorbutton"),t===e&&(o.classList.add("active"),o.innerHTML="Your selected color"),o.style.backgroundColor=t.toLowerCase(),o.addEventListener("click",function(){return n(t)}),r.appendChild(o)});var i=document.createElement("button");i.classList.add("eraser"),i.addEventListener("click",function(){return n("eraser")}),i.innerHTML='<img src="/images/eraser.svg"/>Eraser (reveals photo)',r.appendChild(i)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){function n(){l.style.border="1px solid "+a(l.style.backgroundColor,d.style.backgroundColor)}function o(e){s=e,"eraser"==e?(l.style.background="",l.classList.add("eraser")):(l.classList.remove("eraser"),l.style.background=e,localStorage.setItem("color",e),n()),i(e)}function r(e){l.style.transform="scale("+e/10+")"}var i=t.onColorChange,d=t.elementToContrastWith,l=e.children[0],s=void 0;return e.addEventListener("click",function(){return u(s,o)}),setTimeout(function(){return o(localStorage.getItem("color")||c)}),{setColorDotSize:r,refreshColorPreviewBorder:n}};var c="#2b76ce",d="#000000,#FFFFFF,#F44336,#E91E63,#9C27B0,#673AB7,#3F51B5,#2196F3,#03A9F4,#00BCD4,#009688,#4CAF50,#8BC34A,#CDDC39,#FFEB3B,#FFC107,#FF9800,#FF5722,#795548,#9E9E9E,#607D8B".split(",")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){function t(e){var t=new FileReader;t.onload=function(){return n(t.result)},t.readAsDataURL(e)}function n(e){if(console.log("trying to load file as image"),u){var t=new Image;t.onload=function(){u=!1,r(t,a)},t.src=e}}function o(e){var o=Array.prototype.find.call(e,function(e){return"file"==e.kind&&e.type.match("image")});if(a="pasted-image",o)return console.log("parsing pasted image content"),void t(o.getAsFile());var r=Array.prototype.find.call(e,function(e){return"string"==e.kind});r&&(console.log("parsing url content"),r.getAsString(function(e){return n(e)}))}var r=e.onImageCreated,i=e.fileinput,a="pasted-image",u=!0;!function(){function e(n){i.removeEventListener("change",e),a=i.value.split("\\").pop().split(".")[0]||"image",t(n.target.files[0])}i.addEventListener("change",e)}(),window.addEventListener("paste",function(e){o(e.clipboardData.items)}),document.body.addEventListener("dragover",function(e){e.preventDefault(),e.stopPropagation()}),document.body.addEventListener("drop",function(e){e.preventDefault(),e.stopPropagation(),o(e.dataTransfer.items)})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){function n(){i++,localStorage.setItem("background",i),o()}function o(){var t=["#FFF","#333"],n=i%t.length;e.style.backgroundColor=t[n],r(n)}var r=t.onChange,i=localStorage.getItem("background")||0;return o(),e.addEventListener("click",n),{}}},function(e,t,n){"use strict";function o(e){if(null==e)throw new TypeError("Cannot destructure undefined")}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){function n(){s=e.getBoundingClientRect(),l=s.width/e.width}function r(e){return{x:(e.clientX-s.left)/l,y:(e.clientY-s.top)/l}}function i(){p||(p=!0,f.beginPath(),u())}function a(){p=!1}function u(){p&&(window.requestAnimationFrame(u),c())}function c(){f.moveTo(v.x,v.y),f.lineTo(g.x,g.y),f.stroke(),v=g}function d(t,n){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e;e.addEventListener(t,function(e){e.preventDefault();var t=e.touches[0]||{},r=t.clientX,i=t.clientY,a=new MouseEvent(n,{clientX:r,clientY:i});o.dispatchEvent(a)},!1)}o(t);var l=void 0,s=void 0;n(),window.addEventListener("resize",n);var f=e.getContext("2d");f.lineCap="round";var g={x:0,y:0},v=g;e.addEventListener("mousedown",function(e){g=v=r(e),i()},!1),document.addEventListener("mouseup",a,!1),e.addEventListener("mousemove",function(e){g=r(e)},!1);var p=!1;return d("touchstart","mousedown"),d("touchend","mouseup",document),d("touchmove","mousemove"),{drawWithEraser:function(){f.globalCompositeOperation="destination-out"},drawWithColor:function(e){f.globalCompositeOperation="source-over",f.strokeStyle=e},setPencilSize:function(e){f.lineWidth=e/l}}}},function(e,t,n){"use strict";function o(e,t){var n=document.createElement("canvas");n.width=e.width,n.height=e.height;var o=n.getContext("2d");return o.drawImage(t,0,0,n.width,n.height),o.drawImage(e,0,0),n}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){function n(e){var t=a+"-minimage-"+u+".png";this.href=o(i,r).toDataURL("image/png",.5),this.download=t,u++}var r=t.OrginalImage,i=t.canvas,a=t.originalFileName,u=0;e.addEventListener("click",n,!1)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){function n(t){e.value=t,localStorage.setItem("pensize",t),o(t)}var o=t.onChange;e.addEventListener("input",function(e){return n(e.target.value)}),n(parseInt(localStorage.getItem("pensize"))||DEFAULTSIZE)}}]);
//# sourceMappingURL=bundle.js.map