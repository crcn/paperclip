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
        HelloWorld: `<div class="_406d2856 _80f4925f _pub-80f4925f">Hello</div>`
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
        Entry: `<div class="_406d2856 _80f4925f _pub-80f4925f  _80f4925f_b _pub-80f4925f_b b">bbb</div>`
      }
    ],
    [
      "Can include style from another module",
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
        Entry: `<div class="_376a18c0 _80f4925f _pub-80f4925f _e05e7926_text-red _pub-e05e7926_text-red text-red"></div>`
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
        Entry: `<div class="_376a18c0 _80f4925f _pub-80f4925f"><div class="_406d2856 _80f4925f _pub-80f4925f">b</div></div>`
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
        Entry: `<div class="_406d2856 _80f4925f _pub-80f4925f" style="color:red"></div>`
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
        Entry: `<div class="_406d2856 _80f4925f _pub-80f4925f" style="color:red"></div>`
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
        Entry: `<div class="_406d2856 _80f4925f _pub-80f4925f" style="color:red"></div>`
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
        Entry: `<div class="_406d2856 _80f4925f _pub-80f4925f" style="color:red"></div>`
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
        Entry: `<div class="_406d2856 _80f4925f _pub-80f4925f" style="a:red"></div>`
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
        Entry: `<div class="_406d2856 _80f4925f _pub-80f4925f _80f4925f_ab _pub-80f4925f_ab ab"></div>`
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
        Entry: `<div class="_406d2856 _80f4925f _pub-80f4925f _80f4925f_ab _pub-80f4925f_ab ab"></div>`
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
        Entry: `<div class="_406d2856 _80f4925f _pub-80f4925f _80f4925f_ab _pub-80f4925f_ab ab"></div>`
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
        Entry: `<div class="_406d2856 _80f4925f _pub-80f4925f _80f4925f_ab _pub-80f4925f_ab ab"></div>`
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
        Entry: `<div class="_376a18c0 _80f4925f _pub-80f4925f"><span class="_406d2856 _80f4925f _pub-80f4925f"></span><h1 class="_406d2856 _80f4925f _pub-80f4925f"></h1><div class="_406d2856 _80f4925f _pub-80f4925f"></div></div>`
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
        Entry: {}
      },
      {
        Entry: `<div class="_376a18c0 _80f4925f _pub-80f4925f"><div class="_406d2856 _80f4925f _pub-80f4925f _80f4925f__9fbc00ce _pub-80f4925f__9fbc00ce _9fbc00ce"></div></div>`
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
        Entry: {}
      },
      {
        Entry: `<div class="_376a18c0 _80f4925f _pub-80f4925f"><div class="_406d2856 _80f4925f _pub-80f4925f _80f4925f_another-test _pub-80f4925f_another-test another-test _80f4925f__9fbc00ce _pub-80f4925f__9fbc00ce _9fbc00ce"></div></div>`
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
        Entry: {}
      },
      {
        Entry: `<div class="_ae63497a _80f4925f _pub-80f4925f"><div class="_406d2856 _80f4925f _pub-80f4925f _80f4925f_blaaaa _pub-80f4925f_blaaaa blaaaa _80f4925f_another-test _pub-80f4925f_another-test another-test _80f4925f__9dfabe97 _pub-80f4925f__9dfabe97 _9dfabe97 _80f4925f__376a18c0 _pub-80f4925f__376a18c0 _376a18c0"></div></div>`
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
        Entry: `<div class="_376a18c0 _80f4925f _pub-80f4925f"><div class="_348c8067 _1d7dbc06 _pub-1d7dbc06">click me!</div></div>`
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
        Entry: `<div class="_406d2856 _80f4925f _pub-80f4925f"><span class="_3024ebf3 _80f4925f _pub-80f4925f">A</span><span class="_1b09b830 _80f4925f _pub-80f4925f">D</span><span class="_54482ef7 _80f4925f _pub-80f4925f">E</span>0<span class="_667e4c75 _80f4925f _pub-80f4925f">H</span><span class="_7f657d34 _80f4925f _pub-80f4925f">I</span><span class="_f8fd61fb _80f4925f _pub-80f4925f">J</span><span class="_e1e650ba _80f4925f _pub-80f4925f">K</span></div>`
      }
    ],
    [
      "Can render && and || in attribute",
      {
        "/entry.pc": `
          <div export component as="Entry" data-a={b || "te's'a'dfds"} c={d && "d" || "e"}>
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
        Test: `<div class="_376a18c0 _80f4925f _pub-80f4925f"><div class="_406d2856 _80f4925f _pub-80f4925f" data-a="te&#x27;s&#x27;a&#x27;dfds" c="e"></div><div class="_406d2856 _80f4925f _pub-80f4925f" data-a="te&#x27;s&#x27;a&#x27;dfds" c="e"></div><div class="_406d2856 _80f4925f _pub-80f4925f" data-a="te&#x27;s&#x27;a&#x27;dfds" c="d"></div><div class="_406d2856 _80f4925f _pub-80f4925f" data-a="true" c="e"></div></div>`
      }
    ],
    [
      "Maintains attribute casing",
      {
        "/entry.pc": `
          <div export component as="Entry" allow-1password="no">
          </div>
        `
      },
      {
        Entry: {}
      },
      {
        Entry: `<div class="_406d2856 _80f4925f _pub-80f4925f" allow-1password="no"></div>`
      }
    ],
    [
      "Cannot change tag name if tagName isn't present",
      {
        "/entry.pc": `
          <div export component as="Entry">
          </div>
        `
      },
      {
        Entry: {
          tagName: "test"
        }
      },
      {
        Entry: `<div class="_406d2856 _80f4925f _pub-80f4925f"></div>`
      }
    ],
    [
      "inject-style prop works",
      {
        "/entry.pc": `
          <import src="/module.pc" inject-styles />
          <div export component as="Entry" className="abb">
          </div>
        `,
        "/module.pc": `
        `
      },
      {
        Entry: {
          tagName: "test"
        }
      },
      {
        Entry: `<div class="_376a18c0 _80f4925f _pub-80f4925f _pub-139cec8e _80f4925f_abb _pub-80f4925f_abb _pub-139cec8e_abb abb"></div>`
      }
    ],
    [
      "explicit reference doesn't get mixed with injected scopes",
      {
        "/entry.pc": `
          <import src="/a.pc" inject-styles />
          <import src="/b.pc" as="b" />
          <div export component as="Entry" className="$b.test blah">
          </div>
        `,
        "/a.pc": `
        `,
        "/b.pc": `
          <style>
            @export {
              .test {
                color: red;
              }
            }
          </style>
        `
      },
      {
        Entry: {
          tagName: "test"
        }
      },
      {
        Entry: `<div class="_ae63497a _80f4925f _pub-80f4925f _pub-98523c41 _8ae793af_test _pub-8ae793af_test test _80f4925f_blah _pub-80f4925f_blah _pub-98523c41_blah blah"></div>`
      }
    ],
    [
      "Can reference injected classes within class variants",
      {
        "/entry.pc": `
          <import src="/a.pc" inject-styles />
          <div export component as="Entry" className="a" className:test="test">
          </div>
        `,
        "/a.pc": `
          <style>
            @export {
              .test {
                color: red;
              }
            }
          </style>
        `
      },
      {
        Entry: {
          test: true
        }
      },
      {
        Entry: `<div class="_376a18c0 _80f4925f _pub-80f4925f _pub-98523c41 _80f4925f_a _pub-80f4925f_a _pub-98523c41_a a _376a18c0 _80f4925f _pub-80f4925f _pub-98523c41 _80f4925f_test _pub-80f4925f_test _pub-98523c41_test test"></div>`
      }
    ],
    [
      "Can render an import within a block",
      {
        "/entry.pc": `
          <import src="/module.pc" as="mod" />
          <div export component as="Entry">
            {<mod.Test />}
            {a && <mod.Test />}
            {!b? && <mod.Test />}
          </div>
        `,
        "/module.pc": `
          <div export component as="Test">Hello</div>
        `,
        "/a.pc": `
          <style>
            @export {
              .test {
                color: red;
              }
            }
          </style>
        `
      },
      {
        Entry: {
          a: true,
          b: false
        }
      },
      {
        Entry: `<div class="_376a18c0 _80f4925f _pub-80f4925f"><div class="_bf0b262 _139cec8e _pub-139cec8e">Hello</div><div class="_bf0b262 _139cec8e _pub-139cec8e">Hello</div><div class="_bf0b262 _139cec8e _pub-139cec8e">Hello</div></div>`
      }
    ],
    [
      "Can define styles on component with prop bound class and no class binding",
      {
        "/entry.pc": `
          <div export component as="Entry" className:active="active">
            <style>
              color: red;
            </style>
          </div>
        `
      },
      {
        Entry: {
          a: true,
          b: false
        }
      },
      {
        Entry: `<div class="_406d2856 _80f4925f _pub-80f4925f "></div>`
      }
    ],
    [
      "Can pass propery bound attributes to components",
      {
        "/entry.pc": `
          <div component as="Test" {className?}>
            <style>
              color: blue;
            </style>
          </div>
          <Test export component as="Entry" className:active="active">
            <style>
              color: red;
            </style>
          </Test>
        `
      },
      {
        Entry: {
          active: true
        }
      },
      {
        Entry: `<div class="_406d2856 _80f4925f _pub-80f4925f _80f4925f_ _pub-80f4925f_  _80f4925f_active _pub-80f4925f_active active _80f4925f__376a18c0 _pub-80f4925f__376a18c0 _376a18c0"></div>`
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
