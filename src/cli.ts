#!/usr/bin/env node

/**
 * Tokenwise CLI
 *
 * Usage:
 * tokenwise <file> [options]
 *
 * Options:
 * --toon       Convert JSON to TOON format
 * --compact    Convert JSON to compact format
 * --analyze    Show token analysis
 */

import fs from "fs";
import path from "path";
import ai from "./index";

// Get CLI args
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
Usage:
  tokenwise <file> [options]

Options:
  --toon       Convert JSON to TOON format
  --compact    Convert JSON to compact format
  --analyze    Show token analysis
`);
  process.exit(0);
}

const filePath = path.resolve(process.cwd(), args[0]);

// Validate file
if (!fs.existsSync(filePath)) {
  console.error("❌ File not found:", filePath);
  process.exit(1);
}

// Read file
const raw = fs.readFileSync(filePath, "utf-8");

let json;

try {
  json = JSON.parse(raw);
} catch (err) {
  console.error("❌ Invalid JSON file");
  process.exit(1);
}

// Process options
const tool = ai(json);

if (args.includes("--toon")) {
  console.log(tool.toTOON().value());
} else if (args.includes("--compact")) {
  console.log(tool.compact().value());
} else if (args.includes("--analyze")) {
  console.log(tool.analyze());
} else {
  console.log("⚠️ No valid option provided. Use --toon, --compact or --analyze");
}