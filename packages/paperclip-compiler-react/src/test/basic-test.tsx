import * as React from "react";
import { expect } from "chai";
import { compileModules } from "./utils";
import * as ez from "enzyme";

import * as Adapter from "enzyme-adapter-react-16";

ez.configure({ adapter: new Adapter() });

describe(__filename + "#", () => {
  [
    [
      "can render a simple module",
      {
        "/entry.pc": `<div export component as="HelloWorld">Hello</div>`
      },
      {
        HelloWorld: {}
      },
      {
        HelloWorld: `<div data-pc-406d2856="true" data-pc-80f4925f="true">Hello</div>`
      }
    ],
    [
      "can render various slots",
      {
        "/entry.pc": `<div export component as="Entry" className="{className} b" className:test="b">
          {message}
        </div>`
      },
      {
        Entry: {
          message: "bbb"
        }
      },
      {
        Entry: `<div data-pc-406d2856="true" data-pc-80f4925f="true" class=" _80f4925f_b b">bbb</div>`
      }
    ],
    [
      "Can include style from other another module",
      {
        "/entry.pc": `
          <import src="/colors.pc" as="colors" />
          <div export component as="Entry" className="$colors.text-red"></div>
        `,
        "/colors.pc": `
          <style>
            @export {
              .text-red {
                color: red;
              }
            }
          </style>
        `
      },
      {
        Entry: {}
      },
      {
        Entry: `<div data-pc-376a18c0="true" data-pc-80f4925f="true" class="_e05e7926_text-red text-red"></div>`
      }
    ],
    [
      "Can render a component from within the same document",
      {
        "/entry.pc": `
          <div export component as="Message">{children}</div>
          <div export component as="Entry"><Message>{children}</Message></div>
        `
      },
      {
        Entry: {
          children: "b"
        }
      },
      {
        Entry: `<div data-pc-376a18c0="true" data-pc-80f4925f="true"><div data-pc-406d2856="true" data-pc-80f4925f="true">b</div></div>`
      }
    ],
    [
      "Can render styles with the shorthand prop",
      {
        "/entry.pc": `
          <div export component as="Entry" {style?}></div>
        `
      },
      {
        Entry: {
          style: { color: "red" }
        }
      },
      {
        Entry: `<div data-pc-406d2856="true" data-pc-80f4925f="true" style="color:red"></div>`
      }
    ],
    [
      "Can render styles with the long form prop",
      {
        "/entry.pc": `
          <div export component as="Entry" style={style?}></div>
        `
      },
      {
        Entry: {
          style: { color: "red" }
        }
      },
      {
        Entry: `<div data-pc-406d2856="true" data-pc-80f4925f="true" style="color:red"></div>`
      }
    ],
    [
      "can render style string",
      {
        "/entry.pc": `
          <div export component as="Entry" style={style?}></div>
        `
      },
      {
        Entry: {
          style: "color: red"
        }
      },
      {
        Entry: `<div data-pc-406d2856="true" data-pc-80f4925f="true" style="color:red"></div>`
      }
    ],
    [
      "can render a dynamic style string",
      {
        "/entry.pc": `
          <div export component as="Entry" style="color: {color?}"></div>
        `
      },
      {
        Entry: {
          color: "red"
        }
      },
      {
        Entry: `<div data-pc-406d2856="true" data-pc-80f4925f="true" style="color:red"></div>`
      }
    ],
    [
      "Can render a dynamic string when the value is undefined",
      {
        "/entry.pc": `
          <div export component as="Entry" style="a: {a1}; b: {b2};"></div>
        `
      },
      {
        Entry: {
          a1: "red"
        }
      },
      {
        Entry: `<div data-pc-406d2856="true" data-pc-80f4925f="true" style="a:red"></div>`
      }
    ],
    [
      "Applies scope classes when class names dynamic string in component",
      {
        "/entry.pc": `
          <div export component as="Entry" className="{className?}">
          </div>
        `
      },
      {
        Entry: {
          className: "ab"
        }
      },
      {
        Entry: `<div data-pc-406d2856="true" data-pc-80f4925f="true" class="_80f4925f_ab ab"></div>`
      }
    ],
    [
      "Applies scope classes when {className?} applied to component",
      {
        "/entry.pc": `
          <div export component as="Entry" {className?}>
          </div>
        `
      },
      {
        Entry: {
          className: "ab"
        }
      },
      {
        Entry: `<div data-pc-406d2856="true" data-pc-80f4925f="true" class="_80f4925f_ab ab"></div>`
      }
    ],
    [
      "Applies scope classes for className={className?} applied to component",
      {
        "/entry.pc": `
          <div export component as="Entry" className={className?}>
          </div>
        `
      },
      {
        Entry: {
          className: "ab"
        }
      },
      {
        Entry: `<div data-pc-406d2856="true" data-pc-80f4925f="true" class="_80f4925f_ab ab"></div>`
      }
    ],
    [
      "Applies scope classes for class={className?} applied to component",
      {
        "/entry.pc": `
          <div export component as="Entry" class={className?}>
          </div>
        `
      },
      {
        Entry: {
          className: "ab"
        }
      },
      {
        Entry: `<div data-pc-406d2856="true" data-pc-80f4925f="true" class="_80f4925f_ab ab"></div>`
      }
    ],
    [
      "Can change the tag name of a component",
      {
        "/entry.pc": `

          <div export component as="Test" {tagName?}>
          </div>

          <div export component as="Entry">
            <Test {tagName?} />
            <Test tagName={tagName2?} />
            <Test tagName={tagName3?} />
          </div>
        `
      },
      {
        Entry: {
          tagName: "span",
          tagName2: "h1"
        }
      },
      {
        Entry: `<span data-pc-376a18c0="true" data-pc-80f4925f="true"><span data-pc-406d2856="true" data-pc-80f4925f="true"></span><h1 data-pc-406d2856="true" data-pc-80f4925f="true"></h1><div data-pc-406d2856="true" data-pc-80f4925f="true"></div></span>`
      }
    ],
    [
      "Can apply scoped styles to component instance",
      {
        "/entry.pc": `

          <div export component as="Test" {className?}>
          </div>

          <div export component as="Entry">
            <Test>
              <style>
                color: blue;
              </style>
            </Test>
          </div>
        `
      },
      {
        Entry: {
          tagName: "span",
          tagName2: "h1"
        }
      },
      {
        Entry: `<span data-pc-376a18c0="true" data-pc-80f4925f="true"><div data-pc-406d2856="true" data-pc-80f4925f="true" class="_80f4925f__9fbc00ce _9fbc00ce"></div></span>`
      }
    ],
    [
      "Can apply scoped styles to component instance that already has a class",
      {
        "/entry.pc": `

          <div export component as="Test" {className?}>
          </div>

          <div export component as="Entry">
            <Test className="another-test">
              <style>
                color: blue;
              </style>
            </Test>
          </div>
        `
      },
      {
        Entry: {
          tagName: "span",
          tagName2: "h1"
        }
      },
      {
        Entry: `<span data-pc-376a18c0="true" data-pc-80f4925f="true"><div data-pc-406d2856="true" data-pc-80f4925f="true" class="_80f4925f__80f4925f_another-test another-test _9fbc00ce _80f4925f_another-test another-test _9fbc00ce"></div></span>`
      }
    ],
    [
      "Can apply scoped styles to a instance of instaance of component",
      {
        "/entry.pc": `

          <div export component as="Test" {className?}>
          </div>
          <Test component as="Test2" className="blaaaa {className?}">
            <style>
              color: orange;
            </style>
          </Test>

          <div export component as="Entry">
            <Test2 className="another-test">
              <style>
                color: blue;
              </style>
            </Test2>
          </div>
        `
      },
      {
        Entry: {
          tagName: "span",
          tagName2: "h1"
        }
      },
      {
        Entry: `<span data-pc-ae63497a="true" data-pc-80f4925f="true"><div data-pc-406d2856="true" data-pc-80f4925f="true" class="_80f4925f__80f4925f_blaaaa blaaaa _80f4925f__80f4925f_another-test another-test _9dfabe97 _80f4925f_another-test another-test _9dfabe97 _376a18c0 _80f4925f_blaaaa blaaaa _80f4925f__80f4925f_another-test another-test _9dfabe97 _80f4925f_another-test another-test _9dfabe97 _376a18c0"></div></span>`
      }
    ],
    [
      "Can import elements that are used in slots",
      {
        "/entry.pc": `
          <import src="/button.pc" as="Button" />
          <div export component as="Test">
            {something}
          </div>

          <Test export component as="Entry" something={<Button.Button />} />
        `,
        "/button.pc": `
          <div export component as="Button">click me!</div>
        `
      },
      {
        Entry: {}
      },
      {
        Entry: `<div data-pc-376a18c0="true" data-pc-80f4925f="true"><div data-pc-348c8067="true" data-pc-1d7dbc06="true">click me!</div></div>`
      }
    ],
    [
      "Can render nodes with &&, !, and ||",
      {
        "/entry.pc": `
          <div export component as="Entry">
            {show && <span>A</span>}
            {!show && <span>B</span>}
            {false && <span>C</span>}
            {!false && <span>D</span>}
            {true && <span>E</span>}
            {0 && <span>F</span>}
            {0 && <span>G</span> || <span>H</span>}
            {false || <span>I</span>}
            {!!show && <span>J</span>}
            {(1 || 2) && <span>K</span>}
            
          </div>
        `
      },
      {
        Entry: {
          show: true
        }
      },
      {
        Entry: `<div data-pc-406d2856="true" data-pc-80f4925f="true"><span data-pc-3024ebf3="true" data-pc-80f4925f="true">A</span><span data-pc-1b09b830="true" data-pc-80f4925f="true">D</span><span data-pc-54482ef7="true" data-pc-80f4925f="true">E</span>0<span data-pc-667e4c75="true" data-pc-80f4925f="true">H</span><span data-pc-7f657d34="true" data-pc-80f4925f="true">I</span><span data-pc-f8fd61fb="true" data-pc-80f4925f="true">J</span><span data-pc-e1e650ba="true" data-pc-80f4925f="true">K</span></div>`
      }
    ],
    [
      "Can render && and || in attribute",
      {
        "/entry.pc": `
          <div export component as="Entry" a={b || "te's'a'dfds"} c={d && "d" || "e"}>
          </div>

          <div export component as="Test">
            <Entry />
            <Entry a />
            <Entry d />
            <Entry b />
          </div>
        `
      },
      {
        Test: {}
      },
      {
        Test: `<div data-pc-376a18c0="true" data-pc-80f4925f="true"><div data-pc-406d2856="true" data-pc-80f4925f="true" a="te&#x27;s&#x27;a&#x27;dfds" c="e"></div><div data-pc-406d2856="true" data-pc-80f4925f="true" a="te&#x27;s&#x27;a&#x27;dfds" c="e"></div><div data-pc-406d2856="true" data-pc-80f4925f="true" a="te&#x27;s&#x27;a&#x27;dfds" c="d"></div><div data-pc-406d2856="true" data-pc-80f4925f="true" c="e"></div></div>`
      }
    ]
  ].forEach(([title, graph, contexts, expected]: any) => {
    it(title, async () => {
      const modules = await compileModules(graph);

      const entry = modules["/entry.pc"]();

      for (const componentName in contexts) {
        const Component = entry[componentName];
        const renderedElement = ez.shallow(
          <Component {...contexts[componentName]} />
        );
        expect(renderedElement.html()).to.eql(expected[componentName]);
      }
    });
  });
});
