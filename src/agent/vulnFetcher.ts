import { execSync } from "child_process";

export interface Vulnerability {
  name: string;
  severity: "low" | "moderate" | "high" | "critical";
  via: string[];
  range: string;
  fixAvailable: boolean | { name: string; version: string };
}

export function fetchVulnerabilities(projectRoot: string): Vulnerability[] {
  try {
    const output = execSync("npm audit --json", {
      cwd: projectRoot,
      stdio: ["ignore", "pipe", "ignore"],
    }).toString();

    const audit = JSON.parse(output);
    const vulns: Vulnerability[] = [];

    if (!audit.vulnerabilities) return [];

    for (const [name, data] of Object.entries<any>(audit.vulnerabilities)) {
      vulns.push({
        name,
        severity: data.severity,
        via: data.via.map((v: any) => (typeof v === "string" ? v : v.title)),
        range: data.range,
        fixAvailable: data.fixAvailable,
      });
    }

    return vulns;
  } catch (e) {
    return [];
  }
}
