#!/usr/bin/env node
const fs = require("fs");
const { spawn } = require("child_process");

const args = process.argv.slice(2);
console.log(args);
const file = args[0];
if (!file) {
  console.log("choose file to run");
  process.exit(1);
}
let currentProcess = null;
function run() {
  if (currentProcess) {
    currentProcess.kill();
  }
  console.log(`running ${file}...`);
  currentProcess = spawn("node", [file], { stdio: "inherit" });
}

run();

fs.watch(file, () => {
  console.log("watchman on duty");
  run();
});
