const { exitCode } = require("./fixtures");

// print whatever comes in
process.stdin.on("data", buf => console.log(buf.toString()));

// exit with specific exit code for the test
process.on("SIGTERM", () => process.exit(exitCode));
