
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Upload, TrendingUp, Bug, FileSpreadsheet } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-16 pb-12">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-gray-900 flex items-center justify-center gap-4">
              <BarChart3 className="h-12 w-12 text-blue-600" />
              Release Quality Dashboard
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your Excel test run data and bug reports into powerful insights. 
              Get comprehensive analytics on build quality, test pass rates, and bug trends.
            </p>
          </div>

          <Button 
            onClick={() => navigate('/dashboard')}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg"
          >
            <Upload className="h-5 w-5 mr-2" />
            Get Started with Your Data
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-green-600" />
                Test Pass Rate Analysis
              </CardTitle>
              <CardDescription>
                Track test case pass rates across different releases and identify quality trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Release-wise pass rate comparison</li>
                <li>• Average pass rate calculations</li>
                <li>• Quality trend visualization</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-6 w-6 text-red-600" />
                Bug Trend Insights
              </CardTitle>
              <CardDescription>
                Analyze bug patterns, severity distribution, and resolution rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Severity-based categorization</li>
                <li>• Bug resolution tracking</li>
                <li>• Status distribution analysis</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="h-6 w-6 text-purple-600" />
                Excel Integration
              </CardTitle>
              <CardDescription>
                Simply upload your Excel files and get instant dashboard insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Drag & drop Excel upload</li>
                <li>• Automatic data parsing</li>
                <li>• Real-time chart generation</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sample Data Preview */}
      <div className="container mx-auto px-6 pb-16">
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center">Expected Data Format</CardTitle>
            <CardDescription className="text-center">
              Your Excel files should contain the following columns for optimal results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-blue-700">Test Run Details</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <ul className="space-y-1 text-sm">
                    <li>• TestRunID</li>
                    <li>• Release</li>
                    <li>• TestCasesTotal</li>
                    <li>• TestCasesPassed</li>
                    <li>• TestCasesFailed</li>
                    <li>• PassRate</li>
                    <li>• ExecutionDate</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3 text-red-700">Bug Reports</h3>
                <div className="bg-red-50 p-4 rounded-lg">
                  <ul className="space-y-1 text-sm">
                    <li>• BugID</li>
                    <li>• TestRunID</li>
                    <li>• Severity (High/Medium/Low)</li>
                    <li>• Status (Open/Closed/In Progress)</li>
                    <li>• ReportedDate</li>
                    <li>• ClosedDate</li>
                    <li>• Description</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
