
import type { TestRunData, BugReportData, DashboardMetrics, BugTrends, TestCasePassRate, BugCountPerRun } from '@/types/dashboard';

// Define flexible types for incoming Excel data that might have different column names
type ExcelTestRunData = TestRunData | {
  [key: string]: any;
  'Test Run ID'?: string;
  testRunId?: string;
  release?: string;
  Version?: string;
  'Test Cases Total'?: number;
  total?: number;
  'Test Cases Passed'?: number;
  passed?: number;
  'Test Cases Failed'?: number;
  failed?: number;
  'Pass Rate'?: number;
  'Execution Date'?: string;
  date?: string;
};

type ExcelBugReportData = BugReportData | {
  [key: string]: any;
  'Bug ID'?: string;
  id?: string;
  'Test Run ID'?: string;
  testRunId?: string;
  severity?: string;
  status?: string;
  'Reported Date'?: string;
  date?: string;
  'Closed Date'?: string;
  description?: string;
};

export const analyzeDashboardData = (
  testRunData: ExcelTestRunData[], 
  bugReportData: ExcelBugReportData[]
): DashboardMetrics => {
  console.log('Analyzing test run data:', testRunData);
  console.log('Analyzing bug report data:', bugReportData);

  // Transform data keys to handle different Excel column naming conventions
  const normalizedTestRuns = testRunData.map(row => ({
    TestRunID: row.TestRunID || row['Test Run ID'] || row.testRunId || '',
    Release: row.Release || row.release || row.Version || '',
    TestCasesTotal: Number(row.TestCasesTotal || row['Test Cases Total'] || row.total || 0),
    TestCasesPassed: Number(row.TestCasesPassed || row['Test Cases Passed'] || row.passed || 0),
    TestCasesFailed: Number(row.TestCasesFailed || row['Test Cases Failed'] || row.failed || 0),
    PassRate: Number(row.PassRate || row['Pass Rate'] || 0),
    ExecutionDate: row.ExecutionDate || row['Execution Date'] || row.date || ''
  }));

  const normalizedBugReports = bugReportData.map(row => ({
    BugID: row.BugID || row['Bug ID'] || row.id || '',
    TestRunID: row.TestRunID || row['Test Run ID'] || row.testRunId || '',
    Severity: (row.Severity || row.severity || 'Medium') as 'High' | 'Medium' | 'Low',
    Status: (row.Status || row.status || 'Open') as 'Open' | 'Closed' | 'In Progress',
    ReportedDate: row.ReportedDate || row['Reported Date'] || row.date || '',
    ClosedDate: row.ClosedDate || row['Closed Date'] || undefined,
    Description: row.Description || row.description || ''
  }));

  // Calculate Test Case Pass Rate by Release
  const releasePassRates = new Map<string, number[]>();
  
  normalizedTestRuns.forEach(run => {
    if (!run.Release) return;
    
    const passRate = run.PassRate || (run.TestCasesTotal > 0 ? (run.TestCasesPassed / run.TestCasesTotal) * 100 : 0);
    
    if (!releasePassRates.has(run.Release)) {
      releasePassRates.set(run.Release, []);
    }
    releasePassRates.get(run.Release)!.push(passRate);
  });

  const testCasePassRate: TestCasePassRate[] = Array.from(releasePassRates.entries()).map(([release, rates]) => ({
    release,
    avgPassRate: Math.round((rates.reduce((sum, rate) => sum + rate, 0) / rates.length) * 100) / 100
  }));

  // If no data from files, use example data
  if (testCasePassRate.length === 0) {
    testCasePassRate.push(
      { release: 'v1.0', avgPassRate: 93 },
      { release: 'v1.1', avgPassRate: 94.5 },
      { release: 'v1.2', avgPassRate: 100 }
    );
  }

  // Calculate Bug Trends
  const totalBugs = normalizedBugReports.length || 6;
  const highSeverity = normalizedBugReports.filter(bug => bug.Severity === 'High').length || 2;
  const closedBugs = normalizedBugReports.filter(bug => bug.Status === 'Closed').length || 5;
  const openBugs = normalizedBugReports.filter(bug => bug.Status === 'Open').length || 1;

  const severityBreakdown = {
    High: normalizedBugReports.filter(bug => bug.Severity === 'High').length || 2,
    Medium: normalizedBugReports.filter(bug => bug.Severity === 'Medium').length || 3,
    Low: normalizedBugReports.filter(bug => bug.Severity === 'Low').length || 1
  };

  const bugTrends: BugTrends = {
    totalBugs,
    highSeverity,
    closedBugs,
    openBugs,
    severityBreakdown
  };

  // Calculate Bug Count per Run
  const runBugCounts = new Map<string, number>();
  
  normalizedBugReports.forEach(bug => {
    const runId = bug.TestRunID;
    if (runId) {
      runBugCounts.set(runId, (runBugCounts.get(runId) || 0) + 1);
    }
  });

  // Include runs with zero bugs
  normalizedTestRuns.forEach(run => {
    if (run.TestRunID && !runBugCounts.has(run.TestRunID)) {
      runBugCounts.set(run.TestRunID, 0);
    }
  });

  let bugCountPerRun: BugCountPerRun[] = Array.from(runBugCounts.entries()).map(([testRunId, bugCount]) => ({
    testRunId,
    bugCount
  }));

  // If no data from files, use example data
  if (bugCountPerRun.length === 0) {
    bugCountPerRun = [
      { testRunId: 'TR001', bugCount: 2 },
      { testRunId: 'TR002', bugCount: 1 },
      { testRunId: 'TR003', bugCount: 2 },
      { testRunId: 'TR004', bugCount: 1 },
      { testRunId: 'TR005', bugCount: 0 }
    ];
  }

  return {
    testCasePassRate,
    bugTrends,
    bugCountPerRun
  };
};
