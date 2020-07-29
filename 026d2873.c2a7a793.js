(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{114:function(e,n,t){"use strict";t.d(n,"a",(function(){return u})),t.d(n,"b",(function(){return b}));var r=t(0),o=t.n(r);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var l=o.a.createContext({}),p=function(e){var n=o.a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},u=function(e){var n=p(e.components);return o.a.createElement(l.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return o.a.createElement(o.a.Fragment,{},n)}},m=o.a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),u=p(t),m=r,b=u["".concat(i,".").concat(m)]||u[m]||d[m]||a;return t?o.a.createElement(b,s(s({ref:n},l),{},{components:t})):o.a.createElement(b,s({ref:n},l))}));function b(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=t.length,i=new Array(a);i[0]=m;var s={};for(var c in n)hasOwnProperty.call(n,c)&&(s[c]=n[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var l=2;l<a;l++)i[l]=t[l];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},58:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return i})),t.d(n,"metadata",(function(){return s})),t.d(n,"rightToc",(function(){return c})),t.d(n,"default",(function(){return p}));var r=t(2),o=t(6),a=(t(0),t(114)),i={id:"guide-how-to-use",title:"Paperclip Basics",sidebar_label:"The Basics"},s={id:"guide-how-to-use",isDocsHomePage:!1,title:"Paperclip Basics",description:"You can think of Paperclip as a language that focuses purely on your web application's appearance -  just covering HTML, CSS, and basic components. With that, you can construct almost all of your application UI in Paperclip. For example, here's a simple list:",source:"@site/docs/guide-how-to-use.md",permalink:"/docs/guide-how-to-use",editUrl:"https://github.com/crcn/paperclip/edit/master/packages/paperclip-website/docs/guide-how-to-use.md",sidebar_label:"The Basics",sidebar:"docs",previous:{title:"Paperclip Configuration",permalink:"/docs/configure-paperclip"},next:{title:"Using Third-party Libraries",permalink:"/docs/guide-third-party-libraries"}},c=[],l={rightToc:c};function p(e){var n=e.components,t=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},l,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("p",null,"You can think of Paperclip as a language that focuses ",Object(a.b)("em",{parentName:"p"},"purely")," on your web application's appearance -  just covering HTML, CSS, and basic components. With that, you can construct almost ",Object(a.b)("em",{parentName:"p"},"all")," of your application UI in Paperclip. For example, here's a simple list:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-html",metastring:"live",live:!0}),'<style>\n  .List {\n    padding-left: 1em;\n    font-family: sans-serif;\n  }\n  .ListItem {\n    margin-top: 6px;\n    &--completed {\n      text-decoration: line-through;\n    }\n  }\n</style>\n\n\x3c!-- Components --\x3e\n\n<ol export component as="List" className="List">\n  {children}\n</ol>\n\n<li export component as="ListItem"\n  className="ListItem"\n  className:completed="ListItem--completed">\n  {children}\n</li>\n\n\x3c!-- Preview --\x3e\n\n<List>\n  <ListItem>Bagels \ud83e\udd6f</ListItem>\n  <ListItem completed>Yakitori \ud83c\udf62</ListItem>\n  <ListItem>Tofurky \ud83e\udd83</ListItem>\n  <ListItem>Skittles \ud83c\udf08</ListItem>\n</List>\n')),Object(a.b)("p",null,"The ",Object(a.b)("inlineCode",{parentName:"p"},"\x3c!-- Preview --\x3e")," section isn't actually production code - it's used primarily for development, and visual regression testing purposes. It's an important part of Paperclip's design, so you'll be missing out a whole lot if you don't create previews. More on that in a sec."),Object(a.b)("p",null,"Here's how you can use the template above in a React app:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx"}),'import * as React from "react";\nimport * as styles from "./GroceryList.pc";\n\nexport function GroceryList() {\n\n  const groceries = [\n    "Milk \ud83e\udd5b", \n    "Water \ud83d\udca7", \n    "Taco seasoning \ud83c\udf2e"\n  ];\n\n  return <styles.List>\n    {\n      groceries.map(item => (\n        <styles.ListItem>{item}</styles.ListItem>\n      ))\n    }\n  </styles.List>;  \n}\n')),Object(a.b)("p",null,"\u261d\ud83c\udffb Basically, all this component is doing is adding dynamic behavior to our Paperclip building blocks, and that's all there is to it between Paperclip UIs and code, really. UIs go in Paperclip, logic goes in code. That's it. To put this into more visual terms: "),Object(a.b)("div",{style:{textAlign:"center"}},Object(a.b)("img",{alt:"JSX & PC dependency graph",style:{width:200},src:"/img/pc-usage/pc-jsx.png"})),Object(a.b)("p",null,"This separation between UI and code actually unlocks a lot of really cool features. Namely, by isolating the UI we can optimize for very UI-specific things such as:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Better tooling around creating UIs: realtime previews, visual editing tools."),Object(a.b)("li",{parentName:"ul"},"Better safety with free visual regression testing.")),Object(a.b)("p",null,"To name a few. Really, the \"separation of concerns\" behind Paperclip isn't about principle, it's about function. "),Object(a.b)("p",null,"Let's move onto something a bit more sophisticated \ud83d\udc4c. Here's a site:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-html",metastring:"live height=350px",live:!0,height:"350px"}),'// file: HomePage.pc\n<import src="./Page.pc" as="Page">\n\n\x3c!-- Previews --\x3e\n\n<Page.Preview>\n    Some home content\n</Page.Preview>\n\n// file: Page.pc\n<import src="./Header.pc" as="Header">\n<import src="./Footer.pc" as="Footer">\n<import src="./Tokens.pc" as="tokens">\n\n<style>\n  .page {\n    @include tokens.default-font;\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n  }\n\n  .content {\n    background: var(--color-background-1);\n    height: 100%;\n    padding: var(--tb-spacing) var(--lr-spacing);\n  }\n\n  h4 {\n    @include tokens.default-font;\n  }\n</style>\n\n<div export component as="Page" className="page" className:dark=">>>tokens.dark">\n  {children}\n</div>\n\n<div export component as="Content" className="content"> \n  {children}\n</div>\n\n\x3c!-- We export the preview here so that _other_ previews can use it --\x3e\n\n<Page export component as="Preview" {dark?}>\n  <Header.Preview />\n  <Content>{children}</Content>\n  <Footer.Preview />\n</Page>\n\n<h4>default mode: </h4>\n<Preview>\n  page content here\n</Preview>\n\n<h4>dark mode: </h4>\n<Preview dark>\n  page content here\n</Preview>\n\n// file: Header.pc\n<import src="./Tokens.pc" as="tokens">\n\n<style>\n  .header {\n    @include tokens.default-font;\n    box-sizing: border-box;\n    background: var(--color-background-2);\n    width: 100%;\n    padding: var(--tb-spacing) var(--lr-spacing);\n    .links {\n      display: flex;\n      float: right;\n      .link {  \n        padding: 8px 12px;\n        border-radius: 4px;\n        text-decoration: none;\n        color: var(--color-text-1);\n        &--hover {\n          background: var(--color-background-3);\n        }\n      }\n    }\n    .info {\n      display: flex;\n      flex-direction: column;\n      padding: 30px 0px;\n      .headline {\n        font-size: 24px;\n        margin-bottom: 6px;\n      }\n      .desc {\n        font-size: 0.8em;\n      }\n    }\n  }\n\n</style>\n\n<div export component as="Header" \n  className="header"\n  className:dark=">>>tokens.dark">\n  {children}\n</div>\n\n<div export component as="Links" className="links">\n  {children}\n</div>\n\n<a export component as="Link" \n  className="link"\n  className:hover="link--hover"\n  {href?}>\n  {children}\n</a>\n\n<div export component as="Info" className="info">\n  <div className="headline">\n    {title}\n  </div>\n  <div className="desc">\n    {description}\n  </div>\n</div>\n\n\x3c!-- Preview for re-use --\x3e\n\n<Header export component as="Preview" {dark?}>\n  <Links>\n    <Link href="#">Link 1</Link>\n    <Link href="#" hover>Link 2</Link>\n    <Link href="#">Link 3</Link>\n    <Link href="#">Link 4</Link>\n  </Links>\n  <Info title="Lorem ipsum" description={<fragment>\n    sit amet <strong>sollicitudin</strong> nulla eleifend at.\n  </fragment>} />\n</Header>\n\n<Preview />\n<Preview dark />\n\n\n// file: Footer.pc\n<import src="./Tokens.pc" as="tokens">\n\n<style>\n  .content {\n    height: 100%;\n    padding: var(--tb-spacing) var(--lr-spacing);\n  }\n  \n  .footer {\n    @include tokens.default-font;\n    background: var(--color-background-2);\n    padding: var(--tb-spacing) var(--lr-spacing);\n  }\n</style>\n\n<div export component as="Footer" className="footer" className:dark=">>>tokens.dark">\n  {children}\n</div>\n\n<Footer export component as="Preview" {dark?}>\n  footer content \n</Footer>\n\n<Preview />\n<Preview dark />\n\n// file: Tokens.pc\n\n<style>\n  :root {\n    --lr-spacing: 40px;\n    --tb-spacing: 20px;\n    --color-background-1: #FFF;\n    --color-background-2: rgba(240, 240, 240, 1);\n    --color-background-3: rgba(220, 220, 220, 1);\n    --color-text-1: #444;\n  }\n\n\n  @export {\n    @mixin default-font {\n      font-family: sans-serif;\n      color: var(--color-text-1);\n    }\n\n    .dark {\n      --color-background-1: #222;\n      --color-background-2: #333;\n      --color-background-3: #555;\n      --color-text-1: rgba(255, 255, 255, 0.8);\n    }\n  }\n</style>\n')),Object(a.b)("p",null,"There are a few things going on here, but I'm just going to focus on the preview components & how this all integrates with code. "),Object(a.b)("p",null,"About preview components: every file has them. This makes it easy to re-use previews within other UI files to see how the ",Object(a.b)("em",{parentName:"p"},"entire")," UI shapes-up. Keep in mind that these preview components ",Object(a.b)("em",{parentName:"p"},"aren't")," intended to be used in application code - they're purely for development & testing purposes. And if you're using Webpack, Rollup, Parcel, or some other bundler, these previews will be shaken out of the application bundle, so you can add as many of them as you want without increasing your overall application size."),Object(a.b)("p",null,"Testing-wise, all we need to do at this point is run the ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"docs/configure-percy"}),"Percy")," CLI tool to run visual regression tests. No other setup needed. "),Object(a.b)("p",null,"Now onto how this integrates with code. We'll start off with the ",Object(a.b)("inlineCode",{parentName:"p"},"Header")," component since it has a few extra moving parts. Here's how it might be used in a React component:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx"}),'import * as ui from "./Header.pc";\n\nexport function Header() {\n  return <ui.Header>\n    <ui.Links>\n      <ui.Link>Home</ui.Link>\n      <ui.Link href="">About</ui.Link>\n      <ui.Link>Contact</ui.Link>\n    </ui.Links>\n    <ui.Info title="My website" description={<>\n      My description\n    </>} />\n  </ui.Header>\n};\n')),Object(a.b)("p",null,"Next, we'll move onto our ",Object(a.b)("inlineCode",{parentName:"p"},"Page")," component:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx"}),'import * as ui from "./Page.pc";\n\n// extension added for clarity. Usually it\'s omitted.\nimport {Header} from "./Header.tsx"; \n\n// We\'re assuming that Footer is already done, too\nimport {Footer} from "./Footer.tsx"; \n\nexport function Page({ children, dark }) {\n  return <ui.Page dark={dark}>\n    <Header />\n    <ui.Content>{children}</ui.Content>\n    <Footer />\n  </ui.Page>;\n}\n')),Object(a.b)("p",null,"Can you see the pattern here? The structure & dependengy graph of our JSX components are just about the same\nas the PC components. If we're looking at the PC graph:"),Object(a.b)("div",{style:{textAlign:"center"}},Object(a.b)("img",{alt:"JSX & PC dependency graph",style:{width:450},src:"/img/pc-usage/pc-deps.png"})),Object(a.b)("p",null,"Our JSX graph looks very similar:"),Object(a.b)("div",{style:{textAlign:"center"}},Object(a.b)("img",{alt:"JSX & PC dependency graph",style:{width:600},src:"/img/pc-usage/pc-and-tsx-deps.png"})),Object(a.b)("p",null,"The similarities makes sense since both PC and JSX files represent the same UI, they're going naturally fall into similar structures. For the most part, an entire application can be written like this. There will be a few cases that Paperclip can't handle of course, but the language is unopinionated enough to get out of your way when you want it to, so you can easily handle those edge cases. "))}p.isMDXComponent=!0}}]);