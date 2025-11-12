const fs = require("fs");
const xml2js = require("xml2js");

const parser = new xml2js.Parser();

// Report Meta Info
const reportTitle = "Yaantrac Test Automation Report";
const environment = "QA";
const version = "v1.0.0";

// Function to get IST time
function getISTTime(date = new Date()) {
  return new Date(date).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
}

// Timestamp for report header only
const reportGeneratedTime = getISTTime();

fs.readFile("reports/results.xml", (err, data) => {
  if (err) throw err;

  parser.parseString(data, (err, result) => {
    if (err) throw err;

    const testSuites = result.testsuites
      ? result.testsuites.testsuite
      : [result.testsuite];

    let total = 0,
      passed = 0,
      failed = 0,
      skipped = 0;
    let rows = "";

    // 🔹 Loop through suites & testcases
    testSuites.forEach((suite) => {
      if (!suite.testcase) return;

      suite.testcase.forEach((tc) => {
        total++;

        let status = "Pass";
        if (tc.skipped) {
          status = "Skipped";
          skipped++;
        } else if (tc.failure) {
          status = "Fail";
          failed++;
        } else {
          passed++;
        }

        const fullName = tc.$.name || "Unknown";
        const parts = fullName.split("›").map((p) => p.trim());
        const scenarioId = parts[0] || "";
        const testCasePart = parts[1] || "";
        const [testId, description = "No description"] = testCasePart
          .split(" - ")
          .map((p) => p.trim());
        const testcaseID = `${scenarioId.split(" - ")[0]}_${testId}`;

        let type = "Functional";
        if (description.toLowerCase().includes("login")) type = "Smoke";

        const duration = tc.$.time || "0";

        // ✅ Use real timestamp from XML if available
        let testStartTime =
          tc.$.timestamp || suite.$.timestamp || new Date().toISOString();
        const formattedTime = getISTTime(testStartTime);

        rows += `
        <tr>
          <td>${scenarioId}</td>
          <td>${testcaseID}</td>
          <td>${type}</td>
          <td>${description}</td>
          <td>${formattedTime} (Duration: ${duration}s)</td>
          <td class="${status.toLowerCase()}">${status}</td>
        </tr>`;
      });
    });

    // 🔹 Build final HTML
    let html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${reportTitle}</title>
<style>
body {
  font-family: "Segoe UI", Roboto, Arial, sans-serif;
  background: #f0f2f5;
  padding: 30px;
  color: #333;
}
h1 {
  text-align: center;
  margin-bottom: 8px;
  font-size: 28px;
  color: #2c3e50;
}
.meta {
  text-align: center;
  font-size: 14px;
  margin-bottom: 25px;
  color: #555;
}
.summary {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}
.summary-box {
  background: #fff;
  border-radius: 10px;
  padding: 15px 25px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  min-width: 120px;
}
.summary-box.pass { border-left: 6px solid #2ecc71; }
.summary-box.fail { border-left: 6px solid #e74c3c; }
.summary-box.skipped { border-left: 6px solid #f1c40f; }
.summary-box.total { border-left: 6px solid #3498db; }
table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
th, td {
  padding: 12px 15px;
  text-align: left;
}
th {
  background: #34495e;
  color: white;
  font-size: 15px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
tr:nth-child(even) {
  background: #f9f9f9;
}
tr:hover {
  background: #f1f7ff;
}
.pass { color: #27ae60; font-weight: bold; }
.fail { color: #c0392b; font-weight: bold; }
.skipped { color: #d4ac0d; font-weight: bold; }
</style>
</head>
<body>
<h1>${reportTitle}</h1>
<div class="meta">
Environment: ${environment} | Version: ${version} | Generated: ${reportGeneratedTime}
</div>
<div class="summary">
  <div class="summary-box total">Total: ${total}</div>
  <div class="summary-box pass">Passed: ${passed}</div>
  <div class="summary-box fail">Failed: ${failed}</div>
  <div class="summary-box skipped">Skipped: ${skipped}</div>
</div>
<table>
<tr>
  <th>Test Scenario ID</th>
  <th>Test Cases ID</th>
  <th>Test Case Type</th>
  <th>Description</th>
  <th>Date & Time</th>
  <th>Status</th>
</tr>
${rows}
</table>
</body>
</html>`;

    const safeFileNameTime = reportGeneratedTime.replace(/[^\w]/g, "_");
    const fileName = `reports/report_${safeFileNameTime}.html`;
    fs.writeFileSync(fileName, html);
    console.log(`✅ UI Report generated: ${fileName}`);
  });
});
