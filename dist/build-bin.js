"use strict";var fs=require("fs");var path=require("path");var async=require("async");var optiNodeBinPath=path.join(__dirname,"..","bin","opti-node.sh");var _require=require("./index"),staticArgs=_require.staticArgs;function buildSource(){var otherArgs=staticArgs.join(" ");var op="\n\n# opti-node bin file generated by ../src/build-bin.js\n\n#\n# try to run node with good settings for low resource environments\n#\n\nLOG_COLOR_ARG=\"--no-log-colour\"\n\nif [[ \"$NODE_ENV\" == \"development\" ]]; then\n  LOG_COLOR_ARG=\"--log-colour\"\nfi\n\nLIMIT_RAM_ARG=\"\"\n\nif [[ \"$OPTI_NODE_LIMIT_RAM_MB\" != \"\" ]]; then\n  LIMIT_RAM_ARG=\"--max_old_space_size=$OPTI_NODE_LIMIT_RAM_MB\"\nfi\n\nINTERACTIVE=\"\"\n\nif [[ \"$@\" == \"\" ]]; then\n  INTERACTIVE=\"--interactive\"\nfi\n\nnode ".concat(otherArgs," \\\n  $LOG_COLOR_ARG \\\n  $LIMIT_RAM_ARG \\\n  $INTERACTIVE \\\n  $@\n\n");return op}function writeOptiNodeScript(done){var op=buildSource();fs.writeFile(optiNodeBinPath,op,function(err){if(err!==null&&err!==undefined){console.error("error writing",optiNodeBinPath,err);return done(err)}done()})}function chmodOptiNodeScript(done){fs.chmod(optiNodeBinPath,511,function(err){if(err!==null&&err!==undefined){console.error("error chmod",optiNodeBinPath,err);return done(err)}done()})}var steps=[writeOptiNodeScript,chmodOptiNodeScript];async.series(steps,function(err){if(err!==null&&err!==undefined){console.error("error doing build series",err)}});
//# sourceMappingURL=build-bin.js.map