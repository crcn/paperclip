(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{138:function(e,r,n){"use strict";n.d(r,"a",(function(){return s})),n.d(r,"b",(function(){return d}));var t=n(0),o=n.n(t);function i(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function a(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function c(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?a(Object(n),!0).forEach((function(r){i(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function p(e,r){if(null==e)return{};var n,t,o=function(e,r){if(null==e)return{};var n,t,o={},i=Object.keys(e);for(t=0;t<i.length;t++)n=i[t],r.indexOf(n)>=0||(o[n]=e[n]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)n=i[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=o.a.createContext({}),u=function(e){var r=o.a.useContext(l),n=r;return e&&(n="function"==typeof e?e(r):c(c({},r),e)),n},s=function(e){var r=u(e.components);return o.a.createElement(l.Provider,{value:r},e.children)},f={inlineCode:"code",wrapper:function(e){var r=e.children;return o.a.createElement(o.a.Fragment,{},r)}},m=o.a.forwardRef((function(e,r){var n=e.components,t=e.mdxType,i=e.originalType,a=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),s=u(n),m=t,d=s["".concat(a,".").concat(m)]||s[m]||f[m]||i;return n?o.a.createElement(d,c(c({ref:r},l),{},{components:n})):o.a.createElement(d,c({ref:r},l))}));function d(e,r){var n=arguments,t=r&&r.mdxType;if("string"==typeof e||t){var i=n.length,a=new Array(i);a[0]=m;var c={};for(var p in r)hasOwnProperty.call(r,p)&&(c[p]=r[p]);c.originalType=e,c.mdxType="string"==typeof e?e:t,a[1]=c;for(var l=2;l<i;l++)a[l]=n[l];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},84:function(e,r,n){"use strict";n.r(r),n.d(r,"frontMatter",(function(){return a})),n.d(r,"metadata",(function(){return c})),n.d(r,"toc",(function(){return p})),n.d(r,"default",(function(){return u}));var t=n(3),o=n(7),i=(n(0),n(138)),a={id:"configure-paperclip",title:"Paperclip Configuration",sidebar_label:"Paperclip Config"},c={unversionedId:"configure-paperclip",id:"configure-paperclip",isDocsHomePage:!1,title:"Paperclip Configuration",description:"Paperclip looks for a paperclip.config.json file which provides information about your project, and how",source:"@site/docs/configure-paperclip.md",slug:"/configure-paperclip",permalink:"/docs/configure-paperclip",editUrl:"https://github.com/crcn/paperclip/edit/master/packages/paperclip-website/docs/configure-paperclip.md",version:"current",sidebar_label:"Paperclip Config",sidebar:"docs",previous:{title:"CLI Usage",permalink:"/docs/usage-cli"},next:{title:"Setting Up Webpack",permalink:"/docs/configure-webpack"}},p=[],l={toc:p};function u(e){var r=e.components,n=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(t.a)({},l,n,{components:r,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Paperclip looks for a ",Object(i.b)("inlineCode",{parentName:"p"},"paperclip.config.json")," file which provides information about your project, and how\nto compile your ",Object(i.b)("inlineCode",{parentName:"p"},"*.pc")," files. It typically lives in your project root directory alongside your ",Object(i.b)("inlineCode",{parentName:"p"},"package.json")," file."),Object(i.b)("p",null,"Here's an example of what it might look like:"),Object(i.b)("pre",null,Object(i.b)("code",Object(t.a)({parentName:"pre"},{className:"language-javascript"}),'{\n\n  // options for the target compiler "name"\n  "compilerOptions": {\n\n    // compiler that translate `*.pc` files into the target framework. \n    "name": "paperclip-compiler-react",\n\n    // (optional) compile as es6 or commonjs module. ES6 is default.\n    "module": "es6" | "commonjs",\n  },\n\n  // (optional) directory where JS & CSS files are compiled to\n  "outputDirectory": "./lib",\n\n\n  // directory where all of the Paperclip files live\n  "sourceDirectory": "./src",\n\n  // paths to module directories\n  "moduleDirectories": ["node_modules"]\n}\n')))}u.isMDXComponent=!0}}]);