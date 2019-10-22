/*

# opti-node

+ the node api helps build the opti-node arguments for node
+ the CLI is built by ./build-bin.js

See ../COPYING for GPL 3.0 license

*/

const { spawn } = require("child_process");
const { NODE_ENV = "production", OPTI_NODE_LIMIT_RAM_MB } = process.env;
const nodeCmd = "node";

const staticArgs = [
  /*
    Enables optimizations which favor memory size over execution speed
    type: bool  default: false
    */
  "--optimize-for-size",

  /*
    expose gc extension
    globa.gc()
    type: bool  default: false
    */
  "--expose-gc",

  /*
    always perform global GCs
    type: bool  default: false
    */
  "--gc-global",

  /*
    garbage collect after <n> allocations
    type: int  default: -1
    */
  "--gc-interval=12000",

  /*
    Perform compaction on every full GC
    type: bool  default: false
    */
  "--always-compact",

  /*
    use memory reducer
    type: bool  default: true
    */
  "--memory-reducer",

  /*
    abort by crashing
    type: bool  default: true
    */
  "--hard-abort",

  /*
    abort program (dump core) when an uncaught exception is thrown
    type: bool  default: false
    */
  "--abort-on-uncaught-exception",

  /*
    Use idle notification to reduce memory footprint.
    type: bool  default: true
    */
  "--use-idle-notification",

  /*
    maximum length of function source code printed in a stack trace.)
    type: int  default: 300
    */
  "--max-stack-trace-source-length=1000",

  /*
  silence deprecation warnings
  */
  "--no-deprecation",

  /*
  silence all process warnings
  */
  "--no-warnings"
];

function buildLogColor() {
  /*
  When logging, try to use coloured output.
  type: bool  default: true
  */
  if (NODE_ENV === "development") {
    return "--log-colour";
  }

  return "--no-log-colour";
}

function buildOptiNodeLimitRamMb() {
  /*
    max size of the old space (in Mbytes)
    type: int  default: 0
   */
  if (OPTI_NODE_LIMIT_RAM_MB !== undefined) {
    return `--max-old-space-size=${OPTI_NODE_LIMIT_RAM_MB}`;
  }

  return "";
}

const dynamicArgs = [buildLogColor, buildOptiNodeLimitRamMb];

/**
 * Use `child_process.spawn` to create a new node process with opti-node args
 *
 * See https://nodejs.org/dist/latest/docs/api/child_process.html#child_process_child_process_spawn_command_args_options
 *
 * @method createProcess
 * @param {string} cmd the command to run, defaults to node
 * @param {array} options.args maybe just your `["script.js"]`
 * @param {object} options.opts
 * @returns {object} node child process
 */
function createProcess({ cmd = nodeCmd, args = [], opts = {} }) {
  // render the dynamic args
  const renderedDynamicArgs = dynamicArgs
    .map(fn => fn())
    // compact
    .filter(item => item.length > 0);
  const procArgs = []
    .concat(staticArgs)
    .concat(renderedDynamicArgs)
    .concat(args);
  return spawn(cmd, procArgs, opts);
}

module.exports = { staticArgs, dynamicArgs, createProcess };
