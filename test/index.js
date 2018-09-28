const path = require("path")
const {createProcess} = require("../src/index")
const {exitCode, simpleMessage, lineBreak} = require("./fixtures")
const echoScriptPath = path.join(__dirname, "echo.js")

describe("opti-node", () => {
  it("createProcess simple", done => {
    const proc = createProcess({args: [echoScriptPath]})

    proc.stdout.on("data", buf => {
      buf.toString().should.be.exactly(simpleMessage + lineBreak)
      proc.kill()
    })

    proc.on("close", code => {
      code.should.be.exactly(exitCode)
      done()
    })

    proc.stdin.write(simpleMessage)
  })
})
