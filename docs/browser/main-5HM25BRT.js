import{a as M}from"./chunk-MZM3EREW.js";import{a as g,b,c as C}from"./chunk-WCTVL32Z.js";import{B as s,C as r,T as i,U as a,V as l,ca as m,ua as p,va as u,wa as f,x as n,ya as h,za as d}from"./chunk-J4LSKXC6.js";var y=[{path:"",redirectTo:"home",pathMatch:"full"},{path:"home",loadChildren:()=>import("./chunk-AUMRDKYP.js").then(t=>t.HomeModule)},{path:"game",loadChildren:()=>import("./chunk-K76L3NEC.js").then(t=>t.GameModule)}],O=(()=>{let o=class o{};o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=r({type:o}),o.\u0275inj=n({imports:[d.forRoot(y),d]});let t=o;return t})();var P=(()=>{let o=class o{constructor(){this.title="jogo-duelo"}};o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=s({type:o,selectors:[["app-root"]],decls:12,vars:0,consts:[[1,"menu"],["routerLink","home",1,"active"],["routerLink","game"],[1,"main"],[1,"scrolling-background"]],template:function(e,w){e&1&&(i(0,"body")(1,"div",0)(2,"ul")(3,"li")(4,"a",1),m(5,"Home"),a()(),i(6,"li")(7,"a",2),m(8,"Iniciar Jogo"),a()()()()(),i(9,"main",3),l(10,"router-outlet")(11,"div",4),a())},dependencies:[f,h],styles:["body[_ngcontent-%COMP%], html[_ngcontent-%COMP%]{margin:0;padding:0;overflow:hidden;width:100%;height:100%;font-family:Courier New,Courier,monospace}.menu[_ngcontent-%COMP%]{background-color:tan;padding:10px 20px;border-bottom:4px solid #8b4513;box-shadow:0 4px 6px #0000001a}.menu[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{list-style:none;margin:0;padding:0;display:flex;justify-content:center}.menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin:0 15px}.menu[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:#fff;font-size:18px;font-weight:700;padding:5px 10px;border:2px solid #d2691e;border-radius:5px;transition:background-color .3s,color .3s}.menu[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{background-color:#d2691e;color:#fff}.menu[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%]{background-color:sienna;color:#fff}.menu[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{margin-right:8px;font-size:20px}.scrolling-background[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100%;height:100%;background-image:url(/assets/bg-wildwest.png);background-repeat:repeat-x;background-size:auto 100%;background-position:0 0;animation:_ngcontent-%COMP%_scrollBackground 15s linear infinite;z-index:-1}@keyframes _ngcontent-%COMP%_scrollBackground{0%{background-position:0 0}to{background-position:-200% 0}}"]});let t=o;return t})();var k=(()=>{let o=class o{};o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=r({type:o,bootstrap:[P]}),o.\u0275inj=n({imports:[u,O,g,M,C,b]});let t=o;return t})();var _={production:!0};_.production&&void 0;p().bootstrapModule(k).catch(t=>console.error(t));
