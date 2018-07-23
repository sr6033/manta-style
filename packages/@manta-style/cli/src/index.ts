#!/usr/bin/env node
import * as express from "express";
import * as path from "path";
import * as builder from "@manta-style/typescript-builder";
import * as program from "commander";
import findRoot = require("find-root");
import packageInfo = require("../package.json");

type HTTPMethods = "get" | "post" | "put" | "delete" | "patch";

// const snapshot = {};

// fs.writeFileSync("snapshot.json", JSON.stringify(snapshot, undefined, 2));

// app.listen(3000, () =>
//   console.log("Manta Style Mock Server is working on port 3000.")
// );

program
  .version(packageInfo.version)
  .option(
    "-c --configFile <file>",
    "the TypeScript config file to generate entry points"
  )
  .option("-p --port <i> [3000]", "To use a port different than 3000")
  .option(
    "--generateSnapshot <file>",
    "To generate a API mock data snapshot (Not yet implemented.)"
  )
  .option(
    "--useSnapshot <file>",
    "To launch a server with data snapshot (Not yet implemented.)"
  )
  .option("-v --verbose", "show debug information")
  .parse(process.argv);

const {
  configFile,
  port,
  generateSnapshot,
  useSnapshot,
  verbose = false
} = program;

if (!configFile) {
  console.log(
    "Please specifiy a entry point config file by using --configFile."
  );
  process.exit(1);
}
if (generateSnapshot && useSnapshot) {
  console.log(
    "You cannot use --generateSnapshot and --useSnapshot at the same time."
  );
  process.exit(1);
}

const app = express();
const tmpDir = findRoot(process.cwd()) + "/.mantastyle-tmp";
const compiledFilePath = builder.build(
  path.resolve(configFile),
  tmpDir,
  verbose
);

const compileConfig = require(compiledFilePath);

function buildEndpoints(method: HTTPMethods) {
  const methodTypeDef = compileConfig[method.toUpperCase()];
  if (methodTypeDef) {
    const endpoints = methodTypeDef.getType()._getProperties();
    for (const endpoint of endpoints) {
      // snapshot[endpoint.name.replace(/"/g, "")] = p.type.mock();
      app[method](endpoint.name, (req, res) => {
        res.send(endpoint.type.mock());
      });
    }
  }
}

(["get", "post", "put", "delete", "patch"] as HTTPMethods[]).forEach(
  buildEndpoints
);

app.listen(port || 3000);

console.log(
  "Manta Style Mock Server launched at http://localhost:" + (port || 3000)
);
