#!/bin/bash

# opti-node bin file generated by ../src/build-bin.js

#
# try to run node with good settings for low resource environments
#

# no color in production
LOG_COLOR_ARG="--no-log-colour"

# assume production if no NODE_ENV
if [ "$NODE_ENV" == "" ]; then
  NODE_ENV=production
fi

# enable color in development
if [ "$NODE_ENV" == "development" ]; then
  LOG_COLOR_ARG="--log-colour"
fi

# the user can choose to limit ram by passing OPTI_NODE_LIMIT_RAM_MB=256
LIMIT_RAM_ARG=""

if [ "$OPTI_NODE_LIMIT_RAM_MB" != "" ]; then
  LIMIT_RAM_ARG="--max_old_space_size=$OPTI_NODE_LIMIT_RAM_MB"
fi

# no args = interactive / REPL
INTERACTIVE=""

# COUNT == 1 means no arguments
COUNT=`echo "$@" | wc -c`

if [ COUNT == 1 ]; then
  INTERACTIVE="--interactive"
fi

node --optimize_for_size --expose_gc --gc_global --gc_interval=12000 --always_compact --memory_reducer --hard_abort --abort_on_uncaught_exception --abort_on_stack_or_string_length_overflow --use_idle_notification --max_stack_trace_source_length=1000 --no-deprecation --no-warnings \
  $LOG_COLOR_ARG \
  $LIMIT_RAM_ARG \
  $INTERACTIVE \
  $@

