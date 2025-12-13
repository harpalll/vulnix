import fs from "fs";
import path from "path";

export interface Dependency {
  name: string;
  version: string;
  type: "dependency" | "devDependency";
}

export function scanDependencies(projectRoot: string): Dependency[] {
  const pkgPath = path.join(projectRoot, "package.json");
  if (!fs.existsSync(pkgPath)) {
    throw new Error("package.json not found");
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  const deps: Dependency[] = [];

  const collect = (
    obj: Record<string, string> | undefined,
    type: Dependency["type"]
  ) => {
    if (!obj) return;
    for (const [name, version] of Object.entries(obj)) {
      deps.push({ name, version, type });
    }
  };

  collect(pkg.dependencies, "dependency");
  collect(pkg.devDependencies, "devDependency");

  return deps;
}
