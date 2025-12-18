import chalk from "chalk";

export const colorSeverity = (sev: string) => {
  switch (sev) {
    case "critical":
      return chalk.bgRed.white.bold(sev.toUpperCase());
    case "high":
      return chalk.red.bold(sev.toUpperCase());
    case "moderate":
      return chalk.yellow.bold(sev.toUpperCase());
    case "low":
      return chalk.blue.bold(sev.toUpperCase());
    default:
      return sev;
  }
};
