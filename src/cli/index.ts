import path from "path";
import { scanDependencies } from "../agent/scanner";
import { fetchVulnerabilities } from "../agent/vulnFetcher";

const projectRoot = process.cwd();

console.log("🔍 Scanning npm project...");

const deps = scanDependencies(projectRoot);
const vulns = fetchVulnerabilities(projectRoot);

if (vulns.length === 0) {
  console.log("🎉 No known vulnerabilities found");
  process.exit(0);
}

console.log(`Found ${vulns.length} vulnerabilities:\n`);

for (const v of vulns) {
  console.log(`- ${v.name} (${v.severity.toUpperCase()})`);
}
