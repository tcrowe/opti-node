
# opti-node

It's just node with some flags turned on or off to make it run better in resource restricted environments. You might want to do that in containers, low-budget projects, "embedded", or just to make development better.

Features that `opti-node` provides:

+ ✓ Optimize for smaller memory rather than speed
+ ✓ Expose `gc()` global function for manual garbage collection
+ ✓ Efficient garbage collector settings with compaction
+ ✓ Memory reducer
+ 🐛 Hard abort process on errors and sloppy code
+ ✓ Signal when idle
+ ✓ Don't print anything unless it has to
+ ✓ ~~More helpful error messages~~
  * Maybe try to remove internal node modules from stack trace

Sometimes you'll get it down to 10 MB while node usually runs at over 40 MB. It keeps going back down to the minimum over time.

Note Sat Nov 17 2018:
I tried launching the script with Bash and Zsh. Bash was lighter in memory so I put that into the `opti-node` shell script which launches `node`.

## systemd script

```
[Unit]
Description=my node script
After=network.target

[Service]
Type=simple
ExecStart=/path/to/app/node_modules/.bin/opti-node src/index.js
User=MY-NODE-USER
Restart=always
RestartSec=5
WorkingDirectory=/path/to/app
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

## GNU-Linux info

If you run opti-node here's how you find it running:

```sh
ps -A | grep node
# 16387 ?        00:00:00 opti-node
# 16392 ?        00:00:01 node

ps 16387
#   PID TTY      STAT   TIME COMMAND
# 16387 ?        Ss     0:00 /bin/bash /path/to/app/node_modules/.bin/opti-node src/index.js

ps 16392
#   PID TTY      STAT   TIME COMMAND
# 16392 ?        Sl     0:01 node --optimize_for_size --expose_gc --gc_global --gc_interval=12000 --alw

ps 16392 | less
#   PID TTY      STAT   TIME COMMAND
# 16392 ?        Sl     0:01 node --optimize_for_size --expose_gc --gc_global --gc_interval=12000 --always_compact --memory_reducer --hard_abort --abort_on_uncaught_exception --abort_on_stack_or_string_length_overflow --use_idle_notification --max_stack_trace_source_length=1000 --no-deprecation --no-warnings --no-log-colour src/index.js
```

*Your process numbers will different.*

Maybe some other things will help:

+ `top -p 1234` -- the pid
+ `htop -p 1234` -- the pid

## Windows

The script uses Bash. Unless Windows has a way to emulate or get around that I'm not sure yet how to add compatibility.

Is there a way to run `cmd.exe` or PowerShell IF on Windows?

## Ideas?

If you have ideas how to slim down the node requirements and still have it work well across platforms let me know!

## Install

`npm install opti-node`

Or globally

`npm install--global opti-node`

## CLI use

```sh
opti-node dist/index.js

# debugging
opti-node debug dist/index.js
opti-node inspect dist/index.js

# repl
opti-node

# any extra node flags are fine
opti-node --require @babel/register \
  --experimental-modules \
  --trace-warnings \
  --pending-deprecation \
  dist/index.js
```

## In package.json script

`npm install opti-node`

```json
{
  "name": "my-module",
  "version": "0.0.1",
  "description": "my module with opti-node",
  "private": true,
  "dependencies": {
    "opti-node": "0.1.0"
  },
  "scripts": {
    "start": "opti-node dist/index.js"
  }
}
```

## JavaScript use

`require("opti-node").createProcess` returns node `ChildProcess`

https://nodejs.org/dist/latest/docs/api/child_process.html#child_process_child_process_spawn_command_args_options

+ cmd, `string`, optional, defaults to node
+ args, `string[]` your node args added after opti-node's
+ opts: `object`, customize node spawn options

```js
const {createProcess} = require("opti-node")

// create the opti-node process and spawn a script
const proc = createProcess({args: ["dist/index.js"]})

//
proc.stdout.on("data", buf => {
  console.log("buf", buf)
  proc.kill()
})

proc.on("close", (code, signal) => {
  console.log("code", code)
  console.log("signal", signal)
})

proc.stdin.write(simpleMessage)
```

## Limit memory to specific size

Try to constrain node memory size.

`OPTI_NODE_LIMIT_RAM_MB=200 opti-node dist/index.js`

## Is this scientifically proven to be optimized?

No. Not yet. We might be able to prove it by enumerating `node --v8-options` then running tests on each of the flags. Ideally we can produce graphs that compare each flags across some tests.

## Development

```sh
# create a dev build
npm run dev

# before commit run a full test
npm run prd
```

## Science 🤓

We'll try to run tests as we learn. It should produce results if we are to use it.

+ [Studies](./docs/studies)
