
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
  * Still need to remove internal node modules from stack trace

Sometimes you'll get it down to 10 MB while node usually runs at over 40 MB. It keeps going back down to the minimum over time.

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

# any extra ode flags are fine
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

## Limit memory to specific size

Try to constrain node memory size.

`OPTI_NODE_LIMIT_RAM_MB=200 opti-node dist/index.js`

## Is this scientifically proven to be optimized?

No. Not yet. We might be able to prove it by enumerating `node --v8-options` then running tests on each of the flags. Ideally we can produce graphs that compare each flags across some tests.

## Development

```sh
npm run dev
npm test
npm run prd
```
