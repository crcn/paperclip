use crate::base::parser::ParseError;
use crate::base::tokenizer::BaseTokenizer;

#[derive(PartialEq, Debug)]
pub enum Token<'a> {
  // <
  LessThan,

  // -
  Minus,

  // *
  Star,

  // +
  Plus,

  // ~
  Squiggle,

  // @
  At,

  // >
  GreaterThan,

  // >>>
  Pierce,

  // />
  SelfTagClose,

  // </
  TagClose,

  // !
  Bang,

  // {#
  BlockOpen,

  // {/
  BlockClose,

  // {
  CurlyOpen,

  // }
  CurlyClose,

  // [
  SquareOpen,

  // ]
  SquareClose,

  // (
  ParenOpen,

  // )
  ParenClose,

  // "
  DoubleQuote,

  // '
  SingleQuote,

  // =
  Equals,

  // ==
  DoubleEquals,

  // ===
  TrippleEquals,

  // /
  Backslash,

  //
  Whitespace,

  // ...
  Spread,

  // .
  Dot,

  // #
  Hash,

  // ,
  Comma,

  // :
  Colon,

  // :
  Semicolon,

  // /*
  ScriptCommentOpen,

  // */
  ScriptCommentClose,

  // -->
  HtmlCommentOpen,

  // //
  LineCommentOpen,

  // -->
  HtmlCommentClose,

  // div, blay
  Word(&'a str),

  // 5, .5, 0.5
  Number(&'a str),

  Byte(u8),
}

pub struct Tokenizer<'a> {
  pub source: &'a [u8],
  pub pos: usize,
}

impl<'a> Tokenizer<'a> {
  pub fn eat_whitespace(&mut self) {
    if self.is_eof() {
      return;
    }
    let is_whitepace = |c| -> bool { matches!(c, b' ' | b'\t' | b'\r' | b'\n') };
    while !self.is_eof() && is_whitepace(self.curr_char().unwrap()) {
      self.pos += 1;
    }
  }

  pub fn utf8_pos() {}

  pub fn peek(&mut self, steps: u8) -> Result<Token<'a>, ParseError> {
    let pos = self.pos;
    let mut i = 0;
    let mut result = Err(ParseError::unknown());
    while i < steps {
      result = self.next();
      i += 1;
    }
    self.pos = pos;
    result
  }
  pub fn peek_eat_whitespace(&mut self, steps: u8) -> Result<Token<'a>, ParseError> {
    let pos = self.pos;
    let mut i = 0;
    let mut result = Err(ParseError::unknown());
    while i < steps {
      self.eat_whitespace();
      result = self.next();
      i += 1;
    }
    self.pos = pos;
    result
  }

  pub fn next_expect(&mut self, expected_token: Token) -> Result<Token<'a>, ParseError> {
    let pos = self.pos;
    let token = self.next()?;
    if token == expected_token {
      return Ok(token);
    } else {
      return Err(ParseError::unexpected_token(pos));
    }
  }

  pub fn next_word_value(&mut self) -> Result<String, ParseError> {
    let pos = self.pos;
    if let Token::Word(value) = self.next()? {
      Ok(value.to_string())
    } else {
      Err(ParseError::unexpected_token(pos))
    }
  }

  pub fn next(&mut self) -> Result<Token<'a>, ParseError> {
    if self.is_eof() {
      return Err(ParseError::eof());
    }

    let c = self.curr_char()?;

    match c {
      b'/' => {
        if self.starts_with(b"//") {
          self.forward(2);
          Ok(Token::LineCommentOpen)
        } else if self.starts_with(b"/>") {
          self.forward(2);
          Ok(Token::SelfTagClose)
        } else if self.starts_with(b"/*") {
          self.forward(2);
          Ok(Token::ScriptCommentOpen)
        } else {
          self.forward(1);
          Ok(Token::Backslash)
        }
      }
      b'>' => {
        if self.starts_with(b">>>") {
          self.forward(3);
          Ok(Token::Pierce)
        } else {
          self.forward(1);
          Ok(Token::GreaterThan)
        }
      }
      b'<' => {
        if self.starts_with(b"</") {
          self.forward(2);
          Ok(Token::TagClose)
        } else if self.starts_with(b"<!--") {
          self.forward(4);
          Ok(Token::HtmlCommentOpen)
        } else {
          self.forward(1);
          Ok(Token::LessThan)
        }
      }
      b'-' => {
        if self.starts_with(b"-->") {
          self.forward(3);
          Ok(Token::HtmlCommentClose)
        } else {
          self.forward(1);
          Ok(Token::Minus)
        }
      }
      b'*' => {
        if self.starts_with(b"*/") {
          self.forward(2);
          Ok(Token::ScriptCommentClose)
        } else {
          self.forward(1);
          Ok(Token::Star)
        }
      }
      b'!' => {
        self.forward(1);
        Ok(Token::Bang)
      }
      b'+' => {
        self.forward(1);
        Ok(Token::Plus)
      }
      b'~' => {
        self.forward(1);
        Ok(Token::Squiggle)
      }
      b'@' => {
        self.forward(1);
        Ok(Token::At)
      }
      b',' => {
        self.forward(1);
        Ok(Token::Comma)
      }
      b':' => {
        self.forward(1);
        Ok(Token::Colon)
      }
      b';' => {
        self.forward(1);
        Ok(Token::Semicolon)
      }
      b'.' => {
        if self.starts_with(b"...") {
          self.forward(3);
          Ok(Token::Spread)
        } else {
          self.forward(1);
          let is_number = |c| matches!(c, b'0'..=b'9');

          if !self.is_eof() && is_number(self.curr_char().unwrap()) {
            let start = self.pos - 1;
            self.scan(is_number);
            Ok(Token::Number(self.since(start)))
          } else {
            Ok(Token::Dot)
          }
        }
      }
      b'{' => {
        self.forward(1);
        if self.starts_with(b"#") {
          self.forward(1);
          Ok(Token::BlockOpen)
        } else if self.starts_with(b"/") {
          self.forward(1);
          Ok(Token::BlockClose)
        } else {
          Ok(Token::CurlyOpen)
        }
      }
      b'}' => {
        self.forward(1);
        Ok(Token::CurlyClose)
      }
      b'0'..=b'9' => {
        let start = self.pos;
        let is_number = |c| matches!(c, b'0'..=b'9');
        self.scan(is_number);
        if self.starts_with(b".") {
          self.forward(1);
          self.scan(is_number);
        }

        Ok(Token::Number(self.since(start)))
      }
      b'[' => {
        self.forward(1);
        Ok(Token::SquareOpen)
      }
      b']' => {
        self.forward(1);
        Ok(Token::SquareClose)
      }
      b'(' => {
        self.forward(1);
        Ok(Token::ParenOpen)
      }
      b')' => {
        self.forward(1);
        Ok(Token::ParenClose)
      }
      b'#' => {
        self.forward(1);
        Ok(Token::Hash)
      }
      b'"' => {
        self.forward(1);
        Ok(Token::DoubleQuote)
      }
      b'\'' => {
        self.forward(1);
        Ok(Token::SingleQuote)
      }
      b'=' => {
        if self.starts_with(b"===") {
          self.forward(3);
          Ok(Token::TrippleEquals)
        } else if self.starts_with(b"==") {
          self.forward(2);
          Ok(Token::DoubleEquals)
        } else {
          self.forward(1);
          Ok(Token::Equals)
        }
      }
      b'a'..=b'z' | b'A'..=b'Z' => {
        Ok(Token::Word(self.search(|c| -> bool {
          matches!(c, b'a'..=b'z' | b'A'..=b'Z' | b'0'..=b'9')
        })))
      }
      b' ' | b'\t' | b'\r' | b'\n' => {
        self.scan(|c| -> bool { matches!(c, b' ' | b'\t' | b'\r' | b'\n') });
        Ok(Token::Whitespace)
      }
      _ => {
        self.forward(1);
        Ok(Token::Byte(c))
      }
    }
  }

  fn starts_with(&mut self, pattern: &[u8]) -> bool {
    self.source[self.pos..].starts_with(pattern)
  }
  fn forward(&mut self, pos: usize) {
    self.pos += pos;
  }
  pub fn curr_char(&mut self) -> Result<u8, ParseError> {
    if self.is_eof() {
      Err(ParseError::eof())
    } else {
      Ok(self.source[self.pos])
    }
  }
  fn search<FF>(&mut self, test: FF) -> &'a str
  where
    FF: Fn(u8) -> bool,
  {
    let start = self.pos;
    self.scan(test);
    self.since(start)
  }

  fn since(&mut self, start: usize) -> &'a str {
    std::str::from_utf8(&self.source[start..self.pos]).unwrap()
  }

  fn scan<FF>(&mut self, test: FF)
  where
    FF: Fn(u8) -> bool,
  {
    while !self.is_eof() {
      let c = self.source[self.pos];
      self.pos += 1;
      if !test(c) {
        self.pos -= 1;
        break;
      }
    }
  }
  pub fn is_eof(&mut self) -> bool {
    self.pos >= self.source.len()
  }
  pub fn new(source: &'a str) -> Tokenizer {
    Tokenizer {
      source: source.as_bytes(),
      pos: 0,
    }
  }
  pub fn new_from_bytes(source: &'a [u8], pos: usize) -> Tokenizer {
    Tokenizer {
      source: source,
      pos,
    }
  }
}

impl<'a> BaseTokenizer<'a> for Tokenizer<'a> {
  fn is_eof(&self) -> bool {
    self.pos >= self.source.len()
  }
  fn skip(&mut self) -> Result<(), ParseError> {
    self.next()?;
    Ok(())
  }
  fn get_source(&self) -> &'a [u8] {
    self.source
  }
  fn get_pos(&self) -> usize {
    self.pos
  }
}
