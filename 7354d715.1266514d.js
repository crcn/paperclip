(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{120:function(e,n,t){"use strict";t.d(n,"a",(function(){return u})),t.d(n,"b",(function(){return d}));var r=t(0),a=t.n(r);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=a.a.createContext({}),s=function(e){var n=a.a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},u=function(e){var n=s(e.components);return a.a.createElement(p.Provider,{value:n},e.children)},b={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},m=a.a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=s(t),m=r,d=u["".concat(c,".").concat(m)]||u[m]||b[m]||o;return t?a.a.createElement(d,i(i({ref:n},p),{},{components:t})):a.a.createElement(d,i({ref:n},p))}));function d(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,c=new Array(o);c[0]=m;var i={};for(var l in n)hasOwnProperty.call(n,l)&&(i[l]=n[l]);i.originalType=e,i.mdxType="string"==typeof e?e:r,c[1]=i;for(var p=2;p<o;p++)c[p]=t[p];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},86:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return c})),t.d(n,"metadata",(function(){return i})),t.d(n,"rightToc",(function(){return l})),t.d(n,"default",(function(){return s}));var r=t(2),a=t(6),o=(t(0),t(120)),c={id:"usage-react",title:"Using Paperclip In React Apps",sidebar_label:"React"},i={id:"usage-react",isDocsHomePage:!1,title:"Using Paperclip In React Apps",description:"Installation",source:"@site/docs/usage-react.md",permalink:"/docs/usage-react",editUrl:"https://github.com/crcn/paperclip/edit/master/packages/paperclip-website/docs/usage-react.md",sidebar_label:"React",sidebar:"docs",previous:{title:"Paperclip Syntax",permalink:"/docs/usage-syntax"},next:{title:"CLI Usage",permalink:"/docs/usage-cli"}},l=[{value:"Installation",id:"installation",children:[]},{value:"Importing *.pc files",id:"importing-pc-files",children:[]},{value:"classNames",id:"classnames",children:[]},{value:"Adding props",id:"adding-props",children:[]}],p={rightToc:l};function s(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},p,t,{components:n,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"installation"},"Installation"),Object(o.b)("p",null,"To use Paperclip in React, you'll need to install the compiler first:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-sh"}),"npm install paperclip-compiler-react --save-dev\n")),Object(o.b)("p",null,"Then in your ",Object(o.b)("inlineCode",{parentName:"p"},"paperclip.config.json")," file, change ",Object(o.b)("inlineCode",{parentName:"p"},"compilerOptions.name")," to look like:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-json"}),'{\n  "compilerOptions": {\n    "name": "paperclip-compiler-react"\n  },\n  "sourceDirectory": "./src"\n}\n')),Object(o.b)("p",null,"After that you're good to go! From there you can start importing UI files into your app by either using ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/configure-webpack"}),"Webpack"),", or by using the ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/usage-cli"}),"CLI tool")," to generate JavaScript files. "),Object(o.b)("h2",{id:"importing-pc-files"},"Importing *.pc files"),Object(o.b)("p",null,"Think of ",Object(o.b)("inlineCode",{parentName:"p"},"*.pc")," files like any other JavaScript file. Just import them directly like so:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-tsx"}),'\n// I like to keep all of the styles in a single namespace\n// to communicate that `ui.ComponentName` is a primitive comming from\n// a Paperclip file. \nimport * as ui from "./counter.pc";\n\n// Another option\n// import * as styles from "./counter.pc";\n\nimport React, { useState } from "react";\n\nexport default () => {\n  const [currentCount, setCount] = useState(0);\n  const onClick = () => setCount(currentCount + 1);\n  return <ui.Container onClick={onClick}>\n    <ui.CurentCount>{currentCount}</ui.CurrentCount>\n  </ui.Container>;\n};\n')),Object(o.b)("p",null,"\u261d\ud83c\udffb This example uses the following Paperclip UI file:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-html",metastring:"live",live:!0}),'<style>\n   .Container {\n     font-family: Helvetica;\n     cursor: pointer;\n   }\n   .CurrentCount {\n     font-weight: 400;\n   }\n</style>\n\n\x3c!-- Components --\x3e\n\n<div export component as="Container" className="Container">\n  Current count: {children}\n</div>\n<div export component as="CurrentCount" className="CurrentCount">\n  {children}\n</div>\n\n\x3c!-- Previews --\x3e\n\n<Container>\n  <CurrentCount>\n    50\n  </CurrentCount>\n</Container>\n')),Object(o.b)("p",null,"Note that in order to import components from Paperclip files, they'll each need their own ",Object(o.b)("inlineCode",{parentName:"p"},"export")," attribute. "),Object(o.b)("h2",{id:"classnames"},"classNames"),Object(o.b)("p",null,"Styles defined in ",Object(o.b)("inlineCode",{parentName:"p"},"*.pc")," files are scoped, so if you want access to one of those styles outside of that file, you'll need to\nuse ",Object(o.b)("inlineCode",{parentName:"p"},"classNames"),". "),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Syntax")),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-javascript"}),'import * as ui from "./counter.pc";\n<div className={ui.classNames["classname-defined-in-paperclip"]} />\n')),Object(o.b)("p",null,"Note that you need to ",Object(o.b)("em",{parentName:"p"},"explicitly")," export ",Object(o.b)("inlineCode",{parentName:"p"},"classname-defined-in-paperclip")," within your Paperclip document using ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/usage-syntax#export"}),"@export"),", otherwise it's\nnot accessible. "),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Example")),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-html"}),"<style>\n  @export {\n    .my-style {\n      color: red;\n    }\n  }\n</style>\n")),Object(o.b)("h2",{id:"adding-props"},"Adding props"),Object(o.b)("p",null,"Props can be defined just like any ordinary React component. Take this template for example:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-html"}),'<div export component as="Button" {onClick?}>\n  {children}\n</div>\n')),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"The ",Object(o.b)("inlineCode",{parentName:"p"},"?")," in ",Object(o.b)("inlineCode",{parentName:"p"},"{onClick?}")," flags the prop as optional.")),Object(o.b)("p",null,"In React code, we can define our ",Object(o.b)("inlineCode",{parentName:"p"},"onClick")," handler like so:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-html"}),'import * as styles from "./button.pc";\n\n<styles.Button onClick={handleClick} />\n')))}s.isMDXComponent=!0}}]);