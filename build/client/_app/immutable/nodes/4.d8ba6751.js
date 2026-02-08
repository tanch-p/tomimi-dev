import{S as q,i as z,s as B,a as D,k as c,q as m,M,h as l,c as P,l as d,m as u,r as f,n as h,b as $,E as r,F as y,o as R}from"../chunks/index.51467544.js";import{g as S}from"../chunks/navigation.4c877c85.js";function V(E){let t,a,i,e,p,v,_,x,g,s,b;return{c(){t=D(),a=c("div"),i=c("div"),e=c("p"),p=m("Welcome to tomimi.dev! "),v=c("br"),_=m(`\r
\r
			You will be redirected to the homepage shortly... `),x=c("br"),g=m(`\r
			If you are not redirected please click\r
			`),s=c("a"),b=m("here"),this.h()},l(o){M("svelte-17sy5rs",document.head).forEach(l),t=P(o),a=d(o,"DIV",{class:!0});var k=u(a);i=d(k,"DIV",{class:!0});var I=u(i);e=d(I,"P",{class:!0});var n=u(e);p=f(n,"Welcome to tomimi.dev! "),v=d(n,"BR",{}),_=f(n,`\r
\r
			You will be redirected to the homepage shortly... `),x=d(n,"BR",{}),g=f(n,`\r
			If you are not redirected please click\r
			`),s=d(n,"A",{"data-sveltekit-reload":!0,class:!0,href:!0});var j=u(s);b=f(j,"here"),j.forEach(l),n.forEach(l),I.forEach(l),k.forEach(l),this.h()},h(){document.title="tomimi.dev",h(s,"data-sveltekit-reload",""),h(s,"class","text-blue-500"),h(s,"href","/en"),h(e,"class","text-center text-near-white"),h(i,"class","max-w-7xl mx-auto"),h(a,"class","bg-neutral-800 min-h-screen flex items-center")},m(o,w){$(o,t,w),$(o,a,w),r(a,i),r(i,e),r(e,p),r(e,v),r(e,_),r(e,x),r(e,g),r(e,s),r(s,b)},p:y,i:y,o:y,d(o){o&&l(t),o&&l(a)}}}function W(E){let t="en";return R(async()=>{{const a=window.navigator.language;a.match(/ja|ja/i)?t="ja":a.includes("zh")&&(t="zh"),await S(`/${t}`)}}),[]}class C extends q{constructor(t){super(),z(this,t,W,V,B,{})}}export{C as component};
