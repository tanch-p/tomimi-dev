import{S as q,i as z,s as B,a as D,k as c,q as m,G as P,h as l,c as R,l as d,m as u,r as f,n as h,b as $,H as r,I as y,o as S}from"../chunks/index.fef03e7a.js";import{g as V}from"../chunks/navigation.d9bddd5d.js";function W(k){let t,a,i,e,p,v,_,x,g,s,b;return{c(){t=D(),a=c("div"),i=c("div"),e=c("p"),p=m("Welcome to tomimi.dev! "),v=c("br"),_=m(`\r
\r
			You will be redirected to the homepage shortly... `),x=c("br"),g=m(`\r
			If you are not redirected please click\r
			`),s=c("a"),b=m("here"),this.h()},l(o){P("svelte-17sy5rs",document.head).forEach(l),t=R(o),a=d(o,"DIV",{class:!0});var E=u(a);i=d(E,"DIV",{class:!0});var I=u(i);e=d(I,"P",{class:!0});var n=u(e);p=f(n,"Welcome to tomimi.dev! "),v=d(n,"BR",{}),_=f(n,`\r
\r
			You will be redirected to the homepage shortly... `),x=d(n,"BR",{}),g=f(n,`\r
			If you are not redirected please click\r
			`),s=d(n,"A",{"data-sveltekit-reload":!0,class:!0,href:!0});var j=u(s);b=f(j,"here"),j.forEach(l),n.forEach(l),I.forEach(l),E.forEach(l),this.h()},h(){document.title="tomimi.dev",h(s,"data-sveltekit-reload",""),h(s,"class","text-blue-500"),h(s,"href","/en"),h(e,"class","text-center text-near-white"),h(i,"class","max-w-7xl mx-auto"),h(a,"class","bg-neutral-800 min-h-screen flex items-center")},m(o,w){$(o,t,w),$(o,a,w),r(a,i),r(i,e),r(e,p),r(e,v),r(e,_),r(e,x),r(e,g),r(e,s),r(s,b)},p:y,i:y,o:y,d(o){o&&l(t),o&&l(a)}}}function Y(k){let t="en";return S(async()=>{{const a=window.navigator.language;a.match(/ja|ja/i)?t="ja":a.includes("zh")&&(t="zh"),await V(`/${t}`)}}),[]}class G extends q{constructor(t){super(),z(this,t,Y,W,B,{})}}export{G as component};
