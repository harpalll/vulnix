import { GenerateContentResponse } from "@google/genai";
import { Vulnerability } from "./vulnFetcher.js";

export interface ExplainedVulnerability {
  name: string;
  severity: string;
  explanation: string | undefined;
}

export type LLM = (prompt: string) => Promise<GenerateContentResponse>;

export async function explainVulnerabilities(
  vulns: Vulnerability[],
  llm: LLM
): Promise<ExplainedVulnerability[]> {
  const results: ExplainedVulnerability[] = [];

  for (const vuln of vulns) {
    const prompt = buildPrompt(vuln);
    const response = await llm(prompt);

    const explanation =
      response.candidates?.[0]?.content?.parts
        ?.map((p) => p.text ?? "")
        .join("") ?? "No explanation generated.";

    // const explanation = (await llm(prompt)).text;

    results.push({
      name: vuln.name,
      severity: vuln.severity,
      explanation: explanation?.trim(),
    });
  }

  return results;
}

function buildPrompt(vuln: Vulnerability): string {
  return `
You are a senior security engineer.

Explain the following npm vulnerability to a JavaScript developer.

STRICT OUTPUT RULES:
- Write in plain English
- No markdown
- No headings
- No bullet points
- Do not stop early
- Finish all sections completely
- Write max 2 paragraphs only

Context:
Package name: ${vuln.name}
Severity: ${vuln.severity}
Affected versions: ${vuln.range}
Vulnerability details: ${vuln.via.join(", ")}

Write the explanation in this exact order:

1. Clearly explain what the vulnerability is and why it exists.
2. Explain when this vulnerability actually matters in real projects.
3. Explain realistic impact scenarios in production applications.
4. Mention whether upgrading or replacing the dependency is the safer choice.

Start now and write the full explanation without stopping.
make it concise to get a quick overview about vulnerability.

`;
}
