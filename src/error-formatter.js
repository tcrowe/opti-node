const ignorePatterns = [
  "internal/modules/cjs/loader.js",
  "internal/bootstrap/node.js"
]

function formatError(err) {
  err.stack = err.stack
    .split("\n")
    .filter(line => {
      return ignorePatterns.every(pattern => {
        return line.indexOf(pattern) === -1
      })
    })
    .map((line, index) => {
      if (index > 0) {
        line = `  ${line}`
      }
      return line
    })
    .join("\n")

  return err
}

process.on("uncaughtException", err => {
  console.log(formatError(err))
  process.exit(1)
})
