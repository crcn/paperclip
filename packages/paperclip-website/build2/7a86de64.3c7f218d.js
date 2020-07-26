(window.webpackJsonp = window.webpackJsonp || []).push([
  [27],
  {
    176: function(e, t, n) {
      "use strict";
      n.r(t),
        n.d(t, "frontMatter", function() {
          return o;
        }),
        n.d(t, "metadata", function() {
          return l;
        }),
        n.d(t, "rightToc", function() {
          return c;
        }),
        n.d(t, "default", function() {
          return s;
        });
      var r = n(2),
        a = n(9),
        i = (n(0), n(204)),
        o = {
          id: "getting-started-installation",
          title: "Installing Paperclip",
          sidebar_label: "Installation"
        },
        l = {
          id: "getting-started-installation",
          isDocsHomePage: !0,
          title: "Installing Paperclip",
          description:
            "Paperclip is currently in Alpha, so in the meantime it's limited to small set of tooling:",
          source: "@site/docs/getting-started-installation.md",
          permalink: "/docs/",
          editUrl:
            "https://github.com/crcn/paperclip/packages/edit/master/website/docs/getting-started-installation.md",
          sidebar_label: "Installation",
          sidebar: "docs",
          next: {
            title: "Installing the VS Code extension",
            permalink: "/docs/getting-started-vscode"
          }
        },
        c = [],
        p = { rightToc: c };
      function s(e) {
        var t = e.components,
          n = Object(a.a)(e, ["components"]);
        return Object(i.b)(
          "wrapper",
          Object(r.a)({}, p, n, { components: t, mdxType: "MDXLayout" }),
          Object(i.b)(
            "p",
            null,
            "Paperclip is currently in Alpha, so in the meantime it's limited to small set of tooling:"
          ),
          Object(i.b)(
            "ul",
            null,
            Object(i.b)(
              "li",
              { parentName: "ul" },
              Object(i.b)(
                "a",
                Object(r.a)(
                  { parentName: "li" },
                  { href: "https://code.visualstudio.com/" }
                ),
                "VS Code"
              ),
              " - needed for realtime editing."
            ),
            Object(i.b)(
              "li",
              { parentName: "ul" },
              Object(i.b)(
                "a",
                Object(r.a)(
                  { parentName: "li" },
                  { href: "https://reactjs.org/" }
                ),
                "React"
              ),
              " - currently the only compile target for Paperclip."
            ),
            Object(i.b)(
              "li",
              { parentName: "ul" },
              Object(i.b)(
                "a",
                Object(r.a)(
                  { parentName: "li" },
                  { href: "https://webpack.js.org/" }
                ),
                "Webpack"
              )
            )
          ),
          Object(i.b)(
            "p",
            null,
            "Assuming you can use ",
            Object(i.b)("em", { parentName: "p" }, "all"),
            " of the stuff \u261d\ud83c\udffb, go ahead and ",
            Object(i.b)("inlineCode", { parentName: "p" }, "cd"),
            " into your project directory, then run:"
          ),
          Object(i.b)(
            "pre",
            null,
            Object(i.b)(
              "code",
              Object(r.a)({ parentName: "pre" }, { className: "language-sh" }),
              "npm install paperclip-cli --save-dev\n"
            )
          ),
          Object(i.b)("p", null, "Then run:"),
          Object(i.b)(
            "pre",
            null,
            Object(i.b)(
              "code",
              Object(r.a)({ parentName: "pre" }, { className: "language-sh" }),
              "npx paperclip init\n"
            )
          ),
          Object(i.b)(
            "p",
            null,
            "\u261d\ud83c\udffb This will setup a ",
            Object(i.b)(
              "inlineCode",
              { parentName: "p" },
              "paperclip.config.json"
            ),
            " file that will be used by Paperclip. If you're starting a new project, the ",
            Object(i.b)("inlineCode", { parentName: "p" }, "paperclip init"),
            " will also walk you through the entire setup process. "
          )
        );
      }
      s.isMDXComponent = !0;
    },
    204: function(e, t, n) {
      "use strict";
      n.d(t, "a", function() {
        return u;
      }),
        n.d(t, "b", function() {
          return m;
        });
      var r = n(0),
        a = n.n(r);
      function i(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (e[t] = n),
          e
        );
      }
      function o(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function l(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? o(Object(n), !0).forEach(function(t) {
                i(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : o(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function c(e, t) {
        if (null == e) return {};
        var n,
          r,
          a = (function(e, t) {
            if (null == e) return {};
            var n,
              r,
              a = {},
              i = Object.keys(e);
            for (r = 0; r < i.length; r++)
              (n = i[r]), t.indexOf(n) >= 0 || (a[n] = e[n]);
            return a;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var i = Object.getOwnPropertySymbols(e);
          for (r = 0; r < i.length; r++)
            (n = i[r]),
              t.indexOf(n) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, n) &&
                  (a[n] = e[n]));
        }
        return a;
      }
      var p = a.a.createContext({}),
        s = function(e) {
          var t = a.a.useContext(p),
            n = t;
          return e && (n = "function" == typeof e ? e(t) : l(l({}, t), e)), n;
        },
        u = function(e) {
          var t = s(e.components);
          return a.a.createElement(p.Provider, { value: t }, e.children);
        },
        b = {
          inlineCode: "code",
          wrapper: function(e) {
            var t = e.children;
            return a.a.createElement(a.a.Fragment, {}, t);
          }
        },
        d = a.a.forwardRef(function(e, t) {
          var n = e.components,
            r = e.mdxType,
            i = e.originalType,
            o = e.parentName,
            p = c(e, ["components", "mdxType", "originalType", "parentName"]),
            u = s(n),
            d = r,
            m = u["".concat(o, ".").concat(d)] || u[d] || b[d] || i;
          return n
            ? a.a.createElement(m, l(l({ ref: t }, p), {}, { components: n }))
            : a.a.createElement(m, l({ ref: t }, p));
        });
      function m(e, t) {
        var n = arguments,
          r = t && t.mdxType;
        if ("string" == typeof e || r) {
          var i = n.length,
            o = new Array(i);
          o[0] = d;
          var l = {};
          for (var c in t) hasOwnProperty.call(t, c) && (l[c] = t[c]);
          (l.originalType = e),
            (l.mdxType = "string" == typeof e ? e : r),
            (o[1] = l);
          for (var p = 2; p < i; p++) o[p] = n[p];
          return a.a.createElement.apply(null, o);
        }
        return a.a.createElement.apply(null, n);
      }
      d.displayName = "MDXCreateElement";
    }
  }
]);
