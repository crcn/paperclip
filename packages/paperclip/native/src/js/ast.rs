use crate::base::ast::Location;
use crate::pc::ast as pc_ast;
use serde::Serialize;
use std::fmt;

#[derive(Debug, PartialEq, Serialize, Clone)]
#[serde(tag = "jsKind")]
pub enum Expression {
  Conjunction(Conjunction),
  Group(Group),
  Not(Not),
  Reference(Reference),
  Boolean(Boolean),
  String(Str),
  Number(Number),
  Array(Array),
  Object(Object),
  Node(Box<pc_ast::Node>),
}

#[derive(Debug, PartialEq, Serialize, Clone)]
pub struct Str {
  pub id: String,
  pub value: String,
  pub location: Location,
}

#[derive(Debug, PartialEq, Serialize, Clone)]
pub struct Number {
  pub id: String,
  pub value: String,
  pub location: Location,
}

#[derive(Debug, PartialEq, Serialize, Clone)]
pub struct Boolean {
  pub id: String,
  pub value: bool,
  pub location: Location,
}

impl fmt::Display for Expression {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    match self {
      Expression::Reference(reference) => write!(f, "{}", reference.to_string()),
      Expression::Conjunction(expr) => write!(f, "{}", expr.to_string()),
      Expression::Group(expr) => write!(f, "{}", expr.to_string()),
      Expression::Not(expr) => write!(f, "{}", expr.to_string()),
      Expression::Node(node) => write!(f, "{}", node.to_string()),
      Expression::String(value) => write!(f, "\"{}\"", value.value.to_string()),
      Expression::Boolean(value) => write!(f, "{}", value.value.to_string()),
      Expression::Number(value) => write!(f, "{}", value.value.to_string()),
      Expression::Array(value) => write!(f, "{}", value.to_string()),
      Expression::Object(value) => value.fmt(f),
    }
  }
}

impl Expression {
  pub fn get_location(&self) -> &Location {
    match self {
      Expression::Reference(expr) => &expr.location,
      Expression::Conjunction(expr) => &expr.location,
      Expression::Group(expr) => &expr.location,
      Expression::Not(expr) => &expr.location,
      Expression::Node(expr) => expr.get_location(),
      Expression::String(expr) => &expr.location,
      Expression::Boolean(expr) => &expr.location,
      Expression::Number(expr) => &expr.location,
      Expression::Array(expr) => &expr.location,
      Expression::Object(expr) => &expr.location,
    }
  }
  pub fn get_id(&self) -> &String {
    match self {
      Expression::Reference(expr) => &expr.id,
      Expression::Conjunction(expr) => &expr.id,
      Expression::Group(expr) => &expr.id,
      Expression::Not(expr) => &expr.id,
      Expression::Node(expr) => expr.get_id(),
      Expression::String(expr) => &expr.id,
      Expression::Boolean(expr) => &expr.id,
      Expression::Number(expr) => &expr.id,
      Expression::Array(expr) => &expr.id,
      Expression::Object(expr) => &expr.id,
    }
  }
}

#[derive(Debug, PartialEq, Serialize, Clone)]
pub struct Group {
  pub id: String,
  pub location: Location,
  pub expression: Box<Expression>,
}

impl fmt::Display for Group {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    write!(f, "({})", self.expression.to_string())
  }
}

#[derive(Debug, PartialEq, Serialize, Clone)]
pub struct Not {
  pub id: String,
  pub location: Location,
  pub expression: Box<Expression>,
}

impl fmt::Display for Not {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    write!(f, "!{}", self.expression.to_string())
  }
}

#[derive(Debug, PartialEq, Serialize, Clone)]
pub struct Conjunction {
  pub id: String,
  pub location: Location,
  pub left: Box<Expression>,
  pub operator: ConjunctionOperatorKind,
  pub right: Box<Expression>,
}

#[derive(Debug, PartialEq, Serialize, Clone)]
pub enum ConjunctionOperatorKind {
  And,
  Or,
}

impl fmt::Display for Conjunction {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    let operator = match self.operator {
      ConjunctionOperatorKind::And => "&&",
      ConjunctionOperatorKind::Or => "||",
    };
    write!(
      f,
      "{}{}{}",
      self.left.to_string(),
      operator,
      self.right.to_string()
    )
  }
}

#[derive(Debug, PartialEq, Serialize, Clone)]
pub struct Array {
  pub id: String,
  pub values: Vec<Expression>,
  pub location: Location,
}

impl fmt::Display for Array {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    let buffer: Vec<String> = self.values.iter().map(|value| value.to_string()).collect();
    write!(f, "{}", format!("[{}]", buffer.join(", ")))
  }
}

#[derive(Debug, PartialEq, Serialize, Clone)]
pub struct Object {
  pub id: String,
  pub properties: Vec<Property>,
  pub location: Location,
}

impl fmt::Display for Object {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    let buffer: Vec<String> = self
      .properties
      .iter()
      .map(|value| value.to_string())
      .collect();
    write!(f, "{}", format!("{{{}}}", buffer.join(", ")))
  }
}

#[derive(Debug, PartialEq, Serialize, Clone)]
pub struct Property {
  pub key: String,
  pub value: Expression,
}

impl fmt::Display for Property {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    write!(
      f,
      "{}",
      format!("{}:{}", self.key.to_string(), self.value.to_string())
    )
  }
}

#[derive(Debug, PartialEq, Serialize, Clone)]
pub struct Reference {
  pub id: String,
  pub location: Location,
  pub path: Vec<ReferencePart>,
}

impl fmt::Display for Reference {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    write!(
      f,
      "{}",
      self
        .path
        .iter()
        .map(|part| { part.to_string() })
        .collect::<Vec<String>>()
        .join(".Expression")
    )
  }
}

#[derive(Debug, PartialEq, Serialize, Clone)]
pub struct ReferencePart {
  pub optional: bool,
  pub name: String,
}

impl fmt::Display for ReferencePart {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    write!(f, "{}", self.name);
    if self.optional {
      write!(f, "?");
    }
    Ok(())
  }
}
