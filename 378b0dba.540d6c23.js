(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{114:function(e,r,n){"use strict";n.d(r,"a",(function(){return s})),n.d(r,"b",(function(){return f}));var t=n(0),o=n.n(t);function a(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function i(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function c(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?i(Object(n),!0).forEach((function(r){a(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function u(e,r){if(null==e)return{};var n,t,o=function(e,r){if(null==e)return{};var n,t,o={},a=Object.keys(e);for(t=0;t<a.length;t++)n=a[t],r.indexOf(n)>=0||(o[n]=e[n]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)n=a[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=o.a.createContext({}),p=function(e){var r=o.a.useContext(l),n=r;return e&&(n="function"==typeof e?e(r):c(c({},r),e)),n},s=function(e){var r=p(e.components);return o.a.createElement(l.Provider,{value:r},e.children)},d={inlineCode:"code",wrapper:function(e){var r=e.children;return o.a.createElement(o.a.Fragment,{},r)}},b=o.a.forwardRef((function(e,r){var n=e.components,t=e.mdxType,a=e.originalType,i=e.parentName,l=u(e,["components","mdxType","originalType","parentName"]),s=p(n),b=t,f=s["".concat(i,".").concat(b)]||s[b]||d[b]||a;return n?o.a.createElement(f,c(c({ref:r},l),{},{components:n})):o.a.createElement(f,c({ref:r},l))}));function f(e,r){var n=arguments,t=r&&r.mdxType;if("string"==typeof e||t){var a=n.length,i=new Array(a);i[0]=b;var c={};for(var u in r)hasOwnProperty.call(r,u)&&(c[u]=r[u]);c.originalType=e,c.mdxType="string"==typeof e?e:t,i[1]=c;for(var l=2;l<a;l++)i[l]=n[l];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},70:function(e,r,n){"use strict";n.r(r),n.d(r,"frontMatter",(function(){return i})),n.d(r,"metadata",(function(){return c})),n.d(r,"rightToc",(function(){return u})),n.d(r,"default",(function(){return p}));var t=n(2),o=n(6),a=(n(0),n(114)),i={id:"guide-workarounds",title:"Workarounds",sidebar_label:"Workarounds"},c={id:"guide-workarounds",isDocsHomePage:!1,title:"Workarounds",description:"Paperclip will require some finnessing for certain cases.",source:"@site/docs/guide-workarounds.md",permalink:"/docs/guide-workarounds",editUrl:"https://github.com/crcn/paperclip/edit/master/packages/paperclip-website/docs/guide-workarounds.md",sidebar_label:"Workarounds"},u=[{value:"Using third-party CSS",id:"using-third-party-css",children:[]}],l={rightToc:u};function p(e){var r=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(t.a)({},l,n,{components:r,mdxType:"MDXLayout"}),Object(a.b)("p",null,"Paperclip will require some finnessing for certain cases. "),Object(a.b)("h2",{id:"using-third-party-css"},"Using third-party CSS"),Object(a.b)("p",null,"If you're using third-party CSS such as Bootstrap or Tailwind, you'll need to move the CSS over\nto a ",Object(a.b)("inlineCode",{parentName:"p"},"*.pc")," file. For example:"),Object(a.b)("pre",null,Object(a.b)("code",Object(t.a)({parentName:"pre"},{className:"language-css"}),".my-1 {\n  /* tailwind code */\n}\n\n.my-2 {\n  /* tailwind code */\n}\n")),Object(a.b)("p",null,"Must be converted to Paperclip like so:"),Object(a.b)("pre",null,Object(a.b)("code",Object(t.a)({parentName:"pre"},{className:"language-css"}),"<style>\n  .my-1 {\n    /* tailwind code */\n  }\n\n  .my-2 {\n    /* tailwind code */\n  }\n</style>\n")))}p.isMDXComponent=!0}}]);