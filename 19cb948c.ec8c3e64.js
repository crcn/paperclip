(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{121:function(e,n,t){"use strict";t.d(n,"a",(function(){return u})),t.d(n,"b",(function(){return g}));var r=t(0),a=t.n(r);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=a.a.createContext({}),l=function(e){var n=a.a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},u=function(e){var n=l(e.components);return a.a.createElement(p.Provider,{value:n},e.children)},b={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},f=a.a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=l(t),f=r,g=u["".concat(c,".").concat(f)]||u[f]||b[f]||i;return t?a.a.createElement(g,o(o({ref:n},p),{},{components:t})):a.a.createElement(g,o({ref:n},p))}));function g(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,c=new Array(i);c[0]=f;var o={};for(var s in n)hasOwnProperty.call(n,s)&&(o[s]=n[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,c[1]=o;for(var p=2;p<i;p++)c[p]=t[p];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,t)}f.displayName="MDXCreateElement"},62:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return c})),t.d(n,"metadata",(function(){return o})),t.d(n,"rightToc",(function(){return s})),t.d(n,"default",(function(){return l}));var r=t(2),a=t(6),i=(t(0),t(121)),c={id:"configure-percy",title:"Setting Up Visual Regression Tests",sidebar_label:"Percy"},o={id:"configure-percy",isDocsHomePage:!1,title:"Setting Up Visual Regression Tests",description:"Installation",source:"@site/docs/configure-percy.md",permalink:"/docs/configure-percy",editUrl:"https://github.com/crcn/paperclip/edit/master/packages/paperclip-website/docs/configure-percy.md",sidebar_label:"Percy",sidebar:"docs",previous:{title:"TypeScript Usage",permalink:"/docs/configure-typescript"}},s=[{value:"Installation",id:"installation",children:[]},{value:"Setting up with GitHub actions",id:"setting-up-with-github-actions",children:[]}],p={rightToc:s};function l(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},p,t,{components:n,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"installation"},"Installation"),Object(i.b)("p",null,"Paperclip integrates with ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://percy.io"}),"Percy")," to allow you test for CSS bugs in your Paperclip UI files. To get started, install the NPM module:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-sh"}),"npm install percy percy-paperclip --save-dev\n")),Object(i.b)("p",null,"Next, grab your percy token, then run the following command in the same directory as your ",Object(i.b)("inlineCode",{parentName:"p"},"paperclip.config.json")," file:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-sh"}),"PERCY_TOKEN=[TOKEN] percy exec -- percy-paperclip\n")),Object(i.b)("p",null,"After that, you should see something like this:"),Object(i.b)("p",null,Object(i.b)("img",Object(r.a)({parentName:"p"},{src:"/img/snapshot.gif",alt:"Percy demo"}))),Object(i.b)("h2",{id:"setting-up-with-github-actions"},"Setting up with GitHub actions"),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"percy-paperclip")," pairs nicely with GitHub actions, especially for PR checks. Here's a GitHub action you can use: "),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-yml"}),'name: PR Checks\non:  \n  pull_request\n\njobs:\n  visual-regression-test:\n    name: Visual Regression Test\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v2\n      - uses: actions/setup-node@v1\n      - uses: actions/checkout@v2\n        with:\n          fetch-depth: 0 # fetches all branches\n      - name: Maybe snapshot\n        run: |\n          CHANGED_PC_FILES=$(git diff --name-only origin/${{ github.base_ref }} origin/${{ github.head_ref }} -- "./**/*.pc")\n          if [ -n "$CHANGED_PC_FILES" ]; then\n            yarn add percy percy-paperclip\n            percy exec -- percy-paperclip\n          fi\n        working-directory: ./path/to/frontend\n        env: \n          PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}\n')),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Be sure to change ",Object(i.b)("inlineCode",{parentName:"p"},"working-directory")," to point to where your ",Object(i.b)("inlineCode",{parentName:"p"},"paperclip.config.json")," file is. ")),Object(i.b)("p",null,"\u261d\ud83c\udffb This script will run only when PC files change, so if you're working with people working on the back-end, for instance, they won't get this check (since we're assuming they won't touch PC files). "),Object(i.b)("p",null,"To go along with the script above, you'll need to set up a ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://docs.percy.io/docs/baseline-picking-logic"}),"baseline")," for your master branch. Here's a script for that:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-yml"}),'name: Master Checks\non:\n  push:\n    branches:\n      - master\n    \njobs:\n  visual-regression-test:\n    name: Visual Regression Test\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v2\n      - uses: actions/setup-node@v1\n      - uses: actions/checkout@v2\n        with:\n          fetch-depth: 0\n      - name: Maybe snapshot\n        run: |\n          CHANGED_PC_FILES=$(git diff --name-only origin/master^ origin/master -- "./**/*.pc")\n          if [ -n "$CHANGED_PC_FILES" ]; then\n            yarn add percy\n            yarn snapshot\n          fi\n        working-directory: ./path/to/frontend\n        env: \n          PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}\n          \n')),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Again, be sure to change ",Object(i.b)("inlineCode",{parentName:"p"},"working-directory")," to point to where your ",Object(i.b)("inlineCode",{parentName:"p"},"paperclip.config.json")," file is. ")),Object(i.b)("p",null,"\u261d\ud83c\udffb This script runs whenever a ",Object(i.b)("inlineCode",{parentName:"p"},"*.pc")," file changes on master, and ensures that subsequent PRs are visually testing against the correct baseline."))}l.isMDXComponent=!0}}]);