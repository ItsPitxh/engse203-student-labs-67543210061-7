import fs from "node:fs/promises";
import path from "node:path";
import { ROOT, escapeHtml, exists, listLabs, meaningfulEntries, readJson, validHttpUrl } from "./common.mjs";

const config = await readJson(path.join(ROOT, "student-config.json"));
const labs = await listLabs();
const docsRoot = path.join(ROOT, "docs");
const repoUrl = `https://github.com/${config.githubUsername}/${config.repositoryName}`;
const pagesBase = `https://${config.githubUsername}.github.io/${config.repositoryName}`;

await fs.rm(docsRoot, { recursive: true, force: true });
await fs.mkdir(path.join(docsRoot, "labs"), { recursive: true });
await fs.writeFile(path.join(docsRoot, ".nojekyll"), "", "utf8");

const statusLabels = {
  draft: "Draft",
  ready: "Ready for PR",
  submitted: "Submitted",
  revision: "Needs Revision",
};

const cards = [];
const summaries = [];

for (const week of labs) {
  const labRoot = path.join(ROOT, "labs", week);
  const publishRoot = path.join(labRoot, "publish");
  const target = path.join(docsRoot, "labs", week);
  const metadata = await readJson(path.join(labRoot, "lab-metadata.json"));
  const hasPublish = await exists(path.join(publishRoot, "index.html"));
  await fs.mkdir(target, { recursive: true });

  if (hasPublish) {
    await fs.cp(publishRoot, target, { recursive: true });
  } else {
    const sourceUrl = `${repoUrl}/tree/lab/${week}/labs/${week}/source`;
    const evidenceUrl = `${repoUrl}/tree/lab/${week}/labs/${week}/evidence`;
    const originalUrl = validHttpUrl(metadata.originalRepoUrl);
    const report = `<!doctype html>
<html lang="th"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(week)} — ${escapeHtml(metadata.title)}</title>
<style>body{margin:0;font-family:Tahoma,Arial,sans-serif;color:#10253d;background:#eef4f8}main{max-width:920px;margin:32px auto;padding:28px;background:#fff;border-radius:18px;box-shadow:0 12px 32px #0a27451c}a{color:#075ea8}h1{color:#092746}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}.card{padding:16px;border:1px solid #c7d8e6;border-radius:12px;background:#f6f9fc}.pill{display:inline-block;padding:6px 10px;border-radius:99px;background:#e5f1fa;font-weight:700}.actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}.actions a{padding:10px 14px;border-radius:8px;color:#fff;background:#1261a6;text-decoration:none}</style></head>
<body><main><p><a href="../../index.html">← LAB Portfolio</a></p><span class="pill">${escapeHtml(statusLabels[metadata.status] ?? metadata.status)}</span>
<h1>${escapeHtml(week)} — ${escapeHtml(metadata.title)}</h1><p>LAB นี้ใช้ evidence report แทน web application หรือยังไม่ได้นำ build output เข้า publish/</p>
<div class="grid"><div class="card"><strong>Test Status</strong><p>${escapeHtml(metadata.testStatus)}</p></div><div class="card"><strong>Submission</strong><p>${escapeHtml(metadata.submissionTag || "ยังไม่ระบุ")}</p></div><div class="card"><strong>Original Commit</strong><p>${escapeHtml(metadata.originalCommit || "ยังไม่ระบุ")}</p></div></div>
<div class="actions"><a href="${escapeHtml(sourceUrl)}">View Source</a><a href="${escapeHtml(evidenceUrl)}">View Evidence</a>${originalUrl ? `<a href="${escapeHtml(originalUrl)}">Original Repository</a>` : ""}</div>
<p style="margin-top:22px;color:#52677c">${escapeHtml(metadata.notes || "")}</p></main></body></html>`;
    await fs.writeFile(path.join(target, "index.html"), report, "utf8");
  }

  const sourceUrl = `${repoUrl}/tree/lab/${week}/labs/${week}/source`;
  const prUrl = validHttpUrl(metadata.pullRequestUrl);
  const pageUrl = `${pagesBase}/labs/${week}/`;
  const sourceCount = (await meaningfulEntries(path.join(labRoot, "source"))).length;
  const summary = { ...metadata, pageUrl, sourceUrl, hasPublish, sourceEntries: sourceCount };
  summaries.push(summary);
  await fs.writeFile(path.join(target, "submission.json"), `${JSON.stringify(summary, null, 2)}\n`, "utf8");

  cards.push(`<article class="lab-card" data-status="${escapeHtml(metadata.status)}">
    <div class="card-top"><span class="week">${escapeHtml(week)}</span><span class="status">${escapeHtml(statusLabels[metadata.status] ?? metadata.status)}</span></div>
    <h2>${escapeHtml(metadata.title)}</h2>
    <p>Test: <strong>${escapeHtml(metadata.testStatus)}</strong> • ${hasPublish ? "Web output" : "Evidence report"}</p>
    <div class="links"><a class="primary" href="labs/${escapeHtml(week)}/">View Result</a><a href="${escapeHtml(sourceUrl)}">Source</a>${prUrl ? `<a href="${escapeHtml(prUrl)}">Pull Request</a>` : ""}</div>
    <small>Version: ${escapeHtml(metadata.submissionTag || "not submitted")}</small>
  </article>`);
}

const dashboard = `<!doctype html>
<html lang="th"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#092746">
<title>ENGSE203 LAB Portfolio — ${escapeHtml(config.studentId)}</title>
<style>*{box-sizing:border-box}body{margin:0;font-family:Tahoma,Arial,sans-serif;color:#10253d;background:#eaf1f7}header{padding:42px max(22px,calc((100% - 1160px)/2));color:#fff;background:linear-gradient(135deg,#071f39,#0d4c77 72%,#078386)}header p{margin:8px 0 0;color:#cfe4f3}.profile{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}.profile span{padding:6px 10px;border:1px solid #ffffff40;border-radius:99px;background:#ffffff12}main{max-width:1160px;margin:0 auto;padding:26px 22px 48px}.notice{padding:14px 16px;border-left:5px solid #f4b942;border-radius:8px;background:#fff8e6}.labs{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:16px;margin-top:20px}.lab-card{padding:18px;border:1px solid #c4d6e4;border-top:5px solid #1261a6;border-radius:14px;background:#fff;box-shadow:0 8px 22px #09274612}.lab-card[data-status="submitted"]{border-top-color:#218a57}.lab-card[data-status="revision"]{border-top-color:#bd3d3a}.card-top{display:flex;justify-content:space-between;gap:12px}.week{font-weight:800;color:#1261a6}.status{padding:4px 8px;border-radius:99px;background:#edf3f8;font-size:12px;font-weight:700}.lab-card h2{min-height:2.8em;font-size:20px}.links{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0}.links a{padding:8px 10px;border:1px solid #9fb8cc;border-radius:7px;color:#0b527f;text-decoration:none}.links .primary{color:#fff;border-color:#1261a6;background:#1261a6}small{color:#52677c}@media(max-width:560px){header{padding-top:28px}.labs{grid-template-columns:1fr}.lab-card h2{min-height:0}}</style></head>
<body><header><small>ENGSE203 • Student LAB Repository</small><h1>LAB Portfolio</h1><p>${escapeHtml(config.studentName)} • ${escapeHtml(config.studentId)}</p><div class="profile"><span>${escapeHtml(config.section)}</span><span>@${escapeHtml(config.githubUsername)}</span><span>${escapeHtml(config.repositoryName)}</span></div></header>
<main><div class="notice"><strong>Instructor View:</strong> เปิดผลลัพธ์ Source, Pull Request และ submission version ของแต่ละ LAB จากการ์ดด้านล่าง</div><section class="labs">${cards.join("\n")}</section></main></body></html>`;

await fs.writeFile(path.join(docsRoot, "index.html"), dashboard, "utf8");
await fs.writeFile(path.join(docsRoot, "labs.json"), `${JSON.stringify(summaries, null, 2)}\n`, "utf8");

console.log(`Build Pages Hub: PASS — ${labs.length} LAB(s)`);
console.log(`Output: ${path.relative(ROOT, docsRoot)}/`);
console.log(`Preview: ${pagesBase}/`);
