#!/usr/bin/env node

import { fetchVulnerabilities } from "../agent/vulnFetcher.js";
import {
  explainVulnerabilities,
  type ExplainedVulnerability,
} from "../agent/explainer.js";
import { callLLM } from "../agent/llm.js";
import { renderVulnTable } from "../utils/renderVulnTable.js";

function renderExplanation(v: ExplainedVulnerability) {
  const line = "─".repeat(Math.min(process.stdout.columns || 80, 80));

  console.log(`
${line}
📦 Package: ${v.name}
Severity: ${v.severity.toUpperCase()}
${line}

${v.explanation}

`);
}

async function main() {
  const command = process.argv[2];
  const projectRoot = process.cwd();
  console.log(process.env.GEMINI_API_KEY);

  if (command === "explain") {
    console.log("🧠 Explaining vulnerabilities...\n");

    const vulns = fetchVulnerabilities(projectRoot);
    renderVulnTable(vulns);
    // console.log(vulns);

    if (vulns.length === 0) {
      console.log("🎉 No vulnerabilities to explain");
      process.exit(0);
    }

    const explained = await explainVulnerabilities(vulns, callLLM);
    console.log(explained);

    for (const e of explained) {
      // console.log(`📦 ${e.name}`);
      // console.log(`Severity: ${e.severity.toUpperCase()}`);
      // console.log(e.explanation);
      // console.log("---\n");
      renderExplanation(e);
    }
  } else {
    console.log("Usage: vulnix explain");
  }
}

main().catch((err) => {
  console.error("❌ Vulnix failed:");
  console.error(err);
  process.exit(1);
});
