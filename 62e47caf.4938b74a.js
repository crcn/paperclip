(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{153:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return c})),t.d(n,"metadata",(function(){return p})),t.d(n,"rightToc",(function(){return o})),t.d(n,"default",(function(){return u}));var r=t(2),i=t(9),a=(t(0),t(178)),c={id:"usage-cli",title:"Command line tools",sidebar_label:"CLI"},p={id:"usage-cli",isDocsHomePage:!1,title:"Command line tools",description:"Setup",source:"@site/docs/usage-cli.md",permalink:"/docs/usage-cli",editUrl:"https://github.com/crcn/paperclip/packages/edit/master/website/docs/usage-cli.md",sidebar_label:"CLI",sidebar:"docs",previous:{title:"Paperclip Syntax",permalink:"/docs/usage-syntax"},next:{title:"Configuring Paperclip",permalink:"/docs/configuring-paperclip"}},o=[{value:"Setup",id:"setup",children:[]},{value:"Examples",id:"examples",children:[]}],l={rightToc:o};function u(e){var n=e.components,t=Object(i.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},l,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("h2",{id:"setup"},"Setup"),Object(a.b)("p",null,"To initialize a new project, run ",Object(a.b)("inlineCode",{parentName:"p"},"paperclip init"),". This will ask you a few questions, then write a ",Object(a.b)("inlineCode",{parentName:"p"},"paperclip.config.json")," file that the\ncompiler will use."),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"Documentation for ",Object(a.b)("inlineCode",{parentName:"p"},"paperclip.config.json")," can be viewed ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/configuring-paperclip"}),"here"),".")),Object(a.b)("p",null,"Next, add a ",Object(a.b)("inlineCode",{parentName:"p"},".pc")," file with the following content:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-html"}),'<div export component as="Test">\n  {children}\n</div>\n')),Object(a.b)("p",null,"then run:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"npx paperclip build --write\n")),Object(a.b)("p",null,"\u261d\ud83c\udffbThis will compile your paperclip file to JavaScript code. Alternatively, you can generate TypeScript definition files with\nthe following command:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"npx paperclip build --write --definition\n")),Object(a.b)("p",null,"\u261d\ud83c\udffbThis is useful if you're using Paperclip within a TypeScript project. If you're doing that, I recommend you add this\ncommand a s a script in your package.json file. For example:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-javascript"}),'{\n  "name": "my-module-name",\n  "scripts": {\n    "build:paperclip-definitions": "paperclip build --definition --write",\n    "build:watch:paperclip-definitions": "paperclip build --definition --write --watch",\n  }\n}\n')),Object(a.b)("h2",{id:"examples"},"Examples"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{}),"\n# show general help menu\npaperclip help \n\n# show command help menu\npaperclip [command] help\n\n# build paperclip files with paperclip.config.json from current directory\npaperclip build\n\n# build typed definition files & start file watcher\npaperclip build --definition --watch\n")))}u.isMDXComponent=!0},178:function(e,n,t){"use strict";t.d(n,"a",(function(){return s})),t.d(n,"b",(function(){return m}));var r=t(0),i=t.n(r);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function p(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var l=i.a.createContext({}),u=function(e){var n=i.a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):p(p({},n),e)),t},s=function(e){var n=u(e.components);return i.a.createElement(l.Provider,{value:n},e.children)},b={inlineCode:"code",wrapper:function(e){var n=e.children;return i.a.createElement(i.a.Fragment,{},n)}},d=i.a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,l=o(e,["components","mdxType","originalType","parentName"]),s=u(t),d=r,m=s["".concat(c,".").concat(d)]||s[d]||b[d]||a;return t?i.a.createElement(m,p(p({ref:n},l),{},{components:t})):i.a.createElement(m,p({ref:n},l))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=t.length,c=new Array(a);c[0]=d;var p={};for(var o in n)hasOwnProperty.call(n,o)&&(p[o]=n[o]);p.originalType=e,p.mdxType="string"==typeof e?e:r,c[1]=p;for(var l=2;l<a;l++)c[l]=t[l];return i.a.createElement.apply(null,c)}return i.a.createElement.apply(null,t)}d.displayName="MDXCreateElement"}}]);