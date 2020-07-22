const { NativeEngine } = require("./native/node/paperclip");
const { createEngine, ...rest } = require("./lib");

module.exports = {
  createEngine: createEngine(NativeEngine),
  ...rest
};
