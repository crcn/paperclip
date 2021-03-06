import { SourceLocation } from "./base-ast";

export type ExprTextSource = {
  uri: string;
  location: SourceLocation;
};

export type ExprSource = {
  sourceId: string;
  textSource?: ExprTextSource;
};
