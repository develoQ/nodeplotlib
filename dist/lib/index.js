!function(e,t){for(var n in t)e[n]=t[n];t.__esModule&&Object.defineProperty(e,"__esModule",{value:!0})}(exports,(()=>{"use strict";var e={432:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.stack=t.clear=t.plot=void 0;var r=n(584);Object.defineProperty(t,"plot",{enumerable:!0,get:function(){return r.plot}}),Object.defineProperty(t,"clear",{enumerable:!0,get:function(){return r.clear}}),Object.defineProperty(t,"stack",{enumerable:!0,get:function(){return r.stack}})},584:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.plot=t.stack=t.clear=t.plotContainer=t.plots=void 0;var r=n(159),o=Number(process.env.PORT)||8080,i=new r.Server(o);function s(e,n){a(e,n);var r=n?{data:e,layout:n}:{data:e};t.plots.push(r)}function a(e,t){if(!(e instanceof Array)||0===e.length)throw new TypeError("Plot data must be an array with at least 1 element");if(t&&!(t instanceof Object))throw new TypeError("Layout must be an object")}t.plots=[],t.plotContainer={},t.clear=function(){t.plots=[]},t.stack=s,t.plot=function(e,n){e&&(a(e,n),s(e,n));var r=Object.keys(t.plotContainer).length;t.plotContainer[r]={opened:!1,pending:!1,plots:t.plots},t.plots=[],i.spawn(t.plotContainer)}},159:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Server=void 0;var r=n(129),o=n(747),i=n(605),s=n(87),a=n(622),p=function(){function e(e){var t=this;this.plotsContainer={},this.sockets={},this.nextSocketID=0,this.port=e,this.instance=this.createServer(),this.instance.on("connection",(function(e){var n=t.nextSocketID++;t.sockets[n]=e,e.on("close",(function(){delete t.sockets[n]}))}))}return e.prototype.spawn=function(e){this.plotsContainer=e,this.instance.address()||this.instance.listen(this.port),this.openBrowserWindow()},e.prototype.clean=function(){this.instance.address()&&this.instance.close();for(var e=0,t=Object.values(this.sockets);e<t.length;e++)t[e].destroy();this.plotsContainer={}},e.prototype.openBrowserWindow=function(){for(var e=0,t=Object.entries(this.plotsContainer);e<t.length;e++){var n=t[e];n[1].opened||n[1].pending||(n[1].pending=!0,this.openWindow("http://localhost:"+this.port+"/plots/"+n[0]+"/index.html"))}},e.prototype.openWindow=function(e){switch(s.type()){case"Linux":r.exec("xdg-open "+e);break;case"Darwin":r.exec("open "+e);break;case"Windows_NT":r.exec("start "+e)}},e.prototype.createServer=function(){var e=this;return i.createServer((function(t,n){e.serveData(t,n)||e.serveWebsite(t,n)}))},e.prototype.serveData=function(e,t){var n=this;if(e&&e.url&&e.url.match(/data\/[0-9]+/)){var r=e.url.split("/"),o=+r[r.length-1],i=this.plotsContainer[o],s=i&&i.plots;this.plotsContainer[o].opened=!0,this.plotsContainer[o].pending=!1,t.end(JSON.stringify(s)),setTimeout((function(){return n.close(),!0}),3e3)}return!1},e.prototype.serveWebsite=function(e,t){var n=this;if(e&&e.url&&e.url.match(/plots\/[0-9]+\/index.html/)){var r=(i=e.url.split("/"))[i.length-2];o.readFile(a.join(__dirname,"..","www","index.html"),"utf-8",(function(e,n){if(e)return t.writeHead(404),void t.end(JSON.stringify(e));n=n.replace("{{plotid}}",r),t.writeHead(200),t.end(n)}))}else{if(!(e&&e.url&&(e.url.match(/nodeplotlib.min.js/)||e.url&&e.url.match(/plotly.min.js/))))return t.writeHead(404),void t.end("Server address not found");var i,s=(i=e.url.split("/"))[i.length-1];o.readFile(a.join(__dirname,"..","www",s),"utf-8",(function(e,r){if(e)return t.writeHead(404),void t.end(JSON.stringify(e));"nodeplotlib.min.js"===s&&(r=r.replace("{{port}}",""+n.port)),t.setHeader("content-type","text/javascript"),t.writeHead(200),t.end(r)}))}},e.prototype.close=function(){var e=Object.values(this.plotsContainer).reduce((function(e,t){return e||t.pending}),!1),t=Object.values(this.plotsContainer).reduce((function(e,t){return e&&t.opened}),!0);this.instance&&!e&&t&&this.clean()},e}();t.Server=p},129:e=>{e.exports=require("child_process")},747:e=>{e.exports=require("fs")},605:e=>{e.exports=require("http")},87:e=>{e.exports=require("os")},622:e=>{e.exports=require("path")}},t={};return function n(r){if(t[r])return t[r].exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}(432)})());