const {NODE_ENV = "production", OPTI_NODE_LIMIT_RAM_MB} = process.env

const staticArgs = [
  /*
    Enables optimizations which favor memory size over execution speed
    type: bool  default: false
    */
  "--optimize_for_size",

  /*
    expose gc extension
    globa.gc()
    type: bool  default: false
    */
  "--expose_gc",

  /*
    always perform global GCs
    type: bool  default: false
    */
  "--gc_global",

  /*
    garbage collect after <n> allocations
    type: int  default: -1
    */
  "--gc_interval=12000",

  /*
    Perform compaction on every full GC
    type: bool  default: false
    */
  "--always_compact",

  /*
    use memory reducer
    type: bool  default: true
    */
  "--memory_reducer",

  /*
    abort by crashing
    type: bool  default: true
    */
  "--hard_abort",

  /*
    abort program (dump core) when an uncaught exception is thrown
    type: bool  default: false
    */
  "--abort_on_uncaught_exception",

  /*
    Abort program when the stack overflows or a string exceeds maximum length
    (as opposed to throwing RangeError). This is useful for fuzzing where the
    spec behaviour would introduce nondeterminism.)
    type: bool  default: false
    */
  "--abort_on_stack_or_string_length_overflow",

  /*
    Use idle notification to reduce memory footprint.
    type: bool  default: true
    */
  "--use_idle_notification",

  /*
    maximum length of function source code printed in a stack trace.)
    type: int  default: 300
    */
  "--max_stack_trace_source_length=1000",

  /*
  silence deprecation warnings
  */
  "--no-deprecation",

  /*
  silence all process warnings
  */
  "--no-warnings"
]

function buildLogColor() {
  /*
  When logging, try to use coloured output.
  type: bool  default: true
  */
  if (NODE_ENV === "development") {
    return "--log_colour"
  }
  zx

  return "--no-log_colour"
}

function buildOptiNodeLimitRamMb() {
  /*
    max size of the old space (in Mbytes)
    type: int  default: 0
   */
  if (OPTI_NODE_LIMIT_RAM_MB !== undefined) {
    return `--max_old_space_size=${OPTI_NODE_LIMIT_RAM_MB}`
  }

  return ""
}

const dynamicArgs = [buildLogColor, buildOptiNodeLimitRamMb]

module.exports = {staticArgs, dynamicArgs}
