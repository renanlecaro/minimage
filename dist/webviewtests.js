!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=15)}({0:function(t,e,n){"use strict";function r(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function o(t){var e=document.createElement("canvas");e.width=e.height=1;var n=e.getContext("2d");return n.clearRect(0,0,1,1),n.fillStyle=t,n.fillRect(0,0,1,1),[].concat(r(n.getImageData(0,0,1,1).data)).slice(0,3)}function i(t){return o(t).reduce(function(t,e){return t+e},0)/3}Object.defineProperty(e,"__esModule",{value:!0}),e.colorToRGB=o,e.luminance=i},1:function(t,e,n){"use strict";function r(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=t.filter(function(t){return t!=e});return n[Math.floor(Math.random()*(n.length+.99))]}Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){function n(){f&&(t.width=window.innerWidth,t.height=window.innerHeight),v=t.width,m=t.height,s=t.getContext("2d"),s.fillStyle=h,s.fillRect(0,0,v,m),s.lineCap="round",o()}function o(){y={x:v/2,y:m/2},w={x:10*Math.random()-5,y:10*Math.random()-5},x={x:10*Math.random()-5,y:10*Math.random()-5},s.strokeStyle=r(i,h),s.lineWidth=20+40*Math.random(),s.beginPath(),s.moveTo(y.x,y.y)}function u(){x={x:2*Math.random()-1,y:2*Math.random()-1},g=setTimeout(u,100+200*Math.random())}function c(){s.moveTo(y.x,y.y),w.x*=.95,w.y*=.95,w.x+=x.x,w.y+=x.y,y.x+=w.x,y.y+=w.y,s.lineTo(y.x,y.y),s.stroke(),(y.x<-50||y.x>v+50||y.y<-50||y.y>m+50)&&o()}function d(){p&&(window.requestAnimationFrame(d),c())}function l(){p=!1,clearTimeout(g),window.removeEventListener("resize",n)}var f=e.fitWindow,s=void 0,v=void 0,m=void 0,h=r(a),y=void 0,w=void 0,x=void 0,g=void 0;n(),window.addEventListener("resize",n),u();var p=!0;return d(),{stopAnim:l,bgColor:h}};var o=n(0),i="#F44336,#E91E63,#9C27B0,#673AB7,#3F51B5,#2196F3,#03A9F4,#00BCD4,#009688,#4CAF50,#8BC34A,#CDDC39,#FFEB3B,#FFC107,#FF9800,#FF5722".split(","),a=i.filter(function(t){return(0,o.luminance)(t)<150})},15:function(t,e,n){t.exports=n(16)},16:function(t,e,n){"use strict";var r=n(1),o=function(t){return t&&t.__esModule?t:{default:t}}(r),i=document.getElementById.bind(document);(0,o.default)(i("testCanvas"),{fitWindow:!1}),i("testDL").addEventListener("click",function(t){t.preventDefault(),i("testCanvas").toBlob(function(t){if(window.navigator.msSaveOrOpenBlob)window.navigator.msSaveBlob(t,filename);else{var e=document.createElement("a");e.setAttribute("href",window.URL.createObjectURL(t)),e.setAttribute("download","fileName.png"),e.click()}})})}});
//# sourceMappingURL=webviewtests.js.map