import { execSync } from "child_process";

export interface Vulnerability {
  name: string;
  severity: "low" | "moderate" | "high" | "critical";
  via: string[];
  range: string;
  fixAvailable: boolean | { name: string; version: string };
}

export function fetchVulnerabilities(projectRoot: string): Vulnerability[] {
  let output = "";

  try {
    output = execSync("npm audit --json", {
      cwd: projectRoot,
      stdio: ["ignore", "pipe", "pipe"],
    }).toString();
  } catch (err: any) {
    // ✅ npm audit throws when vulns exist — THIS IS EXPECTED
    if (err.stdout) {
      output = err.stdout.toString();
    } else {
      throw err;
    }
  }

  const audit = JSON.parse(output);
  const vulns: Vulnerability[] = [];

  if (!audit.vulnerabilities) return [];

  for (const [name, data] of Object.entries<any>(audit.vulnerabilities)) {
    if (!data.via || data.via.length === 0) continue;

    vulns.push({
      name,
      severity: data.severity,
      via: data.via.map((v: any) => v.title),
      range: data.range ?? "unknown",
      fixAvailable: data.fixAvailable,
    });
  }

  return vulns;
}
