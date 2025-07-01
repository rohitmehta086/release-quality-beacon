
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileSpreadsheet, BarChart3, Bug, TrendingUp } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';
import { TestRunChart } from '@/components/TestRunChart';
import { BugTrendsChart } from '@/components/BugTrendsChart';
import { BugCountChart } from '@/components/BugCountChart';
import { MetricsOverview } from '@/components/MetricsOverview';
import { analyzeDashboardData } from '@/utils/dataAnalysis';
import type { TestRunData, BugReportData, DashboardMetrics } from '@/types/dashboard';

const Dashboard = () => {
  const [testRunFile, setTestRunFile] = useState<File | null>(null);
  const [bugReportFile, setBugReportFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardMetrics | null>(null);

  const handleFileUpload = (file: File, type: 'testRun' | 'bugReport') => {
    if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && 
        !file.name.endsWith('.xlsx')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an Excel (.xlsx) file",
        variant: "destructive"
      });
      return;
    }

    if (type === 'testRun') {
      setTestRunFile(file);
    } else {
      setBugReportFile(file);
    }

    toast({
      title: "File uploaded",
      description: `${file.name} has been uploaded successfully`,
    });
  };

  const parseExcelFile = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsArrayBuffer(file);
    });
  };

  const analyzeData = async () => {
    if (!testRunFile || !bugReportFile) {
      toast({
        title: "Missing files",
        description: "Please upload both Test Run Details and Bug Reports files",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const [testRunData, bugReportData] = await Promise.all([
        parseExcelFile(testRunFile),
        parseExcelFile(bugReportFile)
      ]);

      const metrics = analyzeDashboardData(testRunData as TestRunData[], bugReportData as BugReportData[]);
      setDashboardData(metrics);

      toast({
        title: "Analysis complete",
        description: "Dashboard data has been generated successfully",
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing the uploaded files",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <BarChart3 className="h-10 w-10 text-blue-600" />
            Release Build Quality Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your test run details and bug reports to get comprehensive insights into your release quality metrics
          </p>
        </div>

        {/* File Upload Section */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Excel Files
            </CardTitle>
            <CardDescription>
              Upload your Test Run Details and Bug Reports Excel files to analyze build quality
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Test Run File Upload */}
              <div className="space-y-2">
                <Label htmlFor="test-run-file" className="text-sm font-medium">
                  Test Run Details (.xlsx)
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="test-run-file"
                    type="file"
                    accept=".xlsx"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'testRun')}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {testRunFile && (
                    <div className="flex items-center gap-1 text-green-600">
                      <FileSpreadsheet className="h-4 w-4" />
                      <span className="text-xs">{testRunFile.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bug Report File Upload */}
              <div className="space-y-2">
                <Label htmlFor="bug-report-file" className="text-sm font-medium">
                  Bug Reports (.xlsx)
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="bug-report-file"
                    type="file"
                    accept=".xlsx"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'bugReport')}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                  />
                  {bugReportFile && (
                    <div className="flex items-center gap-1 text-green-600">
                      <FileSpreadsheet className="h-4 w-4" />
                      <span className="text-xs">{bugReportFile.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Button 
              onClick={analyzeData} 
              disabled={!testRunFile || !bugReportFile || isAnalyzing}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing Data...
                </>
              ) : (
                <>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analyze Dashboard Data
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Dashboard Content */}
        {dashboardData && (
          <div className="space-y-8">
            {/* Metrics Overview */}
            <MetricsOverview data={dashboardData} />

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TestRunChart data={dashboardData.testCasePassRate} />
              <BugTrendsChart data={dashboardData.bugTrends} />
            </div>

            <div className="w-full">
              <BugCountChart data={dashboardData.bugCountPerRun} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
