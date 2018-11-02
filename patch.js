#!/usr/bin/env node

const { readFile, writeFile } = require("fs");
const { promisify, inspect } = require("util");
const { resolve } = require("path");

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

// for me, this file is in a `script` folder, change that depending on where you put this script
//const REPO_ROOT = resolve(__dirname, "..");
const REPO_ROOT = __dirname;
const REACT_NATIVE_INSTALL_FOLDER = resolve(
  REPO_ROOT,
  "./node_modules/react-native"
);

const BREAK_LINE = "\n";

function replaceStringInFile(file, { lookUpString, correctString }) {
  return file
    .toString()
    .split(BREAK_LINE)
    .map(
      line =>
        line.includes(lookUpString)
          ? line.replace(lookUpString, correctString)
          : line
    )
    .join(BREAK_LINE);
}

async function processFile({ filePath, operation, args }) {
  const fullFilePath = resolve(REACT_NATIVE_INSTALL_FOLDER, filePath);
  console.log(`processing ${fullFilePath}`);
  console.log(`performing ${operation.name} with ${inspect(args)} \n`);

  try {
    const file = await readFileAsync(fullFilePath);
    const fileContent = file.toString();
    const updatedFile = operation(file, args);

    await writeFileAsync(fullFilePath, Buffer.from(updatedFile));
    console.log("done !\n");
    return;
  } catch (e) {
    console.error(`couldn't process ${filePath} - ${e.message}`);
    process.exit(1);
  }
}

const FILES_TO_PATCH = [
  {
    filePath: "./React/Base/RCTConvert.h",
    operation: replaceStringInFile,
    args: {
      lookUpString: "#import <WebKit/WebKit.h>",
      correctString: ""
    }
  }
];

async function run() {
  console.log("-| Patching react native |-");
  FILES_TO_PATCH.forEach(async fileToPatch => await processFile(fileToPatch));
}

run();
