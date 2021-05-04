import {
  AttributeKind,
  AttributeValueKind,
  Expression,
  isAttribute,
  isAttributeValue,
  isDynamicStringAttributeValuePart,
  isStyleObject,
  DynamicStringAttributeValuePartKind,
  DynamicStringAttributeValuePart,
  isStyleSelector,
  isNode,
  isJsExpression,
  isStyleDeclaration,
  Node,
  NodeKind,
  DynamicStringAttributeValue,
  JsExpressionKind,
  JsConjunctionOperatorKind,
  isRule,
  computeVirtJSObject,
  RuleKind,
  StyleDeclarationKind,
  SelectorKind,
  KeyframeRule,
  AnnotationPropertyKind,
  computeVirtJSValue,
  JsExpression,
  StyleExpression,
  StyleRule
} from "paperclip";
import { Doc, FastPath, Printer, doc, Options } from "prettier";
import { isBlockTagName } from "./utils";

const {
  concat,
  join,
  line,
  group,
  indent,
  dedent,
  softline,
  hardline,
  fill,
  breakParent,
  literalline
} = doc.builders;

const MAX_LINES = 1;

const groupConcat = (docs: Doc[]) => group(concat(docs));

const CONJ_OP_MAP = {
  [JsConjunctionOperatorKind.And]: "&&",
  [JsConjunctionOperatorKind.Or]: "||"
};

export const print = (path: FastPath, options: Options, print): Doc => {
  const expr = path.getValue();

  const { tabWidth, useTabs } = options;

  if (isStyleObject(expr)) {
    if (isRule(expr)) {
      switch (expr.ruleKind) {
        case RuleKind.Style: {
          return printStyleRule(print)(path);
        }
        case RuleKind.Comment: {
          const buffer: Doc[] = ["/*"];
          buffer.push(
            indent(concat([softline, " ", expr.value.trim(), " "])),
            softline
          );
          buffer.push("*/");
          return groupConcat(buffer);
        }
        case RuleKind.FontFace: {
          const buffer = [
            ...cleanLines(expr.raws.before),
            "@font-face ",
            printStyleBody(print)(path),
            ...cleanLines(expr.raws.after)
          ];
          return groupConcat(buffer);
        }
        case RuleKind.Media: {
          const buffer = [
            ...cleanLines(expr.raws.before),
            "@media ",
            expr.conditionText.trim(),
            " ",
            printStyleBody(print)(path),
            ...cleanLines(expr.raws.after)
          ];
          return groupConcat(buffer);
        }
        case RuleKind.Export: {
          const buffer = [
            ...cleanLines(expr.raws.before),
            "@export {",
            indent(
              concat([
                hardline,
                group(join(hardline, path.map(print, "rules")))
              ])
            ),
            hardline,
            "}",
            ...cleanLines(expr.raws.after)
          ];

          return groupConcat(buffer);
        }
        case RuleKind.Mixin: {
          const buffer = [
            ...cleanLines(expr.raws.before),
            "@mixin ",
            expr.name.value,
            " ",
            printStyleBody(print)(path),
            ...cleanLines(expr.raws.after)
          ];
          return groupConcat(buffer);
        }
        case RuleKind.Keyframes: {
          const buffer: Doc[] = ["@keyframes ", expr.name, " ", "{"];

          // eeesh, need to do this since nested keyframes don't have enum
          // types.
          buffer.push(
            indent(
              concat([
                hardline,
                group(
                  join(
                    hardline,
                    path.map((keyframe, index) => {
                      const expr: KeyframeRule = keyframe.getValue();
                      const buffer = [
                        expr.key,
                        printStyleBody(print)(keyframe)
                      ];
                      return groupConcat(buffer);
                    }, "rules")
                  )
                )
              ])
            )
          );

          buffer.push(softline, "}");

          return groupConcat(buffer);
        }
        case RuleKind.Keyframe: {
          const buffer = [
            ,
            ...cleanLines(expr.raws.before),
            expr.key,
            " ",
            printStyleBody(print)(path),
            ...cleanLines(expr.raws.after)
          ];
          return groupConcat(buffer);
        }
      }
    } else if (isStyleDeclaration(expr)) {
      switch (expr.declarationKind) {
        case StyleDeclarationKind.KeyValue: {
          const buffer = [expr.name, ":", " ", expr.value, ";"];
          return groupConcat(buffer);
        }
        case StyleDeclarationKind.Content: {
          return groupConcat(["@content;"]);
        }
        case StyleDeclarationKind.Include: {
          const buffer: Doc[] = [
            ...cleanLines(expr.raws.before),
            "@include ",
            expr.mixinName.parts.map(part => part.name).join(".")
          ];

          if (expr.declarations.length || expr.rules.length) {
            buffer.push(" ", printStyleBody(print)(path));
          } else {
            buffer.push(";");
          }

          buffer.push(...cleanLines(expr.raws.after));

          return groupConcat(buffer);
        }
        case StyleDeclarationKind.Media: {
          return groupConcat([
            "@media ",
            expr.conditionText.trim(),
            " ",
            printStyleBody(print)(path)
          ]);
        }
      }
    } else if (isStyleSelector(expr)) {
      switch (expr.selectorKind) {
        case SelectorKind.Adjacent: {
          return join(" ", [
            path.call(print, "selector"),
            "+",
            path.call(print, "nextSiblingSelector")
          ]);
        }
        case SelectorKind.AllSelector: {
          return "*";
        }
        case SelectorKind.Attribute: {
          if (!expr.value) {
            return concat(["[", expr.name, "]"]);
          }

          return concat(["[", expr.name, expr.operator, expr.value, "]"]);
        }
        case SelectorKind.Child: {
          return join(" ", [
            path.call(print, "parent"),
            ">",
            path.call(print, "child")
          ]);
        }
        case SelectorKind.Class: {
          return concat([".", expr.className]);
        }
        case SelectorKind.Combo: {
          return concat(path.map(print, "selectors"));
        }
        case SelectorKind.Descendent: {
          return join(" ", [
            path.call(print, "ancestor"),
            path.call(print, "descendent")
          ]);
        }
        case SelectorKind.Element: {
          return expr.tagName;
        }
        case SelectorKind.Group: {
          return join(", ", path.map(print, "selectors"));
        }
        case SelectorKind.Id: {
          return concat(["#", expr.id]);
        }
        case SelectorKind.Not: {
          return concat([":not(", path.call(print, "selector"), ")"]);
        }
        case SelectorKind.PseudoElement: {
          return concat([expr.separator, expr.name]);
        }
        case SelectorKind.PseudoParamElement: {
          return concat([":", expr.name, "(", expr.param, ")"]);
        }
        case SelectorKind.Sibling: {
          return join(" ", [
            path.call(print, "selector"),
            "~",
            path.call(print, "siblingSelector")
          ]);
        }
        case SelectorKind.Within: {
          return concat([":within(", group(path.call(print, "selector")), ")"]);
        }
        case SelectorKind.Global: {
          return concat([":global(", group(path.call(print, "selector")), ")"]);
        }
        case SelectorKind.This: {
          if (expr.selector) {
            return concat([":self(", group(path.call(print, "selector")), ")"]);
          } else {
            return ":self";
          }
        }
        case SelectorKind.Prefixed: {
          const buffer = ["&"];
          if (expr.connector.trim().length) {
            buffer.push(expr.connector);
          }
          if (expr.postfixSelector) {
            buffer.push(path.call(print, "postfixSelector"));
          }
          return join("", buffer);
        }
      }

      // maybe sheet
    } else if ((expr as any).rules != null) {
      const buffer: Doc[] = [...cleanLines((expr as any).raws?.before || "")];

      if ((expr as any).declarations?.length) {
        buffer.push(join(hardline, path.map(print, "declarations")));
        buffer.push(hardline);
        if ((expr as any).declarations.length) {
        }
      }

      if ((expr as any).rules) {
        buffer.push(join(hardline, path.map(print, "rules")));
      }

      return groupConcat(buffer);
    }
  } else if (isNode(expr)) {
    switch (expr.nodeKind) {
      case NodeKind.Comment: {
        const buffer: Doc[] = [...cleanLines(expr.raws.before), "<!--"];

        const annotations: Doc[] = [];
        for (const property of expr.annotation.properties) {
          switch (property.kind) {
            case AnnotationPropertyKind.Text: {
              annotations.push(
                fixIndentation(
                  property.raws.before + property.value,
                  tabWidth,
                  useTabs
                )
              );
              break;
            }
            case AnnotationPropertyKind.Declaration: {
              annotations.push(
                fixIndentation(
                  [
                    property.raws.before,
                    `@`,
                    property.name,
                    " ",
                    JSON.stringify(computeJSExpr(property.value), null, 2)
                      .replace(/[\n\s]+/g, " ")
                      .trim()
                  ].join(""),
                  tabWidth,
                  useTabs,
                  false
                )
              );
              break;
            }
          }
        }

        buffer.push(join("", annotations));

        // note that we don't want soft line here in case
        buffer.push("-->");
        return groupConcat(buffer);
      }
      case NodeKind.Fragment: {
        return join(line, path.map(print, "children"));
      }
      case NodeKind.Element: {
        let buffer: Doc[] = [];

        let openTag: Doc[] = ["<", expr.tagName];

        if (expr.attributes.length) {
          openTag.push(
            " ",
            indent(group(join(line, path.map(print, "attributes"))))
          );
        }

        const isEmpty = expr.children.length === 0;

        if (!isEmpty) {
          openTag.push(">");
          buffer.push(
            ...openTag,
            indent(
              concat([softline, group(join(line, path.map(print, "children")))])
            )
          );

          buffer.push(softline, `</${expr.tagName}>`);
        } else {
          buffer.push(...openTag, " />");
        }

        let doc: Doc = groupConcat(buffer);

        // TODO: break all elements option
        if (isBlockTagName(expr.tagName)) {
          doc = concat([doc, breakParent]);
        }

        return concat([...cleanLines(expr.raws.before), group(doc)]);
      }
      case NodeKind.StyleElement: {
        const buffer: Doc[] = ["<style>"];
        buffer.push(
          indent(group(concat([hardline, path.call(print, "sheet")])))
        );
        buffer.push(line, "</style>", breakParent);
        return groupConcat(buffer);
      }
      case NodeKind.Text: {
        return groupConcat([expr.value.trim()]);
      }
      case NodeKind.Slot: {
        return concat([
          ...cleanLines(expr.raws.before),
          groupConcat(["{", path.call(print, "script"), "}"])
        ]);
      }
    }
  } else if (isAttribute(expr)) {
    switch (expr.attrKind) {
      case AttributeKind.KeyValueAttribute: {
        const buffer: Doc[] = [expr.name];
        if (expr.value) {
          buffer.push("=", path.call(print, "value"));
        }

        return groupConcat(buffer);
      }
      case AttributeKind.PropertyBoundAttribute: {
        const buffer: Doc[] = [expr.name, ":", expr.bindingName];
        buffer.push("=", path.call(print, "value"));
        return groupConcat(buffer);
      }
      case AttributeKind.ShorthandAttribute: {
        const buffer: Doc[] = ["{", path.call(print, "reference"), "}"];
        return groupConcat(buffer);
      }
    }
  } else if (isAttributeValue(expr)) {
    switch (expr.attrValueKind) {
      case AttributeValueKind.Slot: {
        return groupConcat(["{", path.call(print, "script"), "}"]);
      }
      case AttributeValueKind.String: {
        return groupConcat(['"', expr.value, '"']);
      }
      case AttributeValueKind.DyanmicString: {
        const buffer = [];
        buffer.push('"');
        buffer.push(
          groupConcat(path.map(printDynamicStringAttribute(print), "values"))
        );
        buffer.push('"');
        return groupConcat(buffer);
      }
    }
  } else if (isJsExpression(expr)) {
    switch (expr.jsKind) {
      case JsExpressionKind.Reference: {
        const buffer = [];
        buffer.push(
          expr.path
            .map(part => {
              return part.name + (part.optional ? "?" : "");
            })
            .join(".")
        );
        return groupConcat(buffer);
      }
      case JsExpressionKind.String: {
        return groupConcat(['"', expr.value, '"']);
      }
      case JsExpressionKind.Boolean: {
        return String(expr.value);
      }
      case JsExpressionKind.Number: {
        return String(expr.value);
      }
      case JsExpressionKind.Group: {
        return groupConcat(["(", path.call(print, "expression"), ")"]);
      }
      case JsExpressionKind.Not: {
        return concat(["!", path.call(print, "expression")]);
      }
      case JsExpressionKind.Conjunction: {
        return groupConcat([
          path.call(print, "left"),
          " ",
          CONJ_OP_MAP[expr.operator],
          " ",
          path.call(print, "right")
        ]);
      }
    }
  }

  return "";
};

export const printDynamicStringAttribute = print => (
  path: FastPath,
  v: number
): Doc => {
  const expr = path.getValue();
  switch (expr.partKind) {
    case DynamicStringAttributeValuePartKind.Literal: {
      return groupConcat([expr.value]);
    }
    case DynamicStringAttributeValuePartKind.ClassNamePierce: {
      return groupConcat(["$", expr.className]);
    }
    case DynamicStringAttributeValuePartKind.Slot: {
      return concat(["{", print(path, v), "}"]);
    }
  }

  return "";
};

export const printStyleRule = print => (path: FastPath): Doc => {
  const expr: StyleRule = path.getValue();
  const buffer: Doc[] = [];
  buffer.push(...cleanLines(expr.raws.before));
  buffer.push(path.call(print, "selector"), " ", printStyleBody(print)(path));
  buffer.push(...cleanLines(expr.raws.after));
  return groupConcat(buffer);
};

export const printStyleBody = print => (path: FastPath): Doc => {
  const expr = path.getValue();
  const buffer = [];
  buffer.push("{");
  if (expr.declarations?.length) {
    buffer.push(
      indent(
        concat([
          hardline,
          group(join(hardline, path.map(print, "declarations")))
        ])
      )
    );
  }

  if (expr.children?.length) {
    buffer.push(
      indent(
        concat([
          hardline,
          group(join(hardline, path.map(printStyleRule(print), "children")))
        ])
      )
    );
  }
  if (expr.rules?.length) {
    buffer.push(
      indent(
        concat([
          hardline,
          group(join(hardline, path.map(printStyleRule(print), "rules")))
        ])
      )
    );
  }

  buffer.push(softline, "}");

  return groupConcat(buffer);
};

const cleanLines = (ws: string, max = Infinity) => {
  return Array.from({
    length: Math.max(Math.min(countNewLines(ws) - 1, max), 0)
  }).map(line => {
    return hardline;
  });
};

const startWhitespace = (buffer: string) =>
  (buffer.match(/^[\r\n\t\s]+/) || [""])[0];
const endWhitespace = (buffer: string) =>
  (buffer.match(/[\r\n\t\s]+$/) || [""])[0];

const splitLines = (buffer: string): Doc[] => {
  return joinArray(
    buffer
      .trim()
      .split("\n")
      .map(line => {
        return line.trim();
      }),
    hardline
  );
};

const indentNewLines = (buffer: string): Doc[] => {
  return buffer
    .split("\n")
    .map(line => {
      return line.trim();
    })
    .reduce((lines, line, i) => {
      if (i === 0) {
        lines.push(line);
      } else {
        lines.push(concat([indent(hardline), line.trim()]));
      }
      return lines;
    }, []);
};

const joinArray = <TValue, TPart>(
  array: TValue[],
  joint: TPart
): Array<TValue | TPart> => {
  return array.reduce((buffer, part) => {
    if (buffer.length === 0) {
      return [part];
    }
    return [...buffer, joint, part];
  }, []);
};

const removeLeadingWhitespace = (value: string) => {
  return value.replace(/^[\s\r\n\t]/g, "");
};

const countNewLines = (ws: string) => {
  return (ws.match(/[\n\r]/g) || []).length;
};

const cleanWhitespace = (buffer: string) => {
  return buffer.trim().replace(/[\n\r\t\s]+/g, " ");
};

const fixIndentation = (
  buffer: string,
  tabWidth: number,
  useTabs: boolean,
  requireExistingIndentation = true
) => {
  const tabChar = useTabs ? "\t" : " ";
  const tabs = tabChar.repeat(tabWidth);

  const lines = buffer.split("\n");

  if (lines.length === 1 && requireExistingIndentation) {
    return buffer;
  }

  return concat(
    joinArray(
      lines.map((ln, i) => {
        if (
          ln.trim().length === 0 ||
          (!/^[\s\t]+/.test(ln) && requireExistingIndentation)
        ) {
          return ln.trim();
        }

        return indent(tabs + ln.trim());
      }),
      hardline
    )
  );
};

const computeJSExpr = (expr: JsExpression) => {
  switch (expr.jsKind) {
    case JsExpressionKind.Number:
    case JsExpressionKind.Boolean:
    case JsExpressionKind.String:
      return expr.value;
    case JsExpressionKind.Array:
      return expr.values.map(computeJSExpr);
    case JsExpressionKind.Object:
      return expr.properties.reduce((obj, prop) => {
        obj[prop.key] = computeJSExpr(prop.value);
        return obj;
      }, {});
  }
  return "";
};
