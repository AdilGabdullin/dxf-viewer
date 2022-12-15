(function(e){function t(t){for(var s,a,n=t[0],o=t[1],c=t[2],d=0,p=[];d<n.length;d++)a=n[d],Object.prototype.hasOwnProperty.call(l,a)&&l[a]&&p.push(l[a][0]),l[a]=0;for(s in o)Object.prototype.hasOwnProperty.call(o,s)&&(e[s]=o[s]);u&&u(t);while(p.length)p.shift()();return i.push.apply(i,c||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],s=!0,n=1;n<r.length;n++){var o=r[n];0!==l[o]&&(s=!1)}s&&(i.splice(t--,1),e=a(a.s=r[0]))}return e}var s={},l={app:0},i=[];function a(t){if(s[t])return s[t].exports;var r=s[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=s,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)a.d(r,s,function(t){return e[t]}.bind(null,s));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/bim/dxf/";var n=window["webpackJsonp"]=window["webpackJsonp"]||[],o=n.push.bind(n);n.push=t,n=n.slice();for(var c=0;c<n.length;c++)t(n[c]);var u=o;i.push([1,"chunk-vendors"]),r()})({0:function(e,t){},"01dd":function(e,t,r){e.exports=r.p+"fonts/NotoSansDisplay-SemiCondensedLightItalic.b541af1f.ttf"},1:function(e,t,r){e.exports=r("56d7")},"17aa":function(e,t,r){"use strict";r("a3a8")},2891:function(e,t,r){e.exports=r.p+"fonts/Roboto-LightItalic.d1efcd4d.ttf"},"487c":function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t);var s=r("2b0e"),l=function(){var e=this,t=e._self._c;return t("q-layout",{attrs:{view:"hHh lpr fff","data-nosnippet":""}},[t("q-header",[t("q-toolbar",[t("q-toolbar-title",{attrs:{shrink:!0}},[e._v("DXF viewer")]),t("q-file",{staticClass:"q-ml-xl",staticStyle:{"max-width":"300px",display:"none"},attrs:{color:"white","label-color":"white",filled:"","bottom-slots":"",clearable:"",dense:"",value:e.inputFile,label:"Select file or drag here",accept:".dxf",dark:""},on:{input:e._OnFileSelected,clear:e._OnFileCleared},scopedSlots:e._u([{key:"before",fn:function(){return[t("q-icon",{attrs:{name:"folder_open",color:"white"}})]},proxy:!0},{key:"hint",fn:function(){return[t("span",{staticClass:"text-white"},[e._v("File is processed locally in your browser")])]},proxy:!0},{key:"after",fn:function(){return[t("q-btn",{attrs:{dense:"",flat:"",label:"URL"},on:{click:function(t){e.urlDialog=!0}}})]},proxy:!0}])}),t("q-btn",{staticClass:"q-ml-lg",attrs:{icon:"help",label:"About"},on:{click:function(t){e.aboutDialog=!0}}}),t("q-space"),t("q-btn",{staticClass:"q-mx-sm github",staticStyle:{display:"none"},attrs:{icon:"fab fa-github",color:"primary",label:"dxf-viewer on GitHub","no-caps":"",type:"a",href:"https://github.com/vagran/dxf-viewer"}}),t("q-btn",{staticClass:"q-mx-sm github",staticStyle:{display:"none"},attrs:{icon:"fab fa-github",color:"primary",label:"This example on GitHub","no-caps":"",type:"a",href:"https://github.com/vagran/dxf-viewer-example-src"}})],1)],1),t("q-page-container",[t("ViewerPage",{attrs:{dxfUrl:e.dxfUrl}},[null===e.inputFile?t("div",{staticClass:"centralUploader row justify-center items-center"},[t("div",{staticClass:"col-auto",staticStyle:{width:"300px"}},[t("q-file",{staticClass:"col",attrs:{filled:"","bottom-slots":"",clearable:"",value:e.inputFile,label:"Select file or drag here",accept:".dxf"},on:{input:e._OnFileSelected,clear:e._OnFileCleared},scopedSlots:e._u([{key:"before",fn:function(){return[t("q-icon",{attrs:{name:"folder_open",size:"xl"}})]},proxy:!0},{key:"hint",fn:function(){return[t("span",[e._v("File is processed locally in your browser")])]},proxy:!0}],null,!1,935147319)})],1),t("div",{staticClass:"col-auto q-mx-lg q-pb-lg"},[t("q-btn",{attrs:{label:"Load URL"},on:{click:function(t){e.urlDialog=!0}}})],1)]):e._e()])],1),t("q-dialog",{model:{value:e.aboutDialog,callback:function(t){e.aboutDialog=t},expression:"aboutDialog"}},[t("q-card",[t("q-card-section",{staticClass:"row items-center q-pb-sm"},[t("div",{staticClass:"text-h6"},[e._v("About")]),t("q-space"),t("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",flat:"",round:"",dense:""}})],1),t("q-separator"),t("q-card-section",{staticClass:"scroll",staticStyle:{"max-height":"50vh"},domProps:{innerHTML:e._s(e.aboutHtml)}})],1)],1),t("q-dialog",{model:{value:e.urlDialog,callback:function(t){e.urlDialog=t},expression:"urlDialog"}},[t("q-card",[t("q-card-section",{staticClass:"row items-center q-pb-sm"},[t("div",{staticClass:"text-h6"},[e._v("Load URL")]),t("q-space"),t("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",flat:"",round:"",dense:""}})],1),t("q-separator"),t("q-card-section",[t("div",{staticClass:"q-mb-lg"},[t("a",{attrs:{href:"https://startpage.com/sp/search?q=SECTION%20HEADER%20filetype:dxf",target:"_blank"}},[e._v("Find some examples")])]),t("q-form",{staticClass:"q-gutter-md",staticStyle:{width:"400px"},on:{submit:e._OnUrl}},[t("q-input",{attrs:{filled:"",label:"Input URL here","bottom-slots":""},scopedSlots:e._u([{key:"hint",fn:function(){return[t("span",[e._v("Uses "),t("a",{attrs:{href:"https://allorigins.win"}},[e._v("AllOrigins")]),e._v(" CORS proxy")])]},proxy:!0}]),model:{value:e.inputUrl,callback:function(t){e.inputUrl=t},expression:"inputUrl"}}),t("div",[t("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Submit",type:"submit",color:"primary"}})],1)],1)],1)],1)],1)],1)},i=[],a=function(){var e=this,t=e._self._c;return t("q-page",{staticClass:"row items-stretch root"},[t("div",{staticClass:"col relative-position"},[e._t("default"),t("DxfViewer",{ref:"viewer",attrs:{dxfUrl:e.dxfUrl,fonts:e.fonts},on:{"dxf-loaded":e._OnLoaded,"dxf-cleared":e._OnCleared,"dxf-message":e._OnMessage}})],2),t("div",{staticClass:"col-auto layersCol"},[t("LayersList",{attrs:{layers:e.layers},on:{toggleLayer:e._OnToggleLayer,toggleAll:e._OnToggleAll}})],1)])},n=[],o=function(){var e=this,t=e._self._c;return t("div",{ref:"canvasContainer",staticClass:"canvasContainer"},[t("q-inner-loading",{staticStyle:{"z-index":"10"},attrs:{showing:e.isLoading,color:"primary"}}),null!==e.progress?t("div",{staticClass:"progress"},[t("q-linear-progress",{attrs:{color:"primary",indeterminate:e.progress<0,value:e.progress}}),null!==e.progressText?t("div",{staticClass:"progressText"},[e._v(e._s(e.progressText))]):e._e()],1):e._e(),null!==e.error?t("div",{staticClass:"error",attrs:{title:e.error}},[t("q-icon",{staticClass:"text-red",staticStyle:{"font-size":"4rem"},attrs:{name:"warning"}}),e._v(" Error occurred: "+e._s(e.error)+" ")],1):e._e()],1)},c=[],u=r("c686"),d=r("5a89");function p(){return new Worker(r.p+"js/DxfViewerWorker-legacy.4ef90ca2.worker.js")}var f={name:"DxfViewer",props:{dxfUrl:{default:null},fonts:{default:null},options:{default(){return{clearColor:new d["c"]("#fff"),autoResize:!0,colorCorrection:!0}}}},data(){return{isLoading:!1,progress:null,progressText:null,curProgressPhase:null,error:null}},watch:{async dxfUrl(e){null!==e?await this.Load(e):(this.dxfViewer.Clear(),this.error=null,this.isLoading=!1,this.progress=null)}},methods:{async Load(e){this.isLoading=!0,this.error=null;try{await this.dxfViewer.Load({url:e,fonts:this.fonts,progressCbk:this._OnProgress.bind(this),workerFactory:p})}catch(t){console.warn(t),this.error=t.toString()}finally{this.isLoading=!1,this.progressText=null,this.progress=null,this.curProgressPhase=null}},GetViewer(){return this.dxfViewer},_OnProgress(e,t,r){if(e!==this.curProgressPhase){switch(e){case"font":this.progressText="Fetching fonts...";break;case"fetch":this.progressText="Fetching file...";break;case"parse":this.progressText="Parsing file...";break;case"prepare":this.progressText="Preparing rendering data...";break}this.curProgressPhase=e}this.progress=null===r?-1:t/r}},mounted(){this.dxfViewer=new u["a"](this.$refs.canvasContainer,this.options);const e=e=>{this.dxfViewer.Subscribe(e,t=>this.$emit("dxf-"+e,t))};for(const t of["loaded","cleared","destroyed","resized","pointerdown","pointerup","viewChanged","message"])e(t)},destroyed(){this.dxfViewer.Destroy(),this.dxfViewer=null}},h=f,g=(r("f40b"),r("2877")),b=Object(g["a"])(h,o,c,!1,null,"43d73815",null),y=b.exports,m=r("2891"),x=r.n(m),v=r("01dd"),w=r.n(v),_=r("af29"),q=r.n(_),L=r("ee2f"),C=r.n(L),O=function(){var e=this,t=e._self._c;return t("q-scroll-area",{staticClass:"root"},[t("q-list",{attrs:{dense:""}},[t("q-item-label",{attrs:{header:""}},[e._v("Layers")]),null!==e.layers?t("q-item",{attrs:{tag:"label"}},[t("q-item-section",{attrs:{side:"",top:""}},[t("q-checkbox",{attrs:{value:e.showAll},on:{input:e._ToggleAll}})],1),t("q-item-section",[t("q-item-label",{staticClass:"text-italic"},[e._v("All layers")])],1)],1):e._e(),e._l(e.layers,(function(r){return null!==e.layers?t("q-item",{key:r.name,attrs:{tag:"label"}},[t("q-item-section",{staticClass:"q-pa-none",attrs:{side:""}},[t("q-icon",{style:{color:e._GetCssColor(r.color)},attrs:{name:"label"}})],1),t("q-item-section",{attrs:{side:"",top:""}},[t("q-checkbox",{attrs:{value:r.isVisible},on:{input:t=>e._ToggleLayer(r,t)}})],1),t("q-item-section",[t("q-item-label",[e._v(e._s(r.name))])],1)],1):e._e()}))],2)],1)},U=[],k={name:"LayersList",props:{layers:{type:Array,default:null}},watch:{layers(){this.showAll=null}},data(){return{showAll:null}},methods:{_ToggleLayer(e,t){this.$emit("toggleLayer",e,t),this.showAll=null},_ToggleAll(e){this.showAll=e,this.$emit("toggleAll",e)},_GetCssColor(e){let t=e.toString(16);while(t.length<6)t="0"+t;return"#"+t}}},S=k,F=(r("17aa"),Object(g["a"])(S,O,U,!1,null,"fe487658",null)),T=F.exports,P={name:"ViewerPage",components:{LayersList:T,DxfViewer:y},props:{dxfUrl:{type:String}},data(){return{layers:null}},methods:{_OnLoaded(){const e=this.$refs.viewer.GetViewer().GetLayers();e.forEach(e=>s["a"].set(e,"isVisible",!0)),this.layers=e},_OnCleared(){this.layers=null},_OnToggleLayer(e,t){e.isVisible=t,this.$refs.viewer.GetViewer().ShowLayer(e.name,t)},_OnToggleAll(e){if(this.layers)for(const t of this.layers)t.isVisible!==e&&this._OnToggleLayer(t,e)},_OnMessage(e){let t="info";switch(e.detail.level){case u["a"].MessageLevel.WARN:t="warning";break;case u["a"].MessageLevel.ERROR:t="negative";break}this.$q.notify({type:t,message:e.detail.message})}},created(){this.fonts=[x.a,w.a,q.a,C.a]}},Q=P,R=(r("cd30"),Object(g["a"])(Q,a,n,!1,null,"3ea4d6e6",null)),j=R.exports,A={components:{ViewerPage:j},data(){return{dxfUrl:null,inputFile:null,isLocalFile:!1,aboutDialog:!1,urlDialog:!1,inputUrl:null}},methods:{_OnFileSelected(e){e?(this.dxfUrl&&this.isLocalFile&&URL.revokeObjectURL(this.dxfUrl),this.isLocalFile=!0,this.inputFile=e,this.dxfUrl=URL.createObjectURL(e)):this._OnFileCleared()},_OnFileCleared(){this.inputFile&&(this.inputFile=null,URL.revokeObjectURL(this.dxfUrl),this.dxfUrl=null,this.$q.notify({type:"info",message:"File cleared"}))},_OnUrl(){if(null===this.inputUrl)return;const e=this.inputUrl.trim();""!==e&&(this.dxfUrl&&this.isLocalFile&&URL.revokeObjectURL(this.dxfUrl),this.isLocalFile=!1,this.inputFile=new File(["remote_file"],e,{type:"text/plain"}),this.dxfUrl="https://api.allorigins.win/raw?url="+encodeURIComponent(e))}},created(){const e=document.getElementById("about");this.aboutHtml=e.innerHTML,e.style.display="none",document.getElementById("noscript").innerText=e.innerText,fetch(`./dxf/${document.body.dataset.dxf}.dxf`).then(e=>e.text()).then(e=>{const t=new File([e],"/example.dxf",{type:"text/plain"});this.inputFile=t,this.isLocalFile=!0,this.dxfUrl=URL.createObjectURL(t)})},destroyed(){this.dxfUrl&&URL.revokeObjectURL(this.dxfUrl)}},D=A,V=(r("8cee"),Object(g["a"])(D,l,i,!1,null,"9ee1bcd2",null)),I=V.exports,M=(r("487c"),r("0ca9"),r("e54f"),r("573e"),r("fe09")),H=[M["D"],{components:{QBtn:M["c"],QCard:M["d"],QCardSection:M["e"],QCheckbox:M["f"],QDialog:M["g"],QFile:M["h"],QFooter:M["i"],QForm:M["j"],QHeader:M["k"],QIcon:M["l"],QInnerLoading:M["m"],QInput:M["n"],QItem:M["o"],QItemLabel:M["p"],QItemSection:M["q"],QLayout:M["r"],QLinearProgress:M["s"],QList:M["t"],QPage:M["u"],QPageContainer:M["v"],QScrollArea:M["w"],QSeparator:M["x"],QSpace:M["y"],QSpinner:M["z"],QToggle:M["A"],QToolbar:M["B"],QToolbarTitle:M["C"]},plugins:{Notify:M["b"],ClosePopup:M["a"]}}];s["a"].use(...H),new s["a"]({el:"#app",render:e=>e(I)})},"8cee":function(e,t,r){"use strict";r("a54a")},a3a8:function(e,t,r){},a54a:function(e,t,r){},af29:function(e,t,r){e.exports=r.p+"fonts/HanaMinA.b48893dc.ttf"},b35b:function(e,t,r){},cd30:function(e,t,r){"use strict";r("b35b")},dd66:function(e,t,r){},ee2f:function(e,t,r){e.exports=r.p+"fonts/NanumGothic-Regular.3cbe9257.ttf"},f40b:function(e,t,r){"use strict";r("dd66")}});
//# sourceMappingURL=app-legacy.b589560c.js.map