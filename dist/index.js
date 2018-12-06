"use strict";

var _require = require("child_process"),
    spawn = _require.spawn;

var _process$env = process.env,
    _process$env$NODE_ENV = _process$env.NODE_ENV,
    NODE_ENV = _process$env$NODE_ENV === void 0 ? "production" : _process$env$NODE_ENV,
    OPTI_NODE_LIMIT_RAM_MB = _process$env.OPTI_NODE_LIMIT_RAM_MB;
var nodeCmd = "node";
var staticArgs = ["--optimize_for_size", "--expose_gc", "--gc_global", "--gc_interval=12000", "--always_compact", "--memory_reducer", "--hard_abort", "--abort_on_uncaught_exception", "--abort_on_stack_or_string_length_overflow", "--use_idle_notification", "--max_stack_trace_source_length=1000", "--no-deprecation", "--no-warnings"];

function buildLogColor() {
  if (NODE_ENV === "development") {
    return "--log_colour";
  }

  return "--no-log_colour";
}

function buildOptiNodeLimitRamMb() {
  if (OPTI_NODE_LIMIT_RAM_MB !== undefined) {
    return "--max_old_space_size=".concat(OPTI_NODE_LIMIT_RAM_MB);
  }

  return "";
}

var dynamicArgs = [buildLogColor, buildOptiNodeLimitRamMb];

function createProcess(_ref) {
  var _ref$cmd = _ref.cmd,
      cmd = _ref$cmd === void 0 ? nodeCmd : _ref$cmd,
      _ref$args = _ref.args,
      args = _ref$args === void 0 ? [] : _ref$args,
      _ref$opts = _ref.opts,
      opts = _ref$opts === void 0 ? {} : _ref$opts;
  var renderedDynamicArgs = dynamicArgs.map(function (fn) {
    return fn();
  }).filter(function (item) {
    return item.length > 0;
  });
  var procArgs = [].concat(staticArgs).concat(renderedDynamicArgs).concat(args);
  return spawn(cmd, procArgs, opts);
}

module.exports = {
  staticArgs: staticArgs,
  dynamicArgs: dynamicArgs,
  createProcess: createProcess
};
//# sourceMappingURL=index.js.map