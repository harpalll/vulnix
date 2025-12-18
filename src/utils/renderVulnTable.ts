import Table from "cli-table3";
import { colorSeverity } from "./colorSeverity.js";
import { Vulnerability } from "../agent/vulnFetcher.js";
import chalk from "chalk";

function truncate(text: string, max = 60) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max - 1) + "…" : text;
}

export function renderVulnTable(vulns: Vulnerability[]) {
  const termWidth = process.stdout.columns || 80;

  const table = new Table({
    head: ["Package", "Severity", "Affected Range", "Fix", "Details"],
    colWidths: [
      18,
      11,
      20,
      8,
      Math.max(termWidth - (18 + 11 + 20 + 8 + 6), 25),
    ],
    wordWrap: true,
  });

  for (const v of vulns) {
    table.push([
      v.name,
      colorSeverity(v.severity),
      truncate(v.range || "unknown", 20),
      v.fixAvailable ? chalk.green("Yes") : chalk.gray("No"),
      truncate(v.via.join("; "), 80),
    ]);
  }

  console.log(table.toString());
}
