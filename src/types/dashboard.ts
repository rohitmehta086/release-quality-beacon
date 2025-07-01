
export interface TestRunData {
  TestRunID: string;
  Release: string;
  TestCasesTotal: number;
  TestCasesPassed: number;
  TestCasesFailed: number;
  PassRate: number;
  ExecutionDate: string;
}

export interface BugReportData {
  BugID: string;
  TestRunID: string;
  Severity: 'High' | 'Medium' | 'Low';
  Status: 'Open' | 'Closed' | 'In Progress';
  ReportedDate: string;
  ClosedDate?: string;
  Description: string;
}

export interface BugTrends {
  totalBugs: number;
  highSeverity: number;
  closedBugs: number;
  openBugs: number;
  severityBreakdown: {
    High: number;
    Medium: number;
    Low: number;
  };
}

export interface TestCasePassRate {
  release: string;
  avgPassRate: number;
}

export interface BugCountPerRun {
  testRunId: string;
  bugCount: number;
}

export interface DashboardMetrics {
  testCasePassRate: TestCasePassRate[];
  bugTrends: BugTrends;
  bugCountPerRun: BugCountPerRun[];
}
