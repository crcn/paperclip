(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{132:function(e,a,t){"use strict";t.r(a);var c=t(0),n=t.n(c),r=(t(139),t(144)),d=t(22),o=t(188),l=t.n(o),i=(l()('\n    <import src="./button-styles.pc" as="styles" />\n      \n    \x3c!-- This is exported to code --\x3e  \n    <div export component as="Button"\n      className="$styles.Button"\n      className:secondary="$styles.Button--secondary"\n      className:negate="$styles.Button--negate">\n      {children}\n    </div>\n    \n    \x3c!-- This is a preview --\x3e\n    <div className="$styles.preview">\n      <Button>\n        Primary button\n      </Button>\n    \n      <Button negate>\n        Negate\n      </Button>\n\n      <Button secondary>\n        Secondary Button\n      </Button>\n      \n      <Button secondary negate>\n        Secondary Negate\n      </Button>\n    </div>\n  '),l()('\n    \x3c!-- Styles would typically go in the same file --\x3e\n    <import src="./colors.pc" />\n    <import src="./typography.pc" as="typography" />\n    <style>\n      @export {\n        .Button {\n          @include typography.text-default;\n          border: 2px solid var(--color-grey-100);\n          display: inline-block;\n          border-radius: 4px;\n          padding: 8px 16px;\n          background: var(--color-grey-100);\n          color: var(--color-grey-200);\n          &--negate {\n            background-color: var(--color-red-100);\n            border-color: var(--color-red-100);\n            color: var(--color-red-200);\n          }\n          &--secondary {\n            background: transparent;\n            color: var(--color-grey-100);\n          }\n          &--secondary&--negate {\n            color: var(--color-red-100);\n          }\n        }\n        \n        .preview {\n          display: flex;\n          flex-direction: column;\n          align-items: flex-start;\n          .Button {\n            margin-bottom: 10px;\n          }\n        }\n      }\n    </style>  \n    Nothing to see here!\n  '),l()('\n      \x3c!-- Typography styles --\x3e\n      <import src="./colors.pc" />\n\n      <style>\n        @export {\n          @mixin text-default {\n            font-family: sans-serif;\n            color: var(--color-grey-200);\n            font-size: 18px;\n          }\n          .text-default {\n            @include text-default;\n          }    \n          .text-color-danger {\n            color: var(--color-red-100);\n          }    \n        }\n        .text-preview {\n          margin-top: 10px;\n        }\n      </style>\n      \n      \x3c!-- previews --\x3e\n      \n      <div className="text-default text-preview">\n        Default text\n      </div>\n      <div className="text-default text-preview text-color-danger">\n        Danger text\n      </div>\n  '),l()('\n      \x3c!-- All colors --\x3e\n\n      <style>\n        :root {\n          --color-grey-100: #999;\n          --color-grey-200: #333;\n          --color-red-100: #F00;\n          --color-red-200: #900;\n        }\n        .ColorPreview {\n          font-family: Helvetica;\n          margin-top: 10px;\n          font-size: 18px;\n        }\n      </style>\n\n      <div component as="ColorPreview" className="ColorPreview" style="color: {value}">  \n        {value}\n      </div>\n\n      <ColorPreview value="var(--color-grey-100)" />\n      <ColorPreview value="var(--color-grey-200)" />\n      <ColorPreview value="var(--color-red-100)" />\n      <ColorPreview value="var(--color-red-200)" />\n      \n  '),'\nimport * as styles from "./styles.pc";\n\nfunction GroceryList() {\n\n  const groceries = [\n    "Milk \ud83e\udd5b", \n    "Water \ud83d\udca7", \n    "Taco seasoning \ud83c\udf2e"\n  ];\n\n  return <styles.List>\n    {\n      groceries.map(item => (\n        <styles.ListItem>{item}</styles.ListItem>;\n      ))\n    }\n  </styles.List>;  \n}\n'.trim()),s='\n<ol export component as="List">\n  <style>\n    padding-left: 1em;\n    font-family: Open Sans;\n  </style>\n  {children}\n</ol>\n\n<li export component as="ListItem">\n  <style>\n    margin-top: 6px;\n  </style>\n  {children}\n</li>\n\n\x3c!-- \n  Preview\n--\x3e\n\n<List>\n  <ListItem>Bagels \ud83e\udd6f</ListItem>\n  <ListItem>Yakitori \ud83c\udf62</ListItem>\n  <ListItem>Tofurky \ud83e\udd83</ListItem>\n  <ListItem>Skittles \ud83c\udf08</ListItem>\n</List>\n'.trim(),p=t(149);t(115);t(116);const u=e=>{const a=typeof e;return"object"===a||"string"!==a?e:e.trim().split(";").reduce(((e,a)=>{const[t,c]=a.split(":");if(!c||"undefined"===c)return e;return"undefined"===c.trim()||(e[t.trim()]=c&&c.trim()),e}),{})},f=c.memo(c.forwardRef((function(e,a){return c.createElement("div",{"data-pc-1598c38":!0,"data-pc-2ee04b36":!0,"data-pc-pub-2ee04b36":!0,ref:a,key:"1598c38",className:"_2ee04b36_font _pub-2ee04b36_font font "+(t=e.className,t?"_2ee04b36_"+t+" _pub-2ee04b36_"+t+" "+t:"")},"A quick brown fox jumped over the lazy dog\n");var t})));c.memo(c.forwardRef((function(e,a){return c.createElement("div",{"data-pc-e83a290d":!0,"data-pc-2ee04b36":!0,"data-pc-pub-2ee04b36":!0,ref:a,key:"e83a290d",style:u("font-family: "+e.fontFamily)},c.createElement(f,{"data-pc-b03676a7":!0,"data-pc-2ee04b36":!0,"data-pc-pub-2ee04b36":!0,key:"b03676a7",className:"_2ee04b36_extra-light _pub-2ee04b36_extra-light extra-light"}),c.createElement(f,{"data-pc-c7314631":!0,"data-pc-2ee04b36":!0,"data-pc-pub-2ee04b36":!0,key:"c7314631",className:"_2ee04b36_light _pub-2ee04b36_light light"}),c.createElement(f,{"data-pc-5e38178b":!0,"data-pc-2ee04b36":!0,"data-pc-pub-2ee04b36":!0,key:"5e38178b"}),c.createElement(f,{"data-pc-293f271d":!0,"data-pc-2ee04b36":!0,"data-pc-pub-2ee04b36":!0,key:"293f271d",className:"_2ee04b36_medium _pub-2ee04b36_medium medium"}),c.createElement(f,{"data-pc-b75bb2be":!0,"data-pc-2ee04b36":!0,"data-pc-pub-2ee04b36":!0,key:"b75bb2be",className:"_2ee04b36_bold _pub-2ee04b36_bold bold"}),c.createElement(f,{"data-pc-c05c8228":!0,"data-pc-2ee04b36":!0,"data-pc-pub-2ee04b36":!0,key:"c05c8228",className:"_2ee04b36_extra-bold _pub-2ee04b36_extra-bold extra-bold"}))}))),t(117);t(118);t(119);t(120);const m="_pub-3151939d_semi-bold semi-bold";t(121);const _=e=>e?"_3043d893_"+e+" _pub-3043d893_"+e+" "+e:"",b=(c.memo(c.forwardRef((function(e,a){return c.createElement("div",{"data-pc-e491a4ea":!0,"data-pc-3043d893":!0,"data-pc-pub-3043d893":!0,ref:a,key:"e491a4ea",className:"_3043d893__col _pub-3043d893__col _col _3043d893__col3 _pub-3043d893__col3 _col3 "+_(e.className&&e.className)},e.children)}))),c.memo(c.forwardRef((function(e,a){return c.createElement("div",{"data-pc-df201df":!0,"data-pc-3043d893":!0,"data-pc-pub-3043d893":!0,ref:a,key:"df201df",className:"_3043d893__col _pub-3043d893__col _col _3043d893__col6 _pub-3043d893__col6 _col6 "+_(e.className&&e.className)},e.children)}))),c.memo(c.forwardRef((function(e,a){return c.createElement("div",{"data-pc-e3fc60f3":!0,"data-pc-3043d893":!0,"data-pc-pub-3043d893":!0,ref:a,key:"e3fc60f3",className:"_3043d893__col _pub-3043d893__col _col _3043d893__col9 _pub-3043d893__col9 _col9 "+_(e.className&&e.className)},e.children)}))),c.memo(c.forwardRef((function(e,a){return c.createElement("div",{"data-pc-4444df4":!0,"data-pc-3043d893":!0,"data-pc-pub-3043d893":!0,ref:a,key:"4444df4",className:"_3043d893__col _pub-3043d893__col _col _3043d893__col12 _pub-3043d893__col12 _col12 "+_(e.className&&e.className)},e.children)}))),c.memo(c.forwardRef((function(e,a){return c.createElement("div",{"data-pc-9fcd1620":!0,"data-pc-3043d893":!0,"data-pc-pub-3043d893":!0,ref:a,key:"9fcd1620",className:"_3043d893__row _pub-3043d893__row _row "+_(e.className&&e.className)},e.children)})))),y=c.memo(c.forwardRef((function(e,a){return c.createElement("div",{"data-pc-71c3770c":!0,"data-pc-3043d893":!0,"data-pc-pub-3043d893":!0,ref:a,key:"71c3770c",className:"_3043d893__container _pub-3043d893__container _container "+_(e.className&&e.className)},e.children)})));t(122);const g=c.memo(c.forwardRef((function(e,a){return c.createElement("a",{"data-pc-149dda8c":!0,"data-pc-1d429790":!0,"data-pc-pub-1d429790":!0,ref:a,key:"149dda8c",className:"_1d429790__button _pub-1d429790__button _button "+(t=e.className&&e.className,t?"_1d429790_"+t+" _pub-1d429790_"+t+" "+t:"")+(e.secondary?" _1d429790__button--secondary _pub-1d429790__button--secondary _button--secondary":"")+(e.strong?" _1d429790__button--strong _pub-1d429790__button--strong _button--strong":""),href:e.href},e.children);var t})));t(123);const h=e=>e?"_b1c0b4ab_"+e+" _pub-b1c0b4ab_"+e+" "+e:"",v=c.memo(c.forwardRef((function(e,a){return c.createElement("div",{"data-pc-296d0dd3":!0,"data-pc-b1c0b4ab":!0,"data-pc-pub-b1c0b4ab":!0,ref:a,key:"296d0dd3",className:"_b1c0b4ab_icon _pub-b1c0b4ab_icon icon "+h(e.name)+" "+h(e.className&&e.className)})})));t(124);const k=e=>e.default||e,E=(e,a)=>({...a,className:a.className?a.className+" "+e:e}),w=c.memo(c.forwardRef((function(e,a){return c.createElement("span",{"data-pc-39ec88e8":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,ref:a,key:"39ec88e8",className:"_81da3f7c__highlight _pub-81da3f7c__highlight _highlight"+(e.noBreak?" _81da3f7c_noBreak _pub-81da3f7c_noBreak noBreak":"")+(e.darker?" _81da3f7c_darker _pub-81da3f7c_darker darker":"")+(e.bold?" _81da3f7c_bold _pub-81da3f7c_bold bold":"")},e.children)}))),N=c.memo(c.forwardRef((function(e,a){return c.createElement("div",{"data-pc-8bf1e2aa":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,ref:a,key:"8bf1e2aa",className:"_81da3f7c__home _pub-81da3f7c__home _home _3151939d_text-default _pub-3151939d_text-default text-default"},e.children)}))),x=c.memo(c.forwardRef((function(e,a){return c.createElement(y,E("_65ff8386",{"data-pc-65ff8386":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,ref:a,key:"65ff8386",className:"_81da3f7c__header _pub-81da3f7c__header _header _81da3f7c__main _pub-81da3f7c__main _main"}),c.createElement(b,E("_b04c9138",{"data-pc-b04c9138":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"b04c9138"}),c.createElement("div",{"data-pc-a0bae74f":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"a0bae74f"},c.createElement("img",{"data-pc-79a2cc81":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"79a2cc81",src:k(t(228))}),"\n      Paperclip\n    ")),c.createElement(b,E("_c74ba1ae",{"data-pc-c74ba1ae":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"c74ba1ae"}),c.createElement("div",{"data-pc-a1788d78":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"a1788d78",className:"_81da3f7c__blurb _pub-81da3f7c__blurb _blurb"},c.createElement("div",{"data-pc-44c2e531":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"44c2e531",className:"_81da3f7c__title _pub-81da3f7c__title _title"},e.title),c.createElement("div",{"data-pc-ddcbb48b":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"ddcbb48b",className:"_81da3f7c__subtext _pub-81da3f7c__subtext _subtext"},e.description),c.createElement("div",{"data-pc-aacc841d":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"aacc841d",className:"_81da3f7c__cta _pub-81da3f7c__cta _cta"},e.cta))),c.createElement(b,{"data-pc-592f340d":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"592f340d"},c.createElement("div",{"data-pc-d330ab6b":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"d330ab6b",className:"_81da3f7c__preview _pub-81da3f7c__preview _preview"},e.preview)))}))),j=c.memo(c.forwardRef((function(e,a){return c.createElement("div",{"data-pc-8c9c26b3":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,ref:a,key:"8c9c26b3",className:"_81da3f7c__code-preview _pub-81da3f7c__code-preview _code-preview"})}))),S=c.memo(c.forwardRef((function(e,a){return c.createElement("div",{"data-pc-6292479f":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,ref:a,key:"6292479f",className:"_81da3f7c__summary _pub-81da3f7c__summary _summary _3043d893__row _pub-3043d893__row _row"},c.createElement("div",{"data-pc-2e4c685e":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"2e4c685e",className:"_3043d893__col12 _pub-3043d893__col12 _col12"},c.createElement("div",{"data-pc-207bcf40":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"207bcf40",className:"_81da3f7c__title _pub-81da3f7c__title _title"},e.title),c.createElement("div",{"data-pc-577cffd6":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"577cffd6",className:"_81da3f7c__text _pub-81da3f7c__text _text"},e.text)))}))),P=c.memo(c.forwardRef((function(e,a){return c.createElement("div",{"data-pc-852a6a98":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,ref:a,key:"852a6a98",className:"_81da3f7c__main-features _pub-81da3f7c__main-features _main-features _3043d893__row _pub-3043d893__row _row"},e.children)}))),C=c.memo(c.forwardRef((function(e,a){return c.createElement("div",{"data-pc-a0dcb169":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,ref:a,key:"a0dcb169",className:"_81da3f7c__item _pub-81da3f7c__item _item _3043d893__col _pub-3043d893__col _col _3043d893__col6 _pub-3043d893__col6 _col6"},c.createElement("div",{"data-pc-3874bb02":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"3874bb02",className:"_81da3f7c__heading _pub-81da3f7c__heading _heading"},c.createElement(v,E("_5ea878d8",{"data-pc-5ea878d8":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"5ea878d8",name:e.iconName,className:"_81da3f7c__icon _pub-81da3f7c__icon _icon"})),c.createElement("div",{"data-pc-c7a12962":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"c7a12962",className:"_81da3f7c__info _pub-81da3f7c__info _info"},c.createElement("div",{"data-pc-25541ec2":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"25541ec2",className:"_81da3f7c__title _pub-81da3f7c__title _title"},c.createElement("span",{"data-pc-33eee5d1":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"33eee5d1"},e.title)),c.createElement("div",{"data-pc-bc5d4f78":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"bc5d4f78",className:"_81da3f7c__details _pub-81da3f7c__details _details"},e.description))),c.createElement("div",{"data-pc-a17deab8":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"a17deab8",className:"_81da3f7c__example _pub-81da3f7c__example _example"},e.example))}))),L=c.memo(c.forwardRef((function(e,a){return c.createElement("div",{"data-pc-4ed2d045":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,ref:a,key:"4ed2d045",className:"_81da3f7c__various-features _pub-81da3f7c__various-features _various-features _3043d893__row _pub-3043d893__row _row"},e.children)}))),O=c.memo(c.forwardRef((function(e,a){return c.createElement("div",{"data-pc-a7b17570":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,ref:a,key:"a7b17570",className:"_81da3f7c__item _pub-81da3f7c__item _item _3043d893__col _pub-3043d893__col _col _3043d893__col3 _pub-3043d893__col3 _col3"},c.createElement(v,E("_3f7d13de",{"data-pc-3f7d13de":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"3f7d13de",name:e.iconName,className:"_81da3f7c__icon _pub-81da3f7c__icon _icon"})),c.createElement("div",{"data-pc-a6744264":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"a6744264",className:"_81da3f7c__info _pub-81da3f7c__info _info"},c.createElement("div",{"data-pc-de6950d7":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"de6950d7",className:"_81da3f7c__title _pub-81da3f7c__title _title"},c.createElement("span",{"data-pc-953f946f":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"953f946f"},e.title)),c.createElement("div",{"data-pc-a96e6041":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"a96e6041",className:"_81da3f7c__details _pub-81da3f7c__details _details"},e.description)))}))),B=c.memo(c.forwardRef((function(e,a){return c.createElement("div",{"data-pc-49bf145c":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,ref:a,key:"49bf145c",className:"_81da3f7c__big-feature _pub-81da3f7c__big-feature _big-feature _3043d893__section _pub-3043d893__section _section _3043d893__row _pub-3043d893__row _row"+(e.ctaText?" _81da3f7c_has_cta _pub-81da3f7c_has_cta has_cta":"")},c.createElement("div",{"data-pc-3cf9c7b0":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"3cf9c7b0",className:"_3043d893__col _pub-3043d893__col _col _3043d893__col3 _pub-3043d893__col3 _col3"},c.createElement(v,E("_48e1dcc2",{"data-pc-48e1dcc2":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"48e1dcc2",name:"grow",className:"_81da3f7c__icon _pub-81da3f7c__icon _icon"})),c.createElement("div",{"data-pc-3fe6ec54":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"3fe6ec54",clasName:"_info"},c.createElement("div",{"data-pc-30417159":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"30417159",className:"_81da3f7c__title _pub-81da3f7c__title _title"},e.title),c.createElement("div",{"data-pc-474641cf":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"474641cf",className:"_81da3f7c__details _pub-81da3f7c__details _details"},e.description),c.createElement("a",{"data-pc-de4f1075":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"de4f1075",className:"_81da3f7c__mini-cta-link _pub-81da3f7c__mini-cta-link _mini-cta-link",href:e.ctaHref&&e.ctaHref},e.ctaText,c.createElement(v,{"data-pc-e6db5a08":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"e6db5a08",name:"chevron-right",className:"_81da3f7c__mini-cta-icon _pub-81da3f7c__mini-cta-icon _mini-cta-icon"})))),c.createElement("div",{"data-pc-a5f0960a":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"a5f0960a",className:"_81da3f7c__preview _pub-81da3f7c__preview _preview _3043d893__col _pub-3043d893__col _col _3043d893__col9 _pub-3043d893__col9 _col9"},e.preview))}))),I=(c.memo(c.forwardRef((function(e,a){return c.createElement(N,{"data-pc-ae07395b":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,ref:a,key:"ae07395b"},c.createElement(x,{"data-pc-4160da2c":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"4160da2c",title:c.createElement(c.Fragment,{children:["Use plain HTML & CSS to build web applications in ",c.createElement(w,{"data-pc-adec955f":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"adec955f",noBreak:!0},"record time.")]}),description:c.createElement(c.Fragment,{children:["With tooling for ",c.createElement(w,{"data-pc-ac2eff68":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"ac2eff68"},"realtime previews")," & ",c.createElement(w,{"data-pc-42209e44":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"42209e44"},"automatic visual regresion testing"),", you can build UIs in no time using the language you already know."]}),cta:c.createElement(c.Fragment,{children:[c.createElement(g,{"data-pc-ae684131":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"ae684131",className:"_3151939d_semi-bold _pub-3151939d_semi-bold semi-bold",strong:!0},"Sign up for early access")]}),preview:c.createElement("video",{"data-pc-5f4b82a2":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"5f4b82a2",src:k(t(229)),autoplay:!0,loop:!0})}),c.createElement(S,{"data-pc-3667eaba":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"3667eaba",title:"Iterate faster",text:"You shouldn't have to be bogged down by developer tooling in order to make simple HTML & CSS changes. And you should be able to make style changes confidently without needing to worry about introducing bugs. "}),c.createElement(P,{"data-pc-af6ebb00":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"af6ebb00"},c.createElement(C,{"data-pc-1b99bdd6":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"1b99bdd6",iconName:"shapes",title:"A minimalistic UI language",description:"Paperclip just covers the visuals. No logic -  just HTML, CSS, and basic component.",example:c.createElement(j,{"data-pc-27960c7":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"27960c7"})}),c.createElement(C,{"data-pc-6c9e8d40":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"6c9e8d40",iconName:"reactjs",title:"Import directly into React code",description:"Paperclip documents compile to plain code that you can import directly into your code.",example:c.createElement(j,{"data-pc-1b625186":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"1b625186"})})),c.createElement(L,{"data-pc-d8698b96":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"d8698b96"},c.createElement(O,{"data-pc-1a5bd7e1":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"1a5bd7e1",iconName:"chaotic-1",title:"No global CSS",description:"CSS styles are explicitly referenced within Paperclip, so you don't have to have to worry about styles leaking out."}),c.createElement(O,{"data-pc-6d5ce777":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"6d5ce777",iconName:"link",title:"Strongly typed",description:"UIs compile to strongly typed code, so worry less about breaking changes."}),c.createElement(O,{"data-pc-f455b6cd":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"f455b6cd",iconName:"grow",title:"Works with your existing codebase",description:"Paperclip compliments your existing codebase, so use it as you go."})),c.createElement(B,{"data-pc-a8037f19":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"a8037f19",title:"See all of your UIs in one spot",description:"No more digging around for UI elements. Open the birds-eye view to see all of your application UIs, and easily find what you're looking for.",preview:c.createElement("video",{"data-pc-7e1615b2":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"7e1615b2",src:k(t(230)),autoplay:!0,loop:!0})}),c.createElement(B,{"data-pc-df044f8f":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"df044f8f",title:"Cross-browser testing made easy",description:"Launch any browser directly within Paperclip and design against them in realtime.",preview:c.createElement("video",{"data-pc-670d24f3":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"670d24f3",src:k(t(231)),autoplay:!0,loop:!0})}),c.createElement(B,{"data-pc-4fbb521e":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"4fbb521e",title:"Never miss a CSS Bug",description:"Use the visual regression tool to catch every visual state of your UI. Feel more confident about maintaining your styles.",preview:c.createElement("video",{"data-pc-e095383c":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"e095383c",src:k(t(232)),autoplay:!0,loop:!0}),ctaText:"View the API"}),c.createElement(I,{"data-pc-38bc6288":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"38bc6288"}))}))),c.memo(c.forwardRef((function(e,a){return c.createElement("div",{"data-pc-b9c78028":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,ref:a,key:"b9c78028"},c.createElement("div",{"data-pc-80c8dc67":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"80c8dc67"},c.createElement("div",{"data-pc-95f4ab7d":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"95f4ab7d"},"  \n        Paperclip is currently in closed beta, but sign up if you're interested and we'll reach out soon!\n      "),c.createElement(g,{"data-pc-cfdfac7":!0,"data-pc-81da3f7c":!0,"data-pc-pub-81da3f7c":!0,key:"cfdfac7",className:"_3151939d_semi-bold _pub-3151939d_semi-bold semi-bold",strong:!0,href:"https://forms.gle/WJDVJEm9siYatABcA"},"Sign up for early access")))}))));a.default=function(){var e=Object(d.default)().siteConfig,a=void 0===e?{}:e;return n.a.createElement("div",{className:"home"},n.a.createElement(r.a,{className:"dograg",title:a.title+" - Rapidly build web applications at any scale.",description:"Rapidly build user interfaces, all within your existing IDE."},n.a.createElement(N,null,n.a.createElement(x,{title:n.a.createElement(n.a.Fragment,null,"Rapidly build web applications at any scale"),description:n.a.createElement(n.a.Fragment,null,"Paperclip is a free and open source template language for presentational components that comes with a designer-like experience for rapidly building user interfaces, all within your existing IDE."),cta:n.a.createElement(n.a.Fragment,null,n.a.createElement(g,{className:m,href:"/docs",strong:!0},"Get Started")),preview:n.a.createElement("video",{src:"vid/paperclip-fast-demo.mp4",autoPlay:!0,loop:!0,muted:!0})}),n.a.createElement(S,{title:"Build UIs more quickly, and precisely",text:n.a.createElement(n.a.Fragment,null,"You shouldn't be bogged down by developer tooling in order to see your UIs. With Paperclip, you see what you're creating"," ",n.a.createElement("i",null,"as you're typing"),", no matter how large your project is. Other features such as artboards, measuring tools, and responsive testing tools are there to help you build pixel-perfect UIs in no-time. Your designers will love you. \u2764\ufe0f")}),n.a.createElement(P,null,n.a.createElement(C,{iconName:"shapes",title:"Just covers presentational components",description:n.a.createElement(n.a.Fragment,null,"Paperclip focuses purely on your application's appearance using a syntax similar to HTML & CSS. CSS is also scoped so you don't have to worry about it leaking out."),example:n.a.createElement(p.a,{className:"language-html",style:{height:500}},s)}),n.a.createElement(C,{iconName:"reactjs",title:"Import directly into your React app",description:"After you quickly crank out all of your HTML & CSS, you can import your Paperclip files like regular code. No runtime needed.",example:n.a.createElement(p.a,{className:"language-jsx"},i)})),n.a.createElement(L,null,n.a.createElement(O,{iconName:"chaotic-1",title:"HTML & CSS however you want",description:"Paperclip comes with loads of safety features to make sure that your code stays maintainble, and you can confidently make updates without introducing visual bugs."}),n.a.createElement(O,{iconName:"link",title:"Live previews in VS Code",description:["Conveniently build UIs ",n.a.createElement("i",null,"live")," within VS Code. No more need to switch back and forth between the browser & your code editor."]}),n.a.createElement(O,{iconName:"grow",title:"Just like CSS-in-JS",description:n.a.createElement(n.a.Fragment,null,n.a.createElement("a",{href:"https://playground.paperclip.dev"},"Try it out!")," ","Paperclip works just like other CSS-in-JS libraries such as Emotion, and Styled Components. If you don't like Paperclip, you can easily switch back.")})),n.a.createElement(B,{title:"Pairs well with existing CSS",description:["Paperclip enhances your existing CSS by keeping it ",n.a.createElement("i",null,"scoped"),", so you have absolute control over how it's used in your app, and never have to worry about styles leaking out."],preview:n.a.createElement(p.a,{className:"language-html"},'\n<import src="./tailwind.css" inject-styles />\n\n\n\x3c!--\n  @frame { width: 768, height: 768, x: 0, y: 0 }\n--\x3e\n\n<div class="font-sans bg-gray-500 h-screen w-screen">\n  <div class="bg-gray-100 rounded-lg p-8 md:p-0">\n    <div class="pt-6 text-center space-y-4">\n      <blockquote>\n        <p class="text-lg font-semibold">\n          Lorem ipsum dolor sit amet, consectetur adipiscing elit, \n          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n        </p>\n      </blockquote>\n      <figcaption class="font-medium">\n        <div class="text-blue-600">\n          sit voluptatem\n        </div>\n      </figcaption>\n    </div>\n  </div>\n</div>')}),n.a.createElement(B,{title:"Everything in one spot",description:["Use the birds-eye view to see ",n.a.createElement("i",null,"all")," of your components, and find exactly what you're looking for."],preview:n.a.createElement("video",{src:"vid/grid-demo.mp4",autoPlay:!0,loop:!0,muted:!0})}),n.a.createElement(B,{title:"Cross-browser testing made easy",description:["Launch ",n.a.createElement("i",null,"any browser")," you want directly from Paperclip to catch those elusive CSS bugs more quickly."],preview:n.a.createElement("video",{src:"vid/cross-browser-testing.mp4",autoPlay:!0,loop:!0,muted:!0})}),n.a.createElement(B,{title:"Easy visual regression test setup",description:"Paperclip comes with visual regression tooling that takes less than 10 minutes to setup and gives you nearly 100% visual regression coverage, so you can feel confident about making big style changes in your application without breaking production.",preview:n.a.createElement("video",{src:"vid/visual-regression-testing.mp4",autoPlay:!0,loop:!0,muted:!0})}),n.a.createElement(I,null))))}},147:function(e,a,t){"use strict";var c={plain:{color:"#bfc7d5",backgroundColor:"#292d3e"},styles:[{types:["comment"],style:{color:"rgb(105, 112, 152)",fontStyle:"italic"}},{types:["string","inserted"],style:{color:"rgb(195, 232, 141)"}},{types:["number"],style:{color:"rgb(247, 140, 108)"}},{types:["builtin","char","constant","function"],style:{color:"rgb(130, 170, 255)"}},{types:["punctuation","selector"],style:{color:"rgb(199, 146, 234)"}},{types:["variable"],style:{color:"rgb(191, 199, 213)"}},{types:["class-name","attr-name"],style:{color:"rgb(255, 203, 107)"}},{types:["tag","deleted"],style:{color:"rgb(255, 85, 114)"}},{types:["operator"],style:{color:"rgb(137, 221, 255)"}},{types:["boolean"],style:{color:"rgb(255, 88, 116)"}},{types:["keyword"],style:{fontStyle:"italic"}},{types:["doctype"],style:{color:"rgb(199, 146, 234)",fontStyle:"italic"}},{types:["namespace"],style:{color:"rgb(178, 204, 214)"}},{types:["url"],style:{color:"rgb(221, 221, 221)"}}]},n=t(154),r=t(140);a.a=function(){var e=Object(r.useThemeConfig)().prism,a=Object(n.a)().isDarkTheme,t=e.theme||c,d=e.darkTheme||t;return a?d:t}},149:function(e,a,t){"use strict";var c=t(3),n=t(0),r=t.n(n),d=t(139),o={plain:{backgroundColor:"#2a2734",color:"#9a86fd"},styles:[{types:["comment","prolog","doctype","cdata","punctuation"],style:{color:"#6c6783"}},{types:["namespace"],style:{opacity:.7}},{types:["tag","operator","number"],style:{color:"#e09142"}},{types:["property","function"],style:{color:"#9a86fd"}},{types:["tag-id","selector","atrule-id"],style:{color:"#eeebff"}},{types:["attr-name"],style:{color:"#c4b9fe"}},{types:["boolean","string","entity","url","attr-value","keyword","control","directive","unit","statement","regex","at-rule","placeholder","variable"],style:{color:"#ffcc99"}},{types:["deleted"],style:{textDecorationLine:"line-through"}},{types:["inserted"],style:{textDecorationLine:"underline"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["important"],style:{color:"#c4b9fe"}}]},l={Prism:t(24).a,theme:o};function i(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function s(){return(s=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&(e[c]=t[c])}return e}).apply(this,arguments)}var p=/\r\n|\r|\n/,u=function(e){0===e.length?e.push({types:["plain"],content:"",empty:!0}):1===e.length&&""===e[0].content&&(e[0].empty=!0)},f=function(e,a){var t=e.length;return t>0&&e[t-1]===a?e:e.concat(a)},m=function(e,a){var t=e.plain,c=Object.create(null),n=e.styles.reduce((function(e,t){var c=t.languages,n=t.style;return c&&!c.includes(a)||t.types.forEach((function(a){var t=s({},e[a],n);e[a]=t})),e}),c);return n.root=t,n.plain=s({},t,{backgroundColor:null}),n};function _(e,a){var t={};for(var c in e)Object.prototype.hasOwnProperty.call(e,c)&&-1===a.indexOf(c)&&(t[c]=e[c]);return t}var b=function(e){function a(){for(var a=this,t=[],c=arguments.length;c--;)t[c]=arguments[c];e.apply(this,t),i(this,"getThemeDict",(function(e){if(void 0!==a.themeDict&&e.theme===a.prevTheme&&e.language===a.prevLanguage)return a.themeDict;a.prevTheme=e.theme,a.prevLanguage=e.language;var t=e.theme?m(e.theme,e.language):void 0;return a.themeDict=t})),i(this,"getLineProps",(function(e){var t=e.key,c=e.className,n=e.style,r=s({},_(e,["key","className","style","line"]),{className:"token-line",style:void 0,key:void 0}),d=a.getThemeDict(a.props);return void 0!==d&&(r.style=d.plain),void 0!==n&&(r.style=void 0!==r.style?s({},r.style,n):n),void 0!==t&&(r.key=t),c&&(r.className+=" "+c),r})),i(this,"getStyleForToken",(function(e){var t=e.types,c=e.empty,n=t.length,r=a.getThemeDict(a.props);if(void 0!==r){if(1===n&&"plain"===t[0])return c?{display:"inline-block"}:void 0;if(1===n&&!c)return r[t[0]];var d=c?{display:"inline-block"}:{},o=t.map((function(e){return r[e]}));return Object.assign.apply(Object,[d].concat(o))}})),i(this,"getTokenProps",(function(e){var t=e.key,c=e.className,n=e.style,r=e.token,d=s({},_(e,["key","className","style","token"]),{className:"token "+r.types.join(" "),children:r.content,style:a.getStyleForToken(r),key:void 0});return void 0!==n&&(d.style=void 0!==d.style?s({},d.style,n):n),void 0!==t&&(d.key=t),c&&(d.className+=" "+c),d}))}return e&&(a.__proto__=e),a.prototype=Object.create(e&&e.prototype),a.prototype.constructor=a,a.prototype.render=function(){var e=this.props,a=e.Prism,t=e.language,c=e.code,n=e.children,r=this.getThemeDict(this.props),d=a.languages[t];return n({tokens:function(e){for(var a=[[]],t=[e],c=[0],n=[e.length],r=0,d=0,o=[],l=[o];d>-1;){for(;(r=c[d]++)<n[d];){var i=void 0,s=a[d],m=t[d][r];if("string"==typeof m?(s=d>0?s:["plain"],i=m):(s=f(s,m.type),m.alias&&(s=f(s,m.alias)),i=m.content),"string"==typeof i){var _=i.split(p),b=_.length;o.push({types:s,content:_[0]});for(var y=1;y<b;y++)u(o),l.push(o=[]),o.push({types:s,content:_[y]})}else d++,a.push(s),t.push(i),c.push(0),n.push(i.length)}d--,a.pop(),t.pop(),c.pop(),n.pop()}return u(o),l}(void 0!==d?a.tokenize(c,d,t):[c]),className:"prism-code language-"+t,style:void 0!==r?r.root:{},getLineProps:this.getLineProps,getTokenProps:this.getTokenProps})},a}(n.Component),y=t(161),g=t.n(y),h=t(162),v=t.n(h),k=t(147),E=t(60),w=t.n(E),N=t(140),x=/{([\d,-]+)}/,j=function(e){void 0===e&&(e=["js","jsBlock","jsx","python","html"]);var a={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},python:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"}},t=["highlight-next-line","highlight-start","highlight-end"].join("|"),c=e.map((function(e){return"(?:"+a[e].start+"\\s*("+t+")\\s*"+a[e].end+")"})).join("|");return new RegExp("^\\s*(?:"+c+")\\s*$")},S=/(?:title=")(.*)(?:")/;a.a=function(e){var a=e.children,t=e.className,o=e.metastring,i=Object(N.useThemeConfig)().prism,s=Object(n.useState)(!1),p=s[0],u=s[1],f=Object(n.useState)(!1),m=f[0],_=f[1];Object(n.useEffect)((function(){_(!0)}),[]);var y=Object(n.useRef)(null),h=[],E="",P=Object(k.a)(),C=Array.isArray(a)?a.join(""):a;if(o&&x.test(o)){var L=o.match(x)[1];h=v()(L).filter((function(e){return e>0}))}o&&S.test(o)&&(E=o.match(S)[1]);var O=t&&t.replace(/language-/,"");!O&&i.defaultLanguage&&(O=i.defaultLanguage);var B=C.replace(/\n$/,"");if(0===h.length&&void 0!==O){for(var I,T="",F=function(e){switch(e){case"js":case"javascript":case"ts":case"typescript":return j(["js","jsBlock"]);case"jsx":case"tsx":return j(["js","jsBlock","jsx"]);case"html":return j(["js","jsBlock","html"]);case"python":case"py":return j(["python"]);default:return j()}}(O),R=C.replace(/\n$/,"").split("\n"),M=0;M<R.length;){var D=M+1,U=R[M].match(F);if(null!==U){switch(U.slice(1).reduce((function(e,a){return e||a}),void 0)){case"highlight-next-line":T+=D+",";break;case"highlight-start":I=D;break;case"highlight-end":T+=I+"-"+(D-1)+","}R.splice(M,1)}else M+=1}h=v()(T),B=R.join("\n")}var z=function(){g()(B),u(!0),setTimeout((function(){return u(!1)}),2e3)};return r.a.createElement(b,Object(c.a)({},l,{key:String(m),theme:P,code:B,language:O}),(function(e){var a,t=e.className,n=e.style,o=e.tokens,l=e.getLineProps,i=e.getTokenProps;return r.a.createElement(r.a.Fragment,null,E&&r.a.createElement("div",{style:n,className:w.a.codeBlockTitle},E),r.a.createElement("div",{className:w.a.codeBlockContent},r.a.createElement("div",{tabIndex:0,className:Object(d.a)(t,w.a.codeBlock,"thin-scrollbar",(a={},a[w.a.codeBlockWithTitle]=E,a))},r.a.createElement("div",{className:w.a.codeBlockLines,style:n},o.map((function(e,a){1===e.length&&""===e[0].content&&(e[0].content="\n");var t=l({line:e,key:a});return h.includes(a+1)&&(t.className=t.className+" docusaurus-highlight-code-line"),r.a.createElement("div",Object(c.a)({key:a},t),e.map((function(e,a){return r.a.createElement("span",Object(c.a)({key:a},i({token:e,key:a})))})))})))),r.a.createElement("button",{ref:y,type:"button","aria-label":"Copy code to clipboard",className:Object(d.a)(w.a.copyButton),onClick:z},p?"Copied":"Copy")))}))}},161:function(e,a,t){"use strict";const c=(e,{target:a=document.body}={})=>{const t=document.createElement("textarea"),c=document.activeElement;t.value=e,t.setAttribute("readonly",""),t.style.contain="strict",t.style.position="absolute",t.style.left="-9999px",t.style.fontSize="12pt";const n=document.getSelection();let r=!1;n.rangeCount>0&&(r=n.getRangeAt(0)),a.append(t),t.select(),t.selectionStart=0,t.selectionEnd=e.length;let d=!1;try{d=document.execCommand("copy")}catch(o){}return t.remove(),r&&(n.removeAllRanges(),n.addRange(r)),c&&c.focus(),d};e.exports=c,e.exports.default=c},162:function(e,a){function t(e){let a,t=[];for(let c of e.split(",").map((e=>e.trim())))if(/^-?\d+$/.test(c))t.push(parseInt(c,10));else if(a=c.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)){let[e,c,n,r]=a;if(c&&r){c=parseInt(c),r=parseInt(r);const e=c<r?1:-1;"-"!==n&&".."!==n&&"\u2025"!==n||(r+=e);for(let a=c;a!==r;a+=e)t.push(a)}}return t}a.default=t,e.exports=t},188:function(e,a,t){"use strict";e.exports=function(e){var a=void 0;a="string"==typeof e?[e]:e.raw;for(var t="",c=0;c<a.length;c++)t+=a[c].replace(/\\\n[ \t]*/g,"").replace(/\\`/g,"`"),c<(arguments.length<=1?0:arguments.length-1)&&(t+=arguments.length<=c+1?void 0:arguments[c+1]);var n=t.split("\n"),r=null;return n.forEach((function(e){var a=e.match(/^(\s+)\S+/);if(a){var t=a[1].length;r=r?Math.min(r,t):t}})),null!==r&&(t=n.map((function(e){return" "===e[0]?e.slice(r):e})).join("\n")),(t=t.trim()).replace(/\\n/g,"\n")}},228:function(e,a,t){"use strict";t.r(a),t.d(a,"ReactComponent",(function(){return m}));var c=t(0);function n(){return(n=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&(e[c]=t[c])}return e}).apply(this,arguments)}function r(e,a){if(null==e)return{};var t,c,n=function(e,a){if(null==e)return{};var t,c,n={},r=Object.keys(e);for(c=0;c<r.length;c++)t=r[c],a.indexOf(t)>=0||(n[t]=e[t]);return n}(e,a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(c=0;c<r.length;c++)t=r[c],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var d=c.createElement("path",{fill:"#FF8080",d:"M24 15h6v4h-6z"}),o=c.createElement("path",{fill:"#8094FF",d:"M33 15h3v4h-3z"}),l=c.createElement("path",{fill:"#80FFB2",d:"M21 22h8v4h-8z"}),i=c.createElement("path",{fill:"#DE80FF",d:"M16 29h9v4h-9zM27 8h5v4h-5z"}),s=c.createElement("path",{fill:"#FFE380",d:"M28 29h4v4h-4z"}),p=c.createElement("path",{fill:"#8094FF",d:"M14 36h8v4h-8z"}),u=c.createElement("path",{fill:"#80FFB2",d:"M25 36h9v4h-9z"}),f=c.createElement("path",{d:"M52.838 33.321l-13.424-23.25c-2.694-4.666-9.43-4.666-12.124 0l-13.857 24c-2.694 4.667.674 10.5 6.063 10.5h17.699m3.147-32.892l13.75 23.816a5.5 5.5 0 11-9.526 5.5l-9.625-16.671",stroke:"#FFF",strokeWidth:4,strokeLinecap:"round",strokeLinejoin:"round"});function m(e){var a=e.title,t=e.titleId,m=r(e,["title","titleId"]);return c.createElement("svg",n({width:64,height:62,viewBox:"0 0 64 62",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-labelledby":t},m),a?c.createElement("title",{id:t},a):null,d,o,l,i,s,p,u,f)}a.default=t.p+"9cec8c5fd90d28aef5b40f66f90c4b6d.svg"},229:function(e,a,t){"use strict";t.r(a),a.default=t.p+"assets/medias/paperclip-fast-demo-c2b6969df90230ac2918a59bfb42a2b0.mp4"},230:function(e,a,t){"use strict";t.r(a),a.default=t.p+"assets/medias/grid-demo-33c65dbdf058fd67661b6bc7221e3e7c.mp4"},231:function(e,a,t){"use strict";t.r(a),a.default=t.p+"assets/medias/cross-browser-testing-ad84afdd569764285fc06dff2b1e55c6.mp4"},232:function(e,a,t){"use strict";t.r(a),a.default=t.p+"assets/medias/visual-regression-testing-e47de56ac5c99316145fd2e81cbc0582.mp4"}}]);